package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 22/03/2017.
 */
public class SF0030501_02 extends BaseData {
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

                        "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation_print_template` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +

                        "INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                        "INSERT INTO `sfr_sf_deal` VALUES ('9999', '8', '8', '2017-02-23 17:08:19', '2017-02-23 17:08:22', 'deal name', '9999', '123', '1', '8', 9999, '17S09999', '1', '2017-02-23 17:09:07', '0', '1');" +
                        "INSERT INTO `sfr_sf_quotation_print_template` VALUES ('9999', null, null, '2017-03-01 17:07:32', '2017-03-01 17:07:32', '1', 'EstimateJasper', 'EstimateJasper', 'abc')";


    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_quotation_print_template` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999'";
    }
}
