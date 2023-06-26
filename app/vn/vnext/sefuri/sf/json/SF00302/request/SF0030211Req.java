package vn.vnext.sefuri.sf.json.SF00302.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.OfferJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030211Req extends AbstractJson {
    @JsonProperty("offer")
    private OfferJson offerJson;

    @JsonProperty("dealCode")
    private String dealCode;

    @JsonProperty("productCode")
    private String productCode;

    public OfferJson getOfferJson() {
        return offerJson;
    }

    public void setOfferJson(OfferJson offerJson) {
        this.offerJson = offerJson;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }
}
