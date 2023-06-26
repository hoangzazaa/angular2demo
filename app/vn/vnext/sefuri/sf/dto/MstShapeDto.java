package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain master shape
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_shape")
public class MstShapeDto extends BaseDto {

    /* name */
    private String name;
    /* note */
    private String note;
    /* width */
    private BigDecimal width;
    /* height */
    private BigDecimal height;
    /* depth */
    private BigDecimal depth;
    /* flap */
    private BigDecimal flap;
    /* insertion */
    private BigDecimal insertion;
    /* grain */
    private Integer grain;
    /* developmentWidth */
    private BigDecimal developmentWidth;
    /* developmentHeight */
    private BigDecimal developmentHeight;
    /* minWidth */
    private BigDecimal minWidth;
    /* minHeight */
    private BigDecimal minHeight;
    /* maxWidth */
    private BigDecimal maxWidth;
    /* maxHeight */
    private BigDecimal maxHeight;
    /* minDepth */
    private BigDecimal minDepth;
    /* maxDepth */
    private BigDecimal maxDepth;
    /* fileId */
    private Integer fileId;

    private BigDecimal gluingPart;

    @Basic
    @Column(name = "gluing_part")
    public BigDecimal getGluingPart() {
        return gluingPart;
    }

    public void setGluingPart(BigDecimal gluingPart) {
        this.gluingPart = gluingPart;
    }

    /**
     * Get name
     *
     * @return name
     */
    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    /**
     * Set name
     *
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get note
     *
     * @return note
     */
    @Basic
    @Column(name = "note")
    public String getNote() {
        return note;
    }

    /**
     * Set note
     *
     * @param note String
     */
    public void setNote(String note) {
        this.note = note;
    }

    /**
     * Get width
     *
     * @return width
     */
    @Basic
    @Column(name = "width")
    public BigDecimal getWidth() {
        return width;
    }

    /**
     * Set width
     *
     * @param width BigDecimal
     */
    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    /**
     * Get height
     *
     * @return height
     */
    @Basic
    @Column(name = "height")
    public BigDecimal getHeight() {
        return height;
    }

    /**
     * Set height
     *
     * @param height BigDecimal
     */
    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    /**
     * Get depth
     *
     * @return depth
     */
    @Basic
    @Column(name = "depth")
    public BigDecimal getDepth() {
        return depth;
    }

    /**
     * Set depth
     *
     * @param depth BigDecimal
     */
    public void setDepth(BigDecimal depth) {
        this.depth = depth;
    }

    /**
     * Get flap
     *
     * @return flap
     */
    @Basic
    @Column(name = "flap")
    public BigDecimal getFlap() {
        return flap;
    }

    /**
     * Set flap
     *
     * @param flap BigDecimal
     */
    public void setFlap(BigDecimal flap) {
        this.flap = flap;
    }

    /**
     * Get insertion
     *
     * @return insertion
     */
    @Basic
    @Column(name = "insertion")
    public BigDecimal getInsertion() {
        return insertion;
    }

    /**
     * Set insertion
     *
     * @param insertion BigDecimal
     */
    public void setInsertion(BigDecimal insertion) {
        this.insertion = insertion;
    }

    /**
     * Get grain
     *
     * @return grain
     */
    @Basic
    @Column(name = "grain")
    public Integer getGrain() {
        return grain;
    }

    /**
     * Set grain
     *
     * @param grain Integer
     */
    public void setGrain(Integer grain) {
        this.grain = grain;
    }

    /**
     * Get developmentWidth
     *
     * @return developmentWidth
     */
    @Basic
    @Column(name = "development_width")
    public BigDecimal getDevelopmentWidth() {
        return developmentWidth;
    }

    /**
     * Set developmentWidth
     *
     * @param developmentWidth BigDecimal
     */
    public void setDevelopmentWidth(BigDecimal developmentWidth) {
        this.developmentWidth = developmentWidth;
    }

    /**
     * Get developmentHeight
     *
     * @return developmentHeight
     */
    @Basic
    @Column(name = "development_height")
    public BigDecimal getDevelopmentHeight() {
        return developmentHeight;
    }

    /**
     * Set developmentHeight
     *
     * @param developmentHeight BigDecimal
     */
    public void setDevelopmentHeight(BigDecimal developmentHeight) {
        this.developmentHeight = developmentHeight;
    }

    /**
     * Get minWidth
     *
     * @return minWidth
     */
    @Basic
    @Column(name = "min_width")
    public BigDecimal getMinWidth() {
        return minWidth;
    }

    /**
     * Set minWidth
     *
     * @param minWidth BigDecimal
     */
    public void setMinWidth(BigDecimal minWidth) {
        this.minWidth = minWidth;
    }

    /**
     * Get minHeight
     *
     * @return minHeight
     */
    @Basic
    @Column(name = "min_height")
    public BigDecimal getMinHeight() {
        return minHeight;
    }

    /**
     * Set minHeight
     *
     * @param minHeight BigDecimal
     */
    public void setMinHeight(BigDecimal minHeight) {
        this.minHeight = minHeight;
    }

    /**
     * Get maxWidth
     *
     * @return maxWidth
     */
    @Basic
    @Column(name = "max_width")
    public BigDecimal getMaxWidth() {
        return maxWidth;
    }

    /**
     * Set maxWidth
     *
     * @param maxWidth BigDecimal
     */
    public void setMaxWidth(BigDecimal maxWidth) {
        this.maxWidth = maxWidth;
    }

    /**
     * Get maxHeight
     *
     * @return maxHeight
     */
    @Basic
    @Column(name = "max_height")
    public BigDecimal getMaxHeight() {
        return maxHeight;
    }

    /**
     * Set maxHeight
     *
     * @param maxHeight BigDecimal
     */
    public void setMaxHeight(BigDecimal maxHeight) {
        this.maxHeight = maxHeight;
    }

    /**
     * Get minDepth
     *
     * @return minDepth
     */
    @Basic
    @Column(name = "min_depth")
    public BigDecimal getMinDepth() {
        return minDepth;
    }

    /**
     * Set minDepth
     *
     * @param minDepth BigDecimal
     */
    public void setMinDepth(BigDecimal minDepth) {
        this.minDepth = minDepth;
    }

    /**
     * Get maxDepth
     *
     * @return maxDepth
     */
    @Basic
    @Column(name = "max_depth")
    public BigDecimal getMaxDepth() {
        return maxDepth;
    }

    /**
     * Set maxDepth
     *
     * @param maxDepth BigDecimal
     */
    public void setMaxDepth(BigDecimal maxDepth) {
        this.maxDepth = maxDepth;
    }

    /**
     * Get fileId
     *
     * @return fileId
     */
    @Basic
    @Column(name = "file_id")
    public Integer getFileId() {
        return fileId;
    }

    /**
     * Set fileId
     *
     * @param fileId Integer
     */
    public void setFileId(Integer fileId) {
        this.fileId = fileId;
    }

}