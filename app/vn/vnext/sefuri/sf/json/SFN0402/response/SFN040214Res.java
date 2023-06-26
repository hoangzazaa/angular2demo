package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ShippingDestinationDetailJson;

/**
 * GET /SFN042014/:customerId/:shippingDestinationId  の応答
 *
 * TypeScript は client/src/app/response/SFN040214.res.ts
 */
public class SFN040214Res extends AbstractJson {

    /** 届け先詳細 */
    @JsonProperty("destination")
    public ShippingDestinationDetailJson destination;


    /** @return 届け先詳細 */
    public ShippingDestinationDetailJson getDestination() {
        return destination;
    }

    /** @param destination 届け先詳細 */
    public void setDestination(ShippingDestinationDetailJson destination) {
        this.destination = destination;
    }
}
