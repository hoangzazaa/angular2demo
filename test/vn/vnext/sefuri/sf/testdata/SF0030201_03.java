package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 3/2/2017.
 */
public class SF0030201_03 extends BaseData{
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_deal` VALUES ('998', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', '1', '123', '1', '8', '1', 'TMP01001', '1', '2017-02-23 17:09:07', '0', '1');" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '998'";
    }

    @Override
    String sqlDown() {
        return "";
    }
}
