package vn.vnext.sefuri.sf.module.search.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by VuPT on 12/13/2016.
 */
public class CustomerModel extends BaseModel<CustomerDto> implements Constants {

    @JsonProperty("hpInfo")
    private String hpInfo;
    @JsonProperty("customerName")
    private String customerName;
    @JsonProperty("customerCode")
    private String customerCode;
    @JsonProperty("customerPicName")
    private String customerPicName;
    @JsonProperty("saleName")
    private String salerName;
    @JsonProperty("deal")
    private List<DealModel> deals;


    public static String convertDeliveryStatus(Integer deliveryStatus) {
        if (deliveryStatus == null) {
            return BLANK;
        } else if (deliveryStatus == 1) {
            return "取引可能";
        } else if (deliveryStatus == 2) {
            return "取引不可";
        }
        return BLANK;
    }


    public static String convertHpInfo(Integer hpInfo) {
        if (hpInfo == null) {
            return BLANK;
        } else if (hpInfo == 1) {
            return "はい";
        } else if (hpInfo == 2) {
            return "いいえ";
        }
        return BLANK;
    }

    public void setData(CustomerDto data) {
        // id
        this.setId(data.getId());
        // base data
        this.hpInfo = convertHpInfo(data.getHpInfo());
        this.customerName = data.getName();
        this.customerPicName = data.getCustomerContact();
        this.salerName = data.getSalerName();
        this.customerCode = data.getCustomerCode();
        // deal data
        if (data.getDeal() != null) {
            this.deals = new ArrayList<>();
            for (DealDto dto : data.getDeal()) {
                DealModel dealModel = new DealModel();
                dealModel.deliveryDate = dto.getDeliveryDate();

                dealModel.updatedDate = dto.getUpdatedDate();
                //Order
                if (dto.getQuotations() != null) {
                    for (QuotationDto quotationDto : dto.getQuotations()) {
                        //TODO - VuPT do this
//                        if(quotationDto.getOrders()!=null){
//                            for(OrderDto orderDto: quotationDto.getOrders()){
//                                dealModel.orders = new ArrayList<>();
//                                if(orderDto.getOrderItems()!=null){
//                                    for(OrderItemDto orderItemDto: orderDto.getOrderItems()){
//                                        OrderItemModel orderModel = new OrderItemModel();
//                                        orderModel.deliveryType = convertDeliveryStatus(orderDto.getDeliveryType());
//                                        OrderItemModel orderItemModel = new OrderItemModel();
//                                        if(orderItemDto.getQuotationItem().getQuantity()!=null) {
//                                            orderItemModel.lot = orderItemDto.getQuotationItem().getQuantity()
// .intValue();
//                                        }
//                                        if(orderItemDto.getQuotationItem().getTotal()!=null) {
//                                            orderItemModel.value = orderItemDto.getQuotationItem().getQuantity()
// .longValue();
//                                        }
//                                        dealModel.orders.add(orderModel);
//                                    }
//                                }
//                            }
//                        }
                    }
                }
                //Product
                if (dto.getDealProducts() != null) {
                    dealModel.products = new ArrayList<>();
                    for (DealProductDto dealProductDto : dto.getDealProducts()) {
                        ProductModel productModel = new ProductModel();
                        productModel.application = dealProductDto.getProduct().getApplication();
                        productModel.code = dealProductDto.getProduct().getProductCode();
                        productModel.name = dealProductDto.getProduct().getProductName();
                        dealModel.products.add(productModel);
                    }
                }
                this.deals.add(dealModel);
            }
        }
    }

    private class DealModel {

        @JsonProperty("deliveryDate")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.DEFAULT_DATE_FORMAT)
        private DateTime deliveryDate;
        @JsonProperty("updatedDate")
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.DEFAULT_DATE_FORMAT)
        private DateTime updatedDate;
        @JsonProperty("product")
        private List<ProductModel> products;
        @JsonProperty("orderItem")
        private List<OrderItemModel> orders;
    }

    private class OrderItemModel {
        @JsonProperty("deliveryType")
        private String deliveryType;
        @JsonProperty("value")
        private Long value;
        @JsonProperty("lot")
        private Integer lot;
    }

    private class ProductModel {
        @JsonProperty("code")
        private String code;
        @JsonProperty("name")
        private String name;
        @JsonProperty("application")
        private String application;
    }
}
