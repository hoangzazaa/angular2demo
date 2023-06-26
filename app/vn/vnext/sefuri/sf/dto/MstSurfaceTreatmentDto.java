package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain surface master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_surface_treatment")
public class MstSurfaceTreatmentDto extends BaseDto {

    /* 板紙種類 */
    private Integer varnishType;
    /* サイズ  */
    private Integer size;
    /* 通数 */
    private Integer throughNumber;
    /* 基本料 */
    private BigDecimal basicCost;
    /* 通工賃 */

    private BigDecimal throughWage;

    /**
     * Get varnishType
     *
     * @return varnishType
     */
    @Basic
    @Column(name = "varnish_type")
    public Integer getVarnishType() {
        return varnishType;
    }

    /**
     * Set varnishType
     *
     * @param varnishType Integer
     */
    public void setVarnishType(Integer varnishType) {
        this.varnishType = varnishType;
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