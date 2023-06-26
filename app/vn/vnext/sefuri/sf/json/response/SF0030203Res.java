package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductJson;

/**
 * Created by TungNT on 1/6/2017.
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
