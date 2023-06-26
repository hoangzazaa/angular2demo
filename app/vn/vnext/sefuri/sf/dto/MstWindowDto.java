package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain window creating master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_window")
public class MstWindowDto extends BaseDto {

    /* 寸法 */
    private Integer windowSize;
    /* ロット */
    private Integer windowLot;
    /* 材質 */
    private Integer windowMaterial;
    /* 準備料 */
    private BigDecimal windowPreparationFee;
    /* 通工賃 */

    private BigDecimal windowThroughWage;

    /**
     * Get windowSize
     *
     * @return windowSize
     */
    @Basic
    @Column(name = "window_size")
    public Integer getWindowSize() {
        return windowSize;
    }

    /**
     * Set windowSize
     *
     * @param windowSize Integer
     */
    public void setWindowSize(Integer windowSize) {
        this.windowSize = windowSize;
    }

    /**
     * Get windowLot
     *
     * @return windowLot
     */
    @Basic
    @Column(name = "window_lot")
    public Integer getWindowLot() {
        return windowLot;
    }

    /**
     * Set windowLot
     *
     * @param windowLot Integer
     */
    public void setWindowLot(Integer windowLot) {
        this.windowLot = windowLot;
    }

    /**
     * Get windowMaterial
     *
     * @return windowMaterial
     */
    @Basic
    @Column(name = "window_material")
    public Integer getWindowMaterial() {
        return windowMaterial;
    }

    /**
     * Set windowMaterial
     *
     * @param windowMaterial Integer
     */
    public void setWindowMaterial(Integer windowMaterial) {
        this.windowMaterial = windowMaterial;
    }

    /**
     * Get windowPreparationFee
     *
     * @return windowPreparationFee
     */
    @Basic
    @Column(name = "window_preparation_fee")
    public BigDecimal getWindowPreparationFee() {
        return windowPreparationFee;
    }

    /**
     * Set windowPreparationFee
     *
     * @param windowPreparationFee BigDecimal
     */
    public void setWindowPreparationFee(BigDecimal windowPreparationFee) {
        this.windowPreparationFee = windowPreparationFee;
    }

    /**
     * Get windowThroughWage
     *
     * @return windowThroughWage
     */
    @Basic
    @Column(name = "window_through_wage")
    public BigDecimal getWindowThroughWage() {
        return windowThroughWage;
    }

    /**
     * Set windowThroughWage
     *
     * @param windowThroughWage BigDecimal
     */
    public void setWindowThroughWage(BigDecimal windowThroughWage) {
        this.windowThroughWage = windowThroughWage;
    }

}