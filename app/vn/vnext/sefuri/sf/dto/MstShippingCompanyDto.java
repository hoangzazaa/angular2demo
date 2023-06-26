package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Contain master shipping company
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_shipping_company")
public class MstShippingCompanyDto extends BaseDto {

    /* companyId */
    private Integer companyId;
    /* companyName */

    private String companyName;

    /**
     * Get companyId
     *
     * @return companyId
     */
    @Basic
    @Column(name = "company_id")
    public Integer getCompanyId() {
        return companyId;
    }

    /**
     * Set companyId
     *
     * @param companyId Integer
     */
    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    /**
     * Get companyName
     *
     * @return companyName
     */
    @Basic
    @Column(name = "company_name")
    public String getCompanyName() {
        return companyName;
    }

    /**
     * Set companyName
     *
     * @param companyName String
     */
    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

}