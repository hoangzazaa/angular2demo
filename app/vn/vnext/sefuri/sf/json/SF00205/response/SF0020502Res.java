package vn.vnext.sefuri.sf.json.SF00205.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF0020502Res extends AbstractJson {
    @JsonProperty("myboxId")
    private Integer myboxId;

    public Integer getMyboxId() {
        return myboxId;
    }

    public void setMyboxId(Integer myboxId) {
        this.myboxId = myboxId;
    }
}
