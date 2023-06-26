package vn.vnext.sefuri.sf.json.SF00202.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00202.model.DealJson;
import vn.vnext.sefuri.sf.json.SF00202.model.QuotationItemJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class CustomDealQuotationItems extends AbstractJson {
    @JsonProperty("deal")
    private DealJson deal;

    @JsonProperty("quotationItems")
    private List<QuotationItemJson> quotationItems ;

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public List<QuotationItemJson> getQuotationItems() {
        return quotationItems;
    }

    public void setQuotationItems(List<QuotationItemJson> quotationItems) {
        this.quotationItems = quotationItems;
    }
}
