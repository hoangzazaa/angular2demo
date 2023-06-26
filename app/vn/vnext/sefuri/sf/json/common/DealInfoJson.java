package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealDto;

import java.math.BigDecimal;

/**
 * Basic deal info.
 *
 * @author manhnv
 */
public abstract class DealInfoJson extends BaseJson<DealDto> {
    //案件ID
    @JsonProperty("dealCode")
    protected String dealCode;

    //案件名
    @JsonProperty("dealName")
    protected String dealName;

    /* 得意先ID */
    @JsonProperty("customerId")
    protected Integer customerId;

    /* 得意先名 */
    @JsonProperty("customerName")
    protected String customerName;

    @JsonProperty("customerCode")
    protected String customerCode;

    //担当営業名
    @JsonProperty("salerId")
    protected Integer salerId;

    //担当営業名
    @JsonProperty("salerName")
    protected String salerName;

    //案件区分
    @JsonProperty("dealType")
    protected Integer dealType;

    //ステータス
    @JsonProperty("dealStatus")
    protected Integer dealStatus;

    //納期
    @JsonProperty("deliveryDate")
    protected DateTime deliveryDate;

    //受注予定金額
    @JsonProperty("estTotalDeal")
    protected BigDecimal estTotalDeal;

    //templateFlag
    @JsonProperty("templateFlag")
    protected Integer templateFlag;

    //closedFlag
    @JsonProperty("closedFlag")
    protected Integer closedFlag;

    @JsonProperty("jobInprocess")
    protected Integer jobInprocess;

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

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public Integer getSalerId() {
        return salerId;
    }

    public void setSalerId(Integer salerId) {
        this.salerId = salerId;
    }

    public String getSalerName() {
        return salerName;
    }

    public void setSalerName(String salerName) {
        this.salerName = salerName;
    }

    public Integer getDealType() {
        return dealType;
    }

    public void setDealType(Integer dealType) {
        this.dealType = dealType;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    public void setEstTotalDeal(BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    public Integer getTemplateFlag() {
        return templateFlag;
    }

    public void setTemplateFlag(Integer templateFlag) {
        this.templateFlag = templateFlag;
    }

    public Integer getClosedFlag() {
        return closedFlag;
    }

    public void setClosedFlag(Integer closedFlag) {
        this.closedFlag = closedFlag;
    }

    public abstract DealDto getModel();

    public abstract void setModel(DealDto dealDto);
}
