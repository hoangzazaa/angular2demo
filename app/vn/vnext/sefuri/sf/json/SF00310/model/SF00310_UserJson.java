package vn.vnext.sefuri.sf.json.SF00310.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.UserDto;

/**
 * Created by ASUS on 6/1/2017.
 */
public class SF00310_UserJson {
    @JsonProperty("id")
    private Integer id;

    //username
    @JsonProperty("username")
    private String username;

    //password
    @JsonProperty("password")
    private String password;

    //enableFlag
    @JsonProperty("enableFlag")
    private Integer enableFlag;

    //role
    @JsonProperty("role")
    private String role;

    //email
    @JsonProperty("email")
    private String email;

    //departmentId
    @JsonProperty("departmentId")
    private Integer departmentId;

    //departmentCode
    @JsonProperty("departmentCode")
    private String departmentCode;

    //deleteFlag
    @JsonProperty("deleteFlag")
    private Integer deleteFlag;

    //userCode
    @JsonProperty("userCode")
    private String userCode;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getEnableFlag() {
        return enableFlag;
    }

    public void setEnableFlag(Integer enableFlag) {
        this.enableFlag = enableFlag;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    public String getDepartmentCode() {
        return departmentCode;
    }

    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public void setData(UserDto dto){
        this.id = dto.getId();
        this.username = dto.getUsername();
        this.password = dto.getPassword();
        this.enableFlag = dto.getEnableFlag();
        this.role = dto.getRole();
        this.email = dto.getEmail();
        this.departmentId = dto.getDepartmentId();
        this.departmentCode = dto.getDepartmentCode();
        this.deleteFlag = dto.getDeleteFlag();
        this.userCode = dto.getUserCode();
    }

    /**
     * Create UserDto
     *
     * @return UserDto
     */

    public UserDto getData(){
        UserDto dto = new UserDto();
        dto.setId(id);
        dto.setUsername(username);
        dto.setPassword(password);
        dto.setEnableFlag(enableFlag);
        dto.setRole(role);
        dto.setEmail(email);
        dto.setDepartmentId(departmentId);
        dto.setDepartmentCode(departmentCode);
        dto.setDeleteFlag(deleteFlag);
        dto.setUserCode(userCode);
        return dto;
    }
}
