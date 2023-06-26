package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030112Req extends AbstractJson {
    @JsonProperty("dealCode")
    private Integer dealCode;

    public Integer getDealCode() {
        return dealCode;
    }

    public void setDealCode(Integer dealCode) {
        this.dealCode = dealCode;
    }
}

