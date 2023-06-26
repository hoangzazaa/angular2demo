package vn.vnext.sefuri.sf.json.SFN0402.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.List;

public class ProductJson {

    @JsonProperty("dealCode")
    private String dealCode;
    @JsonProperty("code")
    private String code;
    @JsonProperty("itemCode")
    private String itemCode;
    @JsonProperty("type")
    private Integer type;
    @JsonProperty("shapeId")
    private Integer shapeId;
    @JsonProperty("name")
    private String name;
    @JsonProperty("wooden")
    private String wooden;
    @JsonProperty("woodenExp")
    private Integer woodenExp;
    @JsonProperty("woodenStatus")
    private String woodenStatus;

    //region Description
    @JsonProperty("sizeH")
    private BigDecimal sizeH;
    @JsonProperty("sizeD")
    private BigDecimal sizeD;
    @JsonProperty("sizeW")
    private BigDecimal sizeW;
    //endregion

    //description
    @JsonProperty("cartonShippingType")
    private Integer cartonShippingType;

    @JsonProperty("blankPaperSizeH")
    private BigDecimal blankPaperSizeH;

    @JsonProperty("blankPaperSizeW")
    private BigDecimal blankPaperSizeW;

    @JsonProperty("paperSizeH")
    private BigDecimal paperSizeH;

    @JsonProperty("paperSizeW")
    private BigDecimal paperSizeW;

    @JsonProperty("laminationFlute")
    private Integer laminationFlute;

    @JsonProperty("paperNameId")
    private Integer paperNameId;

    @JsonProperty("paperWeight")
    private BigDecimal paperWeight;

    @JsonProperty("laminationPaperTypeA")
    private Integer laminationPaperTypeA;

    @JsonProperty("laminationABasicWeight")
    private BigDecimal laminationABasicWeight;

    @JsonProperty("laminationPaperTypeB")
    private Integer laminationPaperTypeB;

    @JsonProperty("laminationBBasicWeight")
    private BigDecimal laminationBBasicWeight;

    @JsonProperty("laminationPaperTypeFront")
    private Integer laminationPaperTypeFront;

    @JsonProperty("laminationPaperTypeBack")
    private Integer laminationPaperTypeBack;

    @JsonProperty("laminationPaperTypeMedium")
    private Integer laminationPaperTypeMedium;

    @JsonProperty("laminationFrontBasicWeight")
    private BigDecimal laminationFrontBasicWeight;

    @JsonProperty("laminationMediumBasicWeight")
    private BigDecimal laminationMediumBasicWeight;

    @JsonProperty("laminationBackBasicWeight")
    private BigDecimal laminationBackBasicWeight;

    @JsonProperty("printMethod")
    private Integer printMethod;

    @JsonProperty("colorIdF")
    private Integer colorIdF;

    @JsonProperty("specialColorF")
    private Integer specialColorF;

    @JsonProperty("colorIdB")
    private Integer colorIdB;

    @JsonProperty("specialColorB")
    private Integer specialColorB;

    @JsonProperty("laminationAId")
    private Integer laminationAId;

    @JsonProperty("laminationBId")
    private Integer laminationBId;

    @JsonProperty("laminationFrontId")
    private Integer laminationFrontId;

    @JsonProperty("laminationBackId")
    private Integer laminationBackId;

    @JsonProperty("laminationMediumId")
    private Integer laminationMediumId;

    @JsonProperty("paper")
    private PaperJson paper;

    @JsonProperty("laminations")
    private List<PaperJson> laminations;


    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getWooden() {
        return wooden;
    }

    public void setWooden(String wooden) {
        this.wooden = wooden;
    }

    public Integer getWoodenExp() {
        return woodenExp;
    }

    public void setWoodenExp(Integer woodenExp) {
        this.woodenExp = woodenExp;
    }

    public String getWoodenStatus() {
        return woodenStatus;
    }

    public void setWoodenStatus(String woodenStatus) {
        this.woodenStatus = woodenStatus;
    }

    public BigDecimal getSizeH() {
        return sizeH;
    }

    public void setSizeH(BigDecimal sizeH) {
        this.sizeH = sizeH;
    }

    public BigDecimal getSizeD() {
        return sizeD;
    }

    public void setSizeD(BigDecimal sizeD) {
        this.sizeD = sizeD;
    }

    public BigDecimal getSizeW() {
        return sizeW;
    }

    public void setSizeW(BigDecimal sizeW) {
        this.sizeW = sizeW;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }

    public BigDecimal getBlankPaperSizeH() {
        return blankPaperSizeH;
    }

    public void setBlankPaperSizeH(BigDecimal blankPaperSizeH) {
        this.blankPaperSizeH = blankPaperSizeH;
    }

    public BigDecimal getBlankPaperSizeW() {
        return blankPaperSizeW;
    }

    public void setBlankPaperSizeW(BigDecimal blankPaperSizeW) {
        this.blankPaperSizeW = blankPaperSizeW;
    }

    public BigDecimal getPaperSizeH() {
        return paperSizeH;
    }

    public void setPaperSizeH(BigDecimal paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    public BigDecimal getPaperSizeW() {
        return paperSizeW;
    }

    public void setPaperSizeW(BigDecimal paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    public Integer getLaminationFlute() {
        return laminationFlute;
    }

    public void setLaminationFlute(Integer laminationFlute) {
        this.laminationFlute = laminationFlute;
    }

    public Integer getPaperNameId() {
        return paperNameId;
    }

    public void setPaperNameId(Integer paperNameId) {
        this.paperNameId = paperNameId;
    }

    public BigDecimal getPaperWeight() {
        return paperWeight;
    }

    public void setPaperWeight(BigDecimal paperWeight) {
        this.paperWeight = paperWeight;
    }

    public Integer getLaminationPaperTypeA() {
        return laminationPaperTypeA;
    }

    public void setLaminationPaperTypeA(Integer laminationPaperTypeA) {
        this.laminationPaperTypeA = laminationPaperTypeA;
    }

    public BigDecimal getLaminationABasicWeight() {
        return laminationABasicWeight;
    }

    public void setLaminationABasicWeight(BigDecimal laminationABasicWeight) {
        this.laminationABasicWeight = laminationABasicWeight;
    }

    public Integer getLaminationPaperTypeB() {
        return laminationPaperTypeB;
    }

    public void setLaminationPaperTypeB(Integer laminationPaperTypeB) {
        this.laminationPaperTypeB = laminationPaperTypeB;
    }

    public BigDecimal getLaminationBBasicWeight() {
        return laminationBBasicWeight;
    }

    public void setLaminationBBasicWeight(BigDecimal laminationBBasicWeight) {
        this.laminationBBasicWeight = laminationBBasicWeight;
    }

    public Integer getLaminationPaperTypeFront() {
        return laminationPaperTypeFront;
    }

    public void setLaminationPaperTypeFront(Integer laminationPaperTypeFront) {
        this.laminationPaperTypeFront = laminationPaperTypeFront;
    }

    public Integer getLaminationPaperTypeBack() {
        return laminationPaperTypeBack;
    }

    public void setLaminationPaperTypeBack(Integer laminationPaperTypeBack) {
        this.laminationPaperTypeBack = laminationPaperTypeBack;
    }

    public Integer getLaminationPaperTypeMedium() {
        return laminationPaperTypeMedium;
    }

    public void setLaminationPaperTypeMedium(Integer laminationPaperTypeMedium) {
        this.laminationPaperTypeMedium = laminationPaperTypeMedium;
    }

    public BigDecimal getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(BigDecimal laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    public BigDecimal getLaminationMediumBasicWeight() {
        return laminationMediumBasicWeight;
    }

    public void setLaminationMediumBasicWeight(BigDecimal laminationMediumBasicWeight) {
        this.laminationMediumBasicWeight = laminationMediumBasicWeight;
    }

    public BigDecimal getLaminationBackBasicWeight() {
        return laminationBackBasicWeight;
    }

    public void setLaminationBackBasicWeight(BigDecimal laminationBackBasicWeight) {
        this.laminationBackBasicWeight = laminationBackBasicWeight;
    }

    public Integer getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(Integer printMethod) {
        this.printMethod = printMethod;
    }

    public Integer getColorIdF() {
        return colorIdF;
    }

    public void setColorIdF(Integer colorIdF) {
        this.colorIdF = colorIdF;
    }

    public Integer getSpecialColorF() {
        return specialColorF;
    }

    public void setSpecialColorF(Integer specialColorF) {
        this.specialColorF = specialColorF;
    }

    public Integer getColorIdB() {
        return colorIdB;
    }

    public void setColorIdB(Integer colorIdB) {
        this.colorIdB = colorIdB;
    }

    public Integer getSpecialColorB() {
        return specialColorB;
    }

    public void setSpecialColorB(Integer specialColorB) {
        this.specialColorB = specialColorB;
    }

    public Integer getLaminationAId() {
        return laminationAId;
    }

    public void setLaminationAId(Integer laminationAId) {
        this.laminationAId = laminationAId;
    }

    public Integer getLaminationBId() {
        return laminationBId;
    }

    public void setLaminationBId(Integer laminationBId) {
        this.laminationBId = laminationBId;
    }

    public Integer getLaminationFrontId() {
        return laminationFrontId;
    }

    public void setLaminationFrontId(Integer laminationFrontId) {
        this.laminationFrontId = laminationFrontId;
    }

    public Integer getLaminationBackId() {
        return laminationBackId;
    }

    public void setLaminationBackId(Integer laminationBackId) {
        this.laminationBackId = laminationBackId;
    }

    public Integer getLaminationMediumId() {
        return laminationMediumId;
    }

    public void setLaminationMediumId(Integer laminationMediumId) {
        this.laminationMediumId = laminationMediumId;
    }

    public PaperJson getPaper() {
        return paper;
    }

    public void setPaper(PaperJson paper) {
        this.paper = paper;
    }

    public List<PaperJson> getLaminations() {
        return laminations;
    }

    public void setLaminations(List<PaperJson> laminations) {
        this.laminations = laminations;
    }
}
