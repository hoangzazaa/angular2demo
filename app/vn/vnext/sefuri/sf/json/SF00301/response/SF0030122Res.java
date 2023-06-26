package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 4/14/2017.
 */
public class SF0030122Res extends AbstractJson {
    @JsonProperty("dealLock")
    private Integer dealLock;

    public Integer getDealLock() {
        return dealLock;
    }

    public void setDealLock(Integer dealLock) {
        this.dealLock = dealLock;
    }
}
