package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Created by VuPT on 5/11/2017.
 */
@Entity
@Table(name = "sfr_sf_mst_lamination")
public class MstLaminationDto extends BaseDto {
    //主要原紙表示名
    private String paperName;
    //比重
    private BigDecimal weight;
    //材質C
    private String paperMaterialCode;
    //品目C
    private String paperCode;
    //主要原紙ID
    private Integer commonFlag;
    //見積名称
    private String abbr;
    //佐賀一般建値
    private BigDecimal sagaNormValue;
    //佐賀部門長建値
    private BigDecimal sagaHeadValue;
    //小野一般建値
    private BigDecimal onoNormValue;
    //小野部門長建値
    private BigDecimal onoHeadValue;
    //多久建値
    private BigDecimal takuNormValue;
    //多久部門長建値
    private BigDecimal takuHeadValue;

    private String materialName;

    private Integer paperId;

    private Integer hiddenFlag;

    @Basic
    @Column(name = "hidden_flag")
    public Integer getHiddenFlag() {
        return hiddenFlag;
    }

    public void setHiddenFlag(Integer hiddenFlag) {
        this.hiddenFlag = hiddenFlag;
    }

    @Basic
    @Column(name = "paper_name")
    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    @Basic
    @Column(name = "weight")
    public BigDecimal getWeight() {
        return weight;
    }

    public void setWeight(BigDecimal weight) {
        this.weight = weight;
    }

    @Basic
    @Column(name = "paper_material_code")
    public String getPaperMaterialCode() {
        return paperMaterialCode;
    }

    public void setPaperMaterialCode(String paperMaterialCode) {
        this.paperMaterialCode = paperMaterialCode;
    }

    @Basic
    @Column(name = "paper_code")
    public String getPaperCode() {
        return paperCode;
    }

    public void setPaperCode(String paperCode) {
        this.paperCode = paperCode;
    }

    @Basic
    @Column(name = "common_flag")
    public Integer getCommonFlag() {
        return commonFlag;
    }

    public void setCommonFlag(Integer commonFlag) {
        this.commonFlag = commonFlag;
    }

    @Basic
    @Column(name = "abbr")
    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    @Basic
    @Column(name = "saga_norm_value")
    public BigDecimal getSagaNormValue() {
        return sagaNormValue;
    }

    public void setSagaNormValue(BigDecimal sagaNormValue) {
        this.sagaNormValue = sagaNormValue;
    }

    @Basic
    @Column(name = "saga_head_value")
    public BigDecimal getSagaHeadValue() {
        return sagaHeadValue;
    }

    public void setSagaHeadValue(BigDecimal sagaHeadValue) {
        this.sagaHeadValue = sagaHeadValue;
    }

    @Basic
    @Column(name = "ono_norm_value")
    public BigDecimal getOnoNormValue() {
        return onoNormValue;
    }

    public void setOnoNormValue(BigDecimal onoNormValue) {
        this.onoNormValue = onoNormValue;
    }

    @Basic
    @Column(name = "ono_head_value")
    public BigDecimal getOnoHeadValue() {
        return onoHeadValue;
    }

    public void setOnoHeadValue(BigDecimal onoHeadValue) {
        this.onoHeadValue = onoHeadValue;
    }

    @Basic
    @Column(name = "taku_norm_value")
    public BigDecimal getTakuNormValue() {
        return takuNormValue;
    }

    public void setTakuNormValue(BigDecimal takuNormValue) {
        this.takuNormValue = takuNormValue;
    }

    @Basic
    @Column(name = "taku_head_value")
    public BigDecimal getTakuHeadValue() {
        return takuHeadValue;
    }

    public void setTakuHeadValue(BigDecimal takuHeadValue) {
        this.takuHeadValue = takuHeadValue;
    }

    @Basic
    @Column(name = "material_name")
    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    @Basic
    @Column(name = "paper_id")
    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

}
