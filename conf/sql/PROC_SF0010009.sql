DROP PROCEDURE IF EXISTS PROC_SF0010009;

DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_SF0010009`(IN startDate VARCHAR(20), IN endDate VARCHAR(20))
  BEGIN
    SELECT sum(r.sales_amount)
    FROM sfr_sf_revenue r
      INNER JOIN sfr_sf_product p ON r.item_code = p.item_code and p.denno = '1'
      INNER JOIN sfr_sf_customer c ON r.denno_customer_code = c.customer_code
      INNER JOIN sfr_sf_user us ON us.user_code = r.sales_rep
      INNER JOIN sfr_sf_department d ON d.id = us.department_id
    WHERE
      p.print_method = '2'
      AND p.product_type = '0'
      AND d.sales_aggregate_flag = 1
      AND (DATE(r.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate));
  END;;
DELIMITER ;
