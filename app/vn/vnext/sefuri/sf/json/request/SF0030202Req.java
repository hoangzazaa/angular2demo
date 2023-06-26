package vn.vnext.sefuri.sf.json.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductJson;


/**
 * Created by TungNT on 1/4/2017.
 */
public class SF0030202Req extends AbstractJson {
    @JsonProperty("product")
    private ProductJson product;
    @JsonProperty("dealCode")
    private String dealCode;

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
