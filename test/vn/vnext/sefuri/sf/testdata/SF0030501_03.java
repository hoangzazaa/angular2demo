package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 22/03/2017.
 */
public class SF0030501_03 extends BaseData {
    @Override
    String sqlUp() {
        return "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_print_template` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +
                "INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                "INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', '4', 'G43', 'EE05');" +
                "INSERT INTO `sfr_sf_deal` VALUES ('9999', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', null, '123', '1', null, null, '17S09999', '1', '2017-02-23 17:09:07', '0', '1');" +
                "INSERT INTO `sfr_sf_quotation_print_template` VALUES ('9999', null, null, '2017-03-01 17:07:32', '2017-03-01 17:07:32', '1', 'EstimateJasper', 'EstimateJasper', 'abc');" +
                "INSERT INTO `sfr_sf_quotation` VALUES ('9999', '9999', null, '269', '269', '2017-03-15 10:01:34', '2017-03-15 10:01:46', null, '1', '20000', 'gfgfgd', 'dfgdg', '2017-03-15 13:52:02', null, null, null, 'dfg', 'fg', null, 'fgdg', null, null, null, '1', 'hihi', '17S09999-M9999', null, null, '0', null, '0', '0', '0', '0');" +
                "INSERT INTO `sfr_sf_quotation_item` VALUES ('9999', '9999', null, '1', '1', '3', 'Product53', '1', '0', '10000', '0', '4', null, '272', '272', '2017-02-28 13:27:17', '2017-02-28 13:27:17', null, null, null, null, null, null)";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_print_template` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999'";
    }
}
