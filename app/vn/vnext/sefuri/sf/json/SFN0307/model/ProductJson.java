package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;

public class ProductJson {

    @JsonProperty("id")
    private int id;
    @JsonProperty("productName")
    private String productName;
    @JsonProperty("productType")
    private Integer productType;
    @JsonProperty("productCode")
    private String productCode;
    @JsonProperty("lot")
    private Integer lot;
    @JsonProperty("sizeH")
    private BigDecimal sizeH;
    @JsonProperty("sizeD")
    private BigDecimal sizeD;
    @JsonProperty("sizeW")
    private BigDecimal sizeW;
    @JsonProperty("paperSizeW")
    private BigDecimal paperSizeW;
    @JsonProperty("paperSizeH")
    private BigDecimal paperSizeH;
    @JsonProperty("paperNameId")
    private Integer paperNameId;
    @JsonProperty("paperWeight")
    private BigDecimal paperWeight;
    @JsonProperty("colorIdF")
    private Integer colorIdF;
    @JsonProperty("specialColorF")
    private Integer specialColorF;
    @JsonProperty("colorIdB")
    private Integer colorIdB;
    @JsonProperty("specialColorB")
    private Integer specialColorB;
    @JsonProperty("printMethod")
    private Integer printMethod;
    @JsonProperty("laminationFlute")
    private Integer laminationFlute;
    @JsonProperty("laminationMediumBasicWeight")
    private BigDecimal laminationMediumBasicWeight;
    @JsonProperty("laminationBackBasicWeight")
    private BigDecimal laminationBackBasicWeight;
    @JsonProperty("customerProductCode")
    private String customerProductCode;
    @JsonProperty("factoryId")
    private Integer factoryId;
    @JsonProperty("memo1")
    private String memo1;
    @JsonProperty("memo2")
    private String memo2;
    @JsonProperty("memo3")
    private String memo3;
    @JsonProperty("shapeId")
    private Integer shapeId;
    //laminationPaperType
    @JsonProperty("laminationPaperTypeMedium")
    private Integer laminationPaperTypeMedium;
    //laminationPaperType
    @JsonProperty("laminationPaperTypeBack")
    private Integer laminationPaperTypeBack;
    @JsonProperty("laminationFrontBasicWeight")
    private BigDecimal laminationFrontBasicWeight;
    @JsonProperty("laminationPaperTypeFront")
    private Integer laminationPaperTypeFront;
    @JsonProperty("laminationABasicWeight")
    private BigDecimal laminationABasicWeight;
    @JsonProperty("laminationPaperTypeA")
    private Integer laminationPaperTypeA;
    @JsonProperty("laminationBBasicWeight")
    private BigDecimal laminationBBasicWeight;
    @JsonProperty("laminationPaperTypeB")
    private Integer laminationPaperTypeB;
    @JsonProperty("itemCode")
    private String itemCode;
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
    @JsonProperty("updateDate")
    private DateTime updateDate;
    @JsonProperty("imgUrl")
    private String imgUrl;

    @JsonProperty("paperJson")
    private PaperJson paperJson;
    @JsonProperty("laminationPaperTypeAJson")
    private PaperJson laminationPaperTypeAJson;
    @JsonProperty("laminationPaperTypeBJson")
    private PaperJson laminationPaperTypeBJson;
    @JsonProperty("laminationPaperTypeFrontJson")
    private PaperJson laminationPaperTypeFrontJson;
    @JsonProperty("laminationPaperTypeBackJson")
    private PaperJson laminationPaperTypeBackJson;
    @JsonProperty("laminationPaperTypeMediumJson")
    private PaperJson laminationPaperTypeMediumJson;
    @JsonProperty("laminationAJson")
    private PaperJson laminationAJson;
    @JsonProperty("laminationBJson")
    private PaperJson laminationBJson;
    @JsonProperty("laminationFrontJson")
    private PaperJson laminationFrontJson;
    @JsonProperty("laminationBackJson")
    private PaperJson laminationBackJson;
    @JsonProperty("laminationMediumJson")
    private PaperJson laminationMediumJson;
    @JsonProperty("cartonShippingType")
    private Integer cartonShippingType;
    @JsonProperty("woodenExpiredDate")
    private DateTime woodenExpiredDate;
    /** 木型を持つかどうか true: 持つ, false: 持たない, null: 情報なし */
    @JsonProperty("hasWooden")
    private Boolean hasWooden;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getLot() {
        return lot;
    }

    public void setLot(Integer lot) {
        this.lot = lot;
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

    public Integer getSpecialColorF() {
        return specialColorF;
    }

    public void setSpecialColorF(Integer specialColorF) {
        this.specialColorF = specialColorF;
    }

    public Integer getSpecialColorB() {
        return specialColorB;
    }

    public void setSpecialColorB(Integer specialColorB) {
        this.specialColorB = specialColorB;
    }

    public Integer getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(Integer printMethod) {
        this.printMethod = printMethod;
    }

    public Integer getLaminationFlute() {
        return laminationFlute;
    }

    public void setLaminationFlute(Integer laminationFlute) {
        this.laminationFlute = laminationFlute;
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

    public String getCustomerProductCode() {
        return customerProductCode;
    }

    public void setCustomerProductCode(String customerProductCode) {
        this.customerProductCode = customerProductCode;
    }

    public Integer getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo3() {
        return memo3;
    }

    public void setMemo3(String memo3) {
        this.memo3 = memo3;
    }

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public Integer getLaminationPaperTypeMedium() {
        return laminationPaperTypeMedium;
    }

    public void setLaminationPaperTypeMedium(Integer laminationPaperTypeMedium) {
        this.laminationPaperTypeMedium = laminationPaperTypeMedium;
    }

    public Integer getLaminationPaperTypeBack() {
        return laminationPaperTypeBack;
    }

    public void setLaminationPaperTypeBack(Integer laminationPaperTypeBack) {
        this.laminationPaperTypeBack = laminationPaperTypeBack;
    }

    public BigDecimal getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(BigDecimal laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    public Integer getLaminationPaperTypeFront() {
        return laminationPaperTypeFront;
    }

    public void setLaminationPaperTypeFront(Integer laminationPaperTypeFront) {
        this.laminationPaperTypeFront = laminationPaperTypeFront;
    }

    public BigDecimal getLaminationABasicWeight() {
        return laminationABasicWeight;
    }

    public void setLaminationABasicWeight(BigDecimal laminationABasicWeight) {
        this.laminationABasicWeight = laminationABasicWeight;
    }

    public Integer getLaminationPaperTypeA() {
        return laminationPaperTypeA;
    }

    public void setLaminationPaperTypeA(Integer laminationPaperTypeA) {
        this.laminationPaperTypeA = laminationPaperTypeA;
    }

    public BigDecimal getLaminationBBasicWeight() {
        return laminationBBasicWeight;
    }

    public void setLaminationBBasicWeight(BigDecimal laminationBBasicWeight) {
        this.laminationBBasicWeight = laminationBBasicWeight;
    }

    public Integer getLaminationPaperTypeB() {
        return laminationPaperTypeB;
    }

    public void setLaminationPaperTypeB(Integer laminationPaperTypeB) {
        this.laminationPaperTypeB = laminationPaperTypeB;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
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

    public PaperJson getPaperJson() {
        return paperJson;
    }

    public void setPaperJson(PaperJson paperJson) {
        this.paperJson = paperJson;
    }

    public PaperJson getLaminationPaperTypeAJson() {
        return laminationPaperTypeAJson;
    }

    public void setLaminationPaperTypeAJson(PaperJson laminationPaperTypeAJson) {
        this.laminationPaperTypeAJson = laminationPaperTypeAJson;
    }

    public PaperJson getLaminationPaperTypeBJson() {
        return laminationPaperTypeBJson;
    }

    public void setLaminationPaperTypeBJson(PaperJson laminationPaperTypeBJson) {
        this.laminationPaperTypeBJson = laminationPaperTypeBJson;
    }

    public PaperJson getLaminationPaperTypeFrontJson() {
        return laminationPaperTypeFrontJson;
    }

    public void setLaminationPaperTypeFrontJson(PaperJson laminationPaperTypeFrontJson) {
        this.laminationPaperTypeFrontJson = laminationPaperTypeFrontJson;
    }

    public PaperJson getLaminationPaperTypeBackJson() {
        return laminationPaperTypeBackJson;
    }

    public void setLaminationPaperTypeBackJson(PaperJson laminationPaperTypeBackJson) {
        this.laminationPaperTypeBackJson = laminationPaperTypeBackJson;
    }

    public PaperJson getLaminationPaperTypeMediumJson() {
        return laminationPaperTypeMediumJson;
    }

    public void setLaminationPaperTypeMediumJson(PaperJson laminationPaperTypeMediumJson) {
        this.laminationPaperTypeMediumJson = laminationPaperTypeMediumJson;
    }

    public PaperJson getLaminationAJson() {
        return laminationAJson;
    }

    public void setLaminationAJson(PaperJson laminationAJson) {
        this.laminationAJson = laminationAJson;
    }

    public PaperJson getLaminationBJson() {
        return laminationBJson;
    }

    public void setLaminationBJson(PaperJson laminationBJson) {
        this.laminationBJson = laminationBJson;
    }

    public PaperJson getLaminationFrontJson() {
        return laminationFrontJson;
    }

    public void setLaminationFrontJson(PaperJson laminationFrontJson) {
        this.laminationFrontJson = laminationFrontJson;
    }

    public PaperJson getLaminationBackJson() {
        return laminationBackJson;
    }

    public void setLaminationBackJson(PaperJson laminationBackJson) {
        this.laminationBackJson = laminationBackJson;
    }

    public PaperJson getLaminationMediumJson() {
        return laminationMediumJson;
    }

    public void setLaminationMediumJson(PaperJson laminationMediumJson) {
        this.laminationMediumJson = laminationMediumJson;
    }

    public DateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(DateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getColorIdF() {
        return colorIdF;
    }

    public void setColorIdF(Integer colorIdF) {
        this.colorIdF = colorIdF;
    }

    public Integer getColorIdB() {
        return colorIdB;
    }

    public void setColorIdB(Integer colorIdB) {
        this.colorIdB = colorIdB;
    }

    public BigDecimal getPaperSizeW() {
        return paperSizeW;
    }

    public void setPaperSizeW(BigDecimal paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    public BigDecimal getPaperSizeH() {
        return paperSizeH;
    }

    public void setPaperSizeH(BigDecimal paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }

    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }

    /**
     * @return 木型を持つかどうか true: 持つ, false: 持たない, null: 情報なし
     */
    public Boolean getHasWooden() {
        return hasWooden;
    }

    /**
     * @param hasWooden 木型を持つかどうか true: 持つ, false: 持たない, null: 情報なし
     */
    public void setHasWooden(Boolean hasWooden) {
        this.hasWooden = hasWooden;
    }

}
