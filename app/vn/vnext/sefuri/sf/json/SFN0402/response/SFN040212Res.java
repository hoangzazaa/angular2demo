package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0402.model.RevenueJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040212Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("revenues")
    private List<RevenueJson> revenues;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<RevenueJson> getRevenues() {
        return revenues;
    }

    public void setRevenues(List<RevenueJson> revenues) {
        this.revenues = revenues;
    }
}
