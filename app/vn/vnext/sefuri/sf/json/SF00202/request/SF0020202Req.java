package vn.vnext.sefuri.sf.json.SF00202.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 12/8/2016.
 */
public class SF0020202Req extends AbstractJson {
    @JsonProperty("dealId")
    private Integer dealId;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }
}
