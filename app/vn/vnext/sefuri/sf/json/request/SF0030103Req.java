package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealFileJson;

/**
 * Created by TungNT on 1/11/2017.
 */
public class SF0030103Req extends AbstractJson {
    @JsonProperty("dealFile")
    private DealFileJson dealFileJson;

    public DealFileJson getDealFileJson() {
        return dealFileJson;
    }

    public void setDealFileJson(DealFileJson dealFileJson) {
        this.dealFileJson = dealFileJson;
    }
}
