package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 13/03/2017.
 */
public class SF0030117Res extends AbstractJson {
    @JsonProperty("dealStatus")
    private Integer dealStatus;

    @JsonProperty("status")
    private Integer status;

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(final Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
