package vn.vnext.sefuri.sf.json.SF00205.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF0020502Req extends AbstractJson {
    @JsonProperty("dealId")
    private Integer dealId;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }
}
