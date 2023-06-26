package vn.vnext.sefuri.sf.json.SFN0307.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN030701Req extends AbstractJson {

    @JsonProperty("dealCode")
    private String dealCode;

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
