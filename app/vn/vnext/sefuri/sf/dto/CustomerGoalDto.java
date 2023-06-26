package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain customer goal
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_customer_goal")
public class CustomerGoalDto extends BaseDto {

    /* year */
    private Integer year;
    /* activityPolicy */
    private String activityPolicy;
    /* customerId */
    private Integer customerId;
    /* picId */
    private Integer picId;
    /* departmentId */

    private Integer departmentId;
    /* customerRsCustomerGoal */
    private CustomerDto customer;
    /* customerGoalRsCustomerGoalItem */
    private List<CustomerGoalItemDto> goalItems;
    /* customerRsUser */
    private UserDto user;
    /* departmentRsDepartmentGoal */
    private DepartmentDto department;

    /**
     * Get year
     *
     * @return year
     */
    @Basic
    @Column(name = "year")
    public Integer getYear() {
        return year;
    }

    /**
     * Set year
     *
     * @param year Integer
     */
    public void setYear(Integer year) {
        this.year = year;
    }

    /**
     * Get activityPolicy
     *
     * @return activityPolicy
     */
    @Basic
    @Column(name = "activity_policy")
    public String getActivityPolicy() {
        return activityPolicy;
    }

    /**
     * Set activityPolicy
     *
     * @param activityPolicy String
     */
    public void setActivityPolicy(String activityPolicy) {
        this.activityPolicy = activityPolicy;
    }

    /**
     * Get customerId
     *
     * @return customerId
     */
    @Basic
    @Column(name = "customer_id")
    public Integer getCustomerId() {
        return customerId;
    }

    /**
     * Set customerId
     *
     * @param customerId Integer
     */
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    /**
     * Get picId
     *
     * @return picId
     */
    @Basic
    @Column(name = "pic_id")
    public Integer getPicId() {
        return picId;
    }

    /**
     * Set picId
     *
     * @param picId Integer
     */
    public void setPicId(Integer picId) {
        this.picId = picId;
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
     * Get customer
     *
     * @return customer
     */
    @Transient
    public CustomerDto getCustomer() {
        return customer;
    }

    /**
     * Set customer
     *
     * @param customer CustomerDto
     */
    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    /**
     * Get goalItems
     *
     * @return goalItems
     */
    @Transient
    public List<CustomerGoalItemDto> getGoalItems() {
        return goalItems;
    }

    /**
     * Set goalItems
     *
     * @param goalItems List<CustomerGoalItemDto>
     */
    public void setGoalItems(List<CustomerGoalItemDto> goalItems) {
        this.goalItems = goalItems;
    }

    /**
     * Get user
     *
     * @return user
     */
    @Transient
    public UserDto getUser() {
        return user;
    }

    /**
     * Set user
     *
     * @param user UserDto
     */
    public void setUser(UserDto user) {
        this.user = user;
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