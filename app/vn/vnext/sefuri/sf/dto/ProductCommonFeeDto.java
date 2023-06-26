package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain information about common fees of a deal product
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_product_common_fee")
public class ProductCommonFeeDto extends BaseDto {

    /* デザイン代 */
    private BigDecimal designFee;
    /* 製版代 */
    private BigDecimal plateMakingFee;
    /* 木型代 */
    private BigDecimal woodenFee;
    /* 金型代 */
    private BigDecimal moldFee;
    /* 樹脂版代 */
    private BigDecimal resinFee;
    /* productId */

    private Integer productId;
    /* productRsProductCommonFee */
    private ProductDto product;

    /**
     * Get designFee
     *
     * @return designFee
     */
    @Basic
    @Column(name = "design_fee")
    public BigDecimal getDesignFee() {
        return designFee;
    }

    /**
     * Set designFee
     *
     * @param designFee BigDecimal
     */
    public void setDesignFee(BigDecimal designFee) {
        this.designFee = designFee;
    }

    /**
     * Get plateMakingFee
     *
     * @return plateMakingFee
     */
    @Basic
    @Column(name = "plate_making_fee")
    public BigDecimal getPlateMakingFee() {
        return plateMakingFee;
    }

    /**
     * Set plateMakingFee
     *
     * @param plateMakingFee BigDecimal
     */
    public void setPlateMakingFee(BigDecimal plateMakingFee) {
        this.plateMakingFee = plateMakingFee;
    }

    /**
     * Get woodenFee
     *
     * @return woodenFee
     */
    @Basic
    @Column(name = "wooden_fee")
    public BigDecimal getWoodenFee() {
        return woodenFee;
    }

    /**
     * Set woodenFee
     *
     * @param woodenFee BigDecimal
     */
    public void setWoodenFee(BigDecimal woodenFee) {
        this.woodenFee = woodenFee;
    }

    /**
     * Get moldFee
     *
     * @return moldFee
     */
    @Basic
    @Column(name = "mold_fee")
    public BigDecimal getMoldFee() {
        return moldFee;
    }

    /**
     * Set moldFee
     *
     * @param moldFee BigDecimal
     */
    public void setMoldFee(BigDecimal moldFee) {
        this.moldFee = moldFee;
    }

    /**
     * Get resinFee
     *
     * @return resinFee
     */
    @Basic
    @Column(name = "resin_fee")
    public BigDecimal getResinFee() {
        return resinFee;
    }

    /**
     * Set resinFee
     *
     * @param resinFee BigDecimal
     */
    public void setResinFee(BigDecimal resinFee) {
        this.resinFee = resinFee;
    }

    /**
     * Get productId
     *
     * @return productId
     */
    @Basic
    @Column(name = "product_id")
    public Integer getProductId() {
        return productId;
    }

    /**
     * Set productId
     *
     * @param productId Integer
     */
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    /**
     * Get product
     *
     * @return product
     */
    @Transient
    public ProductDto getProduct() {
        return product;
    }

    /**
     * Set product
     *
     * @param product ProductDto
     */
    public void setProduct(ProductDto product) {
        this.product = product;
    }

}