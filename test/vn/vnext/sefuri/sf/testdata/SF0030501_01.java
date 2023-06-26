package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 22/03/2017.
 */
public class SF0030501_01 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id, deal.deal_name from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_CUSTOMER_INFO = "select cus.id, cus.name from sfr_sf_customer cus where cus.id = 9999";
    public static final String GET_QUOTATION_INFO = "select qt.id, qt.memo from sfr_sf_quotation qt where qt.id = 9999";
    public static final String GET_QUOTATION_PRINT_TEMPLATE_INFO = "select qpt.id, qpt.application from sfr_sf_quotation_print_template qpt where qpt.id = 9999";
    public static final String GET_USER_INFO = "select us.id, us.username from sfr_sf_user us where us.id = 9999";
    public static final String GET_QUOTATION_ITEM_INFO = "select qi.id, qi.name from sfr_sf_quotation_item qi where qi.id = 9999";


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
                        "DELETE FROM `sfr_sf_deal` WHERE `id`='9999';" +
                        "DELETE FROM `sfr_sf_user_password_recover` WHERE `user_id`='9999';" +
                        "DELETE FROM `sfr_sf_comment` WHERE `user_id`='9999';" +
                        "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_shipping_destination` WHERE `customer_id`='9999';" +
                        "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +

                        "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation_print_template` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +

                        "INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                        "INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', '4', 'G43', 'EE05');" +
                        "INSERT INTO `sfr_sf_deal` VALUES ('9999', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', '9999', '123', '1', null, 9999, '17S09999', '1', '2017-02-23 17:09:07', '0', '1');" +
                        "INSERT INTO `sfr_sf_quotation_print_template` VALUES ('9999', null, null, '2017-03-01 17:07:32', '2017-03-01 17:07:32', '1', 'EstimateJasper', 'EstimateJasper', 'abc');" +
                        "INSERT INTO `sfr_sf_quotation` VALUES ('9999', '9999', '9999', '269', '269', '2017-03-15 10:01:34', '2017-03-15 10:01:46', null, '1', '20000', 'gfgfgd', 'dfgdg', '2017-03-15 13:52:02', '2017-03-10 16:16:56', null, null, 'dfg', 'fg', 'dfg', 'fgdg', null, null, null, '1', 'hihi', '17S09999-M9999', null, null, '0', null, '0', '0', '0', '0');" +
                        "INSERT INTO `sfr_sf_quotation_item` VALUES ('9999', '9999', null, '1', '1', '3', 'Quotation53', '1', '0', '10000', '0', '4', null, '272', '272', '2017-02-28 13:27:17', '2017-02-28 13:27:17', null, null, null, null, null, null)";
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
