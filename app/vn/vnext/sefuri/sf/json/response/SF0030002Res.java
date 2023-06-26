package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030002Res extends AbstractJson {

    @JsonProperty("myboxId")
    private Integer myboxId;

    public SF0030002Res(Integer myboxId) {
        this.setMyboxId(myboxId);
    }

    public Integer getMyboxId() {
        return myboxId;
    }

    public void setMyboxId(Integer myboxId) {
        this.myboxId = myboxId;
    }
}
