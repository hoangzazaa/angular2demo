package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ShippingDestinationDetailJson;

/**
 * POST /SFN040215/:customerCode/:shippingDestinationId の要求
 *
 * TypeScript は client/src/app/response/SFN040215.req.ts
 */
public class SFN040215Req extends AbstractJson {

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
