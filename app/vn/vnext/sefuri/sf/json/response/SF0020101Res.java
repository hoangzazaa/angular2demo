package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealJson;

import java.util.List;

/**
 * Created by TungNT on 2/23/2017.
 */
public class SF0020101Res extends AbstractJson {
    @JsonProperty("deals")
    private List<DealJson> dealJsons;

    public List<DealJson> getDealJsons() {
        return dealJsons;
    }

    public void setDealJsons(List<DealJson> dealJsons) {
        this.dealJsons = dealJsons;
    }
}
