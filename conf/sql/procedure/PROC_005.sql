DROP PROCEDURE IF EXISTS `PROC_005`;

CREATE PROCEDURE `PROC_005`(IN iYear INT, IN iMonth INT, IN userId INT, IN customerType INT, IN summaryType INT)
  BEGIN
    /* declare vars */
    DECLARE fYear INT;
    /* 1. query by year, month and userId */
    CREATE TEMPORARY TABLE tmpDeal AS
      SELECT
        d.id            id,
        c.customer_code customer_code,
        d.deal_status   deal_status
      FROM sfr_sf_deal d
        LEFT JOIN sfr_sf_customer c ON c.id = d.customer_id
      WHERE d.template_flag = 0
            AND d.delete_flag = 0
            AND d.sales_id = userId
            AND YEAR(d.delivery_date) = iYear
            AND MONTH(d.delivery_date) = iMonth
      ORDER BY d.delivery_date DESC;
    /* 2. filter by summaryType */
    IF (summaryType = 1)
    THEN
      /* 2.1A shipped deals only */
      CREATE TEMPORARY TABLE tmpDeal1 AS
        SELECT
          id,
          customer_code
        FROM tmpDeal
        WHERE deal_status IN (6, 7);
    ELSE
      /* 2.1B all deals customer */
      CREATE TEMPORARY TABLE tmpDeal1 AS
        SELECT
          id,
          customer_code
        FROM tmpDeal;
    END IF;
    /* 3. select by customerType */
    IF (customerType = 1)
    THEN
      /* 3.1A select all customer */
      SELECT id, 1
      FROM tmpDeal1;
    ELSE
      /* 3.1B.1 get current financialYear */
      IF (iMonth < 4)
      THEN
        SET fYear = iYear - 1;
      ELSE
        SET fYear = iYear;
      END IF;
      /* 3.1B.2 create customer start table */
      CREATE TEMPORARY TABLE tmpCustomer AS
        SELECT
          customer_code                                                              customer_code,
          IF(MONTH(r.first_date) < 4, YEAR(r.first_date) - 1, YEAR(r.first_date)) AS start_year
        FROM (
               SELECT
                 denno_customer_code     customer_code,
                 MIN(invoice_sales_date) first_date
               FROM sfr_sf_revenue
               GROUP BY customer_code) r;

      IF (customerType = 2)
      THEN
        /* 3.1B.3A select old customer */
        SELECT d.id id, 1
        FROM tmpDeal1 d
          LEFT JOIN tmpCustomer c ON c.customer_code = d.customer_code
        WHERE c.start_year < fYear;
      END IF;
      IF (customerType = 3)
      THEN
        /* 3.1B.3B select new customer */
        SELECT d.id id, 1
        FROM tmpDeal1 d
          LEFT JOIN tmpCustomer c ON c.customer_code = d.customer_code
        WHERE c.start_year IS NULL OR c.start_year >= fYear;
      END IF;
    END IF;
    /* 3. Drop temp tables*/
    DROP TEMPORARY TABLE IF EXISTS tmpDeal, tmpDeal1, tmpCustomer;
  END