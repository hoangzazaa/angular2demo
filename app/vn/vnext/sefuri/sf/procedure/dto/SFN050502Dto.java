package vn.vnext.sefuri.sf.procedure.dto;

import org.joda.time.DateTime;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN050502Dto {

    // planId
    private int planId;
    // 出荷予定日
    private DateTime planDate;
    // 得意先名
    private String customerCode;
    private String customerName;
    // 案件ID
    private String dealCode;
    // 品名
    private String productCode;
    private String productName;
    private Integer productType;
    private Integer productShapeId;
    // 出荷予定数
    private int planQuantity;
    // 出荷実績数
    private int actualQuantity;
    // 制限
    private Integer restriction;
    private Integer cartonShippingType;

    public int getPlanId() {
        return planId;
    }

    public void setPlanId(int planId) {
        this.planId = planId;
    }

    public DateTime getPlanDate() {
        return planDate;
    }

    public void setPlanDate(DateTime planDate) {
        this.planDate = planDate;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public Integer getProductShapeId() {
        return productShapeId;
    }

    public void setProductShapeId(Integer productShapeId) {
        this.productShapeId = productShapeId;
    }

    public int getPlanQuantity() {
        return planQuantity;
    }

    public void setPlanQuantity(int planQuantity) {
        this.planQuantity = planQuantity;
    }

    public int getActualQuantity() {
        return actualQuantity;
    }

    public void setActualQuantity(int actualQuantity) {
        this.actualQuantity = actualQuantity;
    }

    public Integer getRestriction() {
        return restriction;
    }

    public void setRestriction(Integer restriction) {
        this.restriction = restriction;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }
}
