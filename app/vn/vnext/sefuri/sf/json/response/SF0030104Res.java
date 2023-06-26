package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealFileJson;

/**
 * Created by TungNT on 1/11/2017.
 */
public class SF0030104Res extends AbstractJson {
    @JsonProperty("dealFile")
    private DealFileJson dealFileJson;

    public DealFileJson getDealFileJson() {
        return dealFileJson;
    }

    public void setDealFileJson(DealFileJson dealFileJson) {
        this.dealFileJson = dealFileJson;
    }
}
