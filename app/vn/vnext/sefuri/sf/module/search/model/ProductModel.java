package vn.vnext.sefuri.sf.module.search.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by VuPT on 12/14/2016.
 */
public class ProductModel extends BaseModel<ProductDto> implements Constants {
    @JsonProperty("code")
    private String code;
    @JsonProperty("name")
    private String name;
    @JsonProperty("paperType")
    private String paperType;
    @JsonProperty("application")
    private String application;
    @JsonProperty("sizeW")
    private BigDecimal sizeW;
    @JsonProperty("sizeD")
    private BigDecimal sizeD;
    @JsonProperty("sizeH")
    private BigDecimal sizeH;
    @JsonProperty("paperNameId")
    private Integer paperNameId;
    @JsonProperty("printMethod")
    private String printMethod;
    @JsonProperty("customerProductCode")
    private String customerProductCode;
    @JsonProperty("deal")
    private List<DealModel> dealModelList;
    @JsonProperty("orderItem")
    private List<OrderItemModel> orderModelList;
    @JsonProperty("customer")
    private List<CustomerModel> customerModelList;

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

    @Override
    public void setData(ProductDto data) {
        this.setId(data.getId());
        this.code = data.getProductCode();
        this.name = data.getProductName();
        //this.paperType = data.getPaper
        this.application = data.getApplication();
        this.sizeD = data.getSizeD();
        this.sizeH = data.getSizeH();
        this.sizeW = data.getSizeW();
        this.paperNameId = data.getPaperNameId();
        this.customerProductCode = data.getCustomerProductCode();
        this.printMethod = convertPrintMethod(data.getPrintMethod());
        if (data.getDealProducts() != null) {
            this.dealModelList = new ArrayList<>();
            this.customerModelList = new ArrayList<>();
            this.orderModelList = new ArrayList<>();
            for (DealProductDto dealProductDto : data.getDealProducts()) {
                if (dealProductDto.getDeal() != null) {
                    DealDto deal = dealProductDto.getDeal();
                    DealModel dealModel = new DealModel();
                    dealModel.code = deal.getDealCode();
                    dealModel.createdDate = deal.getCreatedDate();
                    dealModel.dealCase = convertDealCase(deal.getDealType());
                    dealModel.deliveryDate = deal.getDeliveryDate();
                    //TODO: change to department Dto
                    //dealModel.salesName = deal.getSalerName();
                    this.dealModelList.add(dealModel);
                    if (deal.getCustomer() != null) {
                        CustomerModel customerModel = new CustomerModel();
                        customerModel.code = deal.getCustomer().getCustomerCode();
                        customerModel.contactName = deal.getCustomer().getCustomerContact();
                        customerModel.name = deal.getCustomer().getName();
                        this.customerModelList.add(customerModel);
                    }
                    if (deal.getQuotations() != null) {
                        for (QuotationDto quotationDto : deal.getQuotations()) {
                            //TODO - VuPT do this
//                            if(quotationDto.getOrders()!=null){
//                                this.orderModelList = new ArrayList<>();
//                                for(OrderDto orderDto: quotationDto.getOrders()){
//                                    OrderItemModel orderModel = new OrderItemModel();
//                                    for(OrderItemDto dto: orderDto.getOrderItems()) {
//                                        orderModel.deliveryStatus = orderDto.getDeliveryStatus();
//                                        orderModel.deliveryType = orderDto.getDeliveryStatus();
//                                        orderModel.lot = dto.getQuotationItem().getQuantity().intValue();
//                                        orderModel.value = dto.getQuotationItem().getTotal().longValue();
//                                    }
//                                    this.orderModelList.add(orderModel);
//                                }
//                            }
                        }
                    }
                }
            }
        }
    }

    private class OrderItemModel {
        @JsonProperty("value")
        private Long value;
        @JsonProperty("lot")
        private Integer lot;
        @JsonProperty("deliveryType")
        private Integer deliveryType;
        @JsonProperty("deliveryStatus")
        private Integer deliveryStatus;
    }

    private class CustomerModel {
        @JsonProperty("code")
        private String code;
        @JsonProperty("name")
        private String name;
        @JsonProperty("contactName")
        private String contactName;
    }

    private class DealModel {
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
    }
}
