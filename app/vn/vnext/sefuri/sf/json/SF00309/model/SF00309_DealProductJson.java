package vn.vnext.sefuri.sf.json.SF00309.model;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by hoangtd on 4/14/2017.
 */
public class SF00309_DealProductJson {
    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("productId")
    private Integer productId;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
}
