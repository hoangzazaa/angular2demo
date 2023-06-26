package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0402.model.OrderJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040205Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("orders")
    private List<OrderJson> orders;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<OrderJson> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderJson> orders) {
        this.orders = orders;
    }
}
