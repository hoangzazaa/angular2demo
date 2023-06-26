-- This procedure gets data from revenue to display in SF00503
DROP PROCEDURE IF EXISTS PROC_SF0050301;

CREATE PROCEDURE PROC_SF0050301(IN startDate VARCHAR(20), IN endDate VARCHAR(20), IN agentId INT)
  BEGIN
    SELECT
      year,
      month,
      product_type,
      SUM(sales_amount)
    FROM (
           SELECT
             YEAR(r.invoice_sales_date)        year,
             MONTH(r.invoice_sales_date)       month,
             r.denno_customer_code             customer_code,
             r.product_type                    product_type,
             SUM(r.sales_amount) sales_amount
           FROM `sfr_sf_revenue` r
             INNER JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
             INNER JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
           WHERE (DATE(r.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
                 AND u.department_id = agentId
                 AND r.product_type IS NOT NULL
           GROUP BY year, month, r.product_type, r.denno_customer_code
         ) tmp
    GROUP BY year, month, product_type;
  END