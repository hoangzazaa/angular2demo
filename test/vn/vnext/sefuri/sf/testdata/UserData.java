package vn.vnext.sefuri.sf.testdata;

/**
 * Created by haipt on 10/21/2016.
 */
public class UserData extends BaseData {

    @Override
    String sqlUp() {
        return "INSERT INTO `sfr_sf_user` (`password`, `role`, `username`, `email`, `enable_flag`, created_date, updated_date, created_user, updated_user) " +
                "VALUES " +
                "('aa3e2f4b2066d9fb330afd846213a51e', '1', 'testuser', 'test@test.com', 1, NOW(), NOW(), 1, 1);";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_user` WHERE `username` = 'testuser';";
    }
}
