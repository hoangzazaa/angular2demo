package vn.vnext.sefuri.sf.testdata;

/**
 * Created by TungNT on 2/27/2017.
 */
public class SF0020102_02 extends BaseData {
    public static final String GET_DEAL_INFO = "select deal.id from sfr_sf_deal deal where deal.id = 9999";

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
                "DELETE FROM `sfr_sf_deal` WHERE `id`='9999'";
    }

    @Override
    String sqlDown() {
        return "";
    }
}
