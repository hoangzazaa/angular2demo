package vn.vnext.sefuri.sf.json.SF00501.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0050103Req extends AbstractJson {

    @JsonProperty("staffId")
    private int staffId;
    @JsonProperty("year")
    private int year;
    @JsonProperty("month")
    private int month;
    @JsonProperty("customerType")
    private int customerType;
    @JsonProperty("summaryType")
    private int summaryType;

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
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

    public int getCustomerType() {
        return customerType;
    }

    public void setCustomerType(int customerType) {
        this.customerType = customerType;
    }

    public int getSummaryType() {
        return summaryType;
    }

    public void setSummaryType(int summaryType) {
        this.summaryType = summaryType;
    }
}
