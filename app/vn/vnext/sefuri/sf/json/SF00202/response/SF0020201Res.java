package vn.vnext.sefuri.sf.json.SF00202.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00202.model.DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0020201Res extends AbstractJson {
    @JsonProperty("deals")
    private List<DealJson> dealJsons;

    @JsonProperty("totalRecords")
    private Integer totalRecords;

    @JsonProperty("mstLaminations")
    private List<MstLaminationJson> mstLaminations;

    public List<DealJson> getDealJsons() {
        return dealJsons;
    }

    public void setDealJsons(List<DealJson> dealJsons) {
        this.dealJsons = dealJsons;
    }

    public Integer getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(Integer totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<MstLaminationJson> getMstLaminations() {
        return mstLaminations;
    }

    public void setMstLaminations(List<MstLaminationJson> mstLaminations) {
        this.mstLaminations = mstLaminations;
    }
}
