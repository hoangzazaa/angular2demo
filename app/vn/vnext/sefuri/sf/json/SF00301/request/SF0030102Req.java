package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030102Req extends AbstractJson {
    @JsonProperty("deal")
    private SF00301_DealJson deal;
    @JsonProperty("customer")
    private SF00301_CustomerJson customer;
    @JsonProperty("saler")
    private SF00301_UserJson saler;

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
}

