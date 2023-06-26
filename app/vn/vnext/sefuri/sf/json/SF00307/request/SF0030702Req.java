package vn.vnext.sefuri.sf.json.SF00307.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030702Req extends AbstractJson {

    @JsonProperty("quotationId")
    private Integer quotationId;

    @JsonProperty("dealId")
    private Integer dealId;

    public Integer getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(Integer quotationId) {
        this.quotationId = quotationId;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }
}
