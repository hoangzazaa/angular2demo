DROP PROCEDURE IF EXISTS PROC_SF0010004;

DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_SF0010004`(IN department INT, IN startDate VARCHAR(20), IN endDate VARCHAR(20))
    BEGIN
        SELECT sum(r2.sales_amount)
        FROM (
            SELECT sales_amount AS sales_amount
            FROM (
                SELECT
                    r.denno_customer_code             customer_code,
                    MONTH(r.invoice_sales_date)       month,
                    SUM(r.sales_amount) sales_amount,
                    c.hp_info                         hp_info
                FROM `sfr_sf_revenue` r
                INNER JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
                INNER JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
                INNER JOIN `sfr_sf_department` d ON u.department_id = d.id
                WHERE (department = 0 OR u.department_id = department)
                AND d.sales_aggregate_flag = 1
                AND (DATE(r.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
                AND (DATE(c.first_registration_date) BETWEEN DATE(startDate) AND DATE(endDate))
                GROUP BY customer_code, month
            ) r1
        ) r2;
    END;;
DELIMITER ;
