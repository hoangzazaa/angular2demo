package vn.vnext.sefuri.sf.json.SF00204.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by hoangtd on 4/19/2017.
 */
public class SF0020403Req extends AbstractJson {
    @JsonProperty("dealCodeBefore")
    private String dealCodeBefore;

    @JsonProperty("productId")
    private Integer productId;

    @JsonProperty("dealCodeAfter")
    private String dealCodeAfter;

    public String getDealCodeBefore() {
        return dealCodeBefore;
    }

    public void setDealCodeBefore(String dealCodeBefore) {
        this.dealCodeBefore = dealCodeBefore;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public String getDealCodeAfter() {
        return dealCodeAfter;
    }

    public void setDealCodeAfter(String dealCodeAfter) {
        this.dealCodeAfter = dealCodeAfter;
    }
}