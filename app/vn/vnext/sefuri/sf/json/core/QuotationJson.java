package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.QuotationDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain information about quotations of deals
 *
 * @author vupt
 */
public class QuotationJson extends BaseJson<QuotationDto> {

    //dealId
    @JsonProperty("dealId")
    private Integer dealId;

    //printTemplateId
    @JsonProperty("printTemplateId")
    private Integer printTemplateId;

    //利益率
    @JsonProperty("interestRate")
    private BigDecimal interestRate;

    //状況
    @JsonProperty("quotationStatus")
    private Integer quotationStatus;

    //提出金額合計 / 合計（税込）
    @JsonProperty("totalCost")
    private BigDecimal totalCost;

    //見積メモ
    @JsonProperty("memo")
    private String memo;

    //備考欄
    @JsonProperty("remark")
    private String remark;

    //見積提出日
    @JsonProperty("estimateDate")
    private DateTime estimateDate;

    //納期
    @JsonProperty("invoiceDeliveryDate")
    private String invoiceDeliveryDate;

    //納入場所
    @JsonProperty("invoiceDeliveryPlace")
    private String invoiceDeliveryPlace;

    //支払い条件
    @JsonProperty("invoicePaymentTerm")
    private String invoicePaymentTerm;

    //得意先名
    @JsonProperty("invoiceCustomerName")
    private String invoiceCustomerName;

    //担当部署
    @JsonProperty("invoiceDeptName")
    private String invoiceDeptName;

    //担当者名
    @JsonProperty("invoicePic")
    private String invoicePic;

    //住所
    @JsonProperty("invoiceAddress")
    private String invoiceAddress;

    //メールアドレス
    @JsonProperty("invoiceMailAddress")
    private String invoiceMailAddress;

    //連絡先
    @JsonProperty("invoicePhoneNumber")
    private String invoicePhoneNumber;

    //見積書有効期限
    @JsonProperty("invoiceExpirationDate")
    private DateTime invoiceExpirationDate;

    //quotationCode
    @JsonProperty("quotationCode")
    private String quotationCode;

    //quotationType
    @JsonProperty("quotationType")
    private Integer quotationType;

    //subject
    @JsonProperty("subject")
    private String subject;

    //consumptionTax
    @JsonProperty("consumptionTax")
    private BigDecimal consumptionTax;

    //totalExcludedTax
    @JsonProperty("totalExcludedTax")
    private BigDecimal totalExcludedTax;

    //highlightFlag
    @JsonProperty("highlightFlag")
    private Integer highlightFlag;

    //stereoType1Flag
    @JsonProperty("stereoType1Flag")
    private Integer stereoType1Flag;

    //stereoType2Flag
    @JsonProperty("stereoType2Flag")
    private Integer stereoType2Flag;

    //stereoType3Flag
    @JsonProperty("stereoType3Flag")
    private Integer stereoType3Flag;

    //stereoType4Flag
    @JsonProperty("deliveryMethod")
    private String deliveryMethod;

    //stereoType4Flag
    @JsonProperty("stereoType4Flag")
    private Integer stereoType4Flag;

    @JsonProperty("title")
    private Integer title;

    //dealRsQuotation
    @JsonProperty("deal")
    private DealJson deal;

    //quotationRsQuotationTemplate
    @JsonProperty("quotationPrintTemplate")
    private QuotationPrintTemplateJson quotationPrintTemplate;

    //quotationRsQuotationItem
    @JsonProperty("quotationItems")
    private List<QuotationItemJson> quotationItems;


    /**
     * Get dealId
     *
     * @return dealId
     */
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
     * Get deal
     *
     * @return deal
     */
    public DealJson getDeal() {
        return deal;
    }

    /**
     * Set deal
     *
     * @param deal DealJson
     */
    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    /**
     * Get quotationPrintTemplate
     *
     * @return quotationPrintTemplate
     */
    public QuotationPrintTemplateJson getQuotationPrintTemplate() {
        return quotationPrintTemplate;
    }

    /**
     * Set quotationPrintTemplate
     *
     * @param quotationPrintTemplate QuotationPrintTemplateJson
     */
    public void setQuotationPrintTemplate(QuotationPrintTemplateJson quotationPrintTemplate) {
        this.quotationPrintTemplate = quotationPrintTemplate;
    }

    /**
     * Get quotationItems
     *
     * @return quotationItems
     */
    public List<QuotationItemJson> getQuotationItems() {
        return quotationItems;
    }

    /**
     * Set quotationItems
     *
     * @param quotationItems List<QuotationItemJson>
     */
    public void setQuotationItems(List<QuotationItemJson> quotationItems) {
        this.quotationItems = quotationItems;
    }

    public Integer getStereoType1Flag() {
        return stereoType1Flag;
    }

    public void setStereoType1Flag(Integer stereoType1Flag) {
        this.stereoType1Flag = stereoType1Flag;
    }

    public Integer getStereoType2Flag() {
        return stereoType2Flag;
    }

    public void setStereoType2Flag(Integer stereoType2Flag) {
        this.stereoType2Flag = stereoType2Flag;
    }

    public Integer getStereoType3Flag() {
        return stereoType3Flag;
    }

    public void setStereoType3Flag(Integer stereoType3Flag) {
        this.stereoType3Flag = stereoType3Flag;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public Integer getStereoType4Flag() {
        return stereoType4Flag;
    }

    public void setStereoType4Flag(Integer stereoType4Flag) {
        this.stereoType4Flag = stereoType4Flag;
    }

    public Integer getTitle() {
        return title;
    }

    public void setTitle(Integer title) {
        this.title = title;
    }

    /**
     * Create QuotationDto
     *
     * @return QuotationDto
     */


    public QuotationDto getData() {
        QuotationDto dto = new QuotationDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setDealId(dealId);
        dto.setPrintTemplateId(printTemplateId);
        dto.setInterestRate(interestRate);
        dto.setQuotationStatus(quotationStatus);
        dto.setTotalCost(totalCost);
        dto.setMemo(memo);
        dto.setRemark(remark);
        dto.setEstimateDate(estimateDate);
        dto.setInvoiceDeliveryDate(invoiceDeliveryDate);
        dto.setInvoiceDeliveryPlace(invoiceDeliveryPlace);
        dto.setInvoicePaymentTerm(invoicePaymentTerm);
        dto.setInvoiceCustomerName(invoiceCustomerName);
        dto.setInvoiceDeptName(invoiceDeptName);
        dto.setInvoicePic(invoicePic);
        dto.setInvoiceAddress(invoiceAddress);
        dto.setInvoiceMailAddress(invoiceMailAddress);
        dto.setInvoicePhoneNumber(invoicePhoneNumber);
        dto.setDeliveryMethod(deliveryMethod);
        dto.setInvoiceExpirationDate(invoiceExpirationDate);
        dto.setQuotationCode(quotationCode);
        dto.setQuotationType(quotationType);
        dto.setSubject(subject);
        dto.setConsumptionTax(consumptionTax);
        dto.setTotalExcludedTax(totalExcludedTax);
        dto.setHighlightFlag(highlightFlag);
        dto.setStereoType1Flag(stereoType1Flag);
        dto.setStereoType2Flag(stereoType2Flag);
        dto.setStereoType3Flag(stereoType3Flag);
        dto.setStereoType4Flag(stereoType4Flag);
        dto.setTitle(title);
        return dto;
    }

    /**
     * Create QuotationJson
     *
     * @param dto QuotationDto
     */

    public void setData(QuotationDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.dealId = dto.getDealId();
        this.printTemplateId = dto.getPrintTemplateId();
        this.interestRate = dto.getInterestRate();
        this.quotationStatus = dto.getQuotationStatus();
        this.totalCost = dto.getTotalCost();
        this.memo = dto.getMemo();
        this.remark = dto.getRemark();
        this.estimateDate = dto.getEstimateDate();
        this.invoiceDeliveryDate = dto.getInvoiceDeliveryDate();
        this.invoiceDeliveryPlace = dto.getInvoiceDeliveryPlace();
        this.invoicePaymentTerm = dto.getInvoicePaymentTerm();
        this.invoiceCustomerName = dto.getInvoiceCustomerName();
        this.invoiceDeptName = dto.getInvoiceDeptName();
        this.invoicePic = dto.getInvoicePic();
        this.invoiceAddress = dto.getInvoiceAddress();
        this.invoiceMailAddress = dto.getInvoiceMailAddress();
        this.invoicePhoneNumber = dto.getInvoicePhoneNumber();
        this.invoiceExpirationDate = dto.getInvoiceExpirationDate();
        this.quotationCode = dto.getQuotationCode();
        this.quotationType = dto.getQuotationType();
        this.subject = dto.getSubject();
        this.consumptionTax = dto.getConsumptionTax();
        this.totalExcludedTax = dto.getTotalExcludedTax();
        this.highlightFlag = dto.getHighlightFlag();
        this.stereoType1Flag = dto.getStereoType1Flag();
        this.stereoType2Flag = dto.getStereoType2Flag();
        this.stereoType3Flag = dto.getStereoType3Flag();
        this.stereoType4Flag = dto.getStereoType4Flag();
        this.deliveryMethod = dto.getDeliveryMethod();
        this.deal = new DealJson();
        this.deal.setId(dto.getDealId());
        this.title = dto.getTitle();
        this.quotationPrintTemplate = new QuotationPrintTemplateJson();
        this.quotationPrintTemplate.setId(dto.getPrintTemplateId());
    }
}
