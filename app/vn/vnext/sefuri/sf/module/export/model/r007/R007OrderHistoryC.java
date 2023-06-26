package vn.vnext.sefuri.sf.module.export.model.r007;

/**
 * Created by username on 7/20/2017.
 */
public class R007OrderHistoryC {
    // a.1. 受注日/ Ngày order
    private String orderHistory;
    // a.2. 数量/ Quantity
    private String quantityHistory;
    // a.3. 単価/ Unit price
    private String unitPriceHistory;
    // a.4. 納期/ Delivery date
    private String deliveryDateHistory;

    public String getOrderHistory() {
        return orderHistory;
    }

    public void setOrderHistory(String orderHistory) {
        this.orderHistory = orderHistory;
    }

    public String getQuantityHistory() {
        return quantityHistory;
    }

    public void setQuantityHistory(String quantityHistory) {
        this.quantityHistory = quantityHistory;
    }

    public String getUnitPriceHistory() {
        return unitPriceHistory;
    }

    public void setUnitPriceHistory(String unitPriceHistory) {
        this.unitPriceHistory = unitPriceHistory;
    }

    public String getDeliveryDateHistory() {
        return deliveryDateHistory;
    }

    public void setDeliveryDateHistory(String deliveryDateHistory) {
        this.deliveryDateHistory = deliveryDateHistory;
    }
}
