package vn.vnext.sefuri.sf.json.SFN0401.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0401.model.PartnerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040101Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("customers")
    private List<PartnerJson> customers;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<PartnerJson> getCustomers() {
        return customers;
    }

    public void setCustomers(List<PartnerJson> customers) {
        this.customers = customers;
    }
}
