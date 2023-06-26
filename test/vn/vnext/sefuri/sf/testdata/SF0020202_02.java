package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 08/03/2017.
 */
public class SF0020202_02 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_USER_INFO = "select us.id from sfr_sf_user us where us.id = 9999";
    public static final String GET_MYBOX_INFO = "select mybox.id from sfr_sf_mybox_item mybox where mybox.id = 9999";

    @Override
    String sqlUp() {

        return "DELETE FROM `sfr_sf_quotation_item` WHERE `deal_product_id` IN (SELECT id FROM `sfr_sf_deal_product` WHERE `deal_id`='9999');" +
                "DELETE FROM `sfr_sf_offer` WHERE `product_output_id` IN (SELECT id FROM `sfr_sf_product_output` WHERE `deal_product_id` IN (SELECT id FROM `sfr_sf_deal_product` WHERE `deal_id`='9999'));" +
                "DELETE FROM `sfr_sf_product_output` WHERE `deal_product_id` IN (SELECT id FROM `sfr_sf_deal_product` WHERE `deal_id`='9999');" +
                "DELETE From `sfr_sf_deal_product` WHERE `deal_id`='9999';" +
                "DELETE FROM `sfr_sf_mybox_item` WHERE `deal_id`='9999';" +
                "DELETE FROM `sfr_sf_quotation_item` WHERE `quotation_id` IN (SELECT id FROM `sfr_sf_quotation` WHERE `deal_id`='9999');" +
                "DELETE FROM `sfr_sf_quotation` WHERE `deal_id`='9999';" +
                "DELETE FROM `sfr_sf_comment` WHERE `deal_id`='9999';" +
                "DELETE FROM `sfr_sf_deal_file` WHERE `deal_id`='9999';" +
                "DELETE FROM `sfr_sf_checksheet` WHERE `deal_id` = '9999';" +
                "DELETE FROM `sfr_sf_order_item` WHERE `order_id` IN (SELECT id FROM `sfr_sf_order` WHERE `deal_id` = '9999');" +
                "DELETE FROM `sfr_sf_order` WHERE `deal_id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id`='9999';" +
//                "DELETE FROM `sfr_sf_user_password_recover` WHERE `user_id`='9999';" +
//                "DELETE FROM `sfr_sf_comment` WHERE `user_id`='9999';" +
               // "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
               // "INSERT INTO `sfr_sf_deal` VALUES ('9999', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', '1', '123', '1', '8', '1', 'TMP000999', '1', '2017-02-23 17:09:07', '0', '0');" +
                "INSERT INTO `sfr_sf_deal`(`id`,`created_date`,`updated_date`,`delete_flag`,`template_flag`) VALUES ('9999', '2017-02-27 18:13:14', '2017-02-27 18:13:14','0', '0');" +
                // "INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', null, 'G43', 'EE05');" +
                //"INSERT INTO `sfr_sf_mybox_item` VALUES ('272', '37', '2017-02-27 09:54:37', '2017-02-27 09:54:37', '9999', '9999', '272', '1');";
                "INSERT INTO `sfr_sf_mybox_item` (`id`,`created_date`,`updated_date`,`type`,`deal_id`,`user_id`) VALUES ('9999','2017-02-27 09:54:37', '2017-02-27 09:54:37', '1', '9999', '272')";

    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_mybox_item` WHERE `deal_id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999'";

    }
}
