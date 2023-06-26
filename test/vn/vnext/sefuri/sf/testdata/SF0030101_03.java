package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 25/03/2017.
 */
public class SF0030101_03 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_CHECKSHEET_INFO = "select cs.id from sfr_sf_checksheet cs where cs.id = 9999";
    public static final String GET_WOODEN_INFO = "select wooden.id from sfr_sf_mst_wooden wooden where wooden.id = 9999";
    public static final String GET_ORDER_ITEM_INFO = "select oi.id from sfr_sf_order_item oi where oi.id = 9999";
    public static final String GET_ORDER_INFO = "select o.id from sfr_sf_order o where o.id = 9999";
    public static final String GET_LOADING_ADDRESS_INFO = "select la.id from sfr_sf_loading_address la where la.id = 9999";
    public static final String GET_QUOTATION_INFO = "select quo.id from sfr_sf_quotation quo where quo.id = 9999";
    public static final String GET_QUOTATION_ITEM_INFO = "select qi.id from sfr_sf_quotation_item qi where qi.id = 9999";
    public static final String GET_MYBOX_INFO = "select mybox.id from sfr_sf_mybox_item mybox where mybox.id = 9999";
    public static final String GET_PRODUCT_INFO = "select po.id from sfr_sf_product po where po.id = 9999";
    public static final String GET_PRODUCT_OUTPUT_INFO = "select po.id from sfr_sf_product_output po where po.id = 9999";
    public static final String GET_DEAL_PRODUCT_INFO = "select dp.id from sfr_sf_deal_product dp where dp.id = 9999";
    public static final String GET_PRODUCT_FILE_INFO = "select pf.id from sfr_sf_product_file pf where pf.id = 9999";
    public static final String GET_DEAL_FILE_INFO = "select df.id from sfr_sf_deal_file df where df.id = 9999";
    public static final String GET_FILE_INFO = "select file.id from sfr_sf_file file where file.id = 9999";
    public static final String GET_COMMENT_INFO = "select com.id from sfr_sf_comment com where com.id = 9999";
    public static final String GET_USER_INFO = "select us.id from sfr_sf_user us where us.id = 9999";
    public static final String GET_DEPARTMENT_INFO = "select de.id from sfr_sf_department de where de.id = 9999";
    public static final String GET_SHIPPING_INFO = "select ship.id from sfr_sf_mst_shipping_company ship where ship.id = 9999";
    public static final String GET_CUSTOMER_INFO = "select cus.id from sfr_sf_customer cus where cus.id = 9999";
    @Override
    String sqlUp() {

        return "DELETE FROM `sfr_sf_checksheet` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mst_wooden` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_order_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_order` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_loading_address` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9998';" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_product_output` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9998';" +
                "DELETE FROM `sfr_sf_product_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_comment` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_department` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mst_shipping_company` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999';" +
                "INSERT INTO `sfr_sf_customer` VALUES ('9999', null, null, '2017-03-08 12:18:55', '2013-07-26 00:00:00', '江崎グリコ株式会社', null, '', 'N74', null, null, '0009999', '0', '江崎グリコ株式会', 'ｴｻﾞｷｸﾞ', 'ｴｻﾞｷｸﾞ', '江崎勝久', null, 'G23');" +
                "INSERT INTO `sfr_sf_department` VALUES ('9999', '2017-01-05 15:00:51', '2017-01-05 15:00:51', null, null, '福岡支店', 'EE03', '1', '福岡県福岡市中央区博多駅前３−１３−１', '092-482-8885', '092-481-0085', null, '812-0008');" +
               // "INSERT INTO `sfr_sf_file` VALUES ('9999', '1', '1', '2017-02-19 22:35:03', '2017-02-19 22:35:06', 'shape4', '/assets/img/formats/SF008_format04.png');" +
                "INSERT INTO `sfr_sf_user` VALUES ('9999', '0', '0', '2017-02-24 11:28:01', '2017-02-24 11:28:01', '江副 昭人', '8d5c2bbd87886b03fd69326f1361d235', '1', '2', 'a_ezoe@sagashiki.co.jp', '0', '9999', 'G43', 'EE05');" +
                "INSERT INTO `sfr_sf_mst_wooden` VALUES ('9999', '2017-01-06 13:34:21', '2017-01-06 13:34:21', '8', '8', 'V019999', '89', '2020-12-10 10:05:41');" +
                "INSERT INTO `sfr_sf_deal` VALUES ('9999', null, null, '2017-02-27 18:13:14', '2017-02-27 18:13:14', '新クリスプチョコ 16カートン５種セット', '188', '680000', '0', '9999', '9999', 'TMP000999', '1', '2017-11-04 00:00:00', '0', '0');" +
                "INSERT INTO `sfr_sf_comment` VALUES ('9999', '272', null, '2017-03-21 15:19:25', '2017-03-21 15:19:25', '9999', 'testaqw', '9999');" +
               // "INSERT INTO `sfr_sf_deal_file` VALUES ('9999', '2017-03-25 10:19:20', '2017-03-25 10:19:23', null, null, 'ưerwr', '9999', '9999', '1', 'wr', '323', '0');" +
                "INSERT INTO `sfr_sf_product` VALUES ('9999', '1', '5', null, null, '2', null, '6', null, null, '1', null, '149', '149', '2017-03-08 08:25:37', '2017-03-08 08:28:47', '【サンプル】クリスプチョコとちおとめ16カートン', '0', null, null, null, '165.0', '20.0', '150.0', '3', '730.0', '650.0', '730.0', '650.0', '203.0', '353.0', '6', '6', null, null, '2', null, '1', '1', '0', '0', '0', '0', null, null, null, '6', '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '1', null, null, '270', 'P000102', null, null, null, '0', null, '運賃', '17460', '2', '運賃（２回目）', '17460', '2', null, null, '1', 'V019999', null, '5', null, null, null, null, null, null, null, null, null, '', '9999', '2', '0', null, '1', '0', '0', '1', null, null, '0', null, null, null, null, null, null, null, null, null, null, null, null, null, null);" +
                "INSERT INTO `sfr_sf_product_file` VALUES ('9999', '2017-03-25 10:38:34', '2017-03-25 10:38:36', null, null, '23', 'sdfw', '1', '9999', 'ưerwer', '1', 'srwer', '1', '0',null);" +
                "INSERT INTO `sfr_sf_deal_product` VALUES ('9999', '9999', '9999', '272', '272', '2017-03-09 14:09:37', '2017-03-09 14:09:37', '0', null);" +
                "INSERT INTO `sfr_sf_deal_product` VALUES ('9998', '9999', '9999', '272', '272', '2017-03-09 14:09:37', '2017-03-15 10:01:46', '0', null);" +
                "INSERT INTO `sfr_sf_product_output` VALUES ('9999', '149', '149', '2017-03-08 08:15:19', '2017-03-08 08:15:19', '23.50', '24.68', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0', '0', '0', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null, '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0.00', null, '0.00', '0.00', '0', '9999', null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);" +
                "INSERT INTO `sfr_sf_mybox_item` VALUES ('272', '37', '2017-02-27 09:54:37', '2017-02-27 09:54:37', '9999', '9999', '272', '1');" +
                "INSERT INTO `sfr_sf_order` VALUES ('9999', '2017-03-15 14:39:03', '2017-03-15 14:39:07', '269', null, '9999');" +
                "INSERT INTO `sfr_sf_loading_address` VALUES ('9999', '2017-03-08 10:44:29', '2017-03-08 10:44:31', '8', '8', '9999');" +
                "INSERT INTO `sfr_sf_mst_shipping_company` VALUES ('9999', '2017-01-06 13:34:21', '2017-01-06 13:34:21', '8', '8', '2', '路線便：業者A');" +
                "INSERT INTO `sfr_sf_order_item` VALUES ('9999', '2017-03-08 10:45:24', '2017-03-08 10:45:27', '8', '8', '9999', '9999', '9999', '1', '1', '111', '1', '9999', '11', '888', 'sfsdf', '1234.00', '100.00');" +
                "INSERT INTO `sfr_sf_checksheet` VALUES ('9999', '9999', '2017-03-21 14:55:20', '2017-03-22 08:18:25', '268', '272', '1005', null, null, '1', null, null, null, null, null, null, null, null)";

    }

    @Override
    String sqlDown() {
        return "DELETE FROM `sfr_sf_checksheet` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mst_wooden` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_order_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_order` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_loading_address` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_quotation_item` WHERE `id` = '9998';" +
                "DELETE FROM `sfr_sf_quotation` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_product_output` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9998';" +
                "DELETE FROM `sfr_sf_product_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_file` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_comment` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_user` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_department` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_mst_shipping_company` WHERE `id` = '9999';" +
                "DELETE FROM `sfr_sf_customer` WHERE `id` = '9999'";
    }
}
