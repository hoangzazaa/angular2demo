package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain die cutting master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_die_cutting")
public class MstDieCuttingDto extends BaseDto {

    /* 板紙種類 */
    private Integer paperboardType;
    /* サイズ  */
    private Integer size;
    /* 面付 */
    private Integer impositionNumber;
    /* 通数 */
    private Integer throughNumber;
    /* 基本料 */
    private BigDecimal basicCost;
    /* 通工賃 */

    private BigDecimal throughWage;

    /**
     * Get paperboardType
     *
     * @return paperboardType
     */
    @Basic
    @Column(name = "paperboard_type")
    public Integer getPaperboardType() {
        return paperboardType;
    }

    /**
     * Set paperboardType
     *
     * @param paperboardType Integer
     */
    public void setPaperboardType(Integer paperboardType) {
        this.paperboardType = paperboardType;
    }

    /**
     * Get size
     *
     * @return size
     */
    @Basic
    @Column(name = "size")
    public Integer getSize() {
        return size;
    }

    /**
     * Set size
     *
     * @param size Integer
     */
    public void setSize(Integer size) {
        this.size = size;
    }

    /**
     * Get impositionNumber
     *
     * @return impositionNumber
     */
    @Basic
    @Column(name = "imposition_number")
    public Integer getImpositionNumber() {
        return impositionNumber;
    }

    /**
     * Set impositionNumber
     *
     * @param impositionNumber Integer
     */
    public void setImpositionNumber(Integer impositionNumber) {
        this.impositionNumber = impositionNumber;
    }

    /**
     * Get throughNumber
     *
     * @return throughNumber
     */
    @Basic
    @Column(name = "through_number")
    public Integer getThroughNumber() {
        return throughNumber;
    }

    /**
     * Set throughNumber
     *
     * @param throughNumber Integer
     */
    public void setThroughNumber(Integer throughNumber) {
        this.throughNumber = throughNumber;
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