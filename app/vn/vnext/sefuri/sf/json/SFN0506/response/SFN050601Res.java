package vn.vnext.sefuri.sf.json.SFN0506.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.SFN0506.model.DepartmentJson;
import vn.vnext.sefuri.sf.json.SFN0506.model.UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN050601Res extends AbstractJson {

    @JsonProperty("departments")
    private List<DepartmentJson> departments;
    @JsonProperty("users")
    private List<UserJson> users;
    @JsonProperty("now")
    private DateTime now;

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

    public DateTime getNow() {
        return now;
    }

    public void setNow(DateTime now) {
        this.now = now;
    }
}
