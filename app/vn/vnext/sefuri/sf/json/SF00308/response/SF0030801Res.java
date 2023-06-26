package vn.vnext.sefuri.sf.json.SF00308.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.SF00308.model.AnswerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 16/03/2017.
 */
public class SF0030801Res extends AbstractJson {
    //dealId
    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("dealCode")
    private String dealCode;

    //案件名
    @JsonProperty("dealName")
    private String dealName;

    @JsonProperty("customerId")
    private String customerId;

    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("saleName")
    private String saleName;

    @JsonProperty("dealType")
    private Integer dealType;

    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;

    @JsonProperty("estMoney")
    private BigDecimal estTotalDeal;

    @JsonProperty("dealStatus")
    private Integer dealStatus;

    @JsonProperty("templateFlag")
    private Integer templateFlag;

    @JsonProperty("closedFlag")
    private Integer closedFlag;

    @JsonProperty("answers")
    private List<AnswerJson> answerJsons;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(String saleName) {
        this.saleName = saleName;
    }

    public Integer getDealType() {
        return dealType;
    }

    public void setDealType(Integer dealType) {
        this.dealType = dealType;
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

    public List<AnswerJson> getAnswerJsons() {
        return answerJsons;
    }

    public void setAnswerJsons(List<AnswerJson> answerJsons) {
        this.answerJsons = answerJsons;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(Integer dealStatus) {
        this.dealStatus = dealStatus;
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
