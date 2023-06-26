package vn.vnext.sefuri.sf.dto;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.joda.time.DateTime;

/**
 * Contain deals managed by all user
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_deal")
public class DealDto extends BaseDto {

    /* 案件名 */
    private String dealName;
    /* 案件ID */
    private String dealCode;
    /* 案件区分 */
    private Integer dealType;
    /* 担当営業名 */
    private Integer salesId;
    /* 受注予定額 */
    private BigDecimal estTotalDeal;
    /* ステータス */
    private Integer dealStatus;
    /* 得意先ID */
    private Integer customerId;
    /* 得意先 */
    private String customerName;
    /* 納期 */
    private DateTime deliveryDate;
    /* jobInprocess */
    private Integer jobInprocess = 0;
    /* templateFlag */
    private Integer templateFlag = 0;
    /* deleteFlag */
    private Integer deleteFlag = 0;
    /* closedFlag */
    private Integer closedFlag = 0;
    /* customerRsDeal */
    private CustomerDto customer;
    /* dealRsMyboxItem */
    private List<MyboxItemDto> myboxItems;
    /* dealRsDealProduct */
    private List<DealProductDto> dealProducts;
    /* dealRsQuotation */
    private List<QuotationDto> quotations;
    /* dealRsComment */
    private List<CommentDto> comments;
    /* dealRsChecksheet */
    private List<ChecksheetDto> checksheet;
    /* dealRsDealFile */
    private List<DealFileDto> dealFiles;
    /* dealRsOrder */
    private OrderDto order;
    /* salesRsDeal */
    private UserDto sales;

    private Integer dealLockFlag = 0;

    /**
     * 元案件 ID (FK: sfr_sf_deal.id)
     *
     * リピート元案件の ID (NULL: リピート案件ではない)
     */
    private Integer sourceDealId;


    /**
     * Get dealName
     *
     * @return dealName
     */
    @Basic
    @Column(name = "deal_name")
    public String getDealName() {
        return dealName;
    }

    /**
     * Set dealName
     *
     * @param dealName String
     */
    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    /**
     * Get dealCode
     *
     * @return dealCode
     */
    @Basic
    @Column(name = "deal_code")
    public String getDealCode() {
        return dealCode;
    }

    /**
     * Set dealCode
     *
     * @param dealCode String
     */
    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    /**
     * Get dealType
     *
     * @return dealType
     */
    @Basic
    @Column(name = "deal_type")
    public Integer getDealType() {
        return dealType;
    }

    /**
     * Set dealType
     *
     * @param dealType Integer
     */
    public void setDealType(Integer dealType) {
        this.dealType = dealType;
    }

    /**
     * Get salesId
     *
     * @return salesId
     */
    @Basic
    @Column(name = "sales_id")
    public Integer getSalesId() {
        return salesId;
    }

    /**
     * Set salesId
     *
     * @param salesId Integer
     */
    public void setSalesId(Integer salesId) {
        this.salesId = salesId;
    }

    /**
     * Get estTotalDeal
     *
     * @return estTotalDeal
     */
    @Basic
    @Column(name = "est_total_deal")
    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    /**
     * Set estTotalDeal
     *
     * @param estTotalDeal BigDecimal
     */
    public void setEstTotalDeal(BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    /**
     * Get dealStatus
     *
     * @return dealStatus
     */
    @Basic
    @Column(name = "deal_status")
    public Integer getDealStatus() {
        return dealStatus;
    }

    /**
     * Set dealStatus
     *
     * @param dealStatus Integer
     */
    public void setDealStatus(Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    /**
     * Get customerId
     *
     * @return customerId
     */
    @Basic
    @Column(name = "customer_id")
    public Integer getCustomerId() {
        return customerId;
    }

    /**
     * Set customerId
     *
     * @param customerId Integer
     */
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    /**
     * Get customerName
     *
     * @return customerName
     */
    @Basic
    @Column(name = "customer_name")
    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    /**
     * Get deliveryDate
     *
     * @return deliveryDate
     */
    @Basic
    @Column(name = "delivery_date")
    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    /**
     * Set deliveryDate
     *
     * @param deliveryDate DateTime
     */
    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    /**
     * Get jobInprocess
     *
     * @return jobInprocess
     */
    @Basic
    @Column(name = "job_inprocess")
    public Integer getJobInprocess() {
        return jobInprocess;
    }

    /**
     * Set jobInprocess
     *
     * @param jobInprogress Integer
     */
    public void setJobInprocess(Integer jobInprogress) {
        this.jobInprocess = jobInprogress;
    }

    /**
     * Get templateFlag
     *
     * @return templateFlag
     */
    @Basic
    @Column(name = "template_flag")
    public Integer getTemplateFlag() {
        return templateFlag;
    }

    /**
     * Set templateFlag
     *
     * @param templateFlag Integer
     */
    public void setTemplateFlag(Integer templateFlag) {
        this.templateFlag = templateFlag;
    }

    /**
     * Get closedFlag
     *
     * @return closedFlag
     */
    @Basic
    @Column(name = "closed_flag")
    public Integer getClosedFlag() {
        return closedFlag;
    }

    /**
     * Set closedFlag
     *
     * @param closedFlag Integer
     */
    public void setClosedFlag(Integer closedFlag) {
        this.closedFlag = closedFlag;
    }

    /**
     * Get deleteFlag
     *
     * @return deleteFlag
     */
    @Basic
    @Column(name = "delete_flag")
    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    /**
     * Set deleteFlag
     *
     * @param deleteFlag Integer
     */
    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    @Basic
    @Column(name = "deal_lock_flag")
    public Integer getDealLockFlag() {
        return dealLockFlag;
    }

    public void setDealLockFlag(Integer dealLockFlag) {
        this.dealLockFlag = dealLockFlag;
    }


    /**
     * 元案件 ID (FK: sfr_sf_deal.id) を取得
     *
     * @return リピート元案件の ID (NULL: リピート案件ではない)
     */
    @Basic
    @Column(name = "source_deal_id")
    public Integer getSourceDealId() {
        return this.sourceDealId;
    }

    /**
     * 元案件 ID (FK: sfr_sf_deal.id) を設定
     *
     * @param sourceDealId リピート元案件の ID (NULL: リピート案件ではない)
     */
    public void setSourceDealId(Integer sourceDealId) {
        this.sourceDealId = sourceDealId;
    }

    /**
     * Get customer
     *
     * @return customer
     */
    @Transient
    public CustomerDto getCustomer() {
        return customer;
    }

    /**
     * Set customer
     *
     * @param customer CustomerDto
     */
    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    /**
     * Get myboxItems
     *
     * @return myboxItems
     */
    @Transient
    public List<MyboxItemDto> getMyboxItems() {
        return myboxItems;
    }

    /**
     * Set myboxItems
     *
     * @param myboxItems List<MyboxItemDto>
     */
    public void setMyboxItems(List<MyboxItemDto> myboxItems) {
        this.myboxItems = myboxItems;
    }

    /**
     * Get dealProducts
     *
     * @return dealProducts
     */
    @Transient
    public List<DealProductDto> getDealProducts() {
        return dealProducts;
    }

    /**
     * Set dealProducts
     *
     * @param dealProducts List<DealProductDto>
     */
    public void setDealProducts(List<DealProductDto> dealProducts) {
        this.dealProducts = dealProducts;
    }

    /**
     * Get quotations
     *
     * @return quotations
     */
    @Transient
    public List<QuotationDto> getQuotations() {
        return quotations;
    }

    /**
     * Set quotations
     *
     * @param quotations List<QuotationDto>
     */
    public void setQuotations(List<QuotationDto> quotations) {
        this.quotations = quotations;
    }

    /**
     * Get comments
     *
     * @return comments
     */
    @Transient
    public List<CommentDto> getComments() {
        return comments;
    }

    /**
     * Set comments
     *
     * @param comments List<CommentDto>
     */
    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    /**
     * Get checksheet
     *
     * @return checksheet
     */
    @Transient
    public List<ChecksheetDto> getChecksheet() {
        return checksheet;
    }

    /**
     * Set checksheet
     *
     * @param checksheet List<ChecksheetDto>
     */
    public void setChecksheet(List<ChecksheetDto> checksheet) {
        this.checksheet = checksheet;
    }

    /**
     * Get dealFiles
     *
     * @return dealFiles
     */
    @Transient
    public List<DealFileDto> getDealFiles() {
        return dealFiles;
    }

    /**
     * Set dealFiles
     *
     * @param dealFiles List<DealFileDto>
     */
    public void setDealFiles(List<DealFileDto> dealFiles) {
        this.dealFiles = dealFiles;
    }

    /**
     * Get order
     *
     * @return order
     */
    @Transient
    public OrderDto getOrder() {
        return order;
    }

    /**
     * Set order
     *
     * @param order OrderDto
     */
    public void setOrder(OrderDto order) {
        this.order = order;
    }

    /**
     * Get sales
     *
     * @return sales
     */
    @Transient
    public UserDto getSales() {
        return sales;
    }

    /**
     * Set sales
     *
     * @param sales UserDto
     */
    public void setSales(UserDto sales) {
        this.sales = sales;
    }
}
