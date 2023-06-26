package vn.vnext.sefuri.sf.json.SF00302.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.DealProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030202Res extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }
}
