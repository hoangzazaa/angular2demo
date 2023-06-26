package vn.vnext.sefuri.sf.json.SF00307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030705Res extends AbstractJson {
    @JsonProperty("dealCode")
    private String dealCode;

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
