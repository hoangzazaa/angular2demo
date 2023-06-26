package vn.vnext.sefuri.sf.json.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SF0030201Req extends AbstractJson {
    @JsonProperty("dealCode")
    private String dealCode;
    @JsonProperty("productCode")
    private String productCode;

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
