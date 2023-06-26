package vn.vnext.sefuri.sf.json.SF00204.request;

import java.math.BigDecimal;
import java.util.List;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by haipt on 12/9/2016.
 */
public class SF0020402Req extends AbstractJson {
    /** 案件区分: 指定なし */
    public static final int DEAL_TYPE_NONE = 99;

    @JsonProperty("keywords")
    private List<String> keywords;
    @JsonProperty("periodFrom")
    private DateTime periodFrom;
    @JsonProperty("periodTo")
    private DateTime periodTo;
    @JsonProperty("periodType")
    private int periodType;
    @JsonProperty("customerCode")
    private String customerCode;
    @JsonProperty("customerName")
    private String customerName;
    @JsonProperty("dealCode")
    private String dealCode;
    @JsonProperty("dealName")
    private String dealName;
    @JsonProperty("salesName")
    private String salesName;
    @JsonProperty("contactName")
    private String contactName;
    @JsonProperty("dealType")
    private int dealType;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("shapeId")
    private Integer shapeId;
    @JsonProperty("productApplication")
    private String application;
    @JsonProperty("sizeW")
    private BigDecimal sizeW;
    @JsonProperty("sizeD")
    private BigDecimal sizeD;
    @JsonProperty("sizeH")
    private BigDecimal sizeH;
    @JsonProperty("paperName")
    private String paperName;
    @JsonProperty("printMethod")
    private int printMethod;
    @JsonProperty("orderValueFrom")
    private BigDecimal orderValueFrom;
    @JsonProperty("orderValueTo")
    private BigDecimal orderValueTo;
    @JsonProperty("orderLotFrom")
    private Integer lotFrom;
    @JsonProperty("orderLotTo")
    private Integer lotTo;
    @JsonProperty("dealStatus")
    private int dealStatus;
    @JsonProperty("page")
    private int pageIndex;
    @JsonProperty("pageSize")
    private int pageSize;
    @JsonProperty("customerProductCode")
    private String customerProductCode;

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public DateTime getPeriodFrom() {
        return periodFrom;
    }

    public void setPeriodFrom(DateTime periodFrom) {
        this.periodFrom = periodFrom;
    }

    public DateTime getPeriodTo() {
        return periodTo;
    }

    public void setPeriodTo(DateTime periodTo) {
        this.periodTo = periodTo;
    }

    public int getPeriodType() {
        return periodType;
    }

    public void setPeriodType(int periodType) {
        this.periodType = periodType;
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

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public String getSalesName() {
        return salesName;
    }

    public void setSalesName(String salesName) {
        this.salesName = salesName;
    }

    public int getDealType() {
        return dealType;
    }

    public void setDealType(int dealType) {
        this.dealType = dealType;
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

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public BigDecimal getSizeW() {
        return sizeW;
    }

    public void setSizeW(BigDecimal sizeW) {
        this.sizeW = sizeW;
    }

    public BigDecimal getSizeD() {
        return sizeD;
    }

    public void setSizeD(BigDecimal sizeD) {
        this.sizeD = sizeD;
    }

    public BigDecimal getSizeH() {
        return sizeH;
    }

    public void setSizeH(BigDecimal sizeH) {
        this.sizeH = sizeH;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public int getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(int printMethod) {
        this.printMethod = printMethod;
    }

    public BigDecimal getOrderValueFrom() {
        return orderValueFrom;
    }

    public void setOrderValueFrom(BigDecimal orderValueFrom) {
        this.orderValueFrom = orderValueFrom;
    }

    public BigDecimal getOrderValueTo() {
        return orderValueTo;
    }

    public void setOrderValueTo(BigDecimal orderValueTo) {
        this.orderValueTo = orderValueTo;
    }

    public Integer getLotFrom() {
        return lotFrom;
    }

    public void setLotFrom(Integer lotFrom) {
        this.lotFrom = lotFrom;
    }

    public Integer getLotTo() {
        return lotTo;
    }

    public void setLotTo(Integer lotTo) {
        this.lotTo = lotTo;
    }

    public int getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(int dealStatus) {
        this.dealStatus = dealStatus;
    }

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public String getCustomerProductCode() {
        return customerProductCode;
    }

    public void setCustomerProductCode(String customerProductCode) {
        this.customerProductCode = customerProductCode;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }
}
