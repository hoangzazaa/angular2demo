package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 3/2/2017.
 */
public class SF0030201_01 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_deal` VALUES ('999', null, null, '2017-02-27 18:13:14', '2017-02-27 18:13:14', '新クリスプチョコ 16カートン５種セット', '188', '680000', '0', null, '593', 'TMP00001', '0', '2017-11-04 00:00:00', '0', '1');" +
                "INSERT INTO `sfr_sf_product` VALUES ('999', null, '5', '1', null, '6', null, '9', null, null, '1', null, '34', '32', '2017-02-13 21:40:58', '2017-02-24 18:06:12', '子供サプリ90粒様ケース', '0', '', '', '', '35.0', '70.0', '150.0', '740', '640', '740', '640', '164.0', '171.0', '16', '1', null, null, '1', null, '1', '1', '125', '58', '125', '58', null, null, null, '16', '0', null, '1', '1', null, null, '1', '1', null, null, null, null, null, null, null, '1', null, null, null, null, null, '270', 'P000999', '', null, '0000-00-00 00:00:00', '', '0', null, '', null, '1', '', null, '1', '', null, '1', null, '', null, '13', '1', '800', '550', null, '20', '0', '0', '455.0', '171.0', '10', '', '', '1', '0', '', '0', '0', null, '0', null, null);" +
                "INSERT INTO `sfr_sf_deal_product` VALUES ('999', '999', '999', '34', '34', '2017-02-13 19:55:53', '2017-02-13 19:55:53', '0', '1')";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '999';" +
                "DELETE FROM `sfr_sf_product` WHERE `id` = '999'";
    }
}
