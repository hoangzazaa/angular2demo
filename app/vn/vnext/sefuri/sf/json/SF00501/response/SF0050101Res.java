package vn.vnext.sefuri.sf.json.SF00501.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.SF00501.model.AgentJson;
import vn.vnext.sefuri.sf.json.SF00501.model.UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050101Res extends AbstractJson {

    @JsonProperty("departments")
    private List<AgentJson> departments;

    @JsonProperty("staffs")
    private List<UserJson> staffs;

    @JsonProperty("now")
    private DateTime now;

    public List<AgentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<AgentJson> departments) {
        this.departments = departments;
    }

    public List<UserJson> getStaffs() {
        return staffs;
    }

    public void setStaffs(List<UserJson> staffs) {
        this.staffs = staffs;
    }

    public DateTime getNow() {
        return now;
    }

    public void setNow(DateTime now) {
        this.now = now;
    }
}
