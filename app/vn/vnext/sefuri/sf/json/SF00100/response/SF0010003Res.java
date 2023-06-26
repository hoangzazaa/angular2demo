package vn.vnext.sefuri.sf.json.SF00100.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00100.model.DealInfoJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 6/5/2017.
 */
public class SF0010003Res extends AbstractJson {
    @JsonProperty("deals")
    private List<DealInfoJson> deals;

    public List<DealInfoJson> getDeals() {
        return deals;
    }

    public void setDeals(List<DealInfoJson> deals) {
        this.deals = deals;
    }
}
