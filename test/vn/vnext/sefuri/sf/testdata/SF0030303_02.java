package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 24/03/2017.
 */
public class SF0030303_02 extends BaseData {
    public static final String GET_QUOTATION_INFO = "select quo.id from sfr_sf_quotation quo where quo.id = 9999";

    @Override
    String sqlUp() {
        return "DELETE FROM `sfr_sf_quotation_item` WHERE `quotation_id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                "INSERT INTO `sfr_sf_quotation` VALUES ('9999', '9999', null, '269', '269', '2017-03-15 10:01:34', '2017-03-15 10:01:46', null, '1', '20000', 'gfgfgd', 'dfgdg', '2017-03-15 13:52:02', '2017-03-10 16:16:56', null, null, 'dfg', 'fg', 'dfg', 'fgdg', null, null, null, '1', 'hihi', '17S09999', null, null, '0', null, '0', '0', '0', '0');" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';";
    }

    @Override
    String sqlDown() {
        return "";
    }
}
