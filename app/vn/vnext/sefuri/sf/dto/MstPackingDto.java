package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain packing master data used for simulation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_packing")
public class MstPackingDto extends BaseDto {

    /* 方法 */
    private Integer method;
    /* ロット */
    private Integer lot;
    /* ％ */

    private BigDecimal percent;

    /**
     * Get method
     *
     * @return method
     */
    @Basic
    @Column(name = "method")
    public Integer getMethod() {
        return method;
    }

    /**
     * Set method
     *
     * @param method Integer
     */
    public void setMethod(Integer method) {
        this.method = method;
    }

    /**
     * Get lot
     *
     * @return lot
     */
    @Basic
    @Column(name = "lot")
    public Integer getLot() {
        return lot;
    }

    /**
     * Set lot
     *
     * @param lot Integer
     */
    public void setLot(Integer lot) {
        this.lot = lot;
    }

    /**
     * Get percent
     *
     * @return percent
     */
    @Basic
    @Column(name = "percent")
    public BigDecimal getPercent() {
        return percent;
    }

    /**
     * Set percent
     *
     * @param percent BigDecimal
     */
    public void setPercent(BigDecimal percent) {
        this.percent = percent;
    }
}