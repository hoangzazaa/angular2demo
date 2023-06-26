package vn.vnext.sefuri.sf.json.SF00307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.TransHistoryInfoJson;

public class SF00307_TransHistory extends TransHistoryInfoJson {
    @JsonProperty("dealName")
    private String dealName;

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }
}

