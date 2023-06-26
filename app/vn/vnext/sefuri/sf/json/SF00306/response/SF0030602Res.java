package vn.vnext.sefuri.sf.json.SF00306.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00306.model.SF00306_DealProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030602Res extends AbstractJson {

    @JsonProperty("dealProducts")
    private SF00306_DealProductJson dealProducts;

    public SF00306_DealProductJson getDealProducts() {
        return dealProducts;
    }

    public void setDealProducts(SF00306_DealProductJson dealProducts) {
        this.dealProducts = dealProducts;
    }
}
