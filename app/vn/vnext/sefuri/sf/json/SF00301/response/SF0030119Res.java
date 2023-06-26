package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 4/14/2017.
 */
public class SF0030119Res extends AbstractJson {
    @JsonProperty("dealStatus")
    private Integer dealStatus;

    public SF0030119Res(final Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(final Integer dealStatus) {
        this.dealStatus = dealStatus;
    }
}
