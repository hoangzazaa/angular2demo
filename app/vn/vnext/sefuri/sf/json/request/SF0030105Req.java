package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by ngocnm on 1/11/2017.
 */
public class SF0030105Req extends AbstractJson {
    @JsonProperty("dealFileId")
    private Integer dealFileId;

    public Integer getDealFileId() {
        return dealFileId;
    }

    public void setDealFileId(Integer dealFileId) {
        this.dealFileId = dealFileId;
    }
}
