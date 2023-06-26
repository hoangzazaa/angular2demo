package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;

import java.math.BigDecimal;

/**
 * Contain master sheet size
 *
 * @author vupt
 */
public class MstSheetSizeJson extends BaseJson<MstSheetSizeDto> {

    //name
    @JsonProperty("name")
    private String name;

    //width
    @JsonProperty("width")
    private BigDecimal width;

    //height
    @JsonProperty("height")
    private BigDecimal height;

    //grain
    @JsonProperty("grain")
    private Integer grain;

    //popular
    @JsonProperty("popular")
    private Integer popular;

    @JsonProperty("laminationId")
    private Integer laminationId;

    @JsonProperty("paperId")
    private Integer paperId;

    @JsonProperty("wastePaperFlag")
    private Integer wastePaperFlag;

    @JsonProperty("specialSizeFlag")
    private Integer specialSizeFlag;

    @JsonProperty("paperCode")
    private String paperCode;

    /**
     * Get name
     *
     * @return name
     */
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
    public BigDecimal getWidth() {
        return width;
    }

    /**
     * Set width
     *
     * @param width Integer
     */
    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    /**
     * Get height
     *
     * @return height
     */
    public BigDecimal getHeight() {
        return height;
    }

    /**
     * Set height
     *
     * @param height Integer
     */
    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    /**
     * Get grain
     *
     * @return grain
     */
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
     * Get popular
     *
     * @return popular
     */
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

    public Integer getLaminationId() {
        return laminationId;
    }

    public void setLaminationId(Integer laminationId) {
        this.laminationId = laminationId;
    }

    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

    public Integer getWastePaperFlag() {
        return wastePaperFlag;
    }

    public void setWastePaperFlag(Integer wastePaperFlag) {
        this.wastePaperFlag = wastePaperFlag;
    }

    public Integer getSpecialSizeFlag() {
        return specialSizeFlag;
    }

    public void setSpecialSizeFlag(Integer specialSizeFlag) {
        this.specialSizeFlag = specialSizeFlag;
    }

    /**
     * Create MstSheetSizeDto
     *
     * @return MstSheetSizeDto
     */

    public MstSheetSizeDto getData() {
        MstSheetSizeDto dto = new MstSheetSizeDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setName(name);
        dto.setWidth(width);
        dto.setHeight(height);
        dto.setGrain(grain);
        dto.setPopular(popular);
        dto.setLaminationId(laminationId);
        dto.setPaperCode(paperCode);
        dto.setPaperId(paperId);
        dto.setSpecialSizeFlag(specialSizeFlag);
        dto.setWastePaperFlag(wastePaperFlag);
        return dto;
    }

    /**
     * Create MstSheetSizeJson
     *
     * @param dto MstSheetSizeDto
     */

    public void setData(MstSheetSizeDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.name = dto.getName();
        this.width = dto.getWidth();
        this.height = dto.getHeight();
        this.grain = dto.getGrain();
        this.popular = dto.getPopular();
        this.laminationId = dto.getLaminationId();
        this.paperCode = dto.getPaperCode();
        this.paperId = dto.getPaperId();
        this.specialSizeFlag = dto.getSpecialSizeFlag();
        this.wastePaperFlag = dto.getWastePaperFlag();
    }
}
