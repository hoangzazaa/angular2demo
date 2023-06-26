DROP PROCEDURE IF EXISTS `PROC_SFN040201`;

CREATE PROCEDURE `PROC_SFN040201`(IN `customerCode` VARCHAR(20), IN `fYear` INT)
  BEGIN
    DECLARE startRevenueDate, endRevenueDate DATE;
    /* 1. calculate start/end date */
    SET startRevenueDate = DATE(CONCAT(fYear, '-04-01'));
    SET endRevenueDate = DATE(CONCAT(fYear + 1, '-04-01'));
    /* 2. query revenue */
    SELECT
      r.product_type                    AS type,
      MONTH(r.invoice_sales_date)       AS month,
      SUM(r.sales_amount) AS amount
    FROM
      sfr_sf_revenue r
    WHERE r.product_type IS NOT NULL
      AND r.denno_customer_code = customerCode
      AND r.invoice_sales_date >= startRevenueDate
      AND r.invoice_sales_date < endRevenueDate
    GROUP BY
      r.product_type,
      MONTH(r.invoice_sales_date);

  END