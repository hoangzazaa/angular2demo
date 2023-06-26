package vn.vnext.sefuri.sf.json.SF00306.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DepartmentDto;

import java.util.List;

/**
 * Created by ASUS on 6/1/2017.
 */
public class SF00306_DepartmentJson {
    @JsonProperty("id")
    private Integer id;
    //department
    @JsonProperty("department")
    private String department;

    //departmentCode
    @JsonProperty("departmentCode")
    private String departmentCode;

    //type
    @JsonProperty("type")
    private Integer type;

    //mailGroupFlag
    @JsonProperty("mailGroupFlag")
    private Integer mailGroupFlag;

    //departmentRsUser
    @JsonProperty("users")
    private List<SF00306_UserJson>users;

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public List<SF00306_UserJson> getUsers() {
        return users;
    }

    public void setUsers(List<SF00306_UserJson> users) {
        this.users = users;
    }

    public void setData(DepartmentDto dto){
        this.id = dto.getId();
        this.department = dto.getDepartment();
        this.departmentCode = dto.getDepartmentCode();
        this.type = dto.getType();
        this.mailGroupFlag = dto.getMailGroupFlag();
    }

    /**
     * Create DepartmentDto
     *
     * @return DepartmentDto
     */

    public DepartmentDto getData(){
        DepartmentDto dto = new DepartmentDto();
        dto.setId(id);
        dto.setDepartment(department);
        dto.setDepartmentCode(departmentCode);
        dto.setType(type);
        dto.setMailGroupFlag(mailGroupFlag);
        return dto;
    }
}
