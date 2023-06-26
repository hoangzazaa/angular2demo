package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealJson;

/**
 * Created by TungNT on 13/03/2017.
 */
public class SF0030116Req extends AbstractJson {
    @JsonProperty("deal")
    private DealJson dealJson;

    public DealJson getDealJson() {
        return dealJson;
    }

    public void setDealJson(DealJson dealJson) {
        this.dealJson = dealJson;
    }
}
