DROP PROCEDURE IF EXISTS `PROC_006`;

CREATE PROCEDURE `PROC_006`(IN fYear SMALLINT, IN fMonth TINYINT, IN listLimit TINYINT)
  BEGIN
    DECLARE startRevenueDate, endRevenueDate DATE;
    /* 1. get raw revenue for customer of departments for the past */
    /* 1.1 calculate start/end year */
    SET startRevenueDate = DATE(CONCAT(fYear - 2, '-04-01'));
    SET endRevenueDate = DATE_ADD(DATE(CONCAT(fYear, '-', fMonth, '-1')), INTERVAL 3 MONTH);
    /* 1.2 query raw revenue */
    CREATE TEMPORARY TABLE tmpRevenueRaw
      SELECT
        YEAR(r.invoice_sales_date)        year,
        MONTH(r.invoice_sales_date)       month,
        c.id                              customer_id,
        c.start_year                      start_year,
        r.product_type                    product_type,
        SUM(r.sales_amount) amount
      FROM
        `sfr_sf_revenue` r
        INNER JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
        INNER JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
        INNER JOIN `sfr_sf_department` d ON d.id = u.department_id
      WHERE r.product_type IS NOT NULL
            AND d.mail_group_flag = 0
            AND d.type = 1
            AND r.invoice_sales_date >= startRevenueDate AND r.invoice_sales_date < endRevenueDate
      GROUP BY year, month, customer_id, product_type;

    /* 2. roll up revenue raw */
    CREATE TEMPORARY TABLE tmpRevenue
      SELECT
        year                                 year,
        month                                month,
        customer_id                          customer_id,
        ANY_VALUE(start_year)                start_year,
        SUM(IF(product_type = 0, amount, 0)) amount1,
        SUM(IF(product_type = 1, amount, 0)) amount2,
        SUM(IF(product_type = 2, amount, 0)) amount3
      FROM tmpRevenueRaw
      GROUP BY year, month, customer_id WITH ROLLUP
      HAVING customer_id IS NOT NULL;
    /* drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpRevenueRaw;

    /* 3. create revenue sum up table */
    /* 3.1 old revenue */
    CREATE TEMPORARY TABLE tmpONRevenue
      SELECT
        1           row_type,
        (year + 1)  year,
        month       month,
        customer_id customer_id,
        start_year  start_year,
        amount1     amount1,
        amount2     amount2,
        amount3     amount3
      FROM tmpRevenue;
    /* 3.2 new revenue */
    INSERT INTO tmpONRevenue
      SELECT
        2           row_type,
        year        year,
        month       month,
        customer_id customer_id,
        start_year  start_year,
        amount1     amount1,
        amount2     amount2,
        amount3     amount3
      FROM tmpRevenue
      WHERE (year = fYear - 1 AND month >= 4) OR year >= fYear;
    /* 3.3 roll up */
    CREATE TEMPORARY TABLE tmpSRevenue
      SELECT
        year                                year,
        month                               month,
        IF(month < 4, year - 1, year)       f_year,
        IF(month < 4, month + 9, month - 3) f_month,
        customer_id                         customer_id,
        MIN(start_year)                     start_year,
        SUM(IF(row_type = 1, amount1, 0))   oldAmount1,
        SUM(IF(row_type = 1, amount2, 0))   oldAmount2,
        SUM(IF(row_type = 1, amount3, 0))   oldAmount3,
        SUM(IF(row_type = 2, amount1, 0))   newAmount1,
        SUM(IF(row_type = 2, amount2, 0))   newAmount2,
        SUM(IF(row_type = 2, amount3, 0))   newAmount3
      FROM tmpONRevenue
      GROUP BY year, month, customer_id WITH ROLLUP
      HAVING customer_id IS NOT NULL;
    /* drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpRevenue, tmpONRevenue;

    /* 4. create revenue summary table */
    CREATE TEMPORARY TABLE tmpSummary
      SELECT
        year            year,
        month           month,
        SUM(oldAmount1) oldAmount1,
        SUM(oldAmount2) oldAmount2,
        SUM(oldAmount3) oldAmount3,
        SUM(newAmount1) newAmount1,
        SUM(newAmount2) newAmount2,
        SUM(newAmount3) newAmount3
      FROM tmpSRevenue
      GROUP BY year, month WITH ROLLUP
      HAVING month IS NOT NULL;

    /* 5. create sum up table */
    /* 5.1 select note data for 3 years */
    CREATE TEMPORARY TABLE tmpNote
      SELECT
        year                                   year,
        month                                  month,
        IF(month < 4, year - 1, year)          f_year,
        IF(month < 4, month + 9, month - 3)    f_month,
        customer_id                            customer_id,
        type1_goal                             amount1,
        type2_goal                             amount2,
        type3_goal                             amount3,
        (type1_goal + type2_goal + type3_goal) totalAmount,
        note                                   note
      FROM `sfr_sf_prediction`
      WHERE (year = fYear - 1 AND month >= 4)
            OR (year = fYear)
            OR (year = fYear + 1)
            OR (year = fYear + 2 AND month < 4);
    /* 5.2 create sum up for revenue */
    CREATE TEMPORARY TABLE tmpSumUp
      SELECT
        r.year        year,
        r.month       month,
        r.customer_id customer_id,
        r.oldAmount1  oldAmount1,
        r.oldAmount2  oldAmount2,
        r.oldAmount3  oldAmount3,
        r.newAmount1  newAmount1,
        r.newAmount2  newAmount2,
        r.newAmount3  newAmount3,
        n.note        note
      FROM tmpSRevenue r
        LEFT JOIN tmpNote n ON (n.year = r.year AND n.month = r.month AND n.customer_id = r.customer_id)
      WHERE ((r.f_year = fYear - 1) OR (r.f_year = fYear AND r.f_month < fMonth))
            AND r.start_year < r.f_year;
    /* 5.3 add sum up for prediction */
    INSERT INTO tmpSumUp
      SELECT
        n.year                    year,
        n.month                   month,
        n.customer_id             customer_id,
        COALESCE(r.oldAmount1, 0) oldAmount1,
        COALESCE(r.oldAmount2, 0) oldAmount2,
        COALESCE(r.oldAmount3, 0) oldAmount3,
        n.amount1                 newAmount1,
        n.amount2                 newAmount2,
        n.amount3                 newAmount3,
        n.note                    note
      FROM tmpNote n
        LEFT JOIN tmpSRevenue r ON (r.year = n.year AND r.month = n.month AND r.customer_id = n.customer_id)
      WHERE ((n.f_year = fYear AND n.f_month >= fMonth) OR (n.f_year > fYear));
    /* 5.4 Drop temp tables */
    DROP TEMPORARY TABLE IF EXISTS tmpSRevenue, tmpNote;

    /* 6. create diff raw table */
    CREATE TEMPORARY TABLE tmpDiffRaw
      SELECT
        year                                                                              year,
        month                                                                             month,
        customer_id                                                                       customer_id,
        oldAmount1                                                                        oldAmount1,
        oldAmount2                                                                        oldAmount2,
        oldAmount3                                                                        oldAmount3,
        newAmount1                                                                        newAmount1,
        newAmount2                                                                        newAmount2,
        newAmount3                                                                        newAmount3,
        note                                                                              note,
        ((newAmount1 + newAmount2 + newAmount3) - (oldAmount1 + oldAmount2 + oldAmount3)) diffAmount,
        (year * 12 + month)                                                               date_group
      FROM tmpSumUp
      GROUP BY year, month, customer_id WITH ROLLUP
      HAVING customer_id IS NOT NULL;
    /* 6.2 Drop temp tables */
    DROP TEMPORARY TABLE IF EXISTS tmpSumUp;

    /* 8 analyze to diff table */
    /* 8.1 increase diff */
    SET @dateGroup = NULL;
    SET @num = 0;
    CREATE TEMPORARY TABLE tmpDiff
      SELECT
        year                                             year,
        month                                            month,
        customer_id                                      customer_id,
        oldAmount1                                       oldAmount1,
        oldAmount2                                       oldAmount2,
        oldAmount3                                       oldAmount3,
        newAmount1                                       newAmount1,
        newAmount2                                       newAmount2,
        newAmount3                                       newAmount3,
        note                                             note,
        diffAmount                                       diffAmount,
        date_group                                       date_group,
        @num := IF(@dateGroup = date_group, @num + 1, 1) row_number,
        @dateGroup := `date_group`                       dummy
      FROM tmpDiffRaw
      WHERE diffAmount >= 0
      ORDER BY date_group ASC, diffAmount DESC, customer_id ASC;
    /* 8.2 decrease diff */
    SET @dateGroup = NULL;
    SET @num = 0;
    INSERT INTO tmpDiff
      SELECT
        year                                             year,
        month                                            month,
        customer_id                                      customer_id,
        oldAmount1                                       oldAmount1,
        oldAmount2                                       oldAmount2,
        oldAmount3                                       oldAmount3,
        newAmount1                                       newAmount1,
        newAmount2                                       newAmount2,
        newAmount3                                       newAmount3,
        note                                             note,
        diffAmount                                       diffAmount,
        date_group                                       date_group,
        @num := IF(@dateGroup = date_group, @num + 1, 1) row_number,
        @dateGroup := `date_group`                       dummy
      FROM tmpDiffRaw
      WHERE diffAmount < 0
      ORDER BY date_group ASC, diffAmount ASC, customer_id ASC;
    /* 8.3 drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpDiffRaw;

    /* 9. OUTPUT: top diff customer */
    SELECT
      year        year,
      month       month,
      customer_id customer_id,
      oldAmount1  oldAmount1,
      oldAmount2  oldAmount2,
      oldAmount3  oldAmount3,
      newAmount1  newAmount1,
      newAmount2  newAmount2,
      newAmount3  newAmount3,
      note
    FROM tmpDiff
    WHERE row_number <= listLimit;

    /* 10. OUTPUT: summary data */
    SELECT
      year       year,
      month      month,
      NULL       customer_id,
      oldAmount1 oldAmount1,
      oldAmount2 oldAmount2,
      oldAmount3 oldAmount3,
      newAmount1 newAmount1,
      newAmount2 newAmount2,
      newAmount3 newAmount3,
      NULL       note
    FROM tmpSummary;

    /* 11. Drop temp tables*/
    DROP TEMPORARY TABLE IF EXISTS tmpDiff, tmpSummary;
  END