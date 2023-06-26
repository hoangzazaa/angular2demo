package vn.vnext.sefuri.sf.json.SFN0307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0307.model.DealJson;
import vn.vnext.sefuri.sf.json.SFN0307.model.OrderItemJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN030703Res extends AbstractJson {

    @JsonProperty("deal")
    private DealJson deal;
    @JsonProperty("orders")
    private List<OrderItemJson> orderItems;

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public List<OrderItemJson> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemJson> orderItems) {
        this.orderItems = orderItems;
    }
}
