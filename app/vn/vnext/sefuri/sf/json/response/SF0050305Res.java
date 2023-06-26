package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.CustomCustomerGoalJson;

import java.util.List;

/**
 * /SF0050305's response specificate
 */
public class SF0050305Res extends AbstractJson {
    @JsonProperty("customerGoals")
    private List<CustomCustomerGoalJson> customerGoals;

    public List<CustomCustomerGoalJson> getCustomerGoals() {
        return customerGoals;
    }

    public void setCustomerGoals(List<CustomCustomerGoalJson> customerGoals) {
        this.customerGoals = customerGoals;
    }
}
