package vn.vnext.sefuri.sf.module.search.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by haipt on 11/16/2016.
 */
public class DealModel extends BaseModel<DealDto> implements Constants {

    @JsonProperty("code")
    private String code;
    @JsonProperty("name")
    private String name;
    @JsonProperty("salesName")
    private String salesName;
    @JsonProperty("dealCase")
    private String dealCase;
    @JsonProperty("deliveryDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.DEFAULT_DATE_FORMAT)
    private DateTime deliveryDate;
    @JsonProperty("createdDate")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = DateUtil.DEFAULT_DATE_FORMAT)
    private DateTime createdDate;
    @JsonProperty("customer")
    private CustomerModel customer;
    @JsonProperty("product")
    private List<ProductModel> products;
    @JsonProperty("orderItem")
    private List<OrderItemModel> orders;

    public static String convertDealCase(Integer dealCase) {
        if (dealCase == null) {
            return BLANK;
        } else if (dealCase == 1) {
            return "新版";
        } else if (dealCase == 2) {
            return "在版（リピート）";
        }
        return BLANK;
    }

    public static String convertPrintMethod(Integer printMethod) {
        if (printMethod == null) {
            return BLANK;
        } else if (printMethod == 1) {
            return "オフセット";
        } else if (printMethod == 2) {
            return "デジタル";
        }
        return BLANK;
    }

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

    @Override
    public void setData(DealDto deal) {
        // id
        this.setId(deal.getId());
        // base deal
        this.code = deal.getDealCode();
        this.name = deal.getDealName();
        //TODO: Add department
        //this.salesName = deal.getSalerName();
        //TODO - VuPT do this
//        this.dealCase = convertDealCase(deal.getDealCaseDiff());
        this.deliveryDate = deal.getDeliveryDate();
        this.createdDate = deal.getCreatedDate();

        // customer data
        CustomerDto customer = deal.getCustomer();
        if (customer != null) {
            this.customer = new CustomerModel();

            this.customer.name = customer.getName();
            this.customer.contactName = customer.getCustomerContact();
            this.customer.code = customer.getCustomerCode();
        }

        // product data
        Collection<DealProductDto> dealProducts = deal.getDealProducts();
        this.products = dealProducts.stream().map(dealProductDto -> {
            ProductDto productDto = dealProductDto.getProduct();
            ProductModel product = new ProductModel();
            product.code = productDto.getProductCode();
            product.name = productDto.getProductName();
            // product.paperType = productDto.getPaperId();
            product.application = productDto.getApplication();
            product.sizeW = productDto.getSizeW().intValue();
            product.sizeD = productDto.getSizeD().intValue();
            product.sizeH = productDto.getSizeH().intValue();
            product.paperNameId = productDto.getPaperNameId();
            product.printMethod = convertPrintMethod(productDto.getPrintMethod());
            return product;
        }).collect(Collectors.toList());

        //Order
        if (deal.getQuotations() != null) {
            for (QuotationDto quotationDto : deal.getQuotations()) {
                //TODO - VuPT do this
//                if(quotationDto.getOrders()!=null){
//                    for(OrderDto orderDto: quotationDto.getOrders()){
//                        this.orders = new ArrayList<>();
//                        if(orderDto.getOrderItems()!=null){
//                            for(OrderItemDto orderItemDto: orderDto.getOrderItems()){
//                                OrderItemModel orderModel = new OrderItemModel();
//                                orderModel.deliveryType = convertDeliveryStatus(orderDto.getDeliveryType());
//                                if(orderItemDto.getQuotationItem().getQuantity()!=null) {
//                                    orderModel.lot = orderItemDto.getQuotationItem().getQuantity().intValue();
//                                }
//                                if(orderItemDto.getQuotationItem().getTotal()!=null) {
//                                    orderModel.value = orderItemDto.getQuotationItem().getQuantity().longValue();
//                                }
//                                this.orders.add(orderModel);
//                            }
//                        }
//                    }
//                }
            }
        }

    }

    private class CustomerModel {
        @JsonProperty("code")
        private String code;
        @JsonProperty("name")
        private String name;
        @JsonProperty("contactName")
        private String contactName;
    }

    private class ProductModel {
        @JsonProperty("code")
        private String code;
        @JsonProperty("name")
        private String name;
        @JsonProperty("paperType")
        private String paperType;
        @JsonProperty("application")
        private String application;
        @JsonProperty("sizeW")
        private Integer sizeW;
        @JsonProperty("sizeD")
        private Integer sizeD;
        @JsonProperty("sizeH")
        private Integer sizeH;
        @JsonProperty("paperNameId")
        private Integer paperNameId;
        @JsonProperty("printMethod")
        private String printMethod;
    }

    private class OrderItemModel {
        @JsonProperty("value")
        private Long value;
        @JsonProperty("lot")
        private Integer lot;
        @JsonProperty("deliveryType")
        private String deliveryType;
        @JsonProperty("deliveryStatus")
        private String deliveryStatus;
    }
}
