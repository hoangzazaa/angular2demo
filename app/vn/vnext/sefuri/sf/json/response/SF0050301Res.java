package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DepartmentGoalJson;
import vn.vnext.sefuri.sf.json.core.SaleDataJson;

import java.util.List;

/**
 * Created by TungNT on 2/9/2017.
 */
public class SF0050301Res extends AbstractJson {
    @JsonProperty("departmentGoal")
    private List<DepartmentGoalJson> departmentGoal;

    @JsonProperty("saleData")
    private List<SaleDataJson> saleData;

    public List<DepartmentGoalJson> getDepartmentGoal() {
        return departmentGoal;
    }

    public void setDepartmentGoal(List<DepartmentGoalJson> departmentGoal) {
        this.departmentGoal = departmentGoal;
    }

    public List<SaleDataJson> getSaleData() {
        return saleData;
    }

    public void setSaleData(List<SaleDataJson> saleData) {
        this.saleData = saleData;
    }
}
