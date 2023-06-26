package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain user information used to authenticate and authorize
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_user")
public class UserDto extends BaseDto {

    /* username */
    private String username;
    /* password */
    private String password;
    /* enableFlag */
    private Integer enableFlag = 0;
    /* role */
    private String role;
    /* email */
    private String email;
    /* departmentId */
    private Integer departmentId;
    /* departmentCode */
    private String departmentCode;
    //	/* deleteFlag */
    private Integer deleteFlag = 0;
    /* userCode */

    private String userCode;
    /* userRsMyboxItem */
    private List<MyboxItemDto> myboxItems;
    /* userRsDeal */
    private List<DealDto> deals;
    /* userRsComment */
    private List<CommentDto> comments;
    /* userRsUserPasswordRecovery */
    private List<UserPasswordRecoverDto> userPasswordRecovers;
    /* salesRsDeal */
    private List<DealDto> salesDeals;
    /* departmentRsUser */
    private DepartmentDto department;

    /**
     * Get username
     *
     * @return username
     */
    @Basic
    @Column(name = "username")
    public String getUsername() {
        return username;
    }

    /**
     * Set username
     *
     * @param username String
     */
    public void setUsername(String username) {
        this.username = username;
    }

    /**
     * Get password
     *
     * @return password
     */
    @Basic
    @Column(name = "password")
    public String getPassword() {
        return password;
    }

    /**
     * Set password
     *
     * @param password String
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Get enableFlag
     *
     * @return enableFlag
     */
    @Basic
    @Column(name = "enable_flag")
    public Integer getEnableFlag() {
        return enableFlag;
    }

    /**
     * Set enableFlag
     *
     * @param enableFlag Integer
     */
    public void setEnableFlag(Integer enableFlag) {
        this.enableFlag = enableFlag;
    }

    /**
     * Get role
     *
     * @return role
     */
    @Basic
    @Column(name = "role")
    public String getRole() {
        return role;
    }

    /**
     * Set role
     *
     * @param role String
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Get email
     *
     * @return email
     */
    @Basic
    @Column(name = "email")
    public String getEmail() {
        return email;
    }

    /**
     * Set email
     *
     * @param email String
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Get departmentId
     *
     * @return departmentId
     */
    @Basic
    @Column(name = "department_id")
    public Integer getDepartmentId() {
        return departmentId;
    }

    /**
     * Set departmentId
     *
     * @param departmentId Integer
     */
    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    /**
     * Get departmentCode
     *
     * @return departmentCode
     */
    @Basic
    @Column(name = "department_code")
    public String getDepartmentCode() {
        return departmentCode;
    }

    /**
     * Set departmentCode
     *
     * @param departmentCode String
     */
    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    /**
     * Get deleteFlag
     *
     * @return deleteFlag
     */
    @Basic
    @Column(name = "delete_flag")
    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    /**
     * Set deleteFlag
     *
     * @param deleteFlag Integer
     */
    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    /**
     * Get userCode
     *
     * @return userCode
     */
    @Basic
    @Column(name = "user_code")
    public String getUserCode() {
        return userCode;
    }

    /**
     * Set userCode
     *
     * @param userCode String
     */
    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    /**
     * Get myboxItems
     *
     * @return myboxItems
     */
    @Transient
    public List<MyboxItemDto> getMyboxItems() {
        return myboxItems;
    }

    /**
     * Set myboxItems
     *
     * @param myboxItems List<MyboxItemDto>
     */
    public void setMyboxItems(List<MyboxItemDto> myboxItems) {
        this.myboxItems = myboxItems;
    }

    /**
     * Get deals
     *
     * @return deals
     */
    @Transient
    public List<DealDto> getDeals() {
        return deals;
    }

    /**
     * Set deals
     *
     * @param deals List<DealDto>
     */
    public void setDeals(List<DealDto> deals) {
        this.deals = deals;
    }

    /**
     * Get comments
     *
     * @return comments
     */
    @Transient
    public List<CommentDto> getComments() {
        return comments;
    }

    /**
     * Set comments
     *
     * @param comments List<CommentDto>
     */
    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }

    /**
     * Get userPasswordRecovers
     *
     * @return userPasswordRecovers
     */
    @Transient
    public List<UserPasswordRecoverDto> getUserPasswordRecovers() {
        return userPasswordRecovers;
    }

    /**
     * Set userPasswordRecovers
     *
     * @param userPasswordRecovers List<UserPasswordRecoverDto>
     */
    public void setUserPasswordRecovers(List<UserPasswordRecoverDto> userPasswordRecovers) {
        this.userPasswordRecovers = userPasswordRecovers;
    }

    /**
     * Get salesDeals
     *
     * @return salesDeals
     */
    @Transient
    public List<DealDto> getSalesDeals() {
        return salesDeals;
    }

    /**
     * Set salesDeals
     *
     * @param salesDeals List<DealDto>
     */
    public void setSalesDeals(List<DealDto> salesDeals) {
        this.salesDeals = salesDeals;
    }

    /**
     * Get department
     *
     * @return department
     */
    @Transient
    public DepartmentDto getDepartment() {
        return department;
    }

    /**
     * Set department
     *
     * @param department DepartmentDto
     */
    public void setDepartment(DepartmentDto department) {
        this.department = department;
    }

}