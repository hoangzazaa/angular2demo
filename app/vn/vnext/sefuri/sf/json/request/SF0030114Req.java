package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by ngocnm on 1/12/2017.
 */
public class SF0030114Req extends AbstractJson {
    @JsonProperty("myBoxId")
    private Integer myBoxId;

    public Integer getMyBoxId() {
        return myBoxId;
    }

    public void setMyBoxId(Integer myBoxId) {
        this.myBoxId = myBoxId;
    }
}
