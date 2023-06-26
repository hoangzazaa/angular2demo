package vn.vnext.sefuri.sf.json.SFN0506.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0506.model.InvoiceJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN050602Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("payments")
    private List<InvoiceJson> payments;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<InvoiceJson> getPayments() {
        return payments;
    }

    public void setPayments(List<InvoiceJson> payments) {
        this.payments = payments;
    }
}
