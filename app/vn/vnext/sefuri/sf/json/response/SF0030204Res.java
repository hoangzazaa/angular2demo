package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealProductJson;

/**
 * Created by DungTQ on 1/6/2017.
 */
public class SF0030204Res extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }
}
