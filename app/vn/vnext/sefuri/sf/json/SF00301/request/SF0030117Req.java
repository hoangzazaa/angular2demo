package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 13/03/2017.
 */
public class SF0030117Req extends AbstractJson {
    @JsonProperty("dealId")
    private Integer dealId;
    @JsonProperty("itemId")
    private Integer itemId;
    @JsonProperty("status")
    private Integer status;
    @JsonProperty("itemType")
    private String itemType;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(final Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(Integer itemId) {
        this.itemId = itemId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getItemType() {
        return itemType;
    }

    public void setItemType(String itemType) {
        this.itemType = itemType;
    }
}
