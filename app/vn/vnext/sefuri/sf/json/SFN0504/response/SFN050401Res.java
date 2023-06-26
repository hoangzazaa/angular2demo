package vn.vnext.sefuri.sf.json.SFN0504.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0504.model.DepartmentJson;
import vn.vnext.sefuri.sf.json.SFN0504.model.UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN050401Res extends AbstractJson {

    @JsonProperty("departments")
    private List<DepartmentJson> departments;

    @JsonProperty("users")
    private List<UserJson> users;

    public List<DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<DepartmentJson> departments) {
        this.departments = departments;
    }

    public List<UserJson> getUsers() {
        return users;
    }

    public void setUsers(List<UserJson> users) {
        this.users = users;
    }
}
