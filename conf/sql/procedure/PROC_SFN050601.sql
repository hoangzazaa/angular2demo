DROP PROCEDURE IF EXISTS `PROC_SFN050601`;

CREATE PROCEDURE `PROC_SFN050601`(IN `departmentId` INT, IN `userId` INT, IN `startDate` VARCHAR(10), IN `endDate` VARCHAR(10), IN `dateType` INT,
                                  IN `method`       INT)
  BEGIN
    SELECT COUNT(i.id) AS cnt
    FROM
      sfr_sf_invoice i
      JOIN sfr_sf_customer c ON c.customer_code = i.customer_code
      JOIN sfr_sf_user u ON u.user_code = c.pic_code
    WHERE (departmentId = 0 OR u.department_id = departmentId)
          AND (userId = 0 OR u.id = userId)
          AND (
            (
              dateType = 1
              AND (NULLIF(startDate, '') IS NULL OR i.billing_date >= DATE(startDate))
              AND (NULLIF(endDate, '') IS NULL OR i.billing_date <= DATE(endDate))
            ) OR (
              dateType = 2
              AND (NULLIF(startDate, '') IS NULL OR i.payment_date >= DATE(startDate))
              AND (NULLIF(endDate, '') IS NULL OR i.payment_date <= DATE(endDate))
            )
          )
          AND (
            method = 0
            OR (method = 1 AND i.method = '現金')
            OR (method = 2 AND i.method = '手形')
            OR (method = 3 AND i.method = '小切手')
            OR (method = 4 AND i.method = '当座振込')
            OR (method = 5 AND i.method = '普通振込')
          );
  END;