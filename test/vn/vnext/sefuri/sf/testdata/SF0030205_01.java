package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 3/2/2017.
 */
public class SF0030205_01 extends BaseData {
    @Override
    String sqlUp() {
        return  "INSERT INTO `sfr_sf_product` VALUES ('888', '1', '2', '1', null, '5', '1', '1', '8', null, '1', '5', '34', '272', '2017-02-23 21:46:22', '2017-02-25 00:47:17', 'Check packing', '0', '', '', '', '100.0', '70.0', '80.0', '1100', '800', '550', '400', '188.0', '315.0', '8', '0', null, null, '1', null, '1', '2', '125', '58', '125', '58', '2', '700', '800', '2', '1', null, '10', null, null, null, '10', null, null, null, '456', '123', null, null, null, '2', null, null, null, null, null, '310', 'P000068', '', null, '0000-00-00 00:00:00', '', '1', null, '', '1101', '2', '', '1000', '2', '', '1000', '2', null, '', '30', '3', '1', '800', '550', null, '15', '0', '0', '315.0', '231.0', '10', '', '', '1', '1', '', '0', '0', null, '0', null, null);" +
                "INSERT INTO `sfr_sf_deal_product` VALUES ('79', '2', '888', '272', '272', '2017-03-01 17:20:39', '2017-03-01 17:20:39', '0', null)";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_product` WHERE `id` = '888'";
    }
}
