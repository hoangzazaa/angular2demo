package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 5/11/2017.
 */
public class SF0030105Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00301_DealJson deal;
    @JsonProperty("customer")
    private SF00301_CustomerJson customer;
    @JsonProperty("saler")
    private SF00301_UserJson saler;
    @JsonProperty("hasRegisteredCustomer")
    private boolean hasRegisteredCustomer;

    public SF00301_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00301_DealJson deal) {
        this.deal = deal;
    }

    public SF00301_CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(SF00301_CustomerJson customer) {
        this.customer = customer;
    }

    public SF00301_UserJson getSaler() {
        return saler;
    }

    public void setSaler(SF00301_UserJson saler) {
        this.saler = saler;
    }

    public boolean isHasRegisteredCustomer() {
        return hasRegisteredCustomer;
    }

    public void setHasRegisteredCustomer(final boolean hasRegisteredCustomer) {
        this.hasRegisteredCustomer = hasRegisteredCustomer;
    }
}