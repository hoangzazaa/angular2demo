package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class DealJson {

    @JsonProperty("id")
    protected int id;
    @JsonProperty("dealCode")
    protected String dealCode;
    @JsonProperty("dealName")
    protected String dealName;
    @JsonProperty("customerId")
    protected Integer customerId;
    @JsonProperty("salerId")
    protected Integer salerId;
    @JsonProperty("dealType")
    protected Integer dealType;
    @JsonProperty("dealStatus")
    protected Integer dealStatus;
    @JsonProperty("deliveryDate")
    protected DateTime deliveryDate;
    @JsonProperty("estTotalDeal")
    protected BigDecimal estTotalDeal;
    @JsonProperty("templateFlag")
    protected Integer templateFlag;
    @JsonProperty("closedFlag")
    protected Integer closedFlag;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public Integer getSalerId() {
        return salerId;
    }

    public void setSalerId(Integer salerId) {
        this.salerId = salerId;
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
}
