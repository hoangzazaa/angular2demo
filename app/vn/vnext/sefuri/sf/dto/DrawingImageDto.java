package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain drawing image used for SF008
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_drawing_image")
public class DrawingImageDto extends BaseDto {

    /* productId */
    private Integer productId;
    /* x */
    private Integer x;
    /* y */
    private Integer y;
    /* rotate */

    private Integer rotate;
    /* productRsDrawingImage */
    private ProductDto product;

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
     * Get x
     *
     * @return x
     */
    @Basic
    @Column(name = "x")
    public Integer getX() {
        return x;
    }

    /**
     * Set x
     *
     * @param x Integer
     */
    public void setX(Integer x) {
        this.x = x;
    }

    /**
     * Get y
     *
     * @return y
     */
    @Basic
    @Column(name = "y")
    public Integer getY() {
        return y;
    }

    /**
     * Set y
     *
     * @param y Integer
     */
    public void setY(Integer y) {
        this.y = y;
    }

    /**
     * Get rotate
     *
     * @return rotate
     */
    @Basic
    @Column(name = "rotate")
    public Integer getRotate() {
        return rotate;
    }

    /**
     * Set rotate
     *
     * @param rotate Integer
     */
    public void setRotate(Integer rotate) {
        this.rotate = rotate;
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