package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain paste master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_paste")
public class MstPasteDto extends BaseDto {

    /* 紙種類 */
    private Integer paperType;
    /* ロット */
    private Integer form;
    /* ﾌﾞﾗﾝｸｻｲｽﾞ */
    private Integer blankSize;
    /* 基本料 */
    private BigDecimal basicCost;
    /* 工賃 */

    private BigDecimal throughWage;

    /**
     * Get paperType
     *
     * @return paperType
     */
    @Basic
    @Column(name = "paper_type")
    public Integer getPaperType() {
        return paperType;
    }

    /**
     * Set paperType
     *
     * @param paperType Integer
     */
    public void setPaperType(Integer paperType) {
        this.paperType = paperType;
    }

    /**
     * Get form
     *
     * @return form
     */
    @Basic
    @Column(name = "form")
    public Integer getForm() {
        return form;
    }

    /**
     * Set form
     *
     * @param form Integer
     */
    public void setForm(Integer form) {
        this.form = form;
    }

    /**
     * Get blankSize
     *
     * @return blankSize
     */
    @Basic
    @Column(name = "blank_size")
    public Integer getBlankSize() {
        return blankSize;
    }

    /**
     * Set blankSize
     *
     * @param blankSize Integer
     */
    public void setBlankSize(Integer blankSize) {
        this.blankSize = blankSize;
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