package vn.vnext.sefuri.sf.json.SF00202.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 3/3/2017.
 */
public class SF0020202Res extends AbstractJson {
    @JsonProperty("myboxId")
    private Integer myboxId;

    public Integer getMyboxId() {
        return myboxId;
    }

    public void setMyboxId(Integer myboxId) {
        this.myboxId = myboxId;
    }
}
