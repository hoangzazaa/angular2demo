package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 13/03/2017.
 */
public class SF0030116Req extends AbstractJson {
    @JsonProperty("deal")
    private SF00301_DealJson deal;
    @JsonProperty("customer")
    private SF00301_CustomerJson customer;
    @JsonProperty("copyFrom")
    private String copyFrom;
    @JsonProperty("saler")
    private SF00301_UserJson saler;

    public SF00301_DealJson getDeal() {
        return deal;
    }

    public void setDeal(final SF00301_DealJson deal) {
        this.deal = deal;
    }

    public SF00301_CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(SF00301_CustomerJson customer) {
        this.customer = customer;
    }

    public String getCopyFrom() {
        return copyFrom;
    }

    public void setCopyFrom(String copyFrom) {
        this.copyFrom = copyFrom;
    }

    public SF00301_UserJson getSaler() {
        return saler;
    }

    public void setSaler(SF00301_UserJson saler) {
        this.saler = saler;
    }
}
