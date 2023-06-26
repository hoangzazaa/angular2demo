DROP PROCEDURE IF EXISTS PROC_SF0010005;

DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_SF0010005`(IN department INT, IN startDate VARCHAR(20), IN endDate VARCHAR(20))
	  BEGIN
				SELECT SUM(CASE WHEN hp_info = 0 THEN customers WHEN hp_info = 1 THEN customers/2 END) AS total
				FROM (
						SELECT count(c.id) customers, c.hp_info
						FROM sfr_sf_customer c
						INNER JOIN sfr_sf_user u ON u.user_code = c.pic_code
						INNER JOIN sfr_sf_department d ON u.department_id = d.id
						WHERE (department = 0 OR u.department_id = department)
						AND (DATE(c.first_registration_date) BETWEEN DATE(startDate) AND DATE(endDate))
						AND d.sales_aggregate_flag = 1
						GROUP BY c.hp_info
				) re;
	  END;;
DELIMITER ;
