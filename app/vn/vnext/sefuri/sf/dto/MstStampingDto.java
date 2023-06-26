package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain stamping master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_stamping")
public class MstStampingDto extends BaseDto {

    /* 加工種類 */
    private Integer processingType;
    /* ﾌﾞﾗﾝｸ */
    private Integer blank;
    /* 基本料 */
    private BigDecimal basicCost;
    /* 工賃 */

    private BigDecimal throughWage;

    /**
     * Get processingType
     *
     * @return processingType
     */
    @Basic
    @Column(name = "processing_type")
    public Integer getProcessingType() {
        return processingType;
    }

    /**
     * Set processingType
     *
     * @param processingType Integer
     */
    public void setProcessingType(Integer processingType) {
        this.processingType = processingType;
    }

    /**
     * Get blank
     *
     * @return blank
     */
    @Basic
    @Column(name = "blank")
    public Integer getBlank() {
        return blank;
    }

    /**
     * Set blank
     *
     * @param blank Integer
     */
    public void setBlank(Integer blank) {
        this.blank = blank;
    }

    /**
     * Get basicCost
     *
     * @return basicCost
     */
    @Basic
    @Column(name = "basic_cost")
    public BigDecimal getBasicCost() {
        return basicCost;
    }

    /**
     * Set basicCost
     *
     * @param basicCost BigDecimal
     */
    public void setBasicCost(BigDecimal basicCost) {
        this.basicCost = basicCost;
    }

    /**
     * Get throughWage
     *
     * @return throughWage
     */
    @Basic
    @Column(name = "through_wage")
    public BigDecimal getThroughWage() {
        return throughWage;
    }

    /**
     * Set throughWage
     *
     * @param throughWage BigDecimal
     */
    public void setThroughWage(BigDecimal throughWage) {
        this.throughWage = throughWage;
    }

}