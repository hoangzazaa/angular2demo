package vn.vnext.sefuri.sf.json.SF00311.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00311.model.SF00311_DealJson;
import vn.vnext.sefuri.sf.json.SF00311.model.SF00311_ProductBoxJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0031101Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00311_DealJson deal;

    @JsonProperty("productBoxes")
    private List<SF00311_ProductBoxJson> productBoxes = Lists.newArrayList();

    public SF00311_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00311_DealJson deal) {
        this.deal = deal;
    }

    public List<SF00311_ProductBoxJson> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00311_ProductBoxJson> productBoxes) {
        this.productBoxes = productBoxes;
    }

}
