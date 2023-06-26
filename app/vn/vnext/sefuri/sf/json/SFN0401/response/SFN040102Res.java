package vn.vnext.sefuri.sf.json.SFN0401.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0401.model.PartnerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040102Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("suppliers")
    private List<PartnerJson> suppliers;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<PartnerJson> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<PartnerJson> suppliers) {
        this.suppliers = suppliers;
    }
}
