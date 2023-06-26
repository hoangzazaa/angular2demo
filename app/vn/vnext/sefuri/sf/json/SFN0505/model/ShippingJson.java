package vn.vnext.sefuri.sf.json.SFN0505.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

public class ShippingJson {

    @JsonProperty("id")
    private int id;
    @JsonProperty("shippingDate")
    private DateTime shippingDate;
    @JsonProperty("planQuantity")
    private int planQuantity;
    @JsonProperty("actualQuantity")
    private int actualQuantity;
    @JsonProperty("deal")
    private DealJson deal;
    @JsonProperty("product")
    private ProductJson product;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public DateTime getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(DateTime shippingDate) {
        this.shippingDate = shippingDate;
    }

    public int getPlanQuantity() {
        return planQuantity;
    }

    public void setPlanQuantity(int planQuantity) {
        this.planQuantity = planQuantity;
    }

    public int getActualQuantity() {
        return actualQuantity;
    }

    public void setActualQuantity(int actualQuantity) {
        this.actualQuantity = actualQuantity;
    }

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }
}
