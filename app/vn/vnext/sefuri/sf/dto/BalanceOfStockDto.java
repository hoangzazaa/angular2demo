package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Contain balance of stock (imported by batch)
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_balance_of_stock")
public class BalanceOfStockDto extends BaseDto {

    /* dennoProductCode */
    private String dennoProductCode;
    /* value */
    private Integer value;
    /* type */

    private Integer type;

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
     * Get value
     *
     * @return value
     */
    @Basic
    @Column(name = "value")
    public Integer getValue() {
        return value;
    }

    /**
     * Set value
     *
     * @param value Integer
     */
    public void setValue(Integer value) {
        this.value = value;
    }

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
}