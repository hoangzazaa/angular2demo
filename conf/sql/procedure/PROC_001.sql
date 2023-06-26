DROP PROCEDURE IF EXISTS `PROC_001`;

CREATE PROCEDURE `PROC_001`(IN sYear INT, IN sMonth INT, IN departmentId INT)
  BEGIN
    SELECT
      year,
      month,
      customer_id,
      SUM(IF(product_type = 0, revenue, 0)) AS revenue1,
      SUM(IF(product_type = 1, revenue, 0)) AS revenue2,
      SUM(IF(product_type = 2, revenue, 0)) AS revenue3
    FROM (
           SELECT
             YEAR(rvn.invoice_sales_date)        year,
             MONTH(rvn.invoice_sales_date)       month,
             rvn.product_type                    product_type,
             cus.id                              customer_id,
             SUM(rvn.sales_amount) revenue
           FROM
             `sfr_sf_revenue` rvn
             INNER JOIN sfr_sf_customer cus on cus.customer_code = rvn.denno_customer_code
             INNER JOIN sfr_sf_department d on d.department_code = rvn.department_code
           WHERE d.id = departmentId AND rvn.product_type IS NOT NULL
                 AND rvn.invoice_sales_date >= DATE(CONCAT(sYear, '-', sMonth, '-1'))
           GROUP BY year, month, customer_id, product_type) tmpTbl
    GROUP BY year, month, customer_id WITH ROLLUP
    HAVING customer_id IS NOT NULL;
  END