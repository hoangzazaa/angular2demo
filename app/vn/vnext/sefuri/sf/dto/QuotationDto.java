package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain information about quotations of deals
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_quotation")
public class QuotationDto extends BaseDto {

    /* dealId */
    private Integer dealId;
    /* printTemplateId */
    private Integer printTemplateId;
    /* 利益率 */
    private BigDecimal interestRate;
    /* 状況 */
    private Integer quotationStatus;
    /* 提出金額合計 / 合計（税込） */
    private BigDecimal totalCost;
    /* 見積メモ */
    private String memo;
    /* 備考欄 */
    private String remark;
    /* 見積提出日 */
    private DateTime estimateDate;
    /* 納期 */
    private String invoiceDeliveryDate;
    /* 納入場所 */
    private String invoiceDeliveryPlace;
    /* 支払い条件 */
    private String invoicePaymentTerm;
    /* 得意先名 */
    private String invoiceCustomerName;
    /* 担当部署 */
    private String invoiceDeptName;
    /* 担当者名 */
    private String invoicePic;
    /* 住所 */
    private String invoiceAddress;
    /* メールアドレス */
    private String invoiceMailAddress;
    /* 連絡先 */
    private String invoicePhoneNumber;
    /* 見積書有効期限 */
    private DateTime invoiceExpirationDate;
    /* quotationCode */
    private String quotationCode;
    /* quotationType */
    private Integer quotationType;
    /* subject */
    private String subject;
    /* consumptionTax */
    private BigDecimal consumptionTax;
    /* totalExcludedTax */
    private BigDecimal totalExcludedTax;
    /* highlightFlag */
    private Integer highlightFlag = 0;
    /* stereoType1Flag */
    private Integer stereoType1Flag = 0;
    /* stereoType2Flag */
    private Integer stereoType2Flag = 0;
    /* stereoType3Flag */
    private Integer stereoType3Flag = 0;
    /* stereoType4Flag */
    private Integer stereoType4Flag = 0;
    /* deliveryMethod */
    private String deliveryMethod;

    private Integer title = 1;

    /* dealRsQuotation */
    private DealDto deal;
    /* quotationRsQuotationTemplate */
    private QuotationPrintTemplateDto quotationPrintTemplate;
    /* quotationRsQuotationItem */
    private List<QuotationItemDto> quotationItems;

    /**
     * Get dealId
     *
     * @return dealId
     */
    @Basic
    @Column(name = "deal_id")
    public Integer getDealId() {
        return dealId;
    }

    /**
     * Set dealId
     *
     * @param dealId Integer
     */
    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    /**
     * Get printTemplateId
     *
     * @return printTemplateId
     */
    @Basic
    @Column(name = "print_template_id")
    public Integer getPrintTemplateId() {
        return printTemplateId;
    }

    /**
     * Set printTemplateId
     *
     * @param printTemplateId Integer
     */
    public void setPrintTemplateId(Integer printTemplateId) {
        this.printTemplateId = printTemplateId;
    }

    /**
     * Get interestRate
     *
     * @return interestRate
     */
    @Basic
    @Column(name = "interest_rate")
    public BigDecimal getInterestRate() {
        return interestRate;
    }

    /**
     * Set interestRate
     *
     * @param interestRate BigDecimal
     */
    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    /**
     * Get quotationStatus
     *
     * @return quotationStatus
     */
    @Basic
    @Column(name = "quotation_status")
    public Integer getQuotationStatus() {
        return quotationStatus;
    }

    /**
     * Set quotationStatus
     *
     * @param quotationStatus Integer
     */
    public void setQuotationStatus(Integer quotationStatus) {
        this.quotationStatus = quotationStatus;
    }

    /**
     * Get totalCost
     *
     * @return totalCost
     */
    @Basic
    @Column(name = "total_cost")
    public BigDecimal getTotalCost() {
        return totalCost;
    }

    /**
     * Set totalCost
     *
     * @param totalCost BigDecimal
     */
    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    /**
     * Get memo
     *
     * @return memo
     */
    @Basic
    @Column(name = "memo")
    public String getMemo() {
        return memo;
    }

    /**
     * Set memo
     *
     * @param memo String
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * Get remark
     *
     * @return remark
     */
    @Basic
    @Column(name = "remark")
    public String getRemark() {
        return remark;
    }

    /**
     * Set remark
     *
     * @param remark String
     */
    public void setRemark(String remark) {
        this.remark = remark;
    }

    /**
     * Get estimateDate
     *
     * @return estimateDate
     */
    @Basic
    @Column(name = "estimate_date")
    public DateTime getEstimateDate() {
        return estimateDate;
    }

    /**
     * Set estimateDate
     *
     * @param estimateDate DateTime
     */
    public void setEstimateDate(DateTime estimateDate) {
        this.estimateDate = estimateDate;
    }

    /**
     * Get invoiceDeliveryDate
     *
     * @return invoiceDeliveryDate
     */
    @Basic
    @Column(name = "invoice_delivery_date")
    public String getInvoiceDeliveryDate() {
        return invoiceDeliveryDate;
    }

    /**
     * Set invoiceDeliveryDate
     *
     * @param invoiceDeliveryDate DateTime
     */
    public void setInvoiceDeliveryDate(String invoiceDeliveryDate) {
        this.invoiceDeliveryDate = invoiceDeliveryDate;
    }

    /**
     * Get invoiceDeliveryPlace
     *
     * @return invoiceDeliveryPlace
     */
    @Basic
    @Column(name = "invoice_delivery_place")
    public String getInvoiceDeliveryPlace() {
        return invoiceDeliveryPlace;
    }

    /**
     * Set invoiceDeliveryPlace
     *
     * @param invoiceDeliveryPlace String
     */
    public void setInvoiceDeliveryPlace(String invoiceDeliveryPlace) {
        this.invoiceDeliveryPlace = invoiceDeliveryPlace;
    }

    /**
     * Get invoicePaymentTerm
     *
     * @return invoicePaymentTerm
     */
    @Basic
    @Column(name = "invoice_payment_term")
    public String getInvoicePaymentTerm() {
        return invoicePaymentTerm;
    }

    /**
     * Set invoicePaymentTerm
     *
     * @param invoicePaymentTerm String
     */
    public void setInvoicePaymentTerm(String invoicePaymentTerm) {
        this.invoicePaymentTerm = invoicePaymentTerm;
    }

    /**
     * Get invoiceCustomerName
     *
     * @return invoiceCustomerName
     */
    @Basic
    @Column(name = "invoice_customer_name")
    public String getInvoiceCustomerName() {
        return invoiceCustomerName;
    }

    /**
     * Set invoiceCustomerName
     *
     * @param invoiceCustomerName String
     */
    public void setInvoiceCustomerName(String invoiceCustomerName) {
        this.invoiceCustomerName = invoiceCustomerName;
    }

    /**
     * Get invoiceDeptName
     *
     * @return invoiceDeptName
     */
    @Basic
    @Column(name = "invoice_dept_name")
    public String getInvoiceDeptName() {
        return invoiceDeptName;
    }

    /**
     * Set invoiceDeptName
     *
     * @param invoiceDeptName String
     */
    public void setInvoiceDeptName(String invoiceDeptName) {
        this.invoiceDeptName = invoiceDeptName;
    }

    /**
     * Get invoicePic
     *
     * @return invoicePic
     */
    @Basic
    @Column(name = "invoice_pic")
    public String getInvoicePic() {
        return invoicePic;
    }

    /**
     * Set invoicePic
     *
     * @param invoicePic String
     */
    public void setInvoicePic(String invoicePic) {
        this.invoicePic = invoicePic;
    }

    /**
     * Get invoiceAddress
     *
     * @return invoiceAddress
     */
    @Basic
    @Column(name = "invoice_address")
    public String getInvoiceAddress() {
        return invoiceAddress;
    }

    /**
     * Set invoiceAddress
     *
     * @param invoiceAddress String
     */
    public void setInvoiceAddress(String invoiceAddress) {
        this.invoiceAddress = invoiceAddress;
    }

    /**
     * Get invoiceMailAddress
     *
     * @return invoiceMailAddress
     */
    @Basic
    @Column(name = "invoice_mail_address")
    public String getInvoiceMailAddress() {
        return invoiceMailAddress;
    }

    /**
     * Set invoiceMailAddress
     *
     * @param invoiceMailAddress String
     */
    public void setInvoiceMailAddress(String invoiceMailAddress) {
        this.invoiceMailAddress = invoiceMailAddress;
    }

    /**
     * Get invoicePhoneNumber
     *
     * @return invoicePhoneNumber
     */
    @Basic
    @Column(name = "invoice_phone_number")
    public String getInvoicePhoneNumber() {
        return invoicePhoneNumber;
    }

    /**
     * Set invoicePhoneNumber
     *
     * @param invoicePhoneNumber String
     */
    public void setInvoicePhoneNumber(String invoicePhoneNumber) {
        this.invoicePhoneNumber = invoicePhoneNumber;
    }

    /**
     * Get invoiceExpirationDate
     *
     * @return invoiceExpirationDate
     */
    @Basic
    @Column(name = "invoice_expiration_date")
    public DateTime getInvoiceExpirationDate() {
        return invoiceExpirationDate;
    }

    /**
     * Set invoiceExpirationDate
     *
     * @param invoiceExpirationDate DateTime
     */
    public void setInvoiceExpirationDate(DateTime invoiceExpirationDate) {
        this.invoiceExpirationDate = invoiceExpirationDate;
    }

    /**
     * Get quotationCode
     *
     * @return quotationCode
     */
    @Basic
    @Column(name = "quotation_code")
    public String getQuotationCode() {
        return quotationCode;
    }

    /**
     * Set quotationCode
     *
     * @param quotationCode String
     */
    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    /**
     * Get quotationType
     *
     * @return quotationType
     */
    @Basic
    @Column(name = "quotation_type")
    public Integer getQuotationType() {
        return quotationType;
    }

    /**
     * Set quotationType
     *
     * @param quotationType Integer
     */
    public void setQuotationType(Integer quotationType) {
        this.quotationType = quotationType;
    }

    /**
     * Get subject
     *
     * @return subject
     */
    @Basic
    @Column(name = "subject")
    public String getSubject() {
        return subject;
    }

    /**
     * Set subject
     *
     * @param subject String
     */
    public void setSubject(String subject) {
        this.subject = subject;
    }

    /**
     * Get consumptionTax
     *
     * @return consumptionTax
     */
    @Basic
    @Column(name = "consumption_tax")
    public BigDecimal getConsumptionTax() {
        return consumptionTax;
    }

    /**
     * Set consumptionTax
     *
     * @param consumptionTax BigDecimal
     */
    public void setConsumptionTax(BigDecimal consumptionTax) {
        this.consumptionTax = consumptionTax;
    }

    /**
     * Get totalExcludedTax
     *
     * @return totalExcludedTax
     */
    @Basic
    @Column(name = "total_excluded_tax")
    public BigDecimal getTotalExcludedTax() {
        return totalExcludedTax;
    }

    /**
     * Set totalExcludedTax
     *
     * @param totalExcludedTax BigDecimal
     */
    public void setTotalExcludedTax(BigDecimal totalExcludedTax) {
        this.totalExcludedTax = totalExcludedTax;
    }

    /**
     * Get highlightFlag
     *
     * @return highlightFlag
     */
    @Basic
    @Column(name = "highlight_flag")
    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    /**
     * Set highlightFlag
     *
     * @param highlightFlag Integer
     */
    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    /**
     * Get stereoType1Flag
     *
     * @return stereoType1Flag
     */
    @Basic
    @Column(name = "stereo_type_1_flag")
    public Integer getStereoType1Flag() {
        return stereoType1Flag;
    }

    /**
     * Set stereoType1Flag
     *
     * @param stereoType1Flag Integer
     */
    public void setStereoType1Flag(Integer stereoType1Flag) {
        this.stereoType1Flag = stereoType1Flag;
    }

    /**
     * Get stereoType2Flag
     *
     * @return stereoType2Flag
     */
    @Basic
    @Column(name = "stereo_type_2_flag")
    public Integer getStereoType2Flag() {
        return stereoType2Flag;
    }

    /**
     * Set stereoType2Flag
     *
     * @param stereoType2Flag Integer
     */
    public void setStereoType2Flag(Integer stereoType2Flag) {
        this.stereoType2Flag = stereoType2Flag;
    }

    /**
     * Get stereoType3Flag
     *
     * @return stereoType3Flag
     */
    @Basic
    @Column(name = "stereo_type_3_flag")
    public Integer getStereoType3Flag() {
        return stereoType3Flag;
    }

    /**
     * Set stereoType3Flag
     *
     * @param stereoType3Flag Integer
     */
    public void setStereoType3Flag(Integer stereoType3Flag) {
        this.stereoType3Flag = stereoType3Flag;
    }

    /**
     * Get stereoType4Flag
     *
     * @return stereoType4Flag
     */
    @Basic
    @Column(name = "stereo_type_4_flag")
    public Integer getStereoType4Flag() {
        return stereoType4Flag;
    }

    /**
     * Set stereoType4Flag
     *
     * @param stereoType4Flag Integer
     */
    public void setStereoType4Flag(Integer stereoType4Flag) {
        this.stereoType4Flag = stereoType4Flag;
    }

    /**
     * Get deliveryMethod
     *
     * @return deliveryMethod
     */
    @Basic
    @Column(name = "delivery_method")
    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    @Basic
    @Column(name = "title")
    public Integer getTitle() {
        return title;
    }

    public void setTitle(Integer title) {
        this.title = title;
    }

    /**
     * Set deliveryMethod
     *
     * @param deliveryMethod String
     */
    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    /**
     * Get deal
     *
     * @return deal
     */
    @Transient
    public DealDto getDeal() {
        return deal;
    }

    /**
     * Set deal
     *
     * @param deal DealDto
     */
    public void setDeal(DealDto deal) {
        this.deal = deal;
    }

    /**
     * Get quotationPrintTemplate
     *
     * @return quotationPrintTemplate
     */
    @Transient
    public QuotationPrintTemplateDto getQuotationPrintTemplate() {
        return quotationPrintTemplate;
    }

    /**
     * Set quotationPrintTemplate
     *
     * @param quotationPrintTemplate QuotationPrintTemplateDto
     */
    public void setQuotationPrintTemplate(QuotationPrintTemplateDto quotationPrintTemplate) {
        this.quotationPrintTemplate = quotationPrintTemplate;
    }

    /**
     * Get quotationItems
     *
     * @return quotationItems
     */
    @Transient
    public List<QuotationItemDto> getQuotationItems() {
        return quotationItems;
    }

    /**
     * Set quotationItems
     *
     * @param quotationItems List<QuotationItemDto>
     */
    public void setQuotationItems(List<QuotationItemDto> quotationItems) {
        this.quotationItems = quotationItems;
    }

}
