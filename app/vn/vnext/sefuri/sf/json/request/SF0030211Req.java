package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.OfferJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030211Req extends AbstractJson {
    @JsonProperty("offer")
    private OfferJson offerJson;

    public OfferJson getOfferJson() {
        return offerJson;
    }

    public void setOfferJson(OfferJson offerJson) {
        this.offerJson = offerJson;
    }
}
