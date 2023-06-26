package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.util.List;

/**
 * /SF0050305's json helper
 */
public class CustomerDataJson {
    @JsonProperty("customer")
    private CustomerJson customer;

    @JsonProperty("picId")
    private Integer picId;

    @JsonProperty("year")
    private Integer year;

    @JsonProperty("updatedDate")
    protected DateTime updatedDate;

    @JsonProperty("customerDataItems")
    private List<CustomerDataItemJson> customerDataItems;

    public CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerJson customer) {
        this.customer = customer;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public List<CustomerDataItemJson> getCustomerDataItems() {
        return customerDataItems;
    }

    public void setCustomerDataItems(List<CustomerDataItemJson> customerDataItems) {
        this.customerDataItems = customerDataItems;
    }

    public DateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(DateTime updatedDate) {
        this.updatedDate = updatedDate;
    }
}
