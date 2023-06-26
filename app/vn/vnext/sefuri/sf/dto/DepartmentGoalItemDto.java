package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain department goal item
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_department_goal_item")
public class DepartmentGoalItemDto extends BaseDto {

    /* type */
    private Integer type;
    /* goal */
    private BigDecimal goal;
    /* month */
    private Integer month;
    /* departmentGoalId */
    private Integer departmentGoalId;
    /* customerType */

    private Integer customerType;
    /* departmentGoalRsDepartmentGoalItem */
    private DepartmentGoalDto departmentGoal;

    /**
     * Get type
     *
     * @return type
     */
    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    /**
     * Set type
     *
     * @param type Integer
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * Get goal
     *
     * @return goal
     */
    @Basic
    @Column(name = "goal")
    public BigDecimal getGoal() {
        return goal;
    }

    /**
     * Set goal
     *
     * @param goal BigDecimal
     */
    public void setGoal(BigDecimal goal) {
        this.goal = goal;
    }

    /**
     * Get month
     *
     * @return month
     */
    @Basic
    @Column(name = "month")
    public Integer getMonth() {
        return month;
    }

    /**
     * Set month
     *
     * @param month Integer
     */
    public void setMonth(Integer month) {
        this.month = month;
    }

    /**
     * Get departmentGoalId
     *
     * @return departmentGoalId
     */
    @Basic
    @Column(name = "department_goal_id")
    public Integer getDepartmentGoalId() {
        return departmentGoalId;
    }

    /**
     * Set departmentGoalId
     *
     * @param departmentGoalId Integer
     */
    public void setDepartmentGoalId(Integer departmentGoalId) {
        this.departmentGoalId = departmentGoalId;
    }

    /**
     * Get customerType
     *
     * @return customerType
     */
    @Basic
    @Column(name = "customer_type")
    public Integer getCustomerType() {
        return customerType;
    }

    /**
     * Set customerType
     *
     * @param customerType Integer
     */
    public void setCustomerType(Integer customerType) {
        this.customerType = customerType;
    }

    /**
     * Get departmentGoal
     *
     * @return departmentGoal
     */
    @Transient
    public DepartmentGoalDto getDepartmentGoal() {
        return departmentGoal;
    }

    /**
     * Set departmentGoal
     *
     * @param departmentGoal DepartmentGoalDto
     */
    public void setDepartmentGoal(DepartmentGoalDto departmentGoal) {
        this.departmentGoal = departmentGoal;
    }
}