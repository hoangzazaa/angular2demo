package vn.vnext.sefuri.sf.module.export.model;

import com.google.common.base.Strings;
import org.apache.commons.lang3.StringEscapeUtils;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.*;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.joda.time.DateTime;

/**
 * Created by DungTQ on 5/19/2017.
 */
public class QuotationModel {
    private static final String INV_PAYMENT_TERM_DEFAULT = "従来通り";
    private static final String DELIVERY_METHOD_CASE_1 = "一括納品";
    private static final String DELIVERY_METHOD_CASE_2 = "ご希望に合わせて調整";
    private static final String SENTENCE_1_CONTENT = "・特にご契約上の定めのない場合は、紙器製品は3ヶ月、段ボールは1ヶ月以内に受納されるものとします。";
    private static final String SENTENCE_2_CONTENT = "・お得意様のご都合により、指定納品期日が経過しても受納されない製品に関しては、その代金及び倉庫に要する費用を請求させていただきます。";
    private static final String SENTENCE_3_CONTENT = "・お預かり品については、ご注文後６ヶ月以内に受納されるものとします。";
    private static final String SENTENCE_4_CONTENT = "・一定期間リピート注文をいただかない場合、段ボール版は２年、木型は３年間で廃棄処分となります。予めご了承ください。\r";
    private static final String SEPARATOR = System.getProperty("line.separator");

    String quotationID;

    String invoiceCustomerName;

    String invoiceDeliveryDate;

    String invoiceDeliveryPlace;

    String invoicePaymentTerm;

    Date invoiceExpirationDate;

    String memo;

    String invoicePic;

    String deliveryMethod;

    List<QuotationItemModel> quotationItemModelList;

    String address;

    String tel;

    String fax;

    String postalCode;

    String bankName;

    String sentenceContent;

    BigDecimal total;
    BigDecimal tax;
    BigDecimal totalWithTax;

    InputStream fConDau1;

    String fTitle;

    DateTime estimateDate;

    public String getfTitle() {
        return fTitle;
    }

    public void setfTitle(String fTitle) {
        this.fTitle = fTitle;
    }

    public QuotationModel(QuotationDto dto, UserDto picUser) {
        quotationID = dto.getQuotationCode();

        //Fix based on slack
        String invCusName = null;
        if (Strings.isNullOrEmpty(dto.getInvoiceCustomerName())) {
            DealDto deal = dto.getDeal();
            if (deal != null && deal.getCustomer() != null) {
                invCusName = deal.getCustomer().getName();
            } else if (deal != null && !Strings.isNullOrEmpty(deal.getCustomerName())) {
                invCusName = deal.getCustomerName();
            }
        } else {
            invCusName = dto.getInvoiceCustomerName();
        }
        String fTitle = dto.getTitle() == 2 ? "　様" : "　御中";
        if (Strings.isNullOrEmpty(dto.getInvoiceDeptName()) && Strings.isNullOrEmpty(dto.getInvoicePic())) {
            this.invoiceCustomerName = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append(fTitle)
                    .toString();
        } else if (Strings.isNullOrEmpty(dto.getInvoiceDeptName())) {
            this.invoiceCustomerName = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append("\n")
                    .append(Strings.nullToEmpty(dto.getInvoicePic()))
                    .append(fTitle)
                    .toString();
        } else
            this.invoiceCustomerName = new StringBuilder(16)
                    .append(Strings.nullToEmpty(invCusName))
                    .append("\n")
                    .append(Strings.nullToEmpty(dto.getInvoiceDeptName()))
                    .append(Constants.SPACE)
                    .append(Strings.nullToEmpty(dto.getInvoicePic()))
                    .append(fTitle)
                    .toString();

        this.estimateDate = dto.getEstimateDate();

        if (!Strings.isNullOrEmpty(dto.getInvoiceDeliveryDate())) {
            this.invoiceDeliveryDate = dto.getInvoiceDeliveryDate();
        } else {
            this.invoiceDeliveryDate = "別途打ち合わせにて";
        }

        if (dto.getInvoiceExpirationDate() != null) {
            this.invoiceExpirationDate = dto.getInvoiceExpirationDate().toDate();
        }

        if (Strings.isNullOrEmpty(dto.getInvoiceDeliveryPlace())) {
            this.invoiceDeliveryPlace = "貴社指定の場所";
        } else {
            this.invoiceDeliveryPlace = dto.getInvoiceDeliveryPlace();
        }

        this.invoicePaymentTerm = (Strings.isNullOrEmpty(dto.getInvoicePaymentTerm()) ? INV_PAYMENT_TERM_DEFAULT : dto.getInvoicePaymentTerm());

        // set invoice pic
        this.invoicePic = (picUser != null ? picUser.getUsername() : Constants.BLANK);

        // set department data
        if (picUser != null && picUser.getDepartment() != null) {
            DepartmentDto departmentDto = picUser.getDepartment();
            if(departmentDto.getAddress() != null) {
                this.address = StringEscapeUtils.unescapeJava(departmentDto.getAddress().trim());
            } else {
                this.address = "";
            }

            this.tel = departmentDto.getTel();
            this.fax = departmentDto.getFax();
            this.bankName = departmentDto.getBankName();
            if (!Strings.isNullOrEmpty(departmentDto.getPostalCode())) {
                this.postalCode = "〒"+ departmentDto.getPostalCode();
            } else
                this.postalCode = "";
        }
        this.quotationItemModelList = new ArrayList<>();
        BigDecimal totalQuantity = new BigDecimal(0);
        BigDecimal totalQI = new BigDecimal(0);

        //TODO
        Integer size = dto.getQuotationItems().size();
        if (size < 10) {
            for (QuotationItemDto quotationItemDto : dto.getQuotationItems()) {
                QuotationItemModel quotationItemModel = new QuotationItemModel(quotationItemDto);
                if (quotationItemModel.getQuantity() != null) {
                    totalQuantity = totalQuantity.add(quotationItemModel.getQuantity());
                }
                if (quotationItemDto.getTotal() != null && quotationItemDto.getNo() != null) {
                    totalQI = totalQI.add(quotationItemDto.getTotal());
                }
                quotationItemModelList.add(quotationItemModel);
            }

            for (int i = 0; i < 10 - size; i++) {
                QuotationItemDto quotationItemDto = new QuotationItemDto();
                QuotationItemModel quotationItemModel = new QuotationItemModel(quotationItemDto);
                quotationItemModelList.add(quotationItemModel);
            }
        } else {
            for (QuotationItemDto quotationItemDto : dto.getQuotationItems()) {
                QuotationItemModel quotationItemModel = new QuotationItemModel(quotationItemDto);
                if (quotationItemModel.getQuantity() != null) {
                    totalQuantity = totalQuantity.add(quotationItemModel.getQuantity());
                }
                if (quotationItemDto.getTotal() != null && quotationItemDto.getNo() != null) {
                    totalQI = totalQI.add(quotationItemDto.getTotal());
                }
                quotationItemModelList.add(quotationItemModel);
            }
        }

        this.total = totalQI;
        this.tax = this.total.multiply(new BigDecimal(0.08));
        this.totalWithTax = this.total.add(this.tax);
        if (Strings.isNullOrEmpty(dto.getDeliveryMethod())) {
            int totalLot = 0;
            if (dto.getQuotationItems() != null) {
                for (QuotationItemDto quotationItemDto : dto.getQuotationItems()) {
                    if (quotationItemDto.getNo() != null && quotationItemDto.getQuantity() != null) {
                        totalLot += quotationItemDto.getQuantity().intValue();
                    }
                }
            }
            if (totalLot > 5000) {
                this.deliveryMethod = DELIVERY_METHOD_CASE_2;
            } else {
                this.deliveryMethod = DELIVERY_METHOD_CASE_1;
            }
        } else {
            this.deliveryMethod = dto.getDeliveryMethod();
        }

        if (dto.getRemark() != null) {
            this.memo = dto.getRemark();
        }

        StringBuilder sbSentenceContent = new StringBuilder();

        if (dto.getStereoType1Flag() != null && dto.getStereoType1Flag() == 1) {
            sbSentenceContent.append(SENTENCE_1_CONTENT);
            sbSentenceContent.append(SEPARATOR);
        }

        if (dto.getStereoType2Flag() != null && dto.getStereoType2Flag() == 1) {
            sbSentenceContent.append(SENTENCE_2_CONTENT);
            sbSentenceContent.append(SEPARATOR);
        }

        if (dto.getStereoType3Flag() != null && dto.getStereoType3Flag() == 1) {
            sbSentenceContent.append(SENTENCE_3_CONTENT);
            sbSentenceContent.append(SEPARATOR);
        }

        if (dto.getStereoType4Flag() != null && dto.getStereoType4Flag() == 1) {
            sbSentenceContent.append(SENTENCE_4_CONTENT);
        }

        this.sentenceContent = sbSentenceContent.toString();
    }

    public String getQuotationID() {
        return quotationID;
    }

    public void setQuotationID(String quotationID) {
        this.quotationID = quotationID;
    }

    public String getInvoiceCustomerName() {
        return invoiceCustomerName;
    }

    public void setInvoiceCustomerName(String invoiceCustomerName) {
        this.invoiceCustomerName = invoiceCustomerName;
    }

    public String getInvoiceDeliveryPlace() {
        return invoiceDeliveryPlace;
    }

    public void setInvoiceDeliveryPlace(String invoiceDeliveryPlace) {

        this.invoiceDeliveryPlace = invoiceDeliveryPlace;
    }

    public String getInvoicePaymentTerm() {
        return invoicePaymentTerm;
    }

    public void setInvoicePaymentTerm(String invoicePaymentTerm) {
        this.invoicePaymentTerm = invoicePaymentTerm;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getInvoiceDeliveryDate() {
        return invoiceDeliveryDate;
    }

    public void setInvoiceDeliveryDate(String invoiceDeliveryDate) {
        this.invoiceDeliveryDate = invoiceDeliveryDate;
    }

    public Date getInvoiceExpirationDate() {
        return invoiceExpirationDate;
    }

    public void setInvoiceExpirationDate(Date invoiceExpirationDate) {

        this.invoiceExpirationDate = invoiceExpirationDate;
    }

    public List<QuotationItemModel> getQuotationItemModelList() {
        return quotationItemModelList;
    }

    public void setQuotationItemModelList(List<QuotationItemModel> quotationItemModelList) {

        this.quotationItemModelList = quotationItemModelList;
    }

    public String getInvoicePic() {
        return invoicePic;
    }

    public void setInvoicePic(String invoicePic) {
        this.invoicePic = invoicePic;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getBankName() {
        return bankName;
    }

    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getTax() {
        return tax;
    }

    public void setTax(BigDecimal tax) {
        this.tax = tax;
    }

    public BigDecimal getTotalWithTax() {
        return totalWithTax;
    }

    public void setTotalWithTax(BigDecimal totalWithTax) {
        this.totalWithTax = totalWithTax;
    }

    public String getSentenceContent() {
        return sentenceContent;
    }

    public void setSentenceContent(String sentenceContent) {
        this.sentenceContent = sentenceContent;
    }

    public InputStream getfConDau1() {
        return fConDau1;
    }

    public void setfConDau1(InputStream fConDau1) {
        this.fConDau1 = fConDau1;
    }

    public DateTime getEstimateDate() {
        return estimateDate;
    }

    public void setEstimateDate(DateTime estimateDate) {
        this.estimateDate = estimateDate;
    }
}
