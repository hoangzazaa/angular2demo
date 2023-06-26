package vn.vnext.sefuri.sf.json.SF00203.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00203.model.DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 3/8/2017.
 */
public class SF0020301Res extends AbstractJson {
    @JsonProperty("deals")
    private List<DealJson> dealJsons;
    @JsonProperty("totalRecords")
    private Integer totalRecords;

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
}
