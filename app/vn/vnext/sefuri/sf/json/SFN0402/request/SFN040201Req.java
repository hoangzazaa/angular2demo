package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040201Req extends AbstractJson {

    @JsonProperty("type")
    private int type;
    @JsonProperty("code")
    private String code;

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
