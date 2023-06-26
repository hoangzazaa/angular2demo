DROP PROCEDURE IF EXISTS PROC_SF0010001;

-- procedure for chart 1 - all customer
CREATE PROCEDURE PROC_SF0010001(IN picId INT, IN startDate VARCHAR(20), IN endDate VARCHAR(20))
  BEGIN
    SELECT sum(re.sales_amount)
    FROM (
           SELECT
             YEAR(rvn.invoice_sales_date)        year,
             MONTH(rvn.invoice_sales_date)       month,
             rvn.product_type                    product_type,
             cus.id                              customer_id,
             SUM(rvn.sales_amount) sales_amount
           FROM
             `sfr_sf_revenue` rvn
             INNER JOIN `sfr_sf_customer` cus ON rvn.denno_customer_code = cus.customer_code
             INNER JOIN `sfr_sf_user` usr ON usr.user_code = cus.pic_code
           WHERE usr.id = picId
                 AND rvn.product_type IS NOT NULL
                 AND (DATE(rvn.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
           GROUP BY year, month, customer_id, product_type

         ) re;
  END