package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030102Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00301_DealJson deal;

    public SF00301_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00301_DealJson deal) {
        this.deal = deal;
    }
}
