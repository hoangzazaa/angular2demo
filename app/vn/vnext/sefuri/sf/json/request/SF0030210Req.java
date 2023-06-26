package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductCommonFeeJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030210Req extends AbstractJson {
    @JsonProperty("productCommonFee")
    private ProductCommonFeeJson productCommonFeeJson;

    public ProductCommonFeeJson getProductCommonFeeJson() {
        return productCommonFeeJson;
    }

    public void setProductCommonFeeJson(ProductCommonFeeJson productCommonFeeJson) {
        this.productCommonFeeJson = productCommonFeeJson;
    }
}
