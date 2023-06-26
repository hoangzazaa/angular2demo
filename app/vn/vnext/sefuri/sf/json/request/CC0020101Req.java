package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class CC0020101Req extends AbstractJson {
    @JsonProperty("email")
    private String email;

    public String getEmail() {
        return email;
    }
}
