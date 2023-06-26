package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by ngocnm on 1/11/2017.
 */
public class SF0030112Req extends AbstractJson {
    @JsonProperty("dealCode")
    private String dealCode;

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
