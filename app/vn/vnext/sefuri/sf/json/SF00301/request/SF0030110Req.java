package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030110Req extends AbstractJson {
    @JsonProperty("dealId")
    private Integer dealId;
    @JsonProperty("startPosition")
    private Integer startPosition;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getStartPosition() {
        return startPosition;
    }

    public void setStartPosition(Integer startPosition) {
        this.startPosition = startPosition;
    }
}

