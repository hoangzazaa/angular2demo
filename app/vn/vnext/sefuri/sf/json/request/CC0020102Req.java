package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class CC0020102Req extends AbstractJson {
    @JsonProperty("token_key")
    private String tokenKey;

    @JsonProperty("password")
    private String password;

    public String getTokenKey() {
        return tokenKey;
    }

    public String getPassword() {
        return password;
    }
}
