package vn.vnext.sefuri.sf.json.SF00301.model;

import java.math.BigDecimal;
import java.util.Objects;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

public class SF00301_DealJson extends BaseJson<DealDto> {
    @JsonProperty("dealName")
    private String dealName;

    @JsonProperty("dealCode")
    private String dealCode;

    @JsonProperty("dealType")
    private Integer dealType;

    @JsonProperty("dealStatus")
    private Integer dealStatus;

    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;

    @JsonProperty("estTotalDeal")
    private BigDecimal estTotalDeal;

    @JsonProperty("templateFlag")
    private Integer templateFlag = 0;

    @JsonProperty("closedFlag")
    private Integer closedFlag = 0;

    @JsonProperty("customerId")
    private Integer customerId;

    @JsonProperty("salesId")
    private Integer salesId;

    @JsonProperty("isInMybox")
    private boolean isInMybox;

    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("jobInprocess")
    private Integer jobInprocess = 0;

    @JsonProperty("dealLockFlag")
    private Integer dealLockFlag = 0;

    /**
     * リピート案件フラグ (0: 元案件, 1: リピート案件)
     */
    @JsonProperty("repeatFlag")
    private Integer repeatFlag = 0;

    /**
     * 注文日 (関連案件のみ)
     * @return 注文日
     */
    @JsonProperty("orderDate")
    private DateTime orderDate;

    public Integer getSalesId() {
        return salesId;
    }

    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(final String dealName) {
        this.dealName = dealName;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(final String dealCode) {
        this.dealCode = dealCode;
    }

    public Integer getDealType() {
        return dealType;
    }

    public void setDealType(final Integer dealType) {
        this.dealType = dealType;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(final Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(final DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    public void setEstTotalDeal(final BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    public Integer getTemplateFlag() {
        return templateFlag;
    }

    public void setTemplateFlag(final Integer templateFlag) {
        this.templateFlag = templateFlag;
    }

    public Integer getClosedFlag() {
        return closedFlag;
    }

    public void setClosedFlag(Integer closedFlag) {
        this.closedFlag = closedFlag;
    }

    public boolean isInMybox() {
        return isInMybox;
    }

    public void setInMybox(final boolean inMybox) {
        isInMybox = inMybox;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public Integer getDealLockFlag() {
        return dealLockFlag;
    }

    public void setDealLockFlag(final Integer dealLockFlag) {
        this.dealLockFlag = dealLockFlag;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    /**
     * @return リピート案件フラグ (0: 元案件, 1: リピート案件)
     */
    public Integer getRepeatFlag() {
        return repeatFlag;
    }

    /**
     * @param repeatFlag リピート案件フラグ (0: 元案件, 1: リピート案件)
     */
    public void setRepeatFlag(Integer repeatFlag) {
        this.repeatFlag = repeatFlag;
    }

    /**
     * 注文日 (関連案件のみ)
     * @return 注文日
     */
    public DateTime getOrderDate() {
        return orderDate;
    }

    /**
     * 注文日 (関連案件のみ)
     * @param orderDate 注文日
     */
    public void setOrderDate(DateTime orderDate) {
        this.orderDate = orderDate;
    }

    @Override
    public DealDto getModel() {
        DealDto dto = new DealDto();
        dto.setId(this.id);
        dto.setDealName(this.dealName);
        dto.setDealCode(this.dealCode);
        dto.setDealType(this.dealType);
        dto.setDealStatus(this.dealStatus);
        dto.setDeliveryDate(this.deliveryDate);
        dto.setEstTotalDeal(this.estTotalDeal);
        dto.setTemplateFlag(this.templateFlag);
        dto.setClosedFlag(this.closedFlag);
        dto.setSalesId(this.salesId);
        dto.setCustomerName(this.customerName);
        dto.setJobInprocess(this.jobInprocess);
        dto.setDealLockFlag(this.dealLockFlag);
        dto.setCustomerId(this.customerId);
        return dto;
    }

    @Override
    public void setModel(final DealDto dto) {
        if (dto != null) {
            setData(dto);

            this.dealName = dto.getDealName();
            this.dealCode = dto.getDealCode();
            this.dealType = dto.getDealType();
            this.dealStatus = dto.getDealStatus();
            this.deliveryDate = dto.getDeliveryDate();
            this.estTotalDeal = dto.getEstTotalDeal();
            this.templateFlag = dto.getTemplateFlag();
            this.closedFlag = dto.getClosedFlag();
            this.salesId = dto.getSalesId();
            this.customerName = dto.getCustomerName();
            this.jobInprocess = dto.getJobInprocess();
            this.dealLockFlag = dto.getDealLockFlag();
            this.customerId = dto.getCustomerId();
            this.repeatFlag = dto.getSourceDealId() != null && !Objects.equals(dto.getId(), dto.getSourceDealId()) ? 1 : 0;
        }
    }

}
