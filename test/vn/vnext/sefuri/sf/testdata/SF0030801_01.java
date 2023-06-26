package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 20/03/2017.
 */
public class SF0030801_01 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id, deal.deal_name from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_CUSTOMER_INFO = "select cus.id, cus.name from sfr_sf_customer cus where cus.id = 9999";
    public static final String GET_CHECKSHEET_INFO = "select cs.id, cs.question_code from sfr_sf_checksheet cs where cs.id = 9999";
    public static final String GET_DEPARTMENT_INFO = "select dp.id, dp.department from sfr_sf_department dp where dp.id = 9999";
    public static final String GET_USER_INFO = "select us.id, us.username from sfr_sf_user us where us.id = 9999";

    @Override
    String sqlUp() {
        return
                "DELETE FROM `sfr_sf_quotation_item` WHERE `deal_product_id` IN (SELECT id FROM `sfr_sf_deal_product` WHERE `deal_id`='9999');" +
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
                        "DELETE FROM `sfr_sf_mybox_item` WHERE `deal_id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id`='9999';"+
                        "INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                        "INSERT INTO `sfr_sf_deal` VALUES ('9999', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', '9999', '123', '1', '8', 9999, 'TMP000999', '1', '2017-02-23 17:09:07', '0', '1');" +
                        "INSERT INTO `sfr_sf_department` VALUES ('9999', '2017-01-05 15:00:51', '2017-01-05 15:00:51', null, null, '福岡支店', 'EE03', '1', '福岡県福岡市中央区博多駅前３−１３−１', '092-482-8885', '092-481-0085', null, '812-0008');" +
                        "INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', '9999', 'G43', 'EE05');" +
                        "INSERT INTO `sfr_sf_checksheet` VALUES ('9999', '9999', '2017-03-21 14:55:20', '2017-03-22 08:18:25', '268', '272', '1005', null, null, '1', null, null, null, null, null, null, null, null)";
    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_checksheet` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_department` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999'";
    }
}
