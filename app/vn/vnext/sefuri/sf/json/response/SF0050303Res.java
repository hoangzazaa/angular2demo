package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.CustomerGoalJson;

/**
 * Created by TungNT on 2/13/2017.
 */
public class SF0050303Res extends AbstractJson {
    @JsonProperty("customerGoal")
    private CustomerGoalJson customerGoalJson;

    public CustomerGoalJson getCustomerGoalJson() {
        return customerGoalJson;
    }

    public void setCustomerGoalJson(CustomerGoalJson customerGoalJson) {
        this.customerGoalJson = customerGoalJson;
    }


}
