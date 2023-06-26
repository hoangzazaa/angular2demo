DELIMITER ;;
CREATE DEFINER=`sgsk_production`@`%` PROCEDURE `PROC_004`(IN fYear INT, IN sfMonth INT, IN efMonth INT, IN departmentId INT, IN userId INT, IN customerType INT)
BEGIN
    /* 1. query by year and agent, convert month to financial month */
    IF (departmentId = 0 || userId = 0)
    THEN
      CREATE TEMPORARY TABLE tmpGoal AS
        SELECT
          dgi.month                                       month,
          IF(dgi.month < 4, dgi.month + 9, dgi.month - 3) fMonth,
          dgi.customer_type                               customer_type,
          SUM(dgi.goal)                                   goal,
          dg.created_user                                 created_user
        FROM sfr_sf_department_goal dg
          INNER JOIN sfr_sf_department d on d.id = dg.department_id
          LEFT JOIN sfr_sf_department_goal_item dgi ON dgi.department_goal_id = dg.id
        WHERE dg.year = fYear
              AND (departmentId = 0 OR dg.department_id = departmentId)
              AND d.sales_aggregate_flag = 1
        GROUP BY month, customer_type, dg.created_user;
    END IF;
    IF (userId != 0)
    THEN
      CREATE TEMPORARY TABLE tmpGoal AS
        SELECT
          cgi.month                                       month,
          IF(cgi.month < 4, cgi.month + 9, cgi.month - 3) fMonth,
          cgi.customer_type                               customer_type,
          SUM(cgi.goal)                                   goal,
          ctg.created_user                                created_user
        FROM sfr_sf_customer_goal ctg
          LEFT JOIN sfr_sf_customer_goal_item cgi ON cgi.customer_goal_id = ctg.id
        WHERE cgi.type IS NOT NULL
              AND ctg.year = fYear
              AND ctg.department_id = departmentId
              AND ctg.pic_id = userId
        GROUP BY month, customer_type, ctg.created_user;
    END IF;

    /* 2. filter by month and customer type */
    IF (customerType = 1)
    THEN
      /* 2.1A all customer*/
      SELECT
        month,
        SUM(goal)
      FROM tmpGoal
      WHERE fMonth >= sfMonth AND fMonth <= efMonth
      GROUP BY month;
    END IF;
    IF (customerType = 2)
    THEN
      /* 2.1B old customer*/
      SELECT
        month,
        SUM(goal)
      FROM tmpGoal
      WHERE fMonth >= sfMonth AND fMonth <= efMonth
            AND (customer_type = 0 OR (customer_type = 1 AND created_user = 272))
      GROUP BY month;
    END IF;
    IF (customerType = 3)
    THEN
      /* 2.1C new customer*/
      SELECT
        month,
        SUM(goal)
      FROM tmpGoal
      WHERE fMonth >= sfMonth AND fMonth <= efMonth
            AND created_user != 272
            AND customer_type = 1
      GROUP BY month;
    END IF;
    /* 3. Drop temp tables*/
    DROP TEMPORARY TABLE IF EXISTS tmpGoal;
  END;;
DELIMITER ;