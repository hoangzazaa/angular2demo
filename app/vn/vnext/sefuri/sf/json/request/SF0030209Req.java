package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductOutputJson;

/**
 * Created by TungNT on 1/6/2017.
 */
public class SF0030209Req extends AbstractJson {
    @JsonProperty("productOutput")
    private ProductOutputJson productOutputJson;

    public ProductOutputJson getProductOutputJson() {
        return productOutputJson;
    }

    public void setProductOutputJson(ProductOutputJson productOutputJson) {
        this.productOutputJson = productOutputJson;
    }
}
