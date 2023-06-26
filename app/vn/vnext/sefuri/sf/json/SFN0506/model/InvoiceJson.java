package vn.vnext.sefuri.sf.json.SFN0506.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class InvoiceJson {

    @JsonProperty("code")
    private String code;
    @JsonProperty("amount")
    private BigDecimal amount;
    @JsonProperty("closingDate")
    private DateTime closingDate;
    @JsonProperty("dueDate")
    private DateTime dueDate;
    @JsonProperty("payDate")
    private DateTime payDate;
    @JsonProperty("method")
    private String method;
    @JsonProperty("customer")
    private CustomerJson customer;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public DateTime getClosingDate() {
        return closingDate;
    }

    public void setClosingDate(DateTime closingDate) {
        this.closingDate = closingDate;
    }

    public DateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(DateTime dueDate) {
        this.dueDate = dueDate;
    }

    public DateTime getPayDate() {
        return payDate;
    }

    public void setPayDate(DateTime payDate) {
        this.payDate = payDate;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerJson customer) {
        this.customer = customer;
    }
}
