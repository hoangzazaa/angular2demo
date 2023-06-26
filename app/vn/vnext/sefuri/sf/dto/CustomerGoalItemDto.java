package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain customer goal items
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_customer_goal_item")
public class CustomerGoalItemDto extends BaseDto {

    /* type */
    private Integer type;
    /* goal */
    private BigDecimal goal;
    /* month */
    private Integer month;
    /* customerGoalId */
    private Integer customerGoalId;
    /* customerType */

    private Integer customerType;
    /* customerGoalRsGoalItem */
    private CustomerGoalDto customerGoal;

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
     * Get customerGoalId
     *
     * @return customerGoalId
     */
    @Basic
    @Column(name = "customer_goal_id")
    public Integer getCustomerGoalId() {
        return customerGoalId;
    }

    /**
     * Set customerGoalId
     *
     * @param customerGoalId Integer
     */
    public void setCustomerGoalId(Integer customerGoalId) {
        this.customerGoalId = customerGoalId;
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
     * Get customerGoal
     *
     * @return customerGoal
     */
    @Transient
    public CustomerGoalDto getCustomerGoal() {
        return customerGoal;
    }

    /**
     * Set customerGoal
     *
     * @param customerGoal CustomerGoalDto
     */
    public void setCustomerGoal(CustomerGoalDto customerGoal) {
        this.customerGoal = customerGoal;
    }

}