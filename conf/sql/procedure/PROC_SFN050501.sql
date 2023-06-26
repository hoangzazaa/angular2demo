DROP PROCEDURE IF EXISTS `PROC_SFN050501`;

CREATE PROCEDURE `PROC_SFN050501`(IN `departmentId` INT, IN `userId` INT, IN `startDate` VARCHAR(10), IN `endDate` VARCHAR(10))
  BEGIN
    SELECT COUNT(DISTINCT sp.id) AS cnt
    FROM
      sfr_sf_shipping_plan sp
      JOIN sfr_sf_order_item oi ON oi.id = sp.order_item_id
      JOIN sfr_sf_order o ON o.id = oi.order_id
      JOIN sfr_sf_deal d ON d.id = o.deal_id
      JOIN sfr_sf_user u ON u.id = d.sales_id
    WHERE (departmentId = 0 OR u.department_id = departmentId)
          AND (userId = 0 OR u.id = userId)
          AND (NULLIF(startDate, '') IS NULL OR sp.shipping_date >= DATE(startDate))
          AND (NULLIF(endDate, '') IS NULL OR sp.shipping_date <= DATE(endDate));
  END;