package vn.vnext.sefuri.sf.json.SF00302.request;


import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductOutputJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030209Req extends AbstractJson {
    @JsonProperty("productOutput")
    private ProductOutputJson productOutput;

    public ProductOutputJson getProductOutputJson() {
        return productOutput;
    }

    public void setProductOutputJson(ProductOutputJson productOutput) {
        this.productOutput = productOutput;
    }
}
