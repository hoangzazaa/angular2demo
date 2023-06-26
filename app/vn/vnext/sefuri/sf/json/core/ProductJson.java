package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.util.FormatUtil;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain product input information.
 *
 * @author vupt
 */
public class ProductJson extends BaseJson<ProductDto> {

    //製品名
    @JsonProperty("productName")
    private String productName;

    //製品種類
    @JsonProperty("productType")
    private Integer productType;

    //productCode
    @JsonProperty("productCode")
    private String productCode;

    //仕様
    @JsonProperty("specs")
    private String specs;

    //用途
    @JsonProperty("application")
    private String application;

    //メモ
    @JsonProperty("memo1")
    private String memo1;

    //製品寸法 Height
    @JsonProperty("sizeH")
    private BigDecimal sizeH;

    //製品寸法 Depth
    @JsonProperty("sizeD")
    private BigDecimal sizeD;

    //製品寸法 Width
    @JsonProperty("sizeW")
    private BigDecimal sizeW;

    //原紙名
    @JsonProperty("paperNameId")
    private Integer paperNameId;

    //坪量
    @JsonProperty("paperWeight")
    private BigDecimal paperWeight;

    //原紙サイズ Height
    @JsonProperty("paperSizeH")
    private BigDecimal paperSizeH;

    //原紙サイズ Width
    @JsonProperty("paperSizeW")
    private BigDecimal paperSizeW;

    //断裁サイズ Height
    @JsonProperty("cutPaperSizeH")
    private BigDecimal cutPaperSizeH;

    //断裁サイズ Width
    @JsonProperty("cutPaperSizeW")
    private BigDecimal cutPaperSizeW;

    //ブランクサイズ Height
    @JsonProperty("blankPaperSizeH")
    private BigDecimal blankPaperSizeH;

    //ブランクサイズ Width
    @JsonProperty("blankPaperSizeW")
    private BigDecimal blankPaperSizeW;

    //原紙 ID
    @JsonProperty("paperId")
    private Integer paperId;

    //取数
    @JsonProperty("takenNumber")
    private Integer takenNumber;

    //面付数
    @JsonProperty("impositionNumber")
    private Integer impositionNumber;

    //色（オモテ）
    @JsonProperty("colorFSelect")
    private Integer colorFSelect;

    //色（ウラ）
    @JsonProperty("colorBSelect")
    private Integer colorBSelect;

    //色（オモテ）特色数
    @JsonProperty("specialColorF")
    private Integer specialColorF;

    //色（ウラ）特色数
    @JsonProperty("specialColorB")
    private Integer specialColorB;

    @JsonProperty("colorBText1")
    private String colorBText1;

    @JsonProperty("colorBText2")
    private String colorBText2;

    @JsonProperty("colorBText3")
    private String colorBText3;

    @JsonProperty("colorBText4")
    private String colorBText4;

    @JsonProperty("colorFText4")
    private String colorFText4;

    @JsonProperty("colorFText5")
    private String colorFText5;

    @JsonProperty("colorFText6")
    private String colorFText6;

    @JsonProperty("colorFText7")
    private String colorFText7;

    @JsonProperty("colorFText8")
    private String colorFText8;

    //印刷方法
    @JsonProperty("printMethod")
    private Integer printMethod;

    //色（オモテ）ID
    @JsonProperty("colorIdF")
    private Integer colorIdF;

    //色（ウラ）ID
    @JsonProperty("colorIdB")
    private Integer colorIdB;

    //表面加工 Front
    @JsonProperty("surfaceTreatmentIdF")
    private Integer surfaceTreatmentIdF;

    //表面加工 Back
    @JsonProperty("surfaceTreatmentIdB")
    private Integer surfaceTreatmentIdB;

    //エンボス加工
    @JsonProperty("embossingID")
    private Integer embossingID;

    @JsonProperty("embossingCode")
    private String embossingCode;

    //フルート
    @JsonProperty("laminationFlute")
    private Integer laminationFlute;

    //中芯　坪量
    @JsonProperty("laminationMediumBasicWeight")
    private BigDecimal laminationMediumBasicWeight;

    //中芯　ｋ＠
    @JsonProperty("laminationMediumThroughWage")
    private BigDecimal laminationMediumThroughWage;

    //裏ライナ　坪量
    @JsonProperty("laminationBackBasicWeight")
    private BigDecimal laminationBackBasicWeight;

    //裏ライナ　ｋ＠
    @JsonProperty("laminationBackThroughWage")
    private BigDecimal laminationBackThroughWage;

    //片段取数
    @JsonProperty("laminationNumber")
    private Integer laminationNumber;

    //紙幅
    @JsonProperty("laminationWidth")
    private Integer laminationWidth;

    //断裁流れ
    @JsonProperty("laminationCuttingFlow")
    private Integer laminationCuttingFlow;

    //打抜ID
    @JsonProperty("dieCuttingId")
    private Integer dieCuttingId;

    //打抜種類
    @JsonProperty("dieCuttingThroughNumber")
    private Integer dieCuttingThroughNumber;

    //打抜面付数
    @JsonProperty("dieCuttingWeight")
    private Integer dieCuttingWeight;

    //箔押し
    @JsonProperty("stampingId")
    private Integer stampingId;

    //加工種類
    @JsonProperty("stampingProcessingType")
    private Integer stampingProcessingType;

    //箔押し Width 1
    @JsonProperty("stampingSizeW1")
    private Integer stampingSizeW1;

    //箔押し Width 2
    @JsonProperty("stampingSizeW2")
    private Integer stampingSizeW2;

    //箔押し Width 3
    @JsonProperty("stampingSizeW3")
    private Integer stampingSizeW3;

    //箔押し Width 4
    @JsonProperty("stampingSizeW4")
    private Integer stampingSizeW4;

    //箔押し Height 1
    @JsonProperty("stampingSizeH1")
    private Integer stampingSizeH1;

    //箔押し Height 2
    @JsonProperty("stampingSizeH2")
    private Integer stampingSizeH2;

    //箔押し Height 3
    @JsonProperty("stampingSizeH3")
    private Integer stampingSizeH3;

    //箔押し Height 4
    @JsonProperty("stampingSizeH4")
    private Integer stampingSizeH4;

    //窓枠 ID
    @JsonProperty("windowId")
    private Integer windowId;

    //窓枠寸法_縦
    @JsonProperty("windowSizeH")
    private Integer windowSizeH;

    //窓枠寸法_横
    @JsonProperty("windowSizeW")
    private Integer windowSizeW;

    //貼り ID
    @JsonProperty("pasteId")
    private Integer pasteId;

    //貼り形態
    @JsonProperty("pasteForm")
    private Integer pasteForm;

    //梱包
    @JsonProperty("packingId")
    private Integer packingId;

    //検品
    @JsonProperty("inspectionId")
    private Integer inspectionId;

    //木型NO
    @JsonProperty("woodenId")
    private Integer woodenId;

    //woodenCode
    @JsonProperty("woodenCode")
    private String woodenCode;

    //woodenCode2
    @JsonProperty("woodenCode2")
    private String woodenCode2;

    //フィルムNo
    @JsonProperty("filmCode")
    private String filmCode;

    //得意先製品番号
    @JsonProperty("customerProductCode")
    private String customerProductCode;

    //製造依頼元
    @JsonProperty("factoryId")
    private Integer factoryId;

    //memo2
    @JsonProperty("memo2")
    private String memo2;

    //memo3
    @JsonProperty("memo3")
    private String memo3;

    //pasteSpecialFormFlag
    @JsonProperty("pasteSpecialFormFlag")
    private Integer pasteSpecialFormFlag;

    //deliveryDistance
    @JsonProperty("deliveryDistance")
    private Integer deliveryDistance;

    //otherExpense1
    @JsonProperty("otherExpense1")
    private String otherExpense1;

    //otherWage1
    @JsonProperty("otherWage1")
    private BigDecimal otherWage1;

    //otherUnitType1
    @JsonProperty("otherUnitType1")
    private Integer otherUnitType1;

    //otherExpense2
    @JsonProperty("otherExpense2")
    private String otherExpense2;

    //otherWage2
    @JsonProperty("otherWage2")
    private BigDecimal otherWage2;

    //otherUnitType2
    @JsonProperty("otherUnitType2")
    private Integer otherUnitType2;

    //otherExpense3
    @JsonProperty("otherExpense3")
    private String otherExpense3;

    //otherWage3
    @JsonProperty("otherWage3")
    private BigDecimal otherWage3;

    //otherUnitType3
    @JsonProperty("otherUnitType3")
    private Integer otherUnitType3;

    //shippingCostId
    @JsonProperty("shippingCostId")
    private Integer shippingCostId;

    //stampingPointsNumber
    @JsonProperty("stampingPointsNumber")
    private Integer stampingPointsNumber;

    //shapeId
    @JsonProperty("shapeId")
    private Integer shapeId;

    //sheetSizeId
    @JsonProperty("sheetSizeId")
    private Integer sheetSizeId;

    //sheetSizeWidth
    @JsonProperty("sheetSizeWidth")
    private BigDecimal sheetSizeWidth;

    //sheetSizeHeight
    @JsonProperty("sheetSizeHeight")
    private BigDecimal sheetSizeHeight;

    //sheetSizeGrain
    @JsonProperty("sheetSizeGrain")
    private Integer sheetSizeGrain;

    //upperFlap
    @JsonProperty("upperFlap")
    private BigDecimal upperFlap;

    //insertion
    @JsonProperty("insertion")
    private BigDecimal insertion;

    //grain
    @JsonProperty("grain")
    private Integer grain;

    //developmentWidth
    @JsonProperty("developmentWidth")
    private BigDecimal developmentWidth;

    //developmentHeight
    @JsonProperty("developmentHeight")
    private BigDecimal developmentHeight;

    //groove
    @JsonProperty("groove")
    private Integer groove;

    //colorFText1
    @JsonProperty("colorFText1")
    private String colorFText1;
    @JsonProperty("colorFText2")
    private String colorFText2;
    @JsonProperty("colorFText3")
    private String colorFText3;
    //specialSizeFlag
    @JsonProperty("specialSizeFlag")
    private Integer specialSizeFlag;

    //specialDieCuttingNumberFlag
    @JsonProperty("specialDieCuttingNumberFlag")
    private Integer specialDieCuttingNumberFlag;

    //laminationPaperType
    @JsonProperty("laminationPaperTypeMedium")
    private Integer laminationPaperTypeMedium;

    //laminationPaperType
    @JsonProperty("laminationPaperTypeBack")
    private Integer laminationPaperTypeBack;

    //paperHeadApprovalFlag
    @JsonProperty("paperHeadApprovalFlag")
    private Integer paperHeadApprovalFlag;

    //裏ライナ　坪量
    @JsonProperty("laminationFrontBasicWeight")
    private BigDecimal laminationFrontBasicWeight;

    //裏ライナ　ｋ＠
    @JsonProperty("laminationFrontThroughWage")
    private BigDecimal laminationFrontThroughWage;

    @JsonProperty("laminationPaperTypeFront")
    private Integer laminationPaperTypeFront;

    @JsonProperty("laminationABasicWeight")
    private BigDecimal laminationABasicWeight;
    @JsonProperty("laminationAThroughWage")
    private BigDecimal laminationAThroughWage;
    @JsonProperty("laminationPaperTypeA")
    private Integer laminationPaperTypeA;
    @JsonProperty("laminationBBasicWeight")
    private BigDecimal laminationBBasicWeight;
    @JsonProperty("laminationBThroughWage")
    private BigDecimal laminationBThroughWage;
    @JsonProperty("laminationPaperTypeB")
    private Integer laminationPaperTypeB;
    @JsonProperty("cartonShippingType")
    private Integer cartonShippingType;
    @JsonProperty("cartonTapeCutting")
    private BigDecimal cartonTapeCutting;
    @JsonProperty("cartonLinerCutting")
    private BigDecimal cartonLinerCutting;
    @JsonProperty("handProcessingFlag")
    private Integer handProcessingFlag;
    @JsonProperty("waterRepellentFlag")
    private Integer waterRepellentFlag;
    @JsonProperty("requestDesignFlag")
    private Integer requestDesignFlag;
    /* requestProductionFlag */
    @JsonProperty("requestProductionFlag")
    private Integer requestProductionFlag;
    /* itemCode */
    @JsonProperty("itemCode")
    private String itemCode;

    @JsonProperty("copyType")
    private Integer copyType;

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

    //colorFRsProduct
    @JsonProperty("colorF")
    private MstColorJson colorF;

    //colorBRsProduct
    @JsonProperty("colorB")
    private MstColorJson colorB;

    //packingRsProduct
    @JsonProperty("packing")
    private MstPackingJson packing;

    //paperRsProduct
    @JsonProperty("paper")
    private MstPaperJson paper;

    //pasteRsProduct
    @JsonProperty("paste")
    private MstPasteJson paste;

    //stampingRsProduct
    @JsonProperty("stamping")
    private MstStampingJson stamping;

    //dieCuttingRsProduct
    @JsonProperty("dieCutting")
    private MstDieCuttingJson dieCutting;

    //surfaceTreatmentFRsProduct
    @JsonProperty("surfaceF")
    private MstSurfaceTreatmentJson surfaceF;

    //surfaceTreatmentBRsProduct
    @JsonProperty("surfaceB")
    private MstSurfaceTreatmentJson surfaceB;

    //windowRsProduct
    @JsonProperty("window")
    private MstWindowJson window;

    //productRsDealProduct
    @JsonProperty("dealProducts")
    private List<DealProductJson> dealProducts;

    //woodenRsProduct
    @JsonProperty("wooden")
    private MstWoodenJson wooden;

    //productRsProductFiles
    @JsonProperty("productFiles")
    private List<ProductFileJson> productFiles;

    //productRsProductOutput
    @JsonProperty("productOutputs")
    private List<ProductOutputJson> productOutputs;

    //productRsProductCommonFee
    @JsonProperty("productCommon")
    private ProductCommonFeeJson productCommon;

    //productRsShippingCost
    @JsonProperty("shippingCost")
    private MstShippingCostJson shippingCost;

    //productRsDrawingImage
    @JsonProperty("drawingImages")
    private List<DrawingImageJson> drawingImages;

    @JsonProperty("supplier")
    private SupplierJson supplier;
    //#2595
    @JsonProperty("requestLot")
    private Integer requestLot;

    /**
     * Get productName
     *
     * @return productName
     */
    public String getProductName() {
        return productName;
    }

    /**
     * Set productName
     *
     * @param productName String
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * Get productType
     *
     * @return productType
     */
    public Integer getProductType() {
        return productType;
    }

    /**
     * Set productType
     *
     * @param productType Integer
     */
    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    /**
     * Get productCode
     *
     * @return productCode
     */
    public String getProductCode() {
        return productCode;
    }

    /**
     * Set productCode
     *
     * @param productCode String
     */
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    /**
     * Get specs
     *
     * @return specs
     */
    public String getSpecs() {
        return specs;
    }

    /**
     * Set specs
     *
     * @param specs String
     */
    public void setSpecs(String specs) {
        this.specs = specs;
    }

    /**
     * Get application
     *
     * @return application
     */
    public String getApplication() {
        return application;
    }

    /**
     * Set application
     *
     * @param application String
     */
    public void setApplication(String application) {
        this.application = application;
    }

    /**
     * Get memo1
     *
     * @return memo1
     */
    public String getMemo1() {
        return memo1;
    }

    /**
     * Set memo1
     *
     * @param memo1 String
     */
    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    /**
     * Get sizeH
     *
     * @return sizeH
     */
    public BigDecimal getSizeH() {
        return sizeH;
    }

    /**
     * Set sizeH
     *
     * @param sizeH BigDecimal
     */
    public void setSizeH(BigDecimal sizeH) {
        this.sizeH = sizeH;
    }

    /**
     * Get sizeD
     *
     * @return sizeD
     */
    public BigDecimal getSizeD() {
        return sizeD;
    }

    /**
     * Set sizeD
     *
     * @param sizeD BigDecimal
     */
    public void setSizeD(BigDecimal sizeD) {
        this.sizeD = sizeD;
    }

    /**
     * Get sizeW
     *
     * @return sizeW
     */
    public BigDecimal getSizeW() {
        return sizeW;
    }

    /**
     * Set sizeW
     *
     * @param sizeW BigDecimal
     */
    public void setSizeW(BigDecimal sizeW) {
        this.sizeW = sizeW;
    }

    /**
     * Get paperNameId
     *
     * @return paperNameId
     */
    public Integer getPaperNameId() {
        return paperNameId;
    }

    /**
     * Set paperNameId
     *
     * @param paperNameId Integer
     */
    public void setPaperNameId(Integer paperNameId) {
        this.paperNameId = paperNameId;
    }

    /**
     * Get paperWeight
     *
     * @return paperWeight
     */
    public BigDecimal getPaperWeight() {
        return paperWeight;
    }

    /**
     * Set paperWeight
     *
     * @param paperWeight Integer
     */
    public void setPaperWeight(BigDecimal paperWeight) {
        this.paperWeight = paperWeight;
    }

    /**
     * Get paperSizeH
     *
     * @return paperSizeH
     */
    public BigDecimal getPaperSizeH() {
        return paperSizeH;
    }

    /**
     * Set paperSizeH
     *
     * @param paperSizeH Integer
     */
    public void setPaperSizeH(BigDecimal paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    /**
     * Get paperSizeW
     *
     * @return paperSizeW
     */
    public BigDecimal getPaperSizeW() {
        return paperSizeW;
    }

    /**
     * Set paperSizeW
     *
     * @param paperSizeW Integer
     */
    public void setPaperSizeW(BigDecimal paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    /**
     * Get cutPaperSizeH
     *
     * @return cutPaperSizeH
     */
    public BigDecimal getCutPaperSizeH() {
        return cutPaperSizeH;
    }

    /**
     * Set cutPaperSizeH
     *
     * @param cutPaperSizeH Integer
     */
    public void setCutPaperSizeH(BigDecimal cutPaperSizeH) {
        this.cutPaperSizeH = cutPaperSizeH;
    }

    /**
     * Get cutPaperSizeW
     *
     * @return cutPaperSizeW
     */
    public BigDecimal getCutPaperSizeW() {
        return cutPaperSizeW;
    }

    /**
     * Set cutPaperSizeW
     *
     * @param cutPaperSizeW Integer
     */
    public void setCutPaperSizeW(BigDecimal cutPaperSizeW) {
        this.cutPaperSizeW = cutPaperSizeW;
    }

    /**
     * Get blankPaperSizeH
     *
     * @return blankPaperSizeH
     */
    public BigDecimal getBlankPaperSizeH() {
        return blankPaperSizeH;
    }

    /**
     * Set blankPaperSizeH
     *
     * @param blankPaperSizeH BigDecimal
     */
    public void setBlankPaperSizeH(BigDecimal blankPaperSizeH) {
        this.blankPaperSizeH = blankPaperSizeH;
    }

    /**
     * Get blankPaperSizeW
     *
     * @return blankPaperSizeW
     */
    public BigDecimal getBlankPaperSizeW() {
        return blankPaperSizeW;
    }

    /**
     * Set blankPaperSizeW
     *
     * @param blankPaperSizeW BigDecimal
     */
    public void setBlankPaperSizeW(BigDecimal blankPaperSizeW) {
        this.blankPaperSizeW = blankPaperSizeW;
    }

    /**
     * Get paperId
     *
     * @return paperId
     */
    public Integer getPaperId() {
        return paperId;
    }

    /**
     * Set paperId
     *
     * @param paperId Integer
     */
    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }

    /**
     * Get takenNumber
     *
     * @return takenNumber
     */
    public Integer getTakenNumber() {
        return takenNumber;
    }

    /**
     * Set takenNumber
     *
     * @param takenNumber Integer
     */
    public void setTakenNumber(Integer takenNumber) {
        this.takenNumber = takenNumber;
    }

    /**
     * Get impositionNumber
     *
     * @return impositionNumber
     */
    public Integer getImpositionNumber() {
        return impositionNumber;
    }

    /**
     * Set impositionNumber
     *
     * @param impositionNumber Integer
     */
    public void setImpositionNumber(Integer impositionNumber) {
        this.impositionNumber = impositionNumber;
    }

    /**
     * Get colorFSelect
     *
     * @return colorFSelect
     */
    public Integer getColorFSelect() {
        return colorFSelect;
    }

    /**
     * Set colorFSelect
     *
     * @param colorFSelect Integer
     */
    public void setColorFSelect(Integer colorFSelect) {
        this.colorFSelect = colorFSelect;
    }

    /**
     * Get colorBSelect
     *
     * @return colorBSelect
     */
    public Integer getColorBSelect() {
        return colorBSelect;
    }

    /**
     * Set colorBSelect
     *
     * @param colorBSelect Integer
     */
    public void setColorBSelect(Integer colorBSelect) {
        this.colorBSelect = colorBSelect;
    }

    /**
     * Get specialColorF
     *
     * @return specialColorF
     */
    public Integer getSpecialColorF() {
        return specialColorF;
    }

    /**
     * Set specialColorF
     *
     * @param specialColorF Integer
     */
    public void setSpecialColorF(Integer specialColorF) {
        this.specialColorF = specialColorF;
    }

    /**
     * Get specialColorB
     *
     * @return specialColorB
     */
    public Integer getSpecialColorB() {
        return specialColorB;
    }

    /**
     * Set specialColorB
     *
     * @param specialColorB Integer
     */
    public void setSpecialColorB(Integer specialColorB) {
        this.specialColorB = specialColorB;
    }

    /**
     * Get printMethod
     *
     * @return printMethod
     */
    public Integer getPrintMethod() {
        return printMethod;
    }

    /**
     * Set printMethod
     *
     * @param printMethod Integer
     */
    public void setPrintMethod(Integer printMethod) {
        this.printMethod = printMethod;
    }

    /**
     * Get colorIdF
     *
     * @return colorIdF
     */
    public Integer getColorIdF() {
        return colorIdF;
    }

    /**
     * Set colorIdF
     *
     * @param colorIdF Integer
     */
    public void setColorIdF(Integer colorIdF) {
        this.colorIdF = colorIdF;
    }

    /**
     * Get colorIdB
     *
     * @return colorIdB
     */
    public Integer getColorIdB() {
        return colorIdB;
    }

    /**
     * Set colorIdB
     *
     * @param colorIdB Integer
     */
    public void setColorIdB(Integer colorIdB) {
        this.colorIdB = colorIdB;
    }

    /**
     * Get surfaceTreatmentIdF
     *
     * @return surfaceTreatmentIdF
     */
    public Integer getSurfaceTreatmentIdF() {
        return surfaceTreatmentIdF;
    }

    /**
     * Set surfaceTreatmentIdF
     *
     * @param surfaceTreatmentIdF Integer
     */
    public void setSurfaceTreatmentIdF(Integer surfaceTreatmentIdF) {
        this.surfaceTreatmentIdF = surfaceTreatmentIdF;
    }

    /**
     * Get surfaceTreatmentIdB
     *
     * @return surfaceTreatmentIdB
     */
    public Integer getSurfaceTreatmentIdB() {
        return surfaceTreatmentIdB;
    }

    /**
     * Set surfaceTreatmentIdB
     *
     * @param surfaceTreatmentIdB Integer
     */
    public void setSurfaceTreatmentIdB(Integer surfaceTreatmentIdB) {
        this.surfaceTreatmentIdB = surfaceTreatmentIdB;
    }

    /**
     * Get embossingID
     *
     * @return embossingID
     */
    public Integer getEmbossingID() {
        return embossingID;
    }

    /**
     * Set embossingID
     *
     * @param embossingID Integer
     */
    public void setEmbossingID(Integer embossingID) {
        this.embossingID = embossingID;
    }

    /**
     * Get laminationFlute
     *
     * @return laminationFlute
     */
    public Integer getLaminationFlute() {
        return laminationFlute;
    }

    /**
     * Set laminationFlute
     *
     * @param laminationFlute Integer
     */
    public void setLaminationFlute(Integer laminationFlute) {
        this.laminationFlute = laminationFlute;
    }

    /**
     * Get laminationMediumBasicWeight
     *
     * @return laminationMediumBasicWeight
     */
    public BigDecimal getLaminationMediumBasicWeight() {
        return laminationMediumBasicWeight;
    }

    /**
     * Set laminationMediumBasicWeight
     *
     * @param laminationMediumBasicWeight Integer
     */
    public void setLaminationMediumBasicWeight(BigDecimal laminationMediumBasicWeight) {
        this.laminationMediumBasicWeight = laminationMediumBasicWeight;
    }

    /**
     * Get laminationMediumThroughWage
     *
     * @return laminationMediumThroughWage
     */
    public BigDecimal getLaminationMediumThroughWage() {
        return laminationMediumThroughWage;
    }

    /**
     * Set laminationMediumThroughWage
     *
     * @param laminationMediumThroughWage Integer
     */
    public void setLaminationMediumThroughWage(BigDecimal laminationMediumThroughWage) {
        this.laminationMediumThroughWage = laminationMediumThroughWage;
    }

    /**
     * Get laminationBackBasicWeight
     *
     * @return laminationBackBasicWeight
     */
    public BigDecimal getLaminationBackBasicWeight() {
        return laminationBackBasicWeight;
    }

    /**
     * Set laminationBackBasicWeight
     *
     * @param laminationBackBasicWeight Integer
     */
    public void setLaminationBackBasicWeight(BigDecimal laminationBackBasicWeight) {
        this.laminationBackBasicWeight = laminationBackBasicWeight;
    }

    /**
     * Get laminationBackThroughWage
     *
     * @return laminationBackThroughWage
     */
    public BigDecimal getLaminationBackThroughWage() {
        return laminationBackThroughWage;
    }

    /**
     * Set laminationBackThroughWage
     *
     * @param laminationBackThroughWage Integer
     */
    public void setLaminationBackThroughWage(BigDecimal laminationBackThroughWage) {
        this.laminationBackThroughWage = laminationBackThroughWage;
    }

    /**
     * Get laminationNumber
     *
     * @return laminationNumber
     */
    public Integer getLaminationNumber() {
        return laminationNumber;
    }

    /**
     * Set laminationNumber
     *
     * @param laminationNumber Integer
     */
    public void setLaminationNumber(Integer laminationNumber) {
        this.laminationNumber = laminationNumber;
    }

    /**
     * Get laminationWidth
     *
     * @return laminationWidth
     */
    public Integer getLaminationWidth() {
        return laminationWidth;
    }

    /**
     * Set laminationWidth
     *
     * @param laminationWidth Integer
     */
    public void setLaminationWidth(Integer laminationWidth) {
        this.laminationWidth = laminationWidth;
    }

    /**
     * Get laminationCuttingFlow
     *
     * @return laminationCuttingFlow
     */
    public Integer getLaminationCuttingFlow() {
        return laminationCuttingFlow;
    }

    /**
     * Set laminationCuttingFlow
     *
     * @param laminationCuttingFlow Integer
     */
    public void setLaminationCuttingFlow(Integer laminationCuttingFlow) {
        this.laminationCuttingFlow = laminationCuttingFlow;
    }

    /**
     * Get dieCuttingId
     *
     * @return dieCuttingId
     */
    public Integer getDieCuttingId() {
        return dieCuttingId;
    }

    /**
     * Set dieCuttingId
     *
     * @param dieCuttingId Integer
     */
    public void setDieCuttingId(Integer dieCuttingId) {
        this.dieCuttingId = dieCuttingId;
    }

    /**
     * Get dieCuttingThroughNumber
     *
     * @return dieCuttingThroughNumber
     */
    public Integer getDieCuttingThroughNumber() {
        return dieCuttingThroughNumber;
    }

    /**
     * Set dieCuttingThroughNumber
     *
     * @param dieCuttingThroughNumber Integer
     */
    public void setDieCuttingThroughNumber(Integer dieCuttingThroughNumber) {
        this.dieCuttingThroughNumber = dieCuttingThroughNumber;
    }

    /**
     * Get dieCuttingWeight
     *
     * @return dieCuttingWeight
     */
    public Integer getDieCuttingWeight() {
        return dieCuttingWeight;
    }

    /**
     * Set dieCuttingWeight
     *
     * @param dieCuttingWeight Integer
     */
    public void setDieCuttingWeight(Integer dieCuttingWeight) {
        this.dieCuttingWeight = dieCuttingWeight;
    }

    /**
     * Get stampingId
     *
     * @return stampingId
     */
    public Integer getStampingId() {
        return stampingId;
    }

    /**
     * Set stampingId
     *
     * @param stampingId Integer
     */
    public void setStampingId(Integer stampingId) {
        this.stampingId = stampingId;
    }

    /**
     * Get stampingProcessingType
     *
     * @return stampingProcessingType
     */
    public Integer getStampingProcessingType() {
        return stampingProcessingType;
    }

    /**
     * Set stampingProcessingType
     *
     * @param stampingProcessingType Integer
     */
    public void setStampingProcessingType(Integer stampingProcessingType) {
        this.stampingProcessingType = stampingProcessingType;
    }

    /**
     * Get stampingSizeW1
     *
     * @return stampingSizeW1
     */
    public Integer getStampingSizeW1() {
        return stampingSizeW1;
    }

    /**
     * Set stampingSizeW1
     *
     * @param stampingSizeW1 Integer
     */
    public void setStampingSizeW1(Integer stampingSizeW1) {
        this.stampingSizeW1 = stampingSizeW1;
    }

    /**
     * Get stampingSizeW2
     *
     * @return stampingSizeW2
     */
    public Integer getStampingSizeW2() {
        return stampingSizeW2;
    }

    /**
     * Set stampingSizeW2
     *
     * @param stampingSizeW2 Integer
     */
    public void setStampingSizeW2(Integer stampingSizeW2) {
        this.stampingSizeW2 = stampingSizeW2;
    }

    /**
     * Get stampingSizeW3
     *
     * @return stampingSizeW3
     */
    public Integer getStampingSizeW3() {
        return stampingSizeW3;
    }

    /**
     * Set stampingSizeW3
     *
     * @param stampingSizeW3 Integer
     */
    public void setStampingSizeW3(Integer stampingSizeW3) {
        this.stampingSizeW3 = stampingSizeW3;
    }

    /**
     * Get stampingSizeW4
     *
     * @return stampingSizeW4
     */
    public Integer getStampingSizeW4() {
        return stampingSizeW4;
    }

    /**
     * Set stampingSizeW4
     *
     * @param stampingSizeW4 Integer
     */
    public void setStampingSizeW4(Integer stampingSizeW4) {
        this.stampingSizeW4 = stampingSizeW4;
    }

    /**
     * Get stampingSizeH1
     *
     * @return stampingSizeH1
     */
    public Integer getStampingSizeH1() {
        return stampingSizeH1;
    }

    /**
     * Set stampingSizeH1
     *
     * @param stampingSizeH1 Integer
     */
    public void setStampingSizeH1(Integer stampingSizeH1) {
        this.stampingSizeH1 = stampingSizeH1;
    }

    /**
     * Get stampingSizeH2
     *
     * @return stampingSizeH2
     */
    public Integer getStampingSizeH2() {
        return stampingSizeH2;
    }

    /**
     * Set stampingSizeH2
     *
     * @param stampingSizeH2 Integer
     */
    public void setStampingSizeH2(Integer stampingSizeH2) {
        this.stampingSizeH2 = stampingSizeH2;
    }

    /**
     * Get stampingSizeH3
     *
     * @return stampingSizeH3
     */
    public Integer getStampingSizeH3() {
        return stampingSizeH3;
    }

    /**
     * Set stampingSizeH3
     *
     * @param stampingSizeH3 Integer
     */
    public void setStampingSizeH3(Integer stampingSizeH3) {
        this.stampingSizeH3 = stampingSizeH3;
    }

    /**
     * Get stampingSizeH4
     *
     * @return stampingSizeH4
     */
    public Integer getStampingSizeH4() {
        return stampingSizeH4;
    }

    /**
     * Set stampingSizeH4
     *
     * @param stampingSizeH4 Integer
     */
    public void setStampingSizeH4(Integer stampingSizeH4) {
        this.stampingSizeH4 = stampingSizeH4;
    }

    /**
     * Get windowId
     *
     * @return windowId
     */
    public Integer getWindowId() {
        return windowId;
    }

    /**
     * Set windowId
     *
     * @param windowId Integer
     */
    public void setWindowId(Integer windowId) {
        this.windowId = windowId;
    }

    /**
     * Get windowSizeH
     *
     * @return windowSizeH
     */
    public Integer getWindowSizeH() {
        return windowSizeH;
    }

    /**
     * Set windowSizeH
     *
     * @param windowSizeH Integer
     */
    public void setWindowSizeH(Integer windowSizeH) {
        this.windowSizeH = windowSizeH;
    }

    /**
     * Get windowSizeW
     *
     * @return windowSizeW
     */
    public Integer getWindowSizeW() {
        return windowSizeW;
    }

    /**
     * Set windowSizeW
     *
     * @param windowSizeW Integer
     */
    public void setWindowSizeW(Integer windowSizeW) {
        this.windowSizeW = windowSizeW;
    }

    /**
     * Get pasteId
     *
     * @return pasteId
     */
    public Integer getPasteId() {
        return pasteId;
    }

    /**
     * Set pasteId
     *
     * @param pasteId Integer
     */
    public void setPasteId(Integer pasteId) {
        this.pasteId = pasteId;
    }

    /**
     * Get pasteForm
     *
     * @return pasteForm
     */
    public Integer getPasteForm() {
        return pasteForm;
    }

    /**
     * Set pasteForm
     *
     * @param pasteForm Integer
     */
    public void setPasteForm(Integer pasteForm) {
        this.pasteForm = pasteForm;
    }

    /**
     * Get packingId
     *
     * @return packingId
     */
    public Integer getPackingId() {
        return packingId;
    }

    /**
     * Set packingId
     *
     * @param packingId Integer
     */
    public void setPackingId(Integer packingId) {
        this.packingId = packingId;
    }

    /**
     * Get inspectionId
     *
     * @return inspectionId
     */
    public Integer getInspectionId() {
        return inspectionId;
    }

    /**
     * Set inspectionId
     *
     * @param inspectionId Integer
     */
    public void setInspectionId(Integer inspectionId) {
        this.inspectionId = inspectionId;
    }

    /**
     * Get woodenId
     *
     * @return woodenId
     */
    public Integer getWoodenId() {
        return woodenId;
    }

    /**
     * Set woodenId
     *
     * @param woodenId Integer
     */
    public void setWoodenId(Integer woodenId) {
        this.woodenId = woodenId;
    }

    /**
     * Get woodenCode
     *
     * @return woodenCode
     */
    public String getWoodenCode() {
        return woodenCode;
    }

    /**
     * Set woodenCode
     *
     * @param woodenCode String
     */
    public void setWoodenCode(String woodenCode) {
        this.woodenCode = woodenCode;
    }

    public String getFilmCode() {
        return filmCode;
    }

    public void setFilmCode(final String filmCode) {
        this.filmCode = filmCode;
    }

    /**
     * Get customerProductCode
     *
     * @return customerProductCode
     */
    public String getCustomerProductCode() {
        return customerProductCode;
    }

    /**
     * Set customerProductCode
     *
     * @param customerProductCode String
     */
    public void setCustomerProductCode(String customerProductCode) {
        this.customerProductCode = customerProductCode;
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
     * Get memo2
     *
     * @return memo2
     */
    public String getMemo2() {
        return memo2;
    }

    /**
     * Set memo2
     *
     * @param memo2 String
     */
    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo3() {
        return memo3;
    }

    public void setMemo3(String memo3) {
        this.memo3 = memo3;
    }

    /**
     * Get pasteSpecialFormFlag
     *
     * @return pasteSpecialFormFlag
     */
    public Integer getPasteSpecialFormFlag() {
        return pasteSpecialFormFlag;
    }

    /**
     * Set pasteSpecialFormFlag
     *
     * @param pasteSpecialFormFlag Integer
     */
    public void setPasteSpecialFormFlag(Integer pasteSpecialFormFlag) {
        this.pasteSpecialFormFlag = pasteSpecialFormFlag;
    }

    /**
     * Get deliveryDistance
     *
     * @return deliveryDistance
     */
    public Integer getDeliveryDistance() {
        return deliveryDistance;
    }

    /**
     * Set deliveryDistance
     *
     * @param deliveryDistance Integer
     */
    public void setDeliveryDistance(Integer deliveryDistance) {
        this.deliveryDistance = deliveryDistance;
    }

    /**
     * Get otherExpense1
     *
     * @return otherExpense1
     */
    public String getOtherExpense1() {
        return otherExpense1;
    }

    /**
     * Set otherExpense1
     *
     * @param otherExpense1 String
     */
    public void setOtherExpense1(String otherExpense1) {
        this.otherExpense1 = otherExpense1;
    }

    /**
     * Get otherWage1
     *
     * @return otherWage1
     */
    public BigDecimal getOtherWage1() {
        return otherWage1;
    }

    /**
     * Set otherWage1
     *
     * @param otherWage1 Integer
     */
    public void setOtherWage1(BigDecimal otherWage1) {
        this.otherWage1 = otherWage1;
    }

    /**
     * Get otherUnitType1
     *
     * @return otherUnitType1
     */
    public Integer getOtherUnitType1() {
        return otherUnitType1;
    }

    /**
     * Set otherUnitType1
     *
     * @param otherUnitType1 Integer
     */
    public void setOtherUnitType1(Integer otherUnitType1) {
        this.otherUnitType1 = otherUnitType1;
    }

    /**
     * Get otherExpense2
     *
     * @return otherExpense2
     */
    public String getOtherExpense2() {
        return otherExpense2;
    }

    /**
     * Set otherExpense2
     *
     * @param otherExpense2 String
     */
    public void setOtherExpense2(String otherExpense2) {
        this.otherExpense2 = otherExpense2;
    }

    /**
     * Get otherWage2
     *
     * @return otherWage2
     */
    public BigDecimal getOtherWage2() {
        return otherWage2;
    }

    /**
     * Set otherWage2
     *
     * @param otherWage2 Integer
     */
    public void setOtherWage2(BigDecimal otherWage2) {
        this.otherWage2 = otherWage2;
    }

    /**
     * Get otherUnitType2
     *
     * @return otherUnitType2
     */
    public Integer getOtherUnitType2() {
        return otherUnitType2;
    }

    /**
     * Set otherUnitType2
     *
     * @param otherUnitType2 Integer
     */
    public void setOtherUnitType2(Integer otherUnitType2) {
        this.otherUnitType2 = otherUnitType2;
    }

    /**
     * Get otherExpense3
     *
     * @return otherExpense3
     */
    public String getOtherExpense3() {
        return otherExpense3;
    }

    /**
     * Set otherExpense3
     *
     * @param otherExpense3 String
     */
    public void setOtherExpense3(String otherExpense3) {
        this.otherExpense3 = otherExpense3;
    }

    /**
     * Get otherWage3
     *
     * @return otherWage3
     */
    public BigDecimal getOtherWage3() {
        return otherWage3;
    }

    /**
     * Set otherWage3
     *
     * @param otherWage3 Integer
     */
    public void setOtherWage3(BigDecimal otherWage3) {
        this.otherWage3 = otherWage3;
    }

    /**
     * Get otherUnitType3
     *
     * @return otherUnitType3
     */
    public Integer getOtherUnitType3() {
        return otherUnitType3;
    }

    /**
     * Set otherUnitType3
     *
     * @param otherUnitType3 Integer
     */
    public void setOtherUnitType3(Integer otherUnitType3) {
        this.otherUnitType3 = otherUnitType3;
    }

    /**
     * Get shippingCostId
     *
     * @return shippingCostId
     */
    public Integer getShippingCostId() {
        return shippingCostId;
    }

    /**
     * Set shippingCostId
     *
     * @param shippingCostId Integer
     */
    public void setShippingCostId(Integer shippingCostId) {
        this.shippingCostId = shippingCostId;
    }

    /**
     * Get stampingPointsNumber
     *
     * @return stampingPointsNumber
     */
    public Integer getStampingPointsNumber() {
        return stampingPointsNumber;
    }

    /**
     * Set stampingPointsNumber
     *
     * @param stampingPointsNumber Integer
     */
    public void setStampingPointsNumber(Integer stampingPointsNumber) {
        this.stampingPointsNumber = stampingPointsNumber;
    }

    /**
     * Get shapeId
     *
     * @return shapeId
     */
    public Integer getShapeId() {
        return shapeId;
    }

    /**
     * Set shapeId
     *
     * @param shapeId Integer
     */
    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    /**
     * Get sheetSizeId
     *
     * @return sheetSizeId
     */
    public Integer getSheetSizeId() {
        return sheetSizeId;
    }

    /**
     * Set sheetSizeId
     *
     * @param sheetSizeId Integer
     */
    public void setSheetSizeId(Integer sheetSizeId) {
        this.sheetSizeId = sheetSizeId;
    }

    /**
     * Get sheetSizeWidth
     *
     * @return sheetSizeWidth
     */
    public BigDecimal getSheetSizeWidth() {
        return sheetSizeWidth;
    }

    /**
     * Set sheetSizeWidth
     *
     * @param sheetSizeWidth Integer
     */
    public void setSheetSizeWidth(BigDecimal sheetSizeWidth) {
        this.sheetSizeWidth = sheetSizeWidth;
    }

    /**
     * Get sheetSizeHeight
     *
     * @return sheetSizeHeight
     */
    public BigDecimal getSheetSizeHeight() {
        return sheetSizeHeight;
    }

    /**
     * Set sheetSizeHeight
     *
     * @param sheetSizeHeight Integer
     */
    public void setSheetSizeHeight(BigDecimal sheetSizeHeight) {
        this.sheetSizeHeight = sheetSizeHeight;
    }

    /**
     * Get sheetSizeGrain
     *
     * @return sheetSizeGrain
     */
    public Integer getSheetSizeGrain() {
        return sheetSizeGrain;
    }

    /**
     * Set sheetSizeGrain
     *
     * @param sheetSizeGrain Integer
     */
    public void setSheetSizeGrain(Integer sheetSizeGrain) {
        this.sheetSizeGrain = sheetSizeGrain;
    }

    /**
     * Get upperFlap
     *
     * @return upperFlap
     */
    public BigDecimal getUpperFlap() {
        return upperFlap;
    }

    /**
     * Set flap
     *
     * @param upperFlap BigDecimal
     */
    public void setUpperFlap(BigDecimal upperFlap) {
        this.upperFlap = upperFlap;
    }

    /**
     * Get insertion
     *
     * @return insertion
     */
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
     * Get groove
     *
     * @return groove
     */
    public Integer getGroove() {
        return groove;
    }

    /**
     * Set groove
     *
     * @param groove Integer
     */
    public void setGroove(Integer groove) {
        this.groove = groove;
    }

    public String getColorBText1() {
        return colorBText1;
    }

    public void setColorBText1(String colorBText1) {
        this.colorBText1 = colorBText1;
    }

    public String getColorFText1() {
        return colorFText1;
    }

    public void setColorFText1(String colorFText1) {
        this.colorFText1 = colorFText1;
    }

    public String getColorFText2() {
        return colorFText2;
    }

    public void setColorFText2(String colorFText2) {
        this.colorFText2 = colorFText2;
    }

    public String getColorFText3() {
        return colorFText3;
    }

    public void setColorFText3(String colorFText3) {
        this.colorFText3 = colorFText3;
    }

    /**
     * Get colorF
     *
     * @return colorF
     */
    public MstColorJson getColorF() {
        return colorF;
    }

    /**
     * Set colorF
     *
     * @param colorF MstColorJson
     */
    public void setColorF(MstColorJson colorF) {
        this.colorF = colorF;
    }

    /**
     * Get colorB
     *
     * @return colorB
     */
    public MstColorJson getColorB() {
        return colorB;
    }

    /**
     * Set colorB
     *
     * @param colorB MstColorJson
     */
    public void setColorB(MstColorJson colorB) {
        this.colorB = colorB;
    }

    /**
     * Get packing
     *
     * @return packing
     */
    public MstPackingJson getPacking() {
        return packing;
    }

    /**
     * Set packing
     *
     * @param packing MstPackingJson
     */
    public void setPacking(MstPackingJson packing) {
        this.packing = packing;
    }

    /**
     * Get paper
     *
     * @return paper
     */
    public MstPaperJson getPaper() {
        return paper;
    }

    /**
     * Set paper
     *
     * @param paper MstPaperJson
     */
    public void setPaper(MstPaperJson paper) {
        this.paper = paper;
    }

    /**
     * Get paste
     *
     * @return paste
     */
    public MstPasteJson getPaste() {
        return paste;
    }

    /**
     * Set paste
     *
     * @param paste MstPasteJson
     */
    public void setPaste(MstPasteJson paste) {
        this.paste = paste;
    }

    /**
     * Get stamping
     *
     * @return stamping
     */
    public MstStampingJson getStamping() {
        return stamping;
    }

    /**
     * Set stamping
     *
     * @param stamping MstStampingJson
     */
    public void setStamping(MstStampingJson stamping) {
        this.stamping = stamping;
    }

    /**
     * Get dieCutting
     *
     * @return dieCutting
     */
    public MstDieCuttingJson getDieCutting() {
        return dieCutting;
    }

    /**
     * Set dieCutting
     *
     * @param dieCutting MstDieCuttingJson
     */
    public void setDieCutting(MstDieCuttingJson dieCutting) {
        this.dieCutting = dieCutting;
    }

    /**
     * Get surfaceF
     *
     * @return surfaceF
     */
    public MstSurfaceTreatmentJson getSurfaceF() {
        return surfaceF;
    }

    /**
     * Set surfaceF
     *
     * @param surfaceF MstSurfaceTreatmentJson
     */
    public void setSurfaceF(MstSurfaceTreatmentJson surfaceF) {
        this.surfaceF = surfaceF;
    }

    /**
     * Get surfaceB
     *
     * @return surfaceB
     */
    public MstSurfaceTreatmentJson getSurfaceB() {
        return surfaceB;
    }

    /**
     * Set surfaceB
     *
     * @param surfaceB MstSurfaceTreatmentJson
     */
    public void setSurfaceB(MstSurfaceTreatmentJson surfaceB) {
        this.surfaceB = surfaceB;
    }

    /**
     * Get window
     *
     * @return window
     */
    public MstWindowJson getWindow() {
        return window;
    }

    /**
     * Set window
     *
     * @param window MstWindowJson
     */
    public void setWindow(MstWindowJson window) {
        this.window = window;
    }

    /**
     * Get dealProducts
     *
     * @return dealProducts
     */
    public List<DealProductJson> getDealProducts() {
        return dealProducts;
    }

    /**
     * Set dealProducts
     *
     * @param dealProducts List<DealProductJson>
     */
    public void setDealProducts(List<DealProductJson> dealProducts) {
        this.dealProducts = dealProducts;
    }

    /**
     * Get wooden
     *
     * @return wooden
     */
    public MstWoodenJson getWooden() {
        return wooden;
    }

    /**
     * Set wooden
     *
     * @param wooden MstWoodenJson
     */
    public void setWooden(MstWoodenJson wooden) {
        this.wooden = wooden;
    }

    /**
     * Get productFiles
     *
     * @return productFiles
     */
    public List<ProductFileJson> getProductFiles() {
        return productFiles;
    }

    /**
     * Set productFiles
     *
     * @param productFiles List<ProductFileJson>
     */
    public void setProductFiles(List<ProductFileJson> productFiles) {
        this.productFiles = productFiles;
    }

    /**
     * Get productOutputs
     *
     * @return productOutputs
     */
    public List<ProductOutputJson> getProductOutputs() {
        return productOutputs;
    }

    /**
     * Set productOutputs
     *
     * @param productOutputs List<ProductOutputJson>
     */
    public void setProductOutputs(List<ProductOutputJson> productOutputs) {
        this.productOutputs = productOutputs;
    }

    /**
     * Get productCommon
     *
     * @return productCommon
     */
    public ProductCommonFeeJson getProductCommon() {
        return productCommon;
    }

    /**
     * Set productCommon
     *
     * @param productCommon ProductCommonFeeJson
     */
    public void setProductCommon(ProductCommonFeeJson productCommon) {
        this.productCommon = productCommon;
    }

    /**
     * Get shippingCost
     *
     * @return shippingCost
     */
    public MstShippingCostJson getShippingCost() {
        return shippingCost;
    }

    /**
     * Set shippingCost
     *
     * @param shippingCost MstShippingCostJson
     */
    public void setShippingCost(MstShippingCostJson shippingCost) {
        this.shippingCost = shippingCost;
    }

    /**
     * Get drawingImages
     *
     * @return drawingImages
     */
    public List<DrawingImageJson> getDrawingImages() {
        return drawingImages;
    }

    /**
     * Set drawingImages
     *
     * @param drawingImages List<DrawingImageJson>
     */
    public void setDrawingImages(List<DrawingImageJson> drawingImages) {
        this.drawingImages = drawingImages;
    }


    public Integer getSpecialSizeFlag() {
        return specialSizeFlag;
    }

    public void setSpecialSizeFlag(Integer specialSizeFlag) {
        this.specialSizeFlag = specialSizeFlag;
    }

    public Integer getSpecialDieCuttingNumberFlag() {
        return specialDieCuttingNumberFlag;
    }

    public void setSpecialDieCuttingNumberFlag(Integer specialDieCuttingNumberFlag) {
        this.specialDieCuttingNumberFlag = specialDieCuttingNumberFlag;
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

    public Integer getPaperHeadApprovalFlag() {
        return paperHeadApprovalFlag;
    }

    public void setPaperHeadApprovalFlag(Integer paperHeadApprovalFlag) {
        this.paperHeadApprovalFlag = paperHeadApprovalFlag;
    }

    public BigDecimal getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(BigDecimal laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    public BigDecimal getLaminationFrontThroughWage() {
        return laminationFrontThroughWage;
    }

    public void setLaminationFrontThroughWage(BigDecimal laminationFrontThroughWage) {
        this.laminationFrontThroughWage = laminationFrontThroughWage;
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

    public BigDecimal getLaminationAThroughWage() {
        return laminationAThroughWage;
    }

    public void setLaminationAThroughWage(BigDecimal laminationAThroughWage) {
        this.laminationAThroughWage = laminationAThroughWage;
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

    public BigDecimal getLaminationBThroughWage() {
        return laminationBThroughWage;
    }

    public void setLaminationBThroughWage(BigDecimal laminationBThroughWage) {
        this.laminationBThroughWage = laminationBThroughWage;
    }

    public Integer getLaminationPaperTypeB() {
        return laminationPaperTypeB;
    }

    public void setLaminationPaperTypeB(Integer laminationPaperTypeB) {
        this.laminationPaperTypeB = laminationPaperTypeB;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }

    public BigDecimal getCartonTapeCutting() {
        return cartonTapeCutting;
    }

    public void setCartonTapeCutting(BigDecimal cartonTapeCutting) {
        this.cartonTapeCutting = cartonTapeCutting;
    }

    public BigDecimal getCartonLinerCutting() {
        return cartonLinerCutting;
    }

    public void setCartonLinerCutting(BigDecimal cartonLinerCutting) {
        this.cartonLinerCutting = cartonLinerCutting;
    }

    public Integer getHandProcessingFlag() {
        return handProcessingFlag;
    }

    public void setHandProcessingFlag(Integer handProcessingFlag) {
        this.handProcessingFlag = handProcessingFlag;
    }

    public Integer getWaterRepellentFlag() {
        return waterRepellentFlag;
    }

    public void setWaterRepellentFlag(Integer waterRepellentFlag) {
        this.waterRepellentFlag = waterRepellentFlag;
    }

    public Integer getCopyType() {
        return copyType;
    }

    public void setCopyType(Integer copyType) {
        this.copyType = copyType;
    }

    public String getEmbossingCode() {
        return embossingCode;
    }

    public void setEmbossingCode(String embossingCode) {
        this.embossingCode = embossingCode;
    }

    public Integer getRequestDesignFlag() {
        return requestDesignFlag;
    }

    public void setRequestDesignFlag(Integer requestDesignFlag) {
        this.requestDesignFlag = requestDesignFlag;
    }

    public Integer getRequestProductionFlag() {
        return requestProductionFlag;
    }

    public void setRequestProductionFlag(final Integer requestProductionFlag) {
        this.requestProductionFlag = requestProductionFlag;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(final String itemCode) {
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

    public Integer getRequestLot() {
        return requestLot;
    }

    public void setRequestLot(final Integer requestLot) {
        this.requestLot = requestLot;
    }

    public String getColorBText2() {
        return colorBText2;
    }

    public void setColorBText2(String colorBText2) {
        this.colorBText2 = colorBText2;
    }

    public String getColorBText3() {
        return colorBText3;
    }

    public void setColorBText3(String colorBText3) {
        this.colorBText3 = colorBText3;
    }

    public String getColorBText4() {
        return colorBText4;
    }

    public void setColorBText4(String colorBText4) {
        this.colorBText4 = colorBText4;
    }

    public String getColorFText4() {
        return colorFText4;
    }

    public void setColorFText4(String colorFText4) {
        this.colorFText4 = colorFText4;
    }

    public String getColorFText5() {
        return colorFText5;
    }

    public void setColorFText5(String colorFText5) {
        this.colorFText5 = colorFText5;
    }

    public String getColorFText6() {
        return colorFText6;
    }

    public void setColorFText6(String colorFText6) {
        this.colorFText6 = colorFText6;
    }

    public String getColorFText7() {
        return colorFText7;
    }

    public void setColorFText7(String colorFText7) {
        this.colorFText7 = colorFText7;
    }

    public String getColorFText8() {
        return colorFText8;
    }

    public void setColorFText8(String colorFText8) {
        this.colorFText8 = colorFText8;
    }

    public SupplierJson getSupplier() {
        return supplier;
    }

    public void setSupplier(SupplierJson supplier) {
        this.supplier = supplier;
    }

    /**
     * Create ProductDto
     *
     * @return ProductDto
     */
    public ProductDto getData() {
        ProductDto dto = new ProductDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setProductName(productName);
        dto.setProductType(productType);
        dto.setProductCode(productCode);
        dto.setSpecs(specs);
        dto.setApplication(application);
        dto.setMemo1(memo1);
        dto.setMemo2(memo2);
        dto.setMemo3(memo3);
        dto.setSizeH(sizeH);
        dto.setSizeD(sizeD);
        dto.setSizeW(sizeW);
        dto.setPaperNameId(paperNameId);
        dto.setPaperWeight(paperWeight);
        dto.setPaperSizeH(paperSizeH);
        dto.setPaperSizeW(paperSizeW);
        dto.setCutPaperSizeH(cutPaperSizeH);
        dto.setCutPaperSizeW(cutPaperSizeW);
        dto.setBlankPaperSizeH(blankPaperSizeH);
        dto.setBlankPaperSizeW(blankPaperSizeW);
        dto.setPaperId(paperId);
        dto.setTakenNumber(takenNumber);
        dto.setImpositionNumber(impositionNumber);
        dto.setColorFSelect(colorFSelect);
        dto.setColorBSelect(colorBSelect);
        dto.setSpecialColorF(specialColorF);
        dto.setSpecialColorB(specialColorB);
        dto.setColorBText1(colorBText1);
        dto.setColorBText2(colorBText2);
        dto.setColorBText3(colorBText3);
        dto.setColorBText4(colorBText4);

        dto.setColorFText4(colorFText4);
        dto.setColorFText5(colorFText5);
        dto.setColorFText6(colorFText6);
        dto.setColorFText7(colorFText7);
        dto.setColorFText8(colorFText8);

        dto.setPrintMethod(printMethod);
        dto.setColorIdF(colorIdF);
        dto.setColorIdB(colorIdB);
        dto.setSurfaceTreatmentIdF(surfaceTreatmentIdF);
        dto.setSurfaceTreatmentIdB(surfaceTreatmentIdB);
        dto.setEmbossingID(embossingID);
        dto.setLaminationFlute(laminationFlute);
        dto.setLaminationMediumBasicWeight(laminationMediumBasicWeight);
        dto.setLaminationMediumThroughWage(laminationMediumThroughWage);
        dto.setLaminationBackBasicWeight(laminationBackBasicWeight);
        dto.setLaminationBackThroughWage(laminationBackThroughWage);
        dto.setLaminationNumber(laminationNumber);
        dto.setLaminationWidth(laminationWidth);
        dto.setLaminationCuttingFlow(laminationCuttingFlow);
        dto.setDieCuttingId(dieCuttingId);
        dto.setDieCuttingThroughNumber(dieCuttingThroughNumber);
        dto.setDieCuttingWeight(dieCuttingWeight);
        dto.setStampingId(stampingId);
        dto.setStampingProcessingType(stampingProcessingType);
        dto.setStampingSizeW1(stampingSizeW1);
        dto.setStampingSizeW2(stampingSizeW2);
        dto.setStampingSizeW3(stampingSizeW3);
        dto.setStampingSizeW4(stampingSizeW4);
        dto.setStampingSizeH1(stampingSizeH1);
        dto.setStampingSizeH2(stampingSizeH2);
        dto.setStampingSizeH3(stampingSizeH3);
        dto.setStampingSizeH4(stampingSizeH4);
        dto.setWindowId(windowId);
        dto.setWindowSizeH(windowSizeH);
        dto.setWindowSizeW(windowSizeW);
        dto.setPasteId(pasteId);
        dto.setPasteForm(pasteForm);
        dto.setPackingId(packingId);
        dto.setInspectionId(inspectionId);
//        dto.setWoodenId(woodenId);
        dto.setWoodenCode(woodenCode);
        dto.setWoodenCode2(woodenCode2);
        dto.setFilmCode(filmCode);
        dto.setCustomerProductCode(customerProductCode);
        dto.setFactoryId(factoryId);
        dto.setPasteSpecialFormFlag(pasteSpecialFormFlag);
        dto.setDeliveryDistance(deliveryDistance);
        dto.setOtherExpense1(otherExpense1);
        dto.setOtherWage1(otherWage1);
        dto.setOtherUnitType1(otherUnitType1);
        dto.setOtherExpense2(otherExpense2);
        dto.setOtherWage2(otherWage2);
        dto.setOtherUnitType2(otherUnitType2);
        dto.setOtherExpense3(otherExpense3);
        dto.setOtherWage3(otherWage3);
        dto.setOtherUnitType3(otherUnitType3);
        dto.setShippingCostId(shippingCostId);
        dto.setStampingPointsNumber(stampingPointsNumber);
        dto.setShapeId(shapeId);
        dto.setSheetSizeId(sheetSizeId);
//        sheetSizeHeight = paperSizeH;
//        sheetSizeWidth = paperSizeW;
//        if(sheetSizeWidth!=null) {
//            dto.setPaperSizeW(sheetSizeWidth);
//        }
//        if(sheetSizeHeight!=null) {
//            dto.setPaperSizeH(sheetSizeHeight);
//        }
        dto.setSheetSizeGrain(sheetSizeGrain);
        dto.setUpperFlap(upperFlap);
        dto.setInsertion(insertion);
        dto.setGrain(grain);
        dto.setGroove(groove);
        dto.setColorFText1(colorFText1);
        dto.setColorFText2(colorFText2);
        dto.setColorFText3(colorFText3);

        dto.setSpecialSizeFlag(specialSizeFlag);
        dto.setSpecialDieCuttingNumberFlag(specialDieCuttingNumberFlag);
        dto.setLaminationPaperTypeBack(laminationPaperTypeBack);
        dto.setLaminationPaperTypeMedium(laminationPaperTypeMedium);
        dto.setPaperHeadApprovalFlag(paperHeadApprovalFlag);
        dto.setLaminationPaperTypeFront(laminationPaperTypeFront);
        dto.setLaminationFrontBasicWeight(laminationFrontBasicWeight);
        dto.setLaminationFrontThroughWage(laminationFrontThroughWage);
        dto.setLaminationPaperTypeA(laminationPaperTypeA);
        dto.setLaminationABasicWeight(laminationABasicWeight);
        dto.setLaminationAThroughWage(laminationAThroughWage);
        dto.setLaminationPaperTypeB(laminationPaperTypeB);
        dto.setLaminationBBasicWeight(laminationBBasicWeight);
        dto.setLaminationBThroughWage(laminationBThroughWage);
        dto.setCartonShippingType(cartonShippingType);
        dto.setCartonTapeCutting(cartonTapeCutting);
        dto.setCartonLinerCutting(cartonLinerCutting);
        dto.setHandProcessingFlag(handProcessingFlag);
        dto.setWaterRepellentFlag(waterRepellentFlag);
        dto.setCopyType(copyType);
        dto.setEmbossingCode(embossingCode);
        dto.setRequestDesignFlag(requestDesignFlag);
        dto.setRequestProductionFlag(requestProductionFlag);
        dto.setItemCode(itemCode);

        dto.setLaminationMediumId(laminationMediumId);
        dto.setLaminationBackId(laminationBackId);
        dto.setLaminationFrontId(laminationFrontId);
        dto.setLaminationBId(laminationBId);
        dto.setLaminationAId(laminationAId);
        dto.setRequestLot(requestLot);

        return dto;
    }

    /**
     * Create ProductJson
     *
     * @param dto ProductDto
     */

    public void setData(ProductDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.productName = dto.getProductName();
        this.productType = dto.getProductType();
        this.productCode = dto.getProductCode();
        this.specs = dto.getSpecs();
        this.application = dto.getApplication();
        this.memo1 = dto.getMemo1();
        this.memo2 = dto.getMemo2();
        this.memo3 = dto.getMemo3();
        this.sizeH = dto.getSizeH();
        this.sizeD = dto.getSizeD();
        this.sizeW = dto.getSizeW();
        this.paperNameId = dto.getPaperNameId();
        this.paperWeight = dto.getPaperWeight();
        this.paperSizeH = dto.getPaperSizeH();
        this.paperSizeW = dto.getPaperSizeW();
        this.cutPaperSizeH = dto.getCutPaperSizeH();
        this.cutPaperSizeW = dto.getCutPaperSizeW();
        this.blankPaperSizeH = dto.getBlankPaperSizeH();
        this.blankPaperSizeW = dto.getBlankPaperSizeW();
        this.paperId = dto.getPaperId();
        this.takenNumber = dto.getTakenNumber();
        this.impositionNumber = dto.getImpositionNumber();
        this.colorFSelect = dto.getColorFSelect();
        this.colorBSelect = dto.getColorBSelect();
        this.specialColorF = dto.getSpecialColorF();
        this.specialColorB = dto.getSpecialColorB();
        this.colorBText1 = dto.getColorBText1();
        this.colorBText2 = dto.getColorBText2();
        this.colorBText3 = dto.getColorBText3();
        this.colorBText4 = dto.getColorBText4();

        this.colorFText4 = dto.getColorFText4();
        this.colorFText5 = dto.getColorFText5();
        this.colorFText6 = dto.getColorFText6();
        this.colorFText7 = dto.getColorFText7();
        this.colorFText8 = dto.getColorFText8();

        this.printMethod = dto.getPrintMethod();
        this.colorIdF = dto.getColorIdF();
        this.colorIdB = dto.getColorIdB();
        this.surfaceTreatmentIdF = dto.getSurfaceTreatmentIdF();
        this.surfaceTreatmentIdB = dto.getSurfaceTreatmentIdB();
        this.embossingID = dto.getEmbossingID();
        this.laminationFlute = dto.getLaminationFlute();
        this.laminationMediumBasicWeight = dto.getLaminationMediumBasicWeight();
        this.laminationMediumThroughWage = dto.getLaminationMediumThroughWage();
        this.laminationBackBasicWeight = dto.getLaminationBackBasicWeight();
        this.laminationBackThroughWage = dto.getLaminationBackThroughWage();
        this.laminationNumber = dto.getLaminationNumber();
        this.laminationWidth = dto.getLaminationWidth();
        this.laminationCuttingFlow = dto.getLaminationCuttingFlow();
        this.dieCuttingId = dto.getDieCuttingId();
        this.dieCuttingThroughNumber = dto.getDieCuttingThroughNumber();
        this.dieCuttingWeight = dto.getDieCuttingWeight();
        this.stampingId = dto.getStampingId();
        this.stampingProcessingType = dto.getStampingProcessingType();
        this.stampingSizeW1 = dto.getStampingSizeW1();
        this.stampingSizeW2 = dto.getStampingSizeW2();
        this.stampingSizeW3 = dto.getStampingSizeW3();
        this.stampingSizeW4 = dto.getStampingSizeW4();
        this.stampingSizeH1 = dto.getStampingSizeH1();
        this.stampingSizeH2 = dto.getStampingSizeH2();
        this.stampingSizeH3 = dto.getStampingSizeH3();
        this.stampingSizeH4 = dto.getStampingSizeH4();
        this.windowId = dto.getWindowId();
        this.windowSizeH = dto.getWindowSizeH();
        this.windowSizeW = dto.getWindowSizeW();
        this.pasteId = dto.getPasteId();
        this.pasteForm = dto.getPasteForm();
        this.packingId = dto.getPackingId();
        this.inspectionId = dto.getInspectionId();
        //http://fridaynight.vnext.vn/issues/3324
        this.woodenCode = FormatUtil.concatItem(Constants.SLASH_JP, dto.getWoodenCode(),dto.getWoodenCode2());
        this.woodenCode2 = dto.getWoodenCode2();
        this.filmCode = dto.getFilmCode();
        this.customerProductCode = dto.getCustomerProductCode();
        this.factoryId = dto.getFactoryId();
        this.pasteSpecialFormFlag = dto.getPasteSpecialFormFlag();
        this.deliveryDistance = dto.getDeliveryDistance();
        this.otherExpense1 = dto.getOtherExpense1();
        this.otherWage1 = dto.getOtherWage1();
        this.otherUnitType1 = dto.getOtherUnitType1();
        this.otherExpense2 = dto.getOtherExpense2();
        this.otherWage2 = dto.getOtherWage2();
        this.otherUnitType2 = dto.getOtherUnitType2();
        this.otherExpense3 = dto.getOtherExpense3();
        this.otherWage3 = dto.getOtherWage3();
        this.otherUnitType3 = dto.getOtherUnitType3();
        this.shippingCostId = dto.getShippingCostId();
        this.stampingPointsNumber = dto.getStampingPointsNumber();
        this.shapeId = dto.getShapeId();
        this.sheetSizeId = dto.getSheetSizeId();
        this.sheetSizeWidth = dto.getPaperSizeW();
        this.sheetSizeHeight = dto.getPaperSizeH();
        this.sheetSizeGrain = dto.getSheetSizeGrain();
        this.upperFlap = dto.getUpperFlap();
        this.insertion = dto.getInsertion();
        this.grain = dto.getGrain();
        this.groove = dto.getGroove();
        this.colorFText1 = dto.getColorFText1();
        this.colorFText2 = dto.getColorFText2();
        this.colorFText3 = dto.getColorFText3();

        this.colorF = new MstColorJson();
        this.colorF.setId(dto.getColorIdF());
        this.colorB = new MstColorJson();
        this.colorB.setId(dto.getColorIdB());
        this.packing = new MstPackingJson();
        this.packing.setId(dto.getPackingId());
        this.paper = new MstPaperJson();
        this.paper.setId(dto.getPaperId());
        this.paste = new MstPasteJson();
        this.paste.setId(dto.getPasteId());
        this.stamping = new MstStampingJson();
        this.stamping.setId(dto.getStampingId());
        this.dieCutting = new MstDieCuttingJson();
        this.dieCutting.setId(dto.getDieCuttingId());
        this.surfaceF = new MstSurfaceTreatmentJson();
        this.surfaceF.setId(dto.getSurfaceTreatmentIdF());
        this.surfaceB = new MstSurfaceTreatmentJson();
        this.surfaceB.setId(dto.getSurfaceTreatmentIdB());
        this.window = new MstWindowJson();
        this.window.setId(dto.getWindowId());
        this.wooden = new MstWoodenJson();
//        this.wooden.setId(dto.getWoodenId());
        this.productCommon = new ProductCommonFeeJson();
        this.productCommon.setProductId(dto.getId());
        this.shippingCost = new MstShippingCostJson();
        this.shippingCost.setId(dto.getShippingCostId());
        this.specialSizeFlag = dto.getSpecialSizeFlag();
        this.specialDieCuttingNumberFlag = dto.getSpecialDieCuttingNumberFlag();
        this.laminationPaperTypeBack = dto.getLaminationPaperTypeBack();
        this.laminationPaperTypeMedium = dto.getLaminationPaperTypeMedium();
        this.paperHeadApprovalFlag = dto.getPaperHeadApprovalFlag();
        this.laminationPaperTypeFront = dto.getLaminationPaperTypeFront();
        this.laminationFrontBasicWeight = dto.getLaminationFrontBasicWeight();
        this.laminationFrontThroughWage = dto.getLaminationFrontThroughWage();
        this.laminationPaperTypeA = dto.getLaminationPaperTypeA();
        this.laminationABasicWeight = dto.getLaminationABasicWeight();
        this.laminationAThroughWage = dto.getLaminationAThroughWage();
        this.laminationPaperTypeB = dto.getLaminationPaperTypeB();
        this.laminationBBasicWeight = dto.getLaminationBBasicWeight();
        this.laminationBThroughWage = dto.getLaminationBThroughWage();
        this.cartonShippingType = dto.getCartonShippingType();
        this.cartonTapeCutting = dto.getCartonTapeCutting();
        this.cartonLinerCutting = dto.getCartonLinerCutting();
        this.handProcessingFlag = dto.getHandProcessingFlag();
        this.waterRepellentFlag = dto.getWaterRepellentFlag();
        this.copyType = dto.getCopyType();
        this.embossingCode = dto.getEmbossingCode();
        this.requestDesignFlag = dto.getRequestDesignFlag();
        this.requestProductionFlag = dto.getRequestProductionFlag();
        this.itemCode = dto.getItemCode();

        this.laminationAId = dto.getLaminationAId();
        this.laminationBId = dto.getLaminationBId();
        this.laminationFrontId = dto.getLaminationFrontId();
        this.laminationBackId = dto.getLaminationBackId();
        this.laminationMediumId = dto.getLaminationMediumId();
        this.requestLot = dto.getRequestLot();
    }
}
