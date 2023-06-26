DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_003`(IN fYear       SMALLINT, IN sMonth TINYINT, IN eMonth TINYINT, IN departmentId INT, IN userId INT, IN customerType TINYINT,
                                                          IN summaryType TINYINT, IN dateUnit TINYINT)
  BEGIN
    /* 1. query base deals */
    /* 1.1 query shipped deals */
    IF (departmentId = 0)
    THEN
      /* 1.1A select company deals */
      CREATE TEMPORARY TABLE tmpDealRaw
        ENGINE = MEMORY
          SELECT
            d.id                                                                     department_id,
            0                                                                        user_id,
            IF(dateUnit = 1, MONTH(r.invoice_sales_date), DAY(r.invoice_sales_date)) deal_date,
            c.customer_code                                                          customer_code,
            r.product_type                                                           product_type,
            SUM(r.sales_amount)                                 amount
          FROM
            `sfr_sf_revenue` r
            JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
            JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
            JOIN `sfr_sf_department` d ON d.id = u.department_id
          WHERE r.product_type IS NOT NULL
                AND d.mail_group_flag = 0
                AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
                AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
                AND d.sales_aggregate_flag = 1
          GROUP BY department_id, user_id, deal_date, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId = 0)
    THEN
      /* 1.1B select department deals */
      CREATE TEMPORARY TABLE tmpDealRaw
        ENGINE = MEMORY
          SELECT
            d.id                                                          department_id,
            u.id                                                                     user_id,
            IF(dateUnit = 1, MONTH(r.invoice_sales_date), DAY(r.invoice_sales_date)) deal_date,
            c.customer_code                                                          customer_code,
            r.product_type                                                           product_type,
            SUM(r.sales_amount)                                 amount
          FROM
            `sfr_sf_revenue` r
            JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
            JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
            JOIN sfr_sf_department d on d.id = u.department_id
          WHERE r.product_type IS NOT NULL
                AND d.id = departmentId
                AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
                AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
          GROUP BY department_id, user_id, deal_date, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId != 0)
    THEN
      /* 1.1C select user deals */
      CREATE TEMPORARY TABLE tmpDealRaw
        ENGINE = MEMORY
          SELECT
            d.id                                                          department_id,
            u.id                                                                     user_id,
            IF(dateUnit = 1, MONTH(r.invoice_sales_date), DAY(r.invoice_sales_date)) deal_date,
            c.customer_code                                                          customer_code,
            r.product_type                                                           product_type,
            SUM(r.sales_amount)                                 amount
          FROM
            `sfr_sf_revenue` r
            JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
            JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
            INNER JOIN sfr_sf_department d on d.id = u.department_id
          WHERE r.product_type IS NOT NULL
                AND d.id = departmentId
                AND u.id = userId
                AND r.invoice_sales_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
                AND r.invoice_sales_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
          GROUP BY department_id, user_id, deal_date, customer_code, product_type;
    END IF;
    /* 1.2 query in-progress deals */
    IF (summaryType = 2)
    THEN
      INSERT INTO tmpDealRaw
        SELECT
          d.id                                                  department_id,
          usr.id                                                             user_id,
          IF(dateUnit = 1, MONTH(dea.delivery_date), DAY(dea.delivery_date)) deal_date,
          cus.customer_code                                                  customer_code,
          dpt.product_type                                                   product_type,
          SUM(dea.est_total_deal)                                            amount
        FROM `sfr_sf_deal` dea
          LEFT JOIN `sfr_sf_user` usr ON usr.id = dea.sales_id
          LEFT JOIN `sfr_sf_customer` cus ON cus.id = dea.customer_id
          INNER JOIN sfr_sf_department d on d.department_code = r.department_code
          LEFT JOIN (SELECT
                       d.id,
                       MIN(CASE
                           WHEN p.product_type = 1
                             THEN 0
                           WHEN p.product_type = 0
                             THEN 1
                           ELSE p.product_type END) product_type
                     FROM `sfr_sf_deal` d
                       JOIN sfr_sf_deal_product dp ON dp.deal_id = d.id
                       JOIN sfr_sf_product p ON p.id = dp.product_id
                     GROUP BY d.id) dpt ON dpt.id = dea.id
        WHERE dea.delivery_date >= DATE_ADD(DATE(CONCAT(fYear, '-', sMonth, '-1')), INTERVAL 3 MONTH)
              AND dea.delivery_date < DATE_ADD(DATE(CONCAT(fYear, '-', eMonth, '-1')), INTERVAL 4 MONTH)
              AND dea.deal_status NOT IN (6, 7)
              AND dpt.product_type IS NOT NULL AND dea.delete_flag = 0
        GROUP BY usr.department_id, usr.id, deal_date, customer_code, product_type;
    END IF;
    /* 1.3 sum up deals */
    IF (summaryType = 1)
    THEN
      /* 1.3A ship deals only */
      ALTER TABLE tmpDealRaw
        RENAME tmpDeal;
    ELSE
      /* 1.3B.1 group deals */
      CREATE TEMPORARY TABLE tmpDeal
        ENGINE = MEMORY
          SELECT
            department_id,
            user_id,
            deal_date,
            customer_code,
            product_type,
            SUM(amount) amount
          FROM tmpDealRaw
          GROUP BY department_id, user_id, deal_date, customer_code, product_type;
    END IF;
    /* 1.4 drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpDealRaw;

    /* 2. filter by department and user */
    IF (departmentId = 0)
    THEN
      /* 2.1A select company deals, group deals by department */
      CREATE TEMPORARY TABLE tmpDeal2
        ENGINE = MEMORY
          SELECT
            department_id id,
            deal_date     deal_date,
            customer_code customer_code,
            product_type  product_type,
            SUM(amount)   amount
          FROM tmpDeal
          GROUP BY id, deal_date, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId = 0)
    THEN
      /* 2.1B select department deals, group by user */
      CREATE TEMPORARY TABLE tmpDeal2
        ENGINE = MEMORY
          SELECT
            user_id       id,
            deal_date     deal_date,
            customer_code customer_code,
            product_type  product_type,
            SUM(amount)   amount
          FROM tmpDeal
          WHERE department_id = departmentId
          GROUP BY id, deal_date, customer_code, product_type;
    END IF;
    IF (departmentId != 0 AND userId != 0)
    THEN
      /* 2.1C select user deals */
      CREATE TEMPORARY TABLE tmpDeal2
        ENGINE = MEMORY
          SELECT
            user_id       id,
            deal_date     deal_date,
            customer_code customer_code,
            product_type  product_type,
            SUM(amount)   amount
          FROM tmpDeal
          WHERE department_id = departmentId AND user_id = userId
          GROUP BY id, deal_date, customer_code, product_type;
    END IF;
    /* 2.2 drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpDeal;

    /* 3. filter by customer type */
    IF (customerType = 1)
    THEN
      /* 3.1A all customer */
      CREATE TEMPORARY TABLE tmpDeal3
        ENGINE = MEMORY
          SELECT
            id           id,
            deal_date    deal_date,
            product_type product_type,
            SUM(amount)  amount
          FROM tmpDeal2
          GROUP BY id, deal_date, product_type;
    ELSE
      /* 3.1B classify customer */
      /* 3.1B.1 create customer start table */
      CREATE TEMPORARY TABLE tmpCustomer
        ENGINE = MEMORY
          SELECT
            r.customer_code                                                         customer_code,
            IF(MONTH(r.first_date) < 4, YEAR(r.first_date) - 1, YEAR(r.first_date)) start_year
          FROM (
                 SELECT
                   denno_customer_code     customer_code,
                   MIN(invoice_sales_date) first_date
                 FROM sfr_sf_revenue
                 GROUP BY customer_code) r;
      /* 3.1B.2 classify customer */
      IF (customerType = 2)
      THEN
        /* 3.1B.2A old customer only */
        CREATE TEMPORARY TABLE tmpDeal3
          ENGINE = MEMORY
            SELECT
              td.id           id,
              td.deal_date    deal_date,
              td.product_type product_type,
              SUM(td.amount)  amount
            FROM tmpDeal2 td
              LEFT JOIN tmpCustomer tc ON tc.customer_code = td.customer_code
            WHERE tc.start_year < fYear
            GROUP BY id, deal_date, product_type;
      END IF;
      IF (customerType = 3)
      THEN
        /* 3.1B.2B new customer only */
        CREATE TEMPORARY TABLE tmpDeal3
          ENGINE = MEMORY
            SELECT
              td.id           id,
              td.deal_date    deal_date,
              td.product_type product_type,
              SUM(td.amount)  amount
            FROM tmpDeal2 td
              LEFT JOIN tmpCustomer tc ON tc.customer_code = td.customer_code
            WHERE tc.start_year IS NULL OR tc.start_year >= fYear
            GROUP BY id, deal_date, product_type;
      END IF;
    END IF;
    /* 3.2 drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpDeal2, tmpCustomer;

    /* 4. Select output data */
    SELECT
      id                   id,
      deal_date            deal_date,
      product_type         product_type,
      amount
    FROM tmpDeal3;

    /* 5 drop temporary table */
    DROP TEMPORARY TABLE IF EXISTS tmpDeal3;
  END;;
DELIMITER ;