package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

import java.util.List;

/**
 * Contain department info
 *
 * @author vupt
 */
public class SF00301_DepartmentJson extends BaseJson<DepartmentDto> {
    //department
    @JsonProperty("departmentName")
    private String departmentName;

    //departmentCode
    @JsonProperty("departmentCode")
    private String departmentCode;

    @JsonProperty("users")
    private List<SF00301_UserJson> users;

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(final String departmentName) {
        this.departmentName = departmentName;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(final String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public List<SF00301_UserJson> getUsers() {
        return users;
    }

    public void setUsers(List<SF00301_UserJson> users) {
        this.users = users;
    }

    @Override
    public DepartmentDto getModel() {
        return null;
    }

    @Override
    public void setModel(final DepartmentDto dto) {
        if (dto != null) {
            setData(dto);

            this.departmentName = dto.getDepartment();
            this.departmentCode = dto.getDepartmentCode();
        }
    }
}
