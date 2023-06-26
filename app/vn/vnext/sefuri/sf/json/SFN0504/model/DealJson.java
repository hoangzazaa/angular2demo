package vn.vnext.sefuri.sf.json.SFN0504.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DealJson {

    @JsonProperty("code")
    protected String code;
    @JsonProperty("restriction")
    protected Integer restriction;
    @JsonProperty("customer")
    protected CustomerJson customer;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getRestriction() {
        return restriction;
    }

    public void setRestriction(Integer restriction) {
        this.restriction = restriction;
    }

    public CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerJson customer) {
        this.customer = customer;
    }
}
