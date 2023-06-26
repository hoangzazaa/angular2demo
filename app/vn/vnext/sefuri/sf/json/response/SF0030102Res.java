package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealJson;

/**
 * Created by TungNT on 1/10/2017.
 */
public class SF0030102Res extends AbstractJson {
    @JsonProperty("deal")
    private DealJson deal;

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }
}
