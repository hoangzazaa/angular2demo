package vn.vnext.sefuri.sf.json.SF00307.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ShippingDestination;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ShippingInstruction;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by manhnv on 4/17/2017.
 */
public class SF0030705Req extends AbstractJson {
    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("shippingDestination")
    private SF00307_ShippingDestination shippingDestination;

    @JsonProperty("shippingInstructions")
    private List<SF00307_ShippingInstruction> shippingInstructions;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public SF00307_ShippingDestination getShippingDestination() {
        return shippingDestination;
    }

    public void setShippingDestination(final SF00307_ShippingDestination shippingDestination) {
        this.shippingDestination = shippingDestination;
    }

    public List<SF00307_ShippingInstruction> getShippingInstructions() {
        return shippingInstructions;
    }

    public void setShippingInstructions(final List<SF00307_ShippingInstruction> shippingInstructions) {
        this.shippingInstructions = shippingInstructions;
    }
}
