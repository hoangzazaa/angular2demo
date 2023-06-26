package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 2/18/2017.
 */
public class SF0050305 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_customer_goal` VALUES ('998', '2017-02-17 10:29:22', '2017-02-17 10:29:22', '37', '37', '2017', 'test add', '1', '2');" +
                "INSERT INTO `sfr_sf_customer_goal` VALUES ('999', '2017-02-17 10:29:22', '2017-02-17 10:29:22', '37', '37', '2017', 'test add', '1', '2');" +
                "INSERT INTO `sfr_sf_revenue` VALUES ('999998', '2015-01-10 00:00:00', '2015-01-10 00:00:00', '196', '196', '264996', '15T00567', '16901', '2016-06-01 00:00:00', '2015-01-09 00:00:00', '11', '238', 'EE02', 'G54', '34.00', '7.00', null, '2310550', '９２００２キムチ鍋７５０ＳＰ　中板', '0');" +
                "INSERT INTO `sfr_sf_revenue` VALUES ('999999', '2015-01-10 00:00:00', '2015-01-10 00:00:00', '196', '196', '264996', '15T00567', '16901', '2017-06-01 00:00:00', '2015-01-09 00:00:00', '11', '238', 'EE02', 'G54', '34.00', '7.00', null, '2310550', '９２００２キムチ鍋７５０ＳＰ　中板', '0');" +
                "INSERT INTO `sfr_sf_revenue` VALUES ('999997', '2015-01-10 00:00:00', '2015-01-10 00:00:00', '196', '196', '264996', '15T00567', '16901', '2017-06-01 00:00:00', '2015-01-09 00:00:00', '11', '238', 'EE02', 'G54', '34.00', '7.00', null, '2310550', '９２００２キムチ鍋７５０ＳＰ　中板', '0')" ;

    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_customer_goal` WHERE id ='998';" +
                "DELETE FROM `sfr_sf_customer_goal` WHERE id ='999';" +
                "DELETE FROM `sfr_sf_revenue` WHERE id ='999998';" +
                "DELETE FROM `sfr_sf_revenue` WHERE id ='999999';" +
                "DELETE FROM `sfr_sf_revenue` WHERE id ='999997'";
    }
}
