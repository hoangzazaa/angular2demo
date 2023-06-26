DROP PROCEDURE IF EXISTS PROC_SF0010002;

DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_SF0010002`(IN picId VARCHAR(20), IN startDate VARCHAR(20), IN endDate VARCHAR(20))
    BEGIN
        SELECT sum(r2.sales_amount)
        FROM (
            SELECT CASE
                WHEN r1.hp_info = 1
                THEN r1.sales_amount / 2
                ELSE sales_amount END AS sales_amount
            FROM (
                SELECT
                    r.denno_customer_code as customer_code,
                    MONTH(r.invoice_sales_date) as month,
                    SUM(r.sales_amount) as sales_amount,
                    c.hp_info as hp_info
                FROM `sfr_sf_revenue` r
                INNER JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
                INNER JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
                WHERE u.id = picId
                AND (DATE(r.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
                AND (DATE(c.first_registration_date) BETWEEN DATE(startDate) AND DATE(endDate))
                GROUP BY customer_code, month
            ) r1
        ) r2;
    END;;
DELIMITER ;
