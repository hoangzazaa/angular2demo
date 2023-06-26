package vn.vnext.sefuri.sf.json.SFN0401.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserJson {

    @JsonProperty("name")
    private String name;
    @JsonProperty("departmentName")
    private String departmentName;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }
}
