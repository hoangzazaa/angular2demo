DROP PROCEDURE IF EXISTS `PROC_SFN050401`;

CREATE PROCEDURE `PROC_SFN050401`(IN `departmentId` INT, IN `userId` INT, IN `limitDay` INT, IN `storageType` INT)
  BEGIN
    SELECT COUNT(DISTINCT i.id) AS cnt
    FROM
      sfr_sf_inventory i
      JOIN sfr_sf_order_item oi ON oi.id = i.order_item_id
      JOIN sfr_sf_order o ON o.id = oi.order_id
      JOIN sfr_sf_deal d ON d.id = o.deal_id
      JOIN sfr_sf_user u ON u.id = d.sales_id
    WHERE i.inout_flag = 0 AND i.complete_flag = 0
          AND (departmentId = 0 OR u.department_id = departmentId)
          AND (userId = 0 OR u.id = userId)
          AND (limitDay = 0 OR DATEDIFF(NOW(), i.registration_date) + 1 > limitDay)
          AND (storageType = 0 OR (storageType = 1 AND oi.deposit IS NULL) OR (storageType = 2 AND oi.deposit = 1));
  END;