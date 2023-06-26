package vn.vnext.sefuri.sf.json.SF00501.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0050102Req extends AbstractJson {

    @JsonProperty("departmentId")
    private int departmentId;
    @JsonProperty("staffId")
    private int staffId;
    @JsonProperty("startYear")
    private int startYear;
    @JsonProperty("startMonth")
    private int startMonth;
    @JsonProperty("endYear")
    private int endYear;
    @JsonProperty("endMonth")
    private int endMonth;
    @JsonProperty("customerType")
    private int customerType;
    @JsonProperty("summaryType")
    private int summaryType;

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public int getStaffId() {
        return staffId;
    }

    public void setStaffId(int staffId) {
        this.staffId = staffId;
    }

    public int getStartYear() {
        return startYear;
    }

    public void setStartYear(int startYear) {
        this.startYear = startYear;
    }

    public int getStartMonth() {
        return startMonth;
    }

    public void setStartMonth(int startMonth) {
        this.startMonth = startMonth;
    }

    public int getEndYear() {
        return endYear;
    }

    public void setEndYear(int endYear) {
        this.endYear = endYear;
    }

    public int getEndMonth() {
        return endMonth;
    }

    public void setEndMonth(int endMonth) {
        this.endMonth = endMonth;
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
