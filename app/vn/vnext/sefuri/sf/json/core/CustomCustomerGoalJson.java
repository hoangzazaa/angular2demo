package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * custom json structure for sf0050305 endpoint
 */
public class CustomCustomerGoalJson extends CustomerGoalJson {
    @JsonProperty("customerDataItems")
    private List<CustomerDataItemJson> customerDataItems;

    @JsonProperty("goalType")
    private Integer goalType;

    public List<CustomerDataItemJson> getCustomerDataItems() {
        return customerDataItems;
    }

    public void setCustomerDataItems(List<CustomerDataItemJson> customerDataItems) {
        this.customerDataItems = customerDataItems;
    }

    public Integer getGoalType() {
        return goalType;
    }

    public void setGoalType(Integer goalType) {
        this.goalType = goalType;
    }

}
