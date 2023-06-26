package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

/**
 * Contain user information used to authenticate and authorize
 *
 * @author vupt
 */
public class SF00301_UserJson extends BaseJson<UserDto> {
    //username
    @JsonProperty("username")
    private String username;

    //userCode
    @JsonProperty("userCode")
    private String userCode;

    @JsonProperty("role")
    private String role;

    //department
    @JsonProperty("department")
    private SF00301_DepartmentJson department;


    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(final String userCode) {
        this.userCode = userCode;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public SF00301_DepartmentJson getDepartment() {
        return department;
    }

    public void setDepartment(final SF00301_DepartmentJson department) {
        this.department = department;
    }

    @Override
    public UserDto getModel() {
        UserDto dto = new UserDto();
        dto.setUserCode(this.userCode);
        dto.setUsername(this.username);
        dto.setRole(this.role);
        return dto;
    }

    @Override
    public void setModel(final UserDto dto) {
        if (dto != null) {
            setData(dto);

            this.username = dto.getUsername();
            this.userCode = dto.getUserCode();
            this.role = dto.getRole();
        }
    }
}
