package vn.vnext.sefuri.sf.testdata;

/**
 * Created by username on 2/10/2017.
 */
public class SF0050303_02 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_customer_goal` VALUES ('5000', '2017-02-16 17:04:41', '2017-02-17 10:28:00', '1', '1', '2017', 'abc', '1', '1');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5000', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '1', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5001', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '2', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5002', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '3', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5003', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '4', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5004', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '5', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5005', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '6', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5006', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '7', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5007', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '8', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5008', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '9', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5009', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '10', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5010', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '11', '0');" +
                "INSERT INTO `sfr_sf_customer_goal_item` VALUES ('5011', '2017-02-16 17:04:41', '2017-02-17 10:28:02', '1', '1', '0', '77777', '5000', '12', '0');";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5000';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5001';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5002';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5003';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5004';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5005';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5006';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5007';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5008';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5009';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5010';" +
                "DELETE FROM `sfr_sf_customer_goal_item` WHERE `id` ='5011';" +
                "DELETE FROM `sfr_sf_customer_goal` WHERE `id` ='5000';";
    }
}
