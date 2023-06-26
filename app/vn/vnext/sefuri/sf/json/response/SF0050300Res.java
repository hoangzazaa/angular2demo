package vn.vnext.sefuri.sf.json.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;

import java.util.List;

/**
 * Created by NgocNM on 2/9/2017.
 */
public class SF0050300Res extends AbstractJson {
    @JsonProperty("departments")
    private List<DepartmentJson> departments;

    public List<DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<DepartmentJson> departments) {
        this.departments = departments;
    }
}
