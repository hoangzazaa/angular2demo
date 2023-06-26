package vn.vnext.sefuri.sf.json.SF00307.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ShippingInstruction;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0030704Req extends AbstractJson {
    @JsonProperty("productId")
    private Integer productId;

    @JsonProperty("dealCode")
    private String dealCode;

    @JsonProperty("shippingInstruction")
    private SF00307_ShippingInstruction shippingInstruction;

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

    public SF00307_ShippingInstruction getShippingInstruction() {
        return shippingInstruction;
    }

    public void setShippingInstruction(SF00307_ShippingInstruction shippingInstruction) {
        this.shippingInstruction = shippingInstruction;
    }
}
