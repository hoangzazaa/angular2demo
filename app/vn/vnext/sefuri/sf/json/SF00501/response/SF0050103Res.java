package vn.vnext.sefuri.sf.json.SF00501.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00501.model.DealJson;
import vn.vnext.sefuri.sf.json.SF00501.model.SF00501_ProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0050103Res extends AbstractJson {

    @JsonProperty("deals")
    private List<DealJson> deals;

    @JsonProperty("products")
    private List<SF00501_ProductJson> productJsons;

    @JsonProperty("laminations")
    private List<MstLaminationJson> laminations;

    public List<DealJson> getDeals() {
        return deals;
    }

    public void setDeals(List<DealJson> deals) {
        this.deals = deals;
    }

    public List<SF00501_ProductJson> getProductJsons() {
        return productJsons;
    }

    public void setProductJsons(List<SF00501_ProductJson> productJsons) {
        this.productJsons = productJsons;
    }

    public List<MstLaminationJson> getLaminations() {
        return laminations;
    }

    public void setLaminations(List<MstLaminationJson> laminations) {
        this.laminations = laminations;
    }
}
