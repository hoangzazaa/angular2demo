package vn.vnext.sefuri.sf.json.SF00204.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.TransHistoryInfoJson;

/**
 * Created by nguyenPK on 4/19/2017.
 */
public class SF00204_TransHistoryJson extends TransHistoryInfoJson {
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

