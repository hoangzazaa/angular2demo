DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_002`(IN fYear INT, IN sMonth INT, IN eMonth INT, IN departmentId INT, IN userId INT, IN customerType INT)
BEGIN
    /* 1. query base revenue */
    IF (departmentId = 0)
    THEN
      /* 1.1A select all company */
      CREATE TEMPORARY TABLE tmpRevenue
        ENGINE = MEMORY
        SELECT
          d.id                              id,
          MONTH(r.invoice_sales_date)       month,
          c.customer_code                   customer_code,
          ANY_VALUE(cr.start_year)          start_year,
          r.product_type                    product_type,
          SUM(r.sales_amount) revenue
        FROM
          `sfr_sf_revenue` r
          JOIN sfr_sf_customer c ON c.customer_code = r.denno_customer_code
          JOIN sfr_sf_user u ON u.user_code = c.pic_code
          JOIN sfr_sf_department d ON d.id = u.department_id
          LEFT JOIN (SELECT
                       customer_code                                                     customer_code,
                       IF(MONTH(first_date) < 4, YEAR(first_date) - 1, YEAR(first_date)) start_year
                     FROM (SELECT
                             denno_customer_code     customer_code,
                             MIN(invoice_sales_date) first_date
                           FROM `sfr_sf_revenue`
                           GROUP BY customer_code) tmpX) cr ON cr.customer_code = r.denno_customer_code
        WHERE r.product_type IS NOT NULL
              AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
              AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
              AND d.department_code IN ( 'EE01', 'EE02', 'EE03', 'EE04', 'EE05', 'EE06', 'EE07', 'EE08', 'EE09', 'EE10', 'EE11', 'EE12', 'EE18', 'EE95' ) -- 予算管理対象となる営業部門のみを抽出(2017/12/05 清宮)
        GROUP BY id, month, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId = 0)
    THEN
      /* 1.1B select by department */
      CREATE TEMPORARY TABLE tmpRevenue
        ENGINE = MEMORY
        SELECT
          u.id                              id,
          MONTH(r.invoice_sales_date)       month,
          c.customer_code                   customer_code,
          ANY_VALUE(cr.start_year)          start_year,
          r.product_type                    product_type,
          SUM(r.sales_amount) revenue
        FROM
          sfr_sf_revenue r
          JOIN sfr_sf_customer c ON c.customer_code = r.denno_customer_code
          JOIN sfr_sf_user u ON u.user_code = c.pic_code
          JOIN sfr_sf_department d ON d.id = u.department_id
          LEFT JOIN (SELECT
                       customer_code                                                     customer_code,
                       IF(MONTH(first_date) < 4, YEAR(first_date) - 1, YEAR(first_date)) start_year
                     FROM (SELECT
                             denno_customer_code     customer_code,
                             MIN(invoice_sales_date) first_date
                           FROM `sfr_sf_revenue`
                           GROUP BY customer_code) tmpX) cr ON cr.customer_code = r.denno_customer_code
/*
          `sfr_sf_revenue` r
          JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
          JOIN `sfr_sf_user` u ON u.user_code = r.sales_rep
          INNER JOIN sfr_sf_department d on d.department_code = r.department_code
          LEFT JOIN (SELECT
                       customer_code                                                     customer_code,
                       IF(MONTH(first_date) < 4, YEAR(first_date) - 1, YEAR(first_date)) start_year
                     FROM (SELECT
                             denno_customer_code     customer_code,
                             MIN(invoice_sales_date) first_date
                           FROM `sfr_sf_revenue`
                           GROUP BY customer_code) tmpX) cr ON cr.customer_code = r.denno_customer_code
*/
        WHERE d.id = departmentId AND r.product_type IS NOT NULL
              AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
              AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
        GROUP BY id, month, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId != 0)
    THEN
      /* 1.1C select by user */
      CREATE TEMPORARY TABLE tmpRevenue
        ENGINE = MEMORY
        SELECT
          u.id                              id,
          MONTH(r.invoice_sales_date)       month,
          c.customer_code                   customer_code,
          ANY_VALUE(cr.start_year)          start_year,
          r.product_type                    product_type,
          SUM(r.sales_amount) revenue
        FROM
          sfr_sf_revenue r
          JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
          JOIN sfr_sf_user u ON u.user_code = c.pic_code
          JOIN sfr_sf_department d ON d.id = u.department_id
          LEFT JOIN (SELECT
                       customer_code                                                     customer_code,
                       IF(MONTH(first_date) < 4, YEAR(first_date) - 1, YEAR(first_date)) start_year
                     FROM (SELECT
                             denno_customer_code     customer_code,
                             MIN(invoice_sales_date) first_date
                           FROM `sfr_sf_revenue`
                           GROUP BY customer_code) tmpX) cr ON cr.customer_code = r.denno_customer_code
/*
          `sfr_sf_revenue` r
          JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
          INNER JOIN sfr_sf_department d on d.department_code = r.department_code
          INNER JOIN `sfr_sf_user` u ON u.user_code = r.sales_rep
          LEFT JOIN (SELECT
                       customer_code                                                     customer_code,
                       IF(MONTH(first_date) < 4, YEAR(first_date) - 1, YEAR(first_date)) start_year
                     FROM (SELECT
                             denno_customer_code     customer_code,
                             MIN(invoice_sales_date) first_date
                           FROM `sfr_sf_revenue`
                           GROUP BY customer_code) tmpX) cr ON cr.customer_code = r.denno_customer_code
*/
        WHERE u.id = userId  and d.id = departmentId
              AND r.product_type IS NOT NULL
              AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
              AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
        GROUP BY id, month, customer_code, product_type;
    END IF;
    /* 2. filter by customer type */
    IF (customerType = 1)
    THEN
      /* 2.1A all customer */
      SELECT
        id,
        month,
        product_type,
        SUM(revenue)
      FROM tmpRevenue
      GROUP BY id, month, product_type;
    END IF;
    IF (customerType = 2)
    THEN
      /* 2.1B old customer only */
      SELECT
        id,
        month,
        product_type,
        SUM(revenue)
      FROM tmpRevenue
      WHERE start_year < fYear
      GROUP BY id, month, product_type;
    END IF;
    IF (customerType = 3)
    THEN
      /* 2.1C new customer only */
      SELECT
        id,
        month,
        product_type,
        SUM(revenue)
      FROM tmpRevenue
      WHERE start_year IS NULL
            OR start_year >= fYear
      GROUP BY id, month, product_type;
    END IF;
    /* 3. drop temporary tables */
    DROP TEMPORARY TABLE IF EXISTS tmpRevenue;
  END;;
DELIMITER ;