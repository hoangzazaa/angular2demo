package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0030118Res extends AbstractJson {
    @JsonProperty("customers")
    private List<SF00301_CustomerJson> customers;

    public List<SF00301_CustomerJson> getCustomers() {
        return customers;
    }

    public void setCustomers(List<SF00301_CustomerJson> customers) {
        this.customers = customers;
    }
}
