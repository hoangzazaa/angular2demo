package vn.vnext.sefuri.sf.json.SF00502.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

public class PredictionJson {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("year")
    private int year;

    @JsonProperty("month")
    private int month;

    @JsonProperty("customerId")
    private int customerId;

    /* 段ボール */
    @JsonProperty("amount1")
    private BigDecimal amount1;

    /* 紙器 */
    @JsonProperty("amount2")
    private BigDecimal amount2;

    /* 商事 */
    @JsonProperty("amount3")
    private BigDecimal amount3;

    @JsonProperty("note")
    private String note;

    @JsonProperty("head")
    private int head;

    @JsonProperty("delete")
    private int delete;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public BigDecimal getAmount1() {
        return amount1;
    }

    public void setAmount1(BigDecimal amount1) {
        this.amount1 = amount1;
    }

    public BigDecimal getAmount2() {
        return amount2;
    }

    public void setAmount2(BigDecimal amount2) {
        this.amount2 = amount2;
    }

    public BigDecimal getAmount3() {
        return amount3;
    }

    public void setAmount3(BigDecimal amount3) {
        this.amount3 = amount3;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public int getHead() {
        return head;
    }

    public void setHead(int head) {
        this.head = head;
    }

    public int getDelete() {
        return delete;
    }

    public void setDelete(int delete) {
        this.delete = delete;
    }
}
