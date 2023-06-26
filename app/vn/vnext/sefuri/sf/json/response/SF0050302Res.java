package vn.vnext.sefuri.sf.json.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DepartmentGoalJson;

/**
 * Created by NgocNM on 2/9/2017.
 */
public class SF0050302Res extends AbstractJson {
    @JsonProperty("departmentGoal")
    private DepartmentGoalJson departmentGoal;

    public DepartmentGoalJson getDepartmentGoal() {
        return departmentGoal;
    }

    public void setDepartmentGoal(DepartmentGoalJson departmentGoal) {
        this.departmentGoal = departmentGoal;
    }
}
