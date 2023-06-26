package vn.vnext.sefuri.sf.json.SF00306.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030603Req extends AbstractJson {
    @JsonProperty("id")
    protected Integer id;

    @JsonProperty("requestLot")
    private Integer requestLot;

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public Integer getRequestLot() {
        return requestLot;
    }

    public void setRequestLot(final Integer requestLot) {
        this.requestLot = requestLot;
    }
}
