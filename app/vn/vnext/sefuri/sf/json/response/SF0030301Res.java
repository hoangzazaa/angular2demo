package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.QuotationItemJson;
import vn.vnext.sefuri.sf.json.core.QuotationJson;

import java.util.ArrayList;
import java.util.List;

/**
 * @author DungTQ
 */
public class SF0030301Res extends AbstractJson {

    @JsonProperty("quotation")
    private QuotationJson quotation = new QuotationJson();

    @JsonProperty("quotationItems")
    private List<QuotationItemJson> quotationItems = new ArrayList<QuotationItemJson>();

    @JsonProperty("messageCode")
    private String messageCode = new String();

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

    public String getMessageCode() {
        return messageCode;
    }

    public void setMessageCode(String messageCode) {
        this.messageCode = messageCode;
    }
}
