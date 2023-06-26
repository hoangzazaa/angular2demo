package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by ngocnm on 1/11/2017.
 */
public class SF0030106Req extends AbstractJson {
    @JsonProperty("quotationId")
    private Integer quotationId;

    public Integer getQuotationId() {
        return quotationId;
    }

    public void setQuotationId(Integer quotationId) {
        this.quotationId = quotationId;
    }
}
