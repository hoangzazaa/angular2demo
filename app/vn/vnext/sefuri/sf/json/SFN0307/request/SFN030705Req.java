package vn.vnext.sefuri.sf.json.SFN0307.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN030705Req extends AbstractJson {

    @JsonProperty("productId")
    private Integer productId;

    @JsonProperty("dealCode")
    private String dealCode;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(final Integer productId) {
        this.productId = productId;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(final String dealCode) {
        this.dealCode = dealCode;
    }
}
