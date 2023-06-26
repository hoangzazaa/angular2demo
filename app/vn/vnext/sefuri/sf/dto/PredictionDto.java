package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_prediction")
public class PredictionDto extends BaseDto {

    /* customerId */
    private Integer customerId;
    /* year */
    private Integer year;
    /* month */
    private Integer month;
    /* type1Goal */
    private BigDecimal type1Goal;
    /* type2Goal */
    private BigDecimal type2Goal;
    /* type3Goal */
    private BigDecimal type3Goal;
    /* headFlag */
    private Integer headFlag = 0;
    /* note */
    private String note;

    /**
     * Get type1Goal
     *
     * @return type1Goal
     */
    @Basic
    @Column(name = "type1_goal")
    public BigDecimal getType1Goal() {
        return type1Goal;
    }

    /**
     * Set type1Goal
     *
     * @param type1Goal BigDecimal
     */
    public void setType1Goal(BigDecimal type1Goal) {
        this.type1Goal = type1Goal;
    }

    /**
     * Get type2Goal
     *
     * @return type2Goal
     */
    @Basic
    @Column(name = "type2_goal")
    public BigDecimal getType2Goal() {
        return type2Goal;
    }

    /**
     * Set type2Goal
     *
     * @param type2Goal BigDecimal
     */
    public void setType2Goal(BigDecimal type2Goal) {
        this.type2Goal = type2Goal;
    }

    /**
     * Get type3Goal
     *
     * @return type3Goal
     */
    @Basic
    @Column(name = "type3_goal")
    public BigDecimal getType3Goal() {
        return type3Goal;
    }

    /**
     * Set type3Goal
     *
     * @param type3Goal BigDecimal
     */
    public void setType3Goal(BigDecimal type3Goal) {
        this.type3Goal = type3Goal;
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
     * Get headFlag
     *
     * @return headFlag
     */
    @Basic
    @Column(name = "head_flag")
    public Integer getHeadFlag() {
        return headFlag;
    }

    /**
     * Set headFlag
     *
     * @param headFlag Integer
     */
    public void setHeadFlag(Integer headFlag) {
        this.headFlag = headFlag;
    }

    /**
     * Get note
     *
     * @return note
     */
    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    /**
     * Set note
     *
     * @param note String
     */
    public void setNote(String note) {
        this.note = note;
    }

    @Basic
    @Column(name = "year")
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Basic
    @Column(name = "month")
    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }
}