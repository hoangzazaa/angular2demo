package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030205Req extends AbstractJson {
    @JsonProperty("dealProductId")
    private Integer dealProductId;

    public Integer getDealProductId() {
        return dealProductId;
    }

    public void setDealProductId(Integer dealProductId) {
        this.dealProductId = dealProductId;
    }
}
