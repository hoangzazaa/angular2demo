package vn.vnext.sefuri.sf.json.SFN0307.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0307.model.OrderItemJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN030703Req extends AbstractJson {

    @JsonProperty("dealId")
    private int dealId;
    @JsonProperty("orders")
    private List<OrderItemJson> orders;
    @JsonProperty("mode")
    private int mode;

    public int getDealId() {
        return dealId;
    }

    public void setDealId(int dealId) {
        this.dealId = dealId;
    }

    public List<OrderItemJson> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderItemJson> orders) {
        this.orders = orders;
    }

    public int getMode() {
        return mode;
    }

    public void setMode(int mode) {
        this.mode = mode;
    }
}
