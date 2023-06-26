package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;

import java.math.BigDecimal;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstLaminationJson extends BaseJson<MstLaminationDto> {

    //主要原紙表示名
    @JsonProperty("paperName")
    private String paperName;
    //比重
    @JsonProperty("weight")
    private BigDecimal weight;
    //材質C
    @JsonProperty("paperMaterialCode")
    private String paperMaterialCode;
    //品目C
    @JsonProperty("paperCode")
    private String paperCode;
    //主要原紙ID
    @JsonProperty("commonFlag")
    private Integer commonFlag;
    //見積名称
    @JsonProperty("abbr")
    private String abbr;
    //佐賀一般建値
    @JsonProperty("sagaNormValue")
    private BigDecimal sagaNormValue;
    //佐賀部門長建値
    @JsonProperty("sagaHeadValue")
    private BigDecimal sagaHeadValue;
    //小野一般建値
    @JsonProperty("onoNormValue")
    private BigDecimal onoNormValue;
    //小野部門長建値
    @JsonProperty("onoHeadValue")
    private BigDecimal onoHeadValue;
    //多久建値
    @JsonProperty("takuNormValue")
    private BigDecimal takuNormValue;
    //多久部門長建値
    @JsonProperty("takuHeadValue")
    private BigDecimal takuHeadValue;

    @JsonProperty("materialName")
    private String materialName;

    @JsonProperty("paperId")
    private Integer paperId;

    @JsonProperty("hiddenFlag")
    private Integer hiddenFlag;

    public Integer getHiddenFlag() {
        return hiddenFlag;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    public String getPaperMaterialCode() {
        return paperMaterialCode;
    }

    public void setPaperMaterialCode(String paperMaterialCode) {
        this.paperMaterialCode = paperMaterialCode;
    }

    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    public Integer getCommonFlag() {
        return commonFlag;
    }

    public void setCommonFlag(Integer commonFlag) {
        this.commonFlag = commonFlag;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    public BigDecimal getSagaNormValue() {
        return sagaNormValue;
    }

    public void setSagaNormValue(BigDecimal sagaNormValue) {
        this.sagaNormValue = sagaNormValue;
    }

    public BigDecimal getSagaHeadValue() {
        return sagaHeadValue;
    }

    public void setSagaHeadValue(BigDecimal sagaHeadValue) {
        this.sagaHeadValue = sagaHeadValue;
    }

    public BigDecimal getOnoNormValue() {
        return onoNormValue;
    }

    public void setOnoNormValue(BigDecimal onoNormValue) {
        this.onoNormValue = onoNormValue;
    }

    public BigDecimal getOnoHeadValue() {
        return onoHeadValue;
    }

    public void setOnoHeadValue(BigDecimal onoHeadValue) {
        this.onoHeadValue = onoHeadValue;
    }

    public BigDecimal getTakuNormValue() {
        return takuNormValue;
    }

    public void setTakuNormValue(BigDecimal takuNormValue) {
        this.takuNormValue = takuNormValue;
    }

    public BigDecimal getTakuHeadValue() {
        return takuHeadValue;
    }

    public void setTakuHeadValue(BigDecimal takuHeadValue) {
        this.takuHeadValue = takuHeadValue;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

    public void setData(MstLaminationDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.paperName = dto.getPaperName();
        this.weight = dto.getWeight();
        this.paperMaterialCode = dto.getPaperMaterialCode();
        this.paperCode = dto.getPaperCode();
        this.commonFlag = dto.getCommonFlag();
        this.abbr = dto.getAbbr();
        this.sagaNormValue = dto.getSagaNormValue();
        this.sagaHeadValue = dto.getSagaHeadValue();
        this.onoNormValue = dto.getOnoNormValue();
        this.onoHeadValue = dto.getOnoHeadValue();
        this.takuNormValue = dto.getTakuNormValue();
        this.materialName = dto.getMaterialName();
        this.paperId = dto.getPaperId();
        this.hiddenFlag = dto.getHiddenFlag();
    }

    /**
     * Create MstPaperDto
     *
     * @return MstPaperDto
     */

    public MstLaminationDto getData() {
        MstLaminationDto dto = new MstLaminationDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setPaperName(paperName);
        dto.setWeight(weight);
        dto.setPaperMaterialCode(paperMaterialCode);
        dto.setPaperCode(paperCode);
        dto.setCommonFlag(commonFlag);
        dto.setAbbr(abbr);
        dto.setSagaNormValue(sagaNormValue);
        dto.setSagaHeadValue(sagaHeadValue);
        dto.setOnoNormValue(onoNormValue);
        dto.setOnoHeadValue(onoHeadValue);
        dto.setTakuNormValue(takuNormValue);
        dto.setMaterialName(materialName);
        dto.setPaperId(paperId);
        dto.setHiddenFlag(hiddenFlag);

        return dto;
    }
}
