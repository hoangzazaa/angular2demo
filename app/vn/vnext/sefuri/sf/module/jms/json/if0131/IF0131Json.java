package vn.vnext.sefuri.sf.module.jms.json.if0131;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by haipt on 4/25/2017.
 */
public class IF0131Json {

    @JsonProperty("dealId")
    private int dealId;
    @JsonProperty("userId")
    private int userId;

    public int getDealId() {
        return dealId;
    }

    public void setDealId(int dealId) {
        this.dealId = dealId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}