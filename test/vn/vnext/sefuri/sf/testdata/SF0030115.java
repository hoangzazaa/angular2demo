package vn.vnext.sefuri.sf.testdata;

/**
 * Created by DungTQ on 11/18/2016.
 */
public class SF0030115 extends BaseData {
    public static final String GET_MYBOX_INFO = "select mybox.id from sfr_sf_mybox_item mybox where mybox.id = 9999";
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";

    @Override
    String sqlUp() {

        return "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "INSERT INTO `sfr_sf_deal` VALUES ('9999', null, null, '2017-02-27 18:13:14', '2017-02-27 18:13:14', '新クリスプチョコ 16カートン５種セット', '188', '680000', '0', null, null, 'TMP000999', '1', '2017-11-04 00:00:00', '0', '0');" +
                "INSERT INTO `sfr_sf_mybox_item` VALUES ('272', '37', '2017-02-27 09:54:37', '2017-02-27 09:54:37', '9999', '9999', '272', '1')"
                ;
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999'"
                ;
    }
}
