package vn.vnext.sefuri.sf.testdata;

/**
 * Created by username on 2/10/2017.
 */
public class SF0080102_04 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_drawing_image` VALUES ('5001', '2017-02-10 08:38:16', '2017-02-10 08:38:16', '1', null, '110', '110', null, '2');" +
                "DELETE FROM `sfr_sf_product_file` WHERE `product_id` = '5'";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_drawing_image` WHERE `id` ='5001'";
    }
}
