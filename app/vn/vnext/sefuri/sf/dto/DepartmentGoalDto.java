package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain department goal
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_department_goal")
public class DepartmentGoalDto extends BaseDto {

    /* year */
    private Integer year;
    /* activityPolicy */
    private String activityPolicy;
    /* departmentId */

    private Integer departmentId;
    /* departmentRsDepartmentGoal */
    private DepartmentDto department;
    /* departmentGoalRsDepartmentGoalItem */
    private List<DepartmentGoalItemDto> goalItems;

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

    /**
     * Get goalItems
     *
     * @return goalItems
     */
    @Transient
    public List<DepartmentGoalItemDto> getGoalItems() {
        return goalItems;
    }

    /**
     * Set goalItems
     *
     * @param goalItems List<DepartmentGoalItemDto>
     */
    public void setGoalItems(List<DepartmentGoalItemDto> goalItems) {
        this.goalItems = goalItems;
    }
}