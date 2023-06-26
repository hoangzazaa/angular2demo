package vn.vnext.sefuri.sf.json.SF00202.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00202.model.DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0020204Res extends AbstractJson{
    @JsonProperty("totalRecords")
    private int totalRecords;

    @JsonProperty("deals")
    private List<DealJson> deals;

    @JsonProperty("mstLaminations")
    private List<MstLaminationJson> mstLaminations;

    public int getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(int totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<DealJson> getDeals() {
        return deals;
    }

    public void setDeals(List<DealJson> deals) {
        this.deals = deals;
    }

    public List<MstLaminationJson> getMstLaminations() {
        return mstLaminations;
    }

    public void setMstLaminations(List<MstLaminationJson> mstLaminations) {
        this.mstLaminations = mstLaminations;
    }
}

