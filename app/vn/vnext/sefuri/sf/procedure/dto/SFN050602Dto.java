package vn.vnext.sefuri.sf.procedure.dto;

import org.joda.time.DateTime;

import java.math.BigDecimal;

/**
 * Created by Teddy on 7/21/2017.
 */
public class SFN050602Dto {

    // 請求ID
    private String code;
    // 得意先
    private String customerCode;
    private String customerName;
    // 請求額
    private BigDecimal amount;
    // 請求締め日
    private DateTime billingDate;
    // 入金期日
    private DateTime dueDate;
    // 方法
    private String method;
    // 入金日
    private DateTime paymentDate;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public DateTime getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(DateTime billingDate) {
        this.billingDate = billingDate;
    }

    public DateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(DateTime dueDate) {
        this.dueDate = dueDate;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public DateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(DateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}
