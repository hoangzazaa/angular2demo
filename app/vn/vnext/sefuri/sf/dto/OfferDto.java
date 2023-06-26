package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain offer info
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_offer")
public class OfferDto extends BaseDto {

    /* unitPrice */
    private BigDecimal unitPrice;
    /* total */
    private BigDecimal total;
    /* profitRate */
    private BigDecimal profitRate;
    /* productOutputId */

    private Integer productOutputId;
    /* productOutputRsOffer */
    private ProductOutputDto productOutput;

    /**
     * Get unitPrice
     *
     * @return unitPrice
     */
    @Basic
    @Column(name = "unit_price")
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    /**
     * Set unitPrice
     *
     * @param unitPrice BigDecimal
     */
    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    /**
     * Get total
     *
     * @return total
     */
    @Basic
    @Column(name = "total")
    public BigDecimal getTotal() {
        return total;
    }

    /**
     * Set total
     *
     * @param total BigDecimal
     */
    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    /**
     * Get profitRate
     *
     * @return profitRate
     */
    @Basic
    @Column(name = "profit_rate")
    public BigDecimal getProfitRate() {
        return profitRate;
    }

    /**
     * Set profitRate
     *
     * @param profitRate BigDecimal
     */
    public void setProfitRate(BigDecimal profitRate) {
        this.profitRate = profitRate;
    }

    /**
     * Get productOutputId
     *
     * @return productOutputId
     */
    @Basic
    @Column(name = "product_output_id")
    public Integer getProductOutputId() {
        return productOutputId;
    }

    /**
     * Set productOutputId
     *
     * @param productOutputId Integer
     */
    public void setProductOutputId(Integer productOutputId) {
        this.productOutputId = productOutputId;
    }

    /**
     * Get productOutput
     *
     * @return productOutput
     */
    @Transient
    public ProductOutputDto getProductOutput() {
        return productOutput;
    }

    /**
     * Set productOutput
     *
     * @param productOutput ProductOutputDto
     */
    public void setProductOutput(ProductOutputDto productOutput) {
        this.productOutput = productOutput;
    }

}