package vn.vnext.sefuri.sf.json.SF00307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_DealJson;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ProductBox;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_Quotation;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ShippingDestination;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0030701Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00307_DealJson deal;

    @JsonProperty("quotations")
    private List<SF00307_Quotation> quotations = Lists.newArrayList();

    @JsonProperty("productBoxes")
    private List<SF00307_ProductBox> productBoxes = Lists.newArrayList();

    @JsonProperty("shippingDestination")
    private SF00307_ShippingDestination shippingDestination;

    @JsonProperty("shippingHistory")
    private List<SF00307_ShippingDestination> shippingHistory;

    public SF00307_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00307_DealJson deal) {
        this.deal = deal;
    }

    public List<SF00307_Quotation> getQuotations() {
        return quotations;
    }

    public void setQuotations(List<SF00307_Quotation> quotations) {
        this.quotations = quotations;
    }

    public List<SF00307_ProductBox> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00307_ProductBox> productBoxes) {
        this.productBoxes = productBoxes;
    }

    public SF00307_ShippingDestination getShippingDestination() {
        return shippingDestination;
    }

    public void setShippingDestination(SF00307_ShippingDestination shippingDestination) {
        this.shippingDestination = shippingDestination;
    }

    public List<SF00307_ShippingDestination> getShippingHistory() {
        return shippingHistory;
    }

    public void setShippingHistory(List<SF00307_ShippingDestination> shippingHistory) {
        this.shippingHistory = shippingHistory;
    }
}
