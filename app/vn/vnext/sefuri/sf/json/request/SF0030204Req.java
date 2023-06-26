package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealProductJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030204Req extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }
}
