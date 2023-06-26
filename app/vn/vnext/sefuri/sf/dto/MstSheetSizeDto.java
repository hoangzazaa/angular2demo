package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * Contain master sheet size
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_sheet_size")
public class MstSheetSizeDto extends BaseDto implements Comparable<MstSheetSizeDto> {

    /* name */
    private String name;
    /* width */
    private BigDecimal width;
    /* height */
    private BigDecimal height;
    /* grain */
    private Integer grain;
    /* popular */
    private Integer wastePaperFlag;

    private Integer specialSizeFlag;

    private Integer paperId;

    private String paperCode;

    private Integer popular;

    private Integer laminationId;


    @Basic
    @Column(name = "paper_id")
    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
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

    @Basic
    @Column(name = "waste_paper_flag")
    public Integer getWastePaperFlag() {
        return wastePaperFlag;
    }

    public void setWastePaperFlag(Integer wastePaperFlag) {
        this.wastePaperFlag = wastePaperFlag;
    }

    @Basic
    @Column(name = "special_size_flag")
    public Integer getSpecialSizeFlag() {
        return specialSizeFlag;
    }

    public void setSpecialSizeFlag(Integer specialSizeFlag) {
        this.specialSizeFlag = specialSizeFlag;
    }

    /**
     * Get popular
     *
     * @return popular
     */
    @Basic
    @Column(name = "popular")
    public Integer getPopular() {
        return popular;
    }

    /**
     * Set popular
     *
     * @param popular Integer
     */
    public void setPopular(Integer popular) {
        this.popular = popular;
    }

    @Basic
    @Column(name = "lamination_id")
    public Integer getLaminationId() {
        return laminationId;
    }

    public void setLaminationId(Integer laminationId) {
        this.laminationId = laminationId;
    }

    @Basic
    @Column(name = "paper_code")
    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    @Override
    public int compareTo(MstSheetSizeDto o) {
        //ascending order
        return this.getWidth().compareTo((o).getWidth());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MstSheetSizeDto that = (MstSheetSizeDto) o;
        return Objects.equals(width, that.width);
    }
}