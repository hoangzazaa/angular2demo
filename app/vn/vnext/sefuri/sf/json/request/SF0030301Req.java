package vn.vnext.sefuri.sf.json.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.QuotationItemJson;
import vn.vnext.sefuri.sf.json.core.QuotationJson;

import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
public class SF0030301Req extends AbstractJson {
    @JsonProperty("quotation")
    private QuotationJson quotation;

    @JsonProperty("quotationItems")
    private List<QuotationItemJson> quotationItems;

    public QuotationJson getQuotation() {
        return quotation;
    }

    public void setQuotation(QuotationJson quotation) {
        this.quotation = quotation;
    }

    public List<QuotationItemJson> getQuotationItems() {
        return quotationItems;
    }

    public void setQuotationItems(List<QuotationItemJson> quotationItems) {
        this.quotationItems = quotationItems;
    }
}
