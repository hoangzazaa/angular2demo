package vn.vnext.sefuri.sf.json.SF00302.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;

/**
 * Created by vupt9 on 6/23/2017.
 */
public class MstLaminationJson extends BaseJson<MstLaminationDto> {

    @JsonProperty("laminationId")
    Integer laminationId;

    @JsonProperty("laminationName")
    String laminationName;

    @JsonProperty("laminationWeight")
    Integer laminationWeight;

    @JsonProperty("laminationThroughWage")
    BigDecimal laminationThroughWage;

    @JsonProperty("sagaNormValue")
    BigDecimal sagaNormValue;

    @JsonProperty("sagaHeadValue")
    BigDecimal sagaHeadValue;
    //建値k@
    @JsonProperty("normValue")
    private BigDecimal normValue;

    //factoryId
    @JsonProperty("factoryId")
    private Integer factoryId;

    //userRole
    @JsonProperty("userRole")
    private String userRole;

    @JsonProperty("paperId")
    private Integer paperId;

    @JsonProperty("hiddenFlag")
    private Integer hiddenFlag;

    @JsonProperty("commonFlag")
    private Integer commonFlag;

    @Override
    public void setData(MstLaminationDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.laminationId = dto.getPaperId();
        if (dto.getPaperName()!= null && !dto.getPaperName().equals("")) {
            this.laminationName = dto.getPaperName();
        } else {
            this.laminationName = dto.getMaterialName();
        }

        if(dto.getTakuNormValue()!=null){
            this.laminationThroughWage = dto.getTakuNormValue();
        }else if(dto.getSagaNormValue()!=null){
            this.laminationThroughWage = dto.getSagaNormValue();
        }else{
            this.laminationThroughWage = dto.getOnoNormValue();
        }

        this.laminationWeight = dto.getWeight().intValue();
        this.paperId = dto.getPaperId();
        this.hiddenFlag = dto.getHiddenFlag();
        this.commonFlag = dto.getCommonFlag();
    }

    @Override
    public MstLaminationDto getData() {
        MstLaminationDto dto = new MstLaminationDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setSagaHeadValue(sagaHeadValue);
        dto.setSagaNormValue(sagaNormValue);
        dto.setPaperId(paperId);
        dto.setHiddenFlag(hiddenFlag);

        return dto;
    }

    public Integer getLaminationId() {
        return laminationId;
    }

    public void setLaminationId(Integer laminationId) {
        this.laminationId = laminationId;
    }

    public String getLaminationName() {
        return laminationName;
    }

    public void setLaminationName(String laminationName) {
        this.laminationName = laminationName;
    }

    public Integer getLaminationWeight() {
        return laminationWeight;
    }

    public void setLaminationWeight(Integer laminationWeight) {
        this.laminationWeight = laminationWeight;
    }

    public BigDecimal getLaminationThroughWage() {
        return laminationThroughWage;
    }

    public void setLaminationThroughWage(BigDecimal laminationThroughWage) {
        this.laminationThroughWage = laminationThroughWage;
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

    public BigDecimal getNormValue() {
        return normValue;
    }

    public void setNormValue(BigDecimal normValue) {
        this.normValue = normValue;
    }

    public Integer getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public Integer getHiddenFlag() {
        return hiddenFlag;
    }

    public Integer getCommonFlag() {
        return commonFlag;
    }

}
