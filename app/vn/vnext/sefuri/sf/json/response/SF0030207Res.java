package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductFileJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030207Res extends AbstractJson {
    @JsonProperty("productFile")
    private ProductFileJson productFileJson;

    public ProductFileJson getProductFileJson() {
        return productFileJson;
    }

    public void setProductFileJson(ProductFileJson productFileJson) {
        this.productFileJson = productFileJson;
    }
}
