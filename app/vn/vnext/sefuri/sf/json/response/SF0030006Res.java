package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealJson;
import vn.vnext.sefuri.sf.json.core.UserJson;

public class SF0030006Res extends AbstractJson {
    @JsonProperty("deal")
    private DealJson deal;

    @JsonProperty("saleByCustomer")
    private UserJson saleByCustomer;

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public UserJson getSaleByCustomer() {
        return saleByCustomer;
    }

    public void setSaleByCustomer(UserJson saleByCustomer) {
        this.saleByCustomer = saleByCustomer;
    }
}
