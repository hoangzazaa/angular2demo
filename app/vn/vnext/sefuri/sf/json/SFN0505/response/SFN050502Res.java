package vn.vnext.sefuri.sf.json.SFN0505.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0505.model.ShippingJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN050502Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("shippings")
    private List<ShippingJson> shippings;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<ShippingJson> getShippings() {
        return shippings;
    }

    public void setShippings(List<ShippingJson> shippings) {
        this.shippings = shippings;
    }
}
