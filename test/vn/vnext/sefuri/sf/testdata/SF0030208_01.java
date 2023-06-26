package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 3/2/2017.
 */
public class SF0030208_01 extends BaseData {
    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_product_file` VALUES ('8888', '2017-03-02 18:16:23', '2017-03-02 18:32:10', '272', '272', null, '2game_28_4_NgocRongDaiChien_1.png', '28', '1010', 'update2', 'sogoku', 'QWEQWE', null, '0')";
    }

    @Override
    String sqlDown() {
        return "";
    }
}
