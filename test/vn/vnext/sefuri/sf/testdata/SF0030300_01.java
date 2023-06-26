package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 24/03/2017.
 */
public class SF0030300_01 extends BaseData {
    public static final String GET_QUOTATION_INFO = "select quo.id from sfr_sf_quotation quo where quo.id = 9999";
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_PRODUCT_INFO = "select pro.id from sfr_sf_product pro where pro.id = 9999";
    public static final String GET_USER_INFO = "select us.id from sfr_sf_user us where us.id = 9999";
    public static final String GET_DEPARTMENT_INFO = "select dep.id from sfr_sf_department dep where dep.id = 9999";
    public static final String GET_QUOTATION_ITEM_INFO = "select qi.id from sfr_sf_quotation_item qi where qi.id = 9999";
    public static final String GET_OFFER_INFO = "select off.id from sfr_sf_offer off where off.id = 9999";
    public static final String GET_PRODUCT_OUTPUT_INFO = "select po.id from sfr_sf_product_output po where po.id = 9999";
    public static final String GET_DEAL_PRODUCT_INFO = "select dp.id from sfr_sf_deal_product dp where dp.id = 9999";
    public static final String GET_PRODUCT_COMMON_FEE_INFO = "select pcf.id from sfr_sf_product_common_fee pcf where pcf.id = 9999";
    public static final String GET_CUSTOMER_INFO = "select cus.id  from sfr_sf_customer cus where cus.id = 9999";

    @Override
    String sqlUp() {
        return
                //Delete deal=9999
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
                        "DELETE FROM `sfr_sf_current_stock` WHERE `id` = '9999';" +
                        //Delete Product=9999
                        "DELETE FROM `sfr_sf_drawing_image` WHERE `product_id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_file` WHERE `product_id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `product_id` = '9999';" +

                        "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_department` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_offer` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_output` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_common_fee` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +
                        "INSERT INTO `sfr_sf_department` VALUES ('9999', '2017-01-05 15:00:51', '2017-01-05 15:00:51', null, null, '福岡支店', 'EE03', '1', '福岡県福岡市中央区博多駅前３−１３−１', '092-482-8885', '092-481-0085', null, '812-0008');" +

                        //"INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', '9999', 'G43', 'EE05');" +
                        "INSERT INTO `sfr_sf_user`(`id`,`created_date`,`updated_date`,`username`,`password`,`enable_flag`,`role`,`delete_flag`) VALUES ('9999', '2017-02-27 18:13:14', '2017-02-27 18:13:14','ABCXYZ', '123456','1','2','0');" +

                        //"INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                        "INSERT INTO `sfr_sf_customer`(`id`,`created_date`,`updated_date`,`delete_flag`,`customer_code`,`name`) VALUES ('9999', '2017-02-27 18:13:14', '2017-02-27 18:13:14','0', '0009999','sdfsd');" +

                        // "INSERT INTO `sfr_sf_deal` VALUES ('9999', null, null, '2017-02-27 18:13:14', '2017-02-27 18:13:14', '新クリスプチョコ 16カートン５種セット', '9999', '680000', '0', null, '9999', 'TMP000999', '1', '2017-11-04 00:00:00', '0', '0');" +
                        "INSERT INTO `sfr_sf_deal`(`id`,`created_date`,`updated_date`,`delete_flag`,`template_flag`,`customer_id`,`sales_id`,`deal_code`) VALUES ('9999', '2017-02-27 18:13:14', '2017-02-27 18:13:14','0', '0','9999','9999','TMP000999');" +

                        //"INSERT INTO `sfr_sf_product` VALUES ('9999', '1', '5', null, null, '2', null, '6', null, null, '1', null, '149', '149', '2017-03-08 08:25:37', '2017-03-08 08:28:47', '【サンプル】クリスプチョコとちおとめ16カートン', '0', null, null, null, '165.0', '20.0', '150.0', '3', '730.0', '650.0', '730.0', '650.0', '203.0', '353.0', '6', '6', null, null, '2', null, '1', '1', '0', '0', '0', '0', null, null, null, '6', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '1', null, null, '270', 'P000102', null, null, null, '0', null, '運賃', '17460', '2', '運賃（２回目）', '17460', '2', null, null, '1', 'V019999', null, '5', null, null, null, null, null, null, null, null, null, '', '9999', '2', '0', null, '1', '0', '0', '1', null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null);" +
                        "INSERT INTO `sfr_sf_product` (`id`,`created_date`,`updated_date`,`product_name`,`product_code`,`paste_special_form_flag`,`special_size_flag`,`special_die_cutting_number_flag`,`paper_head_approval_flag`,`wooden_code`,`denno_product_code`,`surface_treatment_id_f`) VALUES ('9999','2017-03-08 08:25:37','2017-03-08 08:25:37','ABC','P009999','0','1','0','0','V010111','12','1');" +

                        //"INSERT INTO `sfr_sf_product_common_fee` VALUES ('9999', '2017-03-08 08:25:37', '2017-03-08 08:25:37', '149', '149', null, null, null, null, '9999', '0');" +
                        "INSERT INTO `sfr_sf_product_common_fee` (`id`,`created_date`,`updated_date`,`updated_user`,`product_id`) VALUES ('9999','2017-03-08 08:25:37','2017-03-08 08:25:37','272','9999');" +

                        // "INSERT INTO `sfr_sf_deal_product` VALUES ('9999', '9999', '9999', '272', '272', '2017-03-09 14:09:37', '2017-03-09 14:09:37', '0', null);" +
                        "INSERT INTO `sfr_sf_deal_product` (`id`,`deal_id`,`product_id`,`created_date`,`updated_date`,`highlight_flag`) VALUES('9999','9999','9999','2017-03-09 14:09:37','2017-03-09 14:09:37','1');" +

                        //"INSERT INTO `sfr_sf_product_output` VALUES ('9999', '149', '149', '2017-03-08 08:15:19', '2017-03-08 08:15:19', '23.50', '24.68', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0', '0', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null, '0.00', '0.00', '0', '9999', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);" +
                        "INSERT INTO `sfr_sf_product_output` (`id`,`created_date`,`updated_date`,`primary_flag`,`deal_product_id`) VALUES ('9999','2017-03-08 08:25:37','2017-03-08 08:25:37','0','9999');" +

                        //"INSERT INTO `sfr_sf_offer` VALUES ('5.80', '417600.00', '-48.58', '9999', '2017-03-08 08:25:37', '2017-03-08 08:29:04', '149', '149', '9999');" +
                        "INSERT INTO `sfr_sf_offer` (`id`,`created_date`,`updated_date`,`product_output_id`) VALUES ('9999', '2017-03-08 08:25:37', '2017-03-08 08:29:04', '9999');" +

                        //"INSERT INTO `sfr_sf_quotation` VALUES ('9999', '9999', null, '269', '269', '2017-03-15 10:01:34', '2017-03-15 10:01:46', null, '1', '20000', 'gfgfgd', 'dfgdg', '2017-03-15 13:52:02', '2017-03-10 16:16:56', null, null, 'dfg', 'fg', 'dfg', 'fgdg', null, null, null, '1', 'hihi', '17S09999', null, null, '0', null, '0', '0', '0', '0');" +
                        "INSERT INTO `sfr_sf_quotation` (`id`,`created_date`,`updated_date`,`deal_id`,`highlight_flag`,`quotation_code`) VALUES ('9999','2017-03-15 10:01:34', '2017-03-15 10:01:46','9999','1','17S09999');" +

                        // "INSERT INTO `sfr_sf_quotation_item` VALUES ('9999', '9999', '9999', '2', '2', '2', 'Product53', '1', '0', '10000', '0', '1', null, null, '269', '2017-03-16 15:18:34', '2017-03-16 15:18:34', null, null, null, null, null, null)"
                        "INSERT INTO `sfr_sf_quotation_item` (`id`,`created_date`,`updated_date`,`quotation_id`,`item_type`) VALUES ('9999', '2017-03-15 10:01:46','2017-03-15 10:01:46','9999','3')";

    }

    @Override
    String sqlDown() {
        return
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_department` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_offer` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_output` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_common_fee` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999'";
    }
}
