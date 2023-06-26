package vn.vnext.sefuri.sf.json.SF00311.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.TransHistoryInfoJson;

/**
 * Created by manhnv on 4/11/2017.
 */
public class SF00311_TransHistoryJson extends TransHistoryInfoJson {
    //案件名
    @JsonProperty("dealName")
    private String dealName;

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }
}

