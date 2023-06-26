package vn.vnext.sefuri.sf.json.SF00302.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.json.core.MstSheetSizeJson;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by ASUS on 6/26/2017.
 */
public class PaperModalJson extends BaseJson<MstLaminationDto>{
    @JsonProperty("id")
    private Integer id;

    @JsonProperty("basicWeight")
    private BigDecimal basicWeight;

    @JsonProperty("weight")
    private BigDecimal weight;

    @JsonProperty("paperMaterialCode")
    private String paperMaterialCode;

    @JsonProperty("paperCode")
    private String paperCode;

    @JsonProperty("commonFlag")
    private Integer commonFlag;

    @JsonProperty("normValue")
    private BigDecimal normValue;

    @JsonProperty("paperId")
    private Integer paperId;

    @JsonProperty("paperName")
    private String paperName;

    @JsonProperty("factoryId")
    private Integer factoryId;

    @JsonProperty("optionId")
    private Integer optionId;

    @JsonProperty("wastepaperFlag")
    private Integer wastepaperFlag;

    @JsonProperty("specialSizeFlag")
    private Integer specialSizeFlag;

    @JsonProperty("hiddenFlag")
    private Integer hiddenFlag;

    @JsonProperty("isPaperClone")
    private Integer isPaperClone;

    @JsonProperty("sheetSizeClone")
    private List<MstSheetSizeJson> sheetSizeClone;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Override
    public void setData(MstLaminationDto dataDto) {
    }

    @Override
    public MstLaminationDto getData() {
        return null;
    }

    public BigDecimal getBasicWeight() {
        return basicWeight;
    }

    public void setBasicWeight(BigDecimal basicWeight) {
        this.basicWeight = basicWeight;
    }

    public BigDecimal getNormValue() {
        return normValue;
    }

    public void setNormValue(BigDecimal normValue) {
        this.normValue = normValue;
    }

    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public Integer getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

    public Integer getOptionId() {
        return optionId;
    }

    public void setOptionId(Integer optionId) {
        this.optionId = optionId;
    }

    public Integer getIsPaperClone() {
        return isPaperClone;
    }

    public void setIsPaperClone(Integer isPaperClone) {
        this.isPaperClone = isPaperClone;
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

    public Integer getCommonFlag() {
        return commonFlag;
    }

    public void setCommonFlag(Integer commonFlag) {
        this.commonFlag = commonFlag;
    }

    public Integer getWastepaperFlag() {
        return wastepaperFlag;
    }

    public void setWastepaperFlag(Integer wastepaperFlag) {
        this.wastepaperFlag = wastepaperFlag;
    }

    public Integer getSpecialSizeFlag() {
        return specialSizeFlag;
    }

    public void setSpecialSizeFlag(Integer specialSizeFlag) {
        this.specialSizeFlag = specialSizeFlag;
    }

    public Integer getHiddenFlag() {
        return hiddenFlag;
    }

    public void setHiddenFlag(Integer hiddenFlag) {
        this.hiddenFlag = hiddenFlag;
    }

    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    public List<MstSheetSizeJson> getSheetSizeClone() {
        return sheetSizeClone;
    }

    public void setSheetSizeClone(List<MstSheetSizeJson> sheetSizeClone) {
        this.sheetSizeClone = sheetSizeClone;
    }
}
