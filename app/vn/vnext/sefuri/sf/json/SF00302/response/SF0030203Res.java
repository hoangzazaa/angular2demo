package vn.vnext.sefuri.sf.json.SF00302.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030203Res extends AbstractJson {
    @JsonProperty("product")
    private ProductJson product;

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }
}
