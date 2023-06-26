package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain color master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_color")
public class MstColorDto extends BaseDto {

    /* 色数 */
    private Integer colorOption;
    /* 基本料 */
    private BigDecimal basicCost;
    /* 通工賃 */
    private BigDecimal throughWage;
    /* 一律 */
    private BigDecimal costPerPacket;
    /* 通し工賃分岐 */
    private BigDecimal throughWageBranch;
    private Integer productType;
    private Integer throughNumber;

    /**
     * Get colorOption
     *
     * @return colorOption
     */
    @Basic
    @Column(name = "color_option")
    public Integer getColorOption() {
        return colorOption;
    }

    /**
     * Set colorOption
     *
     * @param colorOption Integer
     */
    public void setColorOption(Integer colorOption) {
        this.colorOption = colorOption;
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

    /**
     * Get costPerPacket
     *
     * @return costPerPacket
     */
    @Basic
    @Column(name = "cost_per_packet")
    public BigDecimal getCostPerPacket() {
        return costPerPacket;
    }

    /**
     * Set costPerPacket
     *
     * @param costPerPacket BigDecimal
     */
    public void setCostPerPacket(BigDecimal costPerPacket) {
        this.costPerPacket = costPerPacket;
    }

    /**
     * Get throughWageBranch
     *
     * @return throughWageBranch
     */
    @Basic
    @Column(name = "through_wage_branch")
    public BigDecimal getThroughWageBranch() {
        return throughWageBranch;
    }

    /**
     * Set throughWageBranch
     *
     * @param throughWageBranch BigDecimal
     */
    public void setThroughWageBranch(BigDecimal throughWageBranch) {
        this.throughWageBranch = throughWageBranch;
    }

    @Basic
    @Column(name = "product_type")
    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    @Basic
    @Column(name = "through_number")
    public Integer getThroughNumber() {
        return throughNumber;
    }

    public void setThroughNumber(Integer throughNumber) {
        this.throughNumber = throughNumber;
    }

}