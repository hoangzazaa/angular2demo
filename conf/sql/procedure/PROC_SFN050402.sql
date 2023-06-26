DROP PROCEDURE IF EXISTS `PROC_SFN050402`;

CREATE PROCEDURE `PROC_SFN050402`(IN `departmentId` INT, IN `userId` INT, IN `limitDay` INT, IN `storageType` INT)
  BEGIN
    SELECT
      i.id                                     AS id,
      oi.deposit                               AS type,
      c.name                                   AS customerName,
      c.customer_code                          AS customerCode,
      d.deal_code                              AS dealCode,
      p.product_code                           AS productCode,
      p.product_name                           AS productName,
      p.product_type                           AS productType,
      p.shape_id                               AS productShapeId,
      i.quantity                               AS quantity,
      oi.submitted_price                       AS unitPrice,
      i.registration_date                      AS manufactureDate,
      DATEDIFF(NOW(), i.registration_date) + 1 AS storageDays,
      p.carton_shipping_type                   AS cartonShippingType
    FROM
      sfr_sf_inventory i
      JOIN sfr_sf_order_item oi ON oi.id = i.order_item_id
      JOIN sfr_sf_order o ON o.id = oi.order_id
      JOIN sfr_sf_deal d ON d.id = o.deal_id
      JOIN sfr_sf_product p ON p.id = oi.product_id
      JOIN sfr_sf_customer c ON c.id = d.customer_id
      JOIN sfr_sf_user u ON u.id = d.sales_id
    WHERE i.inout_flag = 0 AND i.complete_flag = 0
          AND (departmentId = 0 OR u.department_id = departmentId)
          AND (userId = 0 OR u.id = userId)
          AND (limitDay = 0 OR DATEDIFF(NOW(), i.registration_date) + 1 > limitDay)
          AND (storageType = 0 OR (storageType = 1 AND oi.deposit IS NULL) OR (storageType = 2 AND oi.deposit = 1))
    GROUP BY
      i.id
    ORDER BY
      i.registration_date ASC, i.quantity DESC;
  END;