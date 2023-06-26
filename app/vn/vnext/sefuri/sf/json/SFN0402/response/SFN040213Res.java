package vn.vnext.sefuri.sf.json.SFN0402.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.SimpleShippingDestinationJson;

/**
 * GET /SFN040213/:customerId の応答
 *
 * TypeScript は client/src/app/response/SFN040213.res.ts
 */
public class SFN040213Res extends AbstractJson {

    /** ID と名前だけの届け先一覧 */
    @JsonProperty("destinations")
    public List<SimpleShippingDestinationJson> destinations;

    /** @return ID と名前だけの届け先一覧 */
    public List<SimpleShippingDestinationJson> getDestinations() {
        return destinations;
    }

    /** @param destinations ID と名前だけの届け先一覧 */
    public void setDestinations(List<SimpleShippingDestinationJson> destinations) {
        this.destinations = destinations;
    }
}
