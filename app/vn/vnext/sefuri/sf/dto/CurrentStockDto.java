package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Contain current stock
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_current_stock")
public class CurrentStockDto extends BaseDto {

    /* dennoProductCode */
    private String dennoProductCode;
    /* total */

    private Integer total;

    /**
     * Get dennoProductCode
     *
     * @return dennoProductCode
     */
    @Basic
    @Column(name = "denno_product_code")
    public String getDennoProductCode() {
        return dennoProductCode;
    }

    /**
     * Set dennoProductCode
     *
     * @param dennoProductCode String
     */
    public void setDennoProductCode(String dennoProductCode) {
        this.dennoProductCode = dennoProductCode;
    }

    /**
     * Get total
     *
     * @return total
     */
    @Basic
    @Column(name = "total")
    public Integer getTotal() {
        return total;
    }

    /**
     * Set total
     *
     * @param total Integer
     */
    public void setTotal(Integer total) {
        this.total = total;
    }
}