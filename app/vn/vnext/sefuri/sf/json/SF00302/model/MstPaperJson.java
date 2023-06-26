package vn.vnext.sefuri.sf.json.SF00302.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;

/**
 * Created by vupt9 on 6/23/2017.
 */
public class MstPaperJson extends BaseJson<MstPaperDto> {
    /** 原紙名 ID */
    @JsonProperty("nameId")
    private Integer nameId;

    /** 坪量g/㎡ */
    @JsonProperty("basicWeight")
    private BigDecimal basicWeight;

    /** 建値k@ */
    @JsonProperty("normValue")
    private BigDecimal normValue;

    @JsonProperty("paperMaterialCode")
    private String paperMaterialCode;

    // factoryId
    @JsonProperty("factoryId")
    private Integer factoryId;

    // userRole
    @JsonProperty("userRole")
    private String userRole;

    // lsizeTgrain
    @JsonProperty("lsizeTgrain")
    private Integer lsizeTgrain;

    // lsizeYgrain
    @JsonProperty("lsizeYgrain")
    private Integer lsizeYgrain;

    // ksizeTgrain
    @JsonProperty("ksizeTgrain")
    private Integer ksizeTgrain;

    // ksizeYgrain
    @JsonProperty("ksizeYgrain")
    private Integer ksizeYgrain;

    @JsonProperty("name")
    private String name;

    @JsonProperty("paperId")
    private Integer paperId;

    @JsonProperty("hiddenFlag")
    private Integer hiddenFlag;

    @JsonProperty("width")
    private BigDecimal width;

    @JsonProperty("height")
    private BigDecimal height;

    @JsonProperty("tabNumber")
    private Integer tabNumber;

    @JsonProperty("isPaperClone")
    private Integer isPaperClone;

    @JsonProperty("commonFlag")
    private Integer commonFlag;

    /** シートサイズ ID (sfr_sf_sheet_size.id) (特殊原紙のみ) */
    @JsonProperty("paperSizeId")
    private Integer paperSizeId;


    public Integer getHiddenFlag() {
        return hiddenFlag;
    }

    /**
     * Get nameId
     *
     * @return nameId
     */
    public Integer getNameId() {
        return nameId;
    }

    /**
     * Set nameId
     *
     * @param nameId Integer
     */
    public void setNameId(Integer nameId) {
        this.nameId = nameId;
    }

    /**
     * Get basicWeight
     *
     * @return basicWeight
     */
    public BigDecimal getBasicWeight() {
        return basicWeight;
    }

    /**
     * Set basicWeight
     *
     * @param basicWeight BigDecimal
     */
    public void setBasicWeight(BigDecimal basicWeight) {
        this.basicWeight = basicWeight;
    }

    /**
     * Get normValue
     *
     * @return normValue
     */
    public BigDecimal getNormValue() {
        return normValue;
    }

    /**
     * Set normValue
     *
     * @param normValue BigDecimal
     */
    public void setNormValue(BigDecimal normValue) {
        this.normValue = normValue;
    }

    /**
     * Get factoryId
     *
     * @return factoryId
     */
    public Integer getFactoryId() {
        return factoryId;
    }

    /**
     * Set factoryId
     *
     * @param factoryId Integer
     */
    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

    /**
     * Get userRole
     *
     * @return userRole
     */
    public String getUserRole() {
        return userRole;
    }

    /**
     * Set userRole
     *
     * @param userRole String
     */
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    /**
     * Get lsizeTgrain
     *
     * @return lsizeTgrain
     */
    public Integer getLsizeTgrain() {
        return lsizeTgrain;
    }

    /**
     * Set lsizeTgrain
     *
     * @param lsizeTgrain Integer
     */
    public void setLsizeTgrain(Integer lsizeTgrain) {
        this.lsizeTgrain = lsizeTgrain;
    }

    /**
     * Get lsizeYgrain
     *
     * @return lsizeYgrain
     */
    public Integer getLsizeYgrain() {
        return lsizeYgrain;
    }

    /**
     * Set lsizeYgrain
     *
     * @param lsizeYgrain Integer
     */
    public void setLsizeYgrain(Integer lsizeYgrain) {
        this.lsizeYgrain = lsizeYgrain;
    }

    /**
     * Get ksizeTgrain
     *
     * @return ksizeTgrain
     */
    public Integer getKsizeTgrain() {
        return ksizeTgrain;
    }

    /**
     * Set ksizeTgrain
     *
     * @param ksizeTgrain Integer
     */
    public void setKsizeTgrain(Integer ksizeTgrain) {
        this.ksizeTgrain = ksizeTgrain;
    }

    /**
     * Get ksizeYgrain
     *
     * @return ksizeYgrain
     */
    public Integer getKsizeYgrain() {
        return ksizeYgrain;
    }

    /**
     * Set ksizeYgrain
     *
     * @param ksizeYgrain Integer
     */
    public void setKsizeYgrain(Integer ksizeYgrain) {
        this.ksizeYgrain = ksizeYgrain;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

    public void setHiddenFlag(Integer hiddenFlag) {
        this.hiddenFlag = hiddenFlag;
    }

    public BigDecimal getWidth() {
        return width;
    }

    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }


    public Integer getTabNumber() {
        return tabNumber;
    }

    public void setTabNumber(Integer tabNumber) {
        this.tabNumber = tabNumber;
    }

    public Integer getIsPaperClone() {
        return isPaperClone;
    }

    public void setIsPaperClone(Integer isPaperClone) {
        this.isPaperClone = isPaperClone;
    }

    public Integer getCommonFlag() {
        return commonFlag;
    }

    public void setCommonFlag(Integer commonFlag) {
        this.commonFlag = commonFlag;
    }

    public String getPaperMaterialCode() {
        return paperMaterialCode;
    }

    public void setPaperMaterialCode(String paperMaterialCode) {
        this.paperMaterialCode = paperMaterialCode;
    }

    /**
     * @return シートサイズ ID (sfr_sf_sheet_size.id) (特殊原紙のみ)
     */
    public Integer getPaperSizeId() {
        return paperSizeId;
    }

    /**
     * @param paperSizeId シートサイズ ID (sfr_sf_sheet_size.id) (特殊原紙のみ)
     */
    public void setPaperSizeId(Integer paperSizeId) {
        this.paperSizeId = paperSizeId;
    }

    @Override
    public void setData(MstPaperDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.nameId = dto.getPaperId();
        this.basicWeight = dto.getWeight();
        this.name = dto.getPaperName() == null ? dto.getMaterialName() : dto.getPaperName();
        this.paperId = dto.getPaperId();
        this.hiddenFlag = dto.getHiddenFlag() == null ? 0 : dto.getHiddenFlag();
        this.paperMaterialCode = dto.getPaperMaterialCode();
        this.commonFlag = dto.getCommonFlag();
        if (dto instanceof MstPaperPrc) {
            MstPaperPrc paper = (MstPaperPrc)dto;
            this.paperSizeId = paper.getSheetSizeId();
        }
    }

    @Override
    public MstPaperPrc getData() {
        MstPaperPrc dto = new MstPaperPrc();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setPaperId(paperId);
        dto.setSheetSizeId(paperSizeId);

        return dto;
    }
}
