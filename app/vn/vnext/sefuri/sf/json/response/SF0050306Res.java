package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 2/27/2017.
 */
public class SF0050306Res extends AbstractJson {
    @JsonProperty("financeYear")
    private List<Integer> financeYear;

    public List<Integer> getFinanceYear() {
        return financeYear;
    }

    public void setFinanceYear(List<Integer> financeYear) {
        this.financeYear = financeYear;
    }
}
