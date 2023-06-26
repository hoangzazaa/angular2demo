package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 24/03/2017.
 */
public class SF0020101_01 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";
    public static final String GET_DEAL_PRODUCT_INFO = "select dp.id from sfr_sf_deal_product dp where dp.id = 9999";
    public static final String GET_PRODUCT_INFO = "select p.id from sfr_sf_product p where p.id = 9999";
    public static final String GET_MYBOX_INFO = "select mybox.id from sfr_sf_mybox_item mybox where mybox.id = 9999";
    public static final String GET_FILE_INFO = "select file.id from sfr_sf_file file where file.id = 9999";
    public static final String GET_PRODUCT_FILE_INFO = "select pf.id from sfr_sf_product_file pf where pf.id = 9999";

    @Override
    String sqlUp() {
        return
//
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
                        "DELETE FROM `sfr_sf_deal` WHERE `id`='9999';" +
                        //Delete Product
                        "DELETE FROM `sfr_sf_drawing_image` WHERE `product_id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_file` WHERE `product_id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `product_id` = '9999';" +
                        "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                        //Delete id=9999
                        "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_file` WHERE `id` = '9999';"+
                        "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_file` WHERE `id` = '9999';"+
                        //Insert Data
                        "INSERT INTO `sfr_sf_deal`(`id`,`created_date`,`updated_date`,`delete_flag`,`template_flag`) VALUES ('9999', '2017-02-27 18:13:14', '2017-02-27 18:13:14','0', '1');" +
                        "INSERT INTO `sfr_sf_product` (`id`,`created_date`,`updated_date`,`product_name`,`product_code`,`paste_special_form_flag`,`special_size_flag`,`special_die_cutting_number_flag`,`paper_head_approval_flag`) VALUES ('9999','2017-03-08 08:25:37','2017-03-08 08:25:37','ABC','P009999','0','1','0','0');" +
                        "INSERT INTO `sfr_sf_deal_product` (`id`,`deal_id`,`product_id`,`created_date`,`updated_date`,`highlight_flag`) VALUES('9999','9999','9999','2017-03-09 14:09:37','2017-03-09 14:09:37','1');" +
                        "INSERT INTO `sfr_sf_mybox_item` (`id`,`created_date`,`updated_date`,`type`,`deal_id`,`user_id`) VALUES ('9999','2017-02-27 09:54:37', '2017-02-27 09:54:37', '1', '9999', '272');" +
                        "INSERT INTO `sfr_sf_file` (`id`,`created_date`,`updated_date`,`file_code`) VALUES ('9999','2017-02-27 09:54:37', '2017-02-27 09:54:37', 'holy-fucking-shit.jpg');" +
                        "INSERT INTO `sfr_sf_product_file` (`id`,`created_date`,`updated_date`,`file_id`,`product_id`,`primary_flag`) VALUES ('9999','2017-02-27 09:54:37', '2017-02-27 09:54:37', '9999','9999','0')" ;


    }

    @Override
    String sqlDown() {
        return
                "DELETE FROM `sfr_sf_mybox_item` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_product_file` WHERE `id` = '9999';"+
                        "DELETE FROM `sfr_sf_product` WHERE `id` = '9999';" +
                        "DELETE FROM `sfr_sf_deal` WHERE `id` = '9999';"+
                        "DELETE FROM `sfr_sf_file` WHERE `id` = '9999'";

    }
}
