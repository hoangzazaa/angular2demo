DROP PROCEDURE IF EXISTS PROC_SF0010006;

DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_SF0010006`(IN picId INT, IN startDate VARCHAR(20), IN endDate VARCHAR(20))
		BEGIN
				SELECT SUM(CASE WHEN hp_info = 0 THEN customers WHEN hp_info = 1 THEN customers/2 END) AS total
				FROM (
						SELECT count(c.id) customers, c.hp_info
						FROM sfr_sf_customer c
						INNER JOIN sfr_sf_user u ON u.user_code = c.pic_code
						WHERE u.id = picId
						AND (DATE(c.first_registration_date) BETWEEN DATE(startDate) AND DATE(endDate))
						GROUP BY c.hp_info
				) re;
		END;;
DELIMITER ;
