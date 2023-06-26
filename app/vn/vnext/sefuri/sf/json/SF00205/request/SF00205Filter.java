package vn.vnext.sefuri.sf.json.SF00205.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.io.Serializable;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF00205Filter implements Serializable {
    @JsonProperty("periodType")
    private Integer periodType = 1;

    @JsonProperty("fromDate")
    private DateTime fromDate;

    @JsonProperty("toDate")
    private DateTime toDate;

    @JsonProperty("selectedDepartmentId")
    private Integer selectedDepartmentId;

    @JsonProperty("selectedPicId")
    private Integer selectedPicId;

    @JsonProperty("dealCode")
    private String dealCode;

    @JsonProperty("dealName")
    private String dealName;

    @JsonProperty("customerCode")
    private String customerCode;

    @JsonProperty("customerName")
    private String customerName;

    public Integer getPeriodType() {
        return periodType;
    }

    public void setPeriodType(Integer periodType) {
        this.periodType = periodType;
    }

    public DateTime getFromDate() {
        return fromDate;
    }

    public void setFromDate(DateTime fromDate) {
        this.fromDate = fromDate;
    }

    public DateTime getToDate() {
        return toDate;
    }

    public void setToDate(DateTime toDate) {
        this.toDate = toDate;
    }

    public Integer getSelectedDepartmentId() {
        return selectedDepartmentId;
    }

    public void setSelectedDepartmentId(Integer selectedDepartmentId) {
        this.selectedDepartmentId = selectedDepartmentId;
    }

    public Integer getSelectedPicId() {
        return selectedPicId;
    }

    public void setSelectedPicId(Integer selectedPicId) {
        this.selectedPicId = selectedPicId;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
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
}
