package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 2/18/2017.
 */
public class SF0050304_02 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_customer_goal` VALUES ('4', '2017-02-17 10:29:22', '2017-02-17 10:29:22', '37', '37', '2018', 'test add', '1', '1');" +
                "DELETE FROM `sfr_sf_customer_goal` WHERE `id` ='4'";
    }

    @Override
    String sqlDown() {
        return "";
    }
}