DROP PROCEDURE IF EXISTS `PROC_SFN050502`;

CREATE PROCEDURE `PROC_SFN050502`(IN `departmentId` INT, IN `userId` INT, IN `startDate` VARCHAR(10), IN `endDate` VARCHAR(10))
  BEGIN
    SELECT
      sp.id                        AS planId,
      sp.shipping_date             AS planDate,
      c.customer_code              AS customerCode,
      c.NAME                       AS customerName,
      d.deal_code                  AS dealCode,
      p.product_code               AS productCode,
      p.product_name               AS productName,
      p.product_type               AS productType,
      p.shape_id                   AS productShapeId,
      sp.quantity                  AS planQuantity,
      COALESCE(SUM(i.quantity), 0) AS actualQuantity,
      cs.selectbox1                AS restriction,
      p.carton_shipping_type       AS cartonShippingType;
    FROM
      sfr_sf_shipping_plan sp
      JOIN sfr_sf_order_item oi ON oi.id = sp.order_item_id
      JOIN sfr_sf_order o ON o.id = oi.order_id
      JOIN sfr_sf_deal d ON d.id = o.deal_id
      JOIN sfr_sf_product p ON p.id = oi.product_id
      JOIN sfr_sf_customer c ON c.id = d.customer_id
      JOIN sfr_sf_user u ON u.id = d.sales_id
      LEFT JOIN sfr_sf_checksheet cs ON cs.deal_id = d.id AND cs.question_code = 1008
      LEFT JOIN sfr_sf_inventory i ON i.shipping_plan_id = sp.id AND i.inout_flag = 1
    WHERE (departmentId = 0 OR u.department_id = departmentId)
          AND (userId = 0 OR u.id = userId)
          AND (NULLIF(startDate, '') IS NULL OR sp.shipping_date >= DATE(startDate))
          AND (NULLIF(endDate, '') IS NULL OR sp.shipping_date <= DATE(endDate))
    GROUP BY
      sp.id
    ORDER BY
      sp.shipping_date DESC;
  END;