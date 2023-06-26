package vn.vnext.sefuri.sf.json.SF00205.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00205.model.SF00205_DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF0020502ResultData extends AbstractJson {
    @JsonProperty("totalRecords")
    private long totalRecords = 0;

    @JsonProperty("deals")
    private List<SF00205_DealJson> deals = Lists.newArrayList();

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(final long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<SF00205_DealJson> getDeals() {
        return deals;
    }

    public void setDeals(final List<SF00205_DealJson> deals) {
        this.deals = deals;
    }
}
