package vn.vnext.sefuri.sf.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Nonnull;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.joda.time.DateTime;

import vn.vnext.sefuri.sf.common.enums.ChecksheetQuestion;

/**
 * Contain product input information.
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_product")
public class ProductDto extends BaseDto {

    private DateTime createRequestDesignDate;
    private DateTime updateRequestDesignDate;
    /* 製品名 */
    private String productName;
    /* 製品種類 */
    private Integer productType;
    /* productCode */
    private String productCode;
    /* 仕様 */
    private String specs;
    /* 用途 */
    private String application;
    /* メモ */
    private String memo1;
    /* 製品寸法 Height */
    private BigDecimal sizeH;
    /* 製品寸法 Depth */
    private BigDecimal sizeD;
    /* 製品寸法 Width */
    private BigDecimal sizeW;
    /* 原紙名ID */
    private Integer paperNameId;
    /* 坪量 */
    private BigDecimal paperWeight;
    /* 原紙サイズ Height */
    private BigDecimal paperSizeH;
    /* 原紙サイズ Width */
    private BigDecimal paperSizeW;
    /* 断裁サイズ Height */
    private BigDecimal cutPaperSizeH;
    /* 断裁サイズ Width */
    private BigDecimal cutPaperSizeW;
    /* ブランクサイズ Height */
    private BigDecimal blankPaperSizeH;
    /* ブランクサイズ Width */
    private BigDecimal blankPaperSizeW;
    /* 原紙 ID */
    private Integer paperId;
    /* 取数 */
    private Integer takenNumber;
    /* 面付数 */
    private Integer impositionNumber;
    /* 色（オモテ） */
    private Integer colorFSelect;
    /* 色（ウラ） */
    private Integer colorBSelect;
    /* 色（オモテ）特色数 */
    private Integer specialColorF;
    /* 色（ウラ）特色数 */
    private Integer specialColorB;

    private String colorBText1;
    private String colorBText2;
    private String colorBText3;
    private String colorBText4;

    private String colorFText1;
    private String colorFText2;
    private String colorFText3;
    private String colorFText4;
    private String colorFText5;
    private String colorFText6;
    private String colorFText7;
    private String colorFText8;

    /* 印刷方法 */
    private Integer printMethod;
    /* 色（オモテ）ID */
    private Integer colorIdF;
    /* 色（ウラ）ID */
    private Integer colorIdB;
    /* 表面加工 Front */
    private Integer surfaceTreatmentIdF;
    /* 表面加工 Back */
    private Integer surfaceTreatmentIdB;
    /* エンボス加工 */
    private Integer embossingID;
    /* フルート */
    private Integer laminationFlute;
    /* 中芯　坪量 */
    private BigDecimal laminationMediumBasicWeight;
    /* 中芯　ｋ＠ */
    private BigDecimal laminationMediumThroughWage;
    /* 裏ライナ　坪量 */
    private BigDecimal laminationBackBasicWeight;
    /* 裏ライナ　ｋ＠ */
    private BigDecimal laminationBackThroughWage;
    /* 片段取数 */
    private Integer laminationNumber;
    /* 紙幅 */
    private Integer laminationWidth;
    /* 断裁流れ */
    private Integer laminationCuttingFlow;
    /* 打抜ID */
    private Integer dieCuttingId;
    /* 打抜種類 */
    private Integer dieCuttingThroughNumber;
    /* 打抜面付数 */
    private Integer dieCuttingWeight;
    /* 箔押し */
    private Integer stampingId;
    /* 加工種類 */
    private Integer stampingProcessingType;
    /* 箔押し Width 1 */
    private Integer stampingSizeW1;
    /* 箔押し Width 2 */
    private Integer stampingSizeW2;
    /* 箔押し Width 3 */
    private Integer stampingSizeW3;
    /* 箔押し Width 4 */
    private Integer stampingSizeW4;
    /* 箔押し Height 1 */
    private Integer stampingSizeH1;
    /* 箔押し Height 2 */
    private Integer stampingSizeH2;
    /* 箔押し Height 3 */
    private Integer stampingSizeH3;
    /* 箔押し Height 4 */
    private Integer stampingSizeH4;
    /* 窓枠 ID */
    private Integer windowId;
    /* 窓枠寸法_縦 */
    private Integer windowSizeH;
    /* 窓枠寸法_横 */
    private Integer windowSizeW;
    /* 貼り ID */
    private Integer pasteId;
    /* 貼り形態 */
    private Integer pasteForm;
    /* 梱包 */
    private Integer packingId;
    /* 検品 */
    private Integer inspectionId;
    /* 木型NO */
    private String woodenCode;
    //
    private String woodenCode2;
    /* フィルムNo */
    private String filmCode;
    /* 得意先製品番号 */
    private String customerProductCode;
    /* 製造依頼元 */
    private Integer factoryId;
    /* memo2 */
    private String memo2;
    /* memo3 */
    private String memo3;
    /* pasteSpecialFormFlag */
    private Integer pasteSpecialFormFlag = 0;
    /* deliveryDistance */
    private Integer deliveryDistance;
    /* otherExpense1 */
    private String otherExpense1;
    /* otherWage1 */
    private BigDecimal otherWage1;
    /* otherUnitType1 */
    private Integer otherUnitType1;
    /* otherExpense2 */
    private String otherExpense2;
    /* otherWage2 */
    private BigDecimal otherWage2;
    /* otherUnitType2 */
    private Integer otherUnitType2;
    /* otherExpense3 */
    private String otherExpense3;
    /* otherWage3 */
    private BigDecimal otherWage3;
    /* otherUnitType3 */
    private Integer otherUnitType3;
    /* shippingCostId */
    private Integer shippingCostId;
    /* stampingPointsNumber */
    private Integer stampingPointsNumber;
    /* shapeId */
    private Integer shapeId;
    /* sheetSizeId */
    private Integer sheetSizeId;
    /* sheetSizeWidth */
    private BigDecimal sheetSizeWidth;
    /* sheetSizeHeight */
    private BigDecimal sheetSizeHeight;
    /* sheetSizeGrain */
    private Integer sheetSizeGrain;
    /* upperFlap */
    private BigDecimal upperFlap;
    /* lowerFlap */
    private BigDecimal lowerFlap;
    /* insertion */
    private BigDecimal insertion;
    /* grain */
    private Integer grain;
    /* developmentHeight */
    private BigDecimal developmentHeight;
    /* groove */
    private Integer groove;
    /* itemCode */
    private String itemCode;
    /* specialSizeFlag */
    private Integer specialSizeFlag = 0;
    /* specialDieCuttingNumberFlag */
    private Integer specialDieCuttingNumberFlag = 0;
    /* laminationPaperTypeMedium */
    private Integer laminationPaperTypeMedium;
    /* paperHeadApprovalFlag */
    private Integer paperHeadApprovalFlag = 0;
    /* laminationPaperTypeBack */
    private Integer laminationPaperTypeBack;
    /* embossingCode */
    private String embossingCode;
    /* copyType */

    private Integer copyType;

    private BigDecimal laminationFrontBasicWeight;

    private BigDecimal laminationFrontThroughWage;

    private Integer laminationPaperTypeFront;

    private BigDecimal laminationABasicWeight;

    private BigDecimal laminationAThroughWage;

    private Integer laminationPaperTypeA;

    private BigDecimal laminationBBasicWeight;

    private BigDecimal laminationBThroughWage;

    private Integer laminationPaperTypeB;

    private Integer cartonShippingType;

    private BigDecimal cartonTapeCutting;

    private BigDecimal cartonLinerCutting;

    private Integer handProcessingFlag;

    private Integer waterRepellentFlag;

    /* requestDesignFlag */
    private Integer requestDesignFlag;

    /* requestProductionFlag */
    private Integer requestProductionFlag;

    private Integer specialUpperFlapFlag;
    private Integer specialLowerFlapFlag;
    private Integer bindingNumber;
    private Integer stringColor;
    private Integer stringNumber;
    private Integer handType;
    private Integer handSize;
    private Integer otherMethod1;
    private Integer otherMethod2;
    private String otherNote1;
    private String otherNote2;
    private String otherNote3;
    private Integer specialNote1Flag;

    private Integer laminationAId;
    private Integer laminationBId;
    private Integer laminationFrontId;
    private Integer laminationBackId;
    private Integer laminationMediumId;

    private Integer supplierId;

    private Integer requiredAdditionalWork;
    /* colorFRsProduct */
    private MstColorDto colorF;
    /* colorBRsProduct */
    private MstColorDto colorB;
    /* packingRsProduct */
    private MstPackingDto packing;
    /* paperRsProduct */
    private MstPaperDto paper;
    /* pasteRsProduct */
    private MstPasteDto paste;
    /* stampingRsProduct */
    private MstStampingDto stamping;
    /* dieCuttingRsProduct */
    private MstDieCuttingDto dieCutting;
    /* surfaceTreatmentFRsProduct */
    private MstSurfaceTreatmentDto surfaceF;
    /* surfaceTreatmentBRsProduct */
    private MstSurfaceTreatmentDto surfaceB;
    /* windowRsProduct */
    private MstWindowDto window;
    /* productRsDealProduct */
    private List<DealProductDto> dealProducts;
    /* productRsProductFiles */
    private List<ProductFileDto> productFiles;
    /* productRsProductCommonFee */
    private ProductCommonFeeDto productCommon;
    /* productRsShippingCost */
    private MstShippingCostDto shippingCost;
    private SupplierDto supplierDto;
    /* productRsDrawingImage */
    private List<DrawingImageDto> drawingImages;
    // 糊付け
    private BigDecimal gluingPart;
    //結束方法
    private Integer bindingMethod;
    //手穴位置（スコアから）
    private Integer handPosition;
    private String sampleNo;
    private String foilColor1;
    private String foilColor2;
    private String foilColor3;
    private Integer packingInputNumber;
    private String passageNo;
    private String packingNote;

    private String stepDenno;

    //#2595
    private Integer requestLot;

    private Integer dieCuttingFlag;

    private Integer stampingNumber;
    /*default always set 0*/
    private Integer denno = 0;

    private BigDecimal corrugatorCuttingW;
    private BigDecimal corrugatorCuttingH;
    private BigDecimal slitterCuttingFlowW;
    private BigDecimal slitterCuttingFlowH;

    private BigDecimal sc1;
    private BigDecimal sc2;
    private BigDecimal sc3;
    private BigDecimal sc4;
    private BigDecimal sc5;
    private BigDecimal sc6;

    private BigDecimal t;
    private BigDecimal sl;

    /** バーコード1区分値 */
    private String specsBarcodeK1;
    /** バーコード2区分値 */
    private String specsBarcodeK2;
    /** バーコード3区分値 */
    private String specsBarcodeK3;
    /** バーコード1値 */
    private String specsBarcode1;
    /** バーコード2値 */
    private String specsBarcode2;
    /** バーコード3値 */
    private String specsBarcode3;

    private String sealVersionSubcontractingCode;
//
    private Integer shareWoodenFlag1 = 0;
    private Integer shareWoodenFlag2 = 0;

    //region Transient
    private MstWoodenDto mstWoodenDto;

    //region Transient
    private MstWoodenDto mstWoodenDto2;


    @Column(name = "share_wooden_flag1")
    public Integer getShareWoodenFlag1() {
        return shareWoodenFlag1;
    }

    public void setShareWoodenFlag1(Integer shareWoodenFlag1) {
        this.shareWoodenFlag1 = shareWoodenFlag1;
    }

    @Column(name = "share_wooden_flag2")
    public Integer getShareWoodenFlag2() {
        return shareWoodenFlag2;
    }

    public void setShareWoodenFlag2(Integer shareWoodenFlag2) {
        this.shareWoodenFlag2 = shareWoodenFlag2;
    }

    @Transient
    public SupplierDto getSupplierDto() {
        return supplierDto;
    }

    public void setSupplierDto(SupplierDto supplierDto) {
        this.supplierDto = supplierDto;
    }

    @Transient
    public MstWoodenDto getMstWoodenDto() {
        return mstWoodenDto;
    }

    public void setMstWoodenDto(MstWoodenDto mstWoodenDto) {
        this.mstWoodenDto = mstWoodenDto;
    }

    @Transient
    public MstWoodenDto getMstWoodenDto2() {
        return mstWoodenDto2;
    }

    public void setMstWoodenDto2(MstWoodenDto mstWoodenDto2) {
        this.mstWoodenDto2 = mstWoodenDto2;
    }

    //endregion

    @Basic
    @Column(name = "gluing_part")
    public BigDecimal getGluingPart() {
        return gluingPart;
    }

    public void setGluingPart(BigDecimal gluingPart) {
        this.gluingPart = gluingPart;
    }

    /**
     * Get productName
     *
     * @return productName
     */
    @Basic
    @Column(name = "product_name")
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
    @Basic
    @Column(name = "product_type")
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
    @Basic
    @Column(name = "product_code")
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
    @Basic
    @Column(name = "specs")
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
    @Basic
    @Column(name = "application")
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
    @Basic
    @Column(name = "memo1")
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
    @Basic
    @Column(name = "size_h")
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
    @Basic
    @Column(name = "size_d")
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
    @Basic
    @Column(name = "size_w")
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
    @Basic
    @Column(name = "paper_name_id")
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
    @Basic
    @Column(name = "paper_weight")
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
    @Basic
    @Column(name = "paper_size_h")
    public BigDecimal getPaperSizeH() {
        return paperSizeH;
    }

    /**
     * Set paperSizeH
     *
     * @param paperSizeH BigDecimal
     */
    public void setPaperSizeH(BigDecimal paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    /**
     * Get paperSizeW
     *
     * @return paperSizeW
     */
    @Basic
    @Column(name = "paper_size_w")
    public BigDecimal getPaperSizeW() {
        return paperSizeW;
    }

    /**
     * Set paperSizeW
     *
     * @param paperSizeW BigDecimal
     */
    public void setPaperSizeW(BigDecimal paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    /**
     * Get cutPaperSizeH
     *
     * @return cutPaperSizeH
     */
    @Basic
    @Column(name = "cut_paper_size_h")
    public BigDecimal getCutPaperSizeH() {
        return cutPaperSizeH;
    }

    /**
     * Set cutPaperSizeH
     *
     * @param cutPaperSizeH BigDecimal
     */
    public void setCutPaperSizeH(BigDecimal cutPaperSizeH) {
        this.cutPaperSizeH = cutPaperSizeH;
    }

    /**
     * Get cutPaperSizeW
     *
     * @return cutPaperSizeW
     */
    @Basic
    @Column(name = "cut_paper_size_w")
    public BigDecimal getCutPaperSizeW() {
        return cutPaperSizeW;
    }

    /**
     * Set cutPaperSizeW
     *
     * @param cutPaperSizeW BigDecimal
     */
    public void setCutPaperSizeW(BigDecimal cutPaperSizeW) {
        this.cutPaperSizeW = cutPaperSizeW;
    }

    /**
     * Get blankPaperSizeH
     *
     * @return blankPaperSizeH
     */
    @Basic
    @Column(name = "blank_paper_size_h")
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
    @Basic
    @Column(name = "blank_paper_size_w")
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
    @Basic
    @Column(name = "paper_id")
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
    @Basic
    @Column(name = "taken_number")
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
    @Basic
    @Column(name = "imposition_number")
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
    @Basic
    @Column(name = "color_f_select")
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
    @Basic
    @Column(name = "color_b_select")
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
    @Basic
    @Column(name = "special_color_f")
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
    @Basic
    @Column(name = "special_color_b")
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

    @Basic
    @Column(name = "color_b_text1")
    public String getColorBText1() {
        return colorBText1;
    }

    public void setColorBText1(String colorBText1) {
        this.colorBText1 = colorBText1;
    }

    @Basic
    @Column(name = "color_b_text2")
    public String getColorBText2() {
        return colorBText2;
    }

    public void setColorBText2(String colorBText2) {
        this.colorBText2 = colorBText2;
    }

    @Basic
    @Column(name = "color_b_text3")
    public String getColorBText3() {
        return colorBText3;
    }

    public void setColorBText3(String colorBText3) {
        this.colorBText3 = colorBText3;
    }

    @Basic
    @Column(name = "color_b_text4")
    public String getColorBText4() {
        return colorBText4;
    }

    public void setColorBText4(String colorBText4) {
        this.colorBText4 = colorBText4;
    }

    @Basic
    @Column(name = "color_f_text4")
    public String getColorFText4() {
        return colorFText4;
    }

    public void setColorFText4(String colorFText4) {
        this.colorFText4 = colorFText4;
    }

    @Basic
    @Column(name = "color_f_text5")
    public String getColorFText5() {
        return colorFText5;
    }

    public void setColorFText5(String colorFText5) {
        this.colorFText5 = colorFText5;
    }

    @Basic
    @Column(name = "color_f_text6")
    public String getColorFText6() {
        return colorFText6;
    }

    public void setColorFText6(String colorFText6) {
        this.colorFText6 = colorFText6;
    }

    @Basic
    @Column(name = "color_f_text7")
    public String getColorFText7() {
        return colorFText7;
    }

    public void setColorFText7(String colorFText7) {
        this.colorFText7 = colorFText7;
    }

    @Basic
    @Column(name = "color_f_text8")
    public String getColorFText8() {
        return colorFText8;
    }

    public void setColorFText8(String colorFText8) {
        this.colorFText8 = colorFText8;
    }

    /**
     * Get printMethod
     *
     * @return printMethod
     */
    @Basic
    @Column(name = "print_method")
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
    @Basic
    @Column(name = "color_id_f")
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
    @Basic
    @Column(name = "color_id_b")
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
    @Basic
    @Column(name = "surface_treatment_id_f")
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
    @Basic
    @Column(name = "surface_treatment_id_b")
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
    @Basic
    @Column(name = "embossingID")
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
    @Basic
    @Column(name = "lamination_flute")
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
    @Basic
    @Column(name = "lamination_medium_basic_weight")
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
    @Basic
    @Column(name = "lamination_medium_through_wage")
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
    @Basic
    @Column(name = "lamination_back_basic_weight")
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
    @Basic
    @Column(name = "lamination_back_through_wage")
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
    @Basic
    @Column(name = "lamination_number")
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
    @Basic
    @Column(name = "lamination_width")
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
    @Basic
    @Column(name = "lamination_cutting_flow")
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
    @Basic
    @Column(name = "die_cutting_id")
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
    @Basic
    @Column(name = "die_cutting_through_number")
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
    @Basic
    @Column(name = "die_cutting_weight")
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
    @Basic
    @Column(name = "stamping_id")
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
    @Basic
    @Column(name = "stamping_processing_type")
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
    @Basic
    @Column(name = "stamping_size_w1")
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
    @Basic
    @Column(name = "stamping_size_w2")
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
    @Basic
    @Column(name = "stamping_size_w3")
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
    @Basic
    @Column(name = "stamping_size_w4")
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
    @Basic
    @Column(name = "stamping_size_h1")
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
    @Basic
    @Column(name = "stamping_size_h2")
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
    @Basic
    @Column(name = "stamping_size_h3")
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
    @Basic
    @Column(name = "stamping_size_h4")
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
    @Basic
    @Column(name = "window_id")
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
    @Basic
    @Column(name = "window_size_h")
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
    @Basic
    @Column(name = "window_size_w")
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
    @Basic
    @Column(name = "paste_id")
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
    @Basic
    @Column(name = "paste_form")
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
    @Basic
    @Column(name = "packing_id")
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
    @Basic
    @Column(name = "inspection_id")
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
     * Get woodenCode
     *
     * @return woodenCode
     */
    @Basic
    @Column(name = "wooden_code")
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

    @Basic
    @Column(name = "wooden_code_2")
    public String getWoodenCode2() {
        return woodenCode2;
    }

    public void setWoodenCode2(String woodenCode2) {
        this.woodenCode2 = woodenCode2;
    }

    @Basic
    @Column(name = "film_code")
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
    @Basic
    @Column(name = "customer_product_code")
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
    @Basic
    @Column(name = "factory_id")
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
    @Basic
    @Column(name = "memo2")
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

    @Basic
    @Column(name = "memo3")
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
    @Basic
    @Column(name = "paste_special_form_flag")
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
    @Basic
    @Column(name = "delivery_distance")
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
    @Basic
    @Column(name = "other_expense1")
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
    @Basic
    @Column(name = "other_wage1")
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
    @Basic
    @Column(name = "other_unit_type1")
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
    @Basic
    @Column(name = "other_expense2")
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
    @Basic
    @Column(name = "other_wage2")
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
    @Basic
    @Column(name = "other_unit_type2")
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
    @Basic
    @Column(name = "other_expense3")
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
    @Basic
    @Column(name = "other_wage3")
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
    @Basic
    @Column(name = "other_unit_type3")
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
    @Basic
    @Column(name = "shipping_cost_id")
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
    @Basic
    @Column(name = "stamping_points_number")
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
    @Basic
    @Column(name = "shape_id")
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
    @Basic
    @Column(name = "sheet_size_id")
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
    @Basic
    @Column(name = "sheet_size_width")
    public BigDecimal getSheetSizeWidth() {
        return sheetSizeWidth;
    }

    /**
     * Set sheetSizeWidth
     *
     * @param sheetSizeWidth BigDecimal
     */
    public void setSheetSizeWidth(BigDecimal sheetSizeWidth) {
        this.sheetSizeWidth = sheetSizeWidth;
    }

    /**
     * Get sheetSizeHeight
     *
     * @return sheetSizeHeight
     */
    @Basic
    @Column(name = "sheet_size_height")
    public BigDecimal getSheetSizeHeight() {
        return sheetSizeHeight;
    }

    /**
     * Set sheetSizeHeight
     *
     * @param sheetSizeHeight BigDecimal
     */
    public void setSheetSizeHeight(BigDecimal sheetSizeHeight) {
        this.sheetSizeHeight = sheetSizeHeight;
    }

    /**
     * Get sheetSizeGrain
     *
     * @return sheetSizeGrain
     */
    @Basic
    @Column(name = "sheet_size_grain")
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
    @Basic
    @Column(name = "upper_flap")
    public BigDecimal getUpperFlap() {
        return upperFlap;
    }

    /**
     * Set upperFlap
     *
     * @param upperFlap BigDecimal
     */
    public void setUpperFlap(BigDecimal upperFlap) {
        this.upperFlap = upperFlap;
    }

    /**
     * Get lowerFlap
     *
     * @return lowerFlap
     */
    @Basic
    @Column(name = "lower_flap")
    public BigDecimal getLowerFlap() {
        return lowerFlap;
    }

    /**
     * Set lowerFlap
     *
     * @param lowerFlap BigDecimal
     */
    public void setLowerFlap(BigDecimal lowerFlap) {
        this.lowerFlap = lowerFlap;
    }

    /**
     * Get insertion
     *
     * @return insertion
     */
    @Basic
    @Column(name = "insertion")
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

    /**
     * Get developmentHeight
     *
     * @return developmentHeight
     */
    @Basic
    @Column(name = "development_height")
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
    @Basic
    @Column(name = "groove")
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

    @Basic
    @Column(name = "color_f_text1")
    public String getColorFText1() {
        return colorFText1;
    }

    public void setColorFText1(String colorFText1) {
        this.colorFText1 = colorFText1;
    }

    @Basic
    @Column(name = "color_f_text2")
    public String getColorFText2() {
        return colorFText2;
    }

    public void setColorFText2(String colorFText2) {
        this.colorFText2 = colorFText2;
    }

    @Basic
    @Column(name = "color_f_text3")
    public String getColorFText3() {
        return colorFText3;
    }

    public void setColorFText3(String colorFText3) {
        this.colorFText3 = colorFText3;
    }

    /**
     * Get itemCode
     *
     * @return itemCode
     */
    @Basic
    @Column(name = "item_code")
    public String getItemCode() {
        return itemCode;
    }

    /**
     * Set itemCode
     *
     * @param itemCode String
     */
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    /**
     * Get specialSizeFlag
     *
     * @return specialSizeFlag
     */
    @Basic
    @Column(name = "special_size_flag")
    public Integer getSpecialSizeFlag() {
        return specialSizeFlag;
    }

    /**
     * Set specialSizeFlag
     *
     * @param specialSizeFlag Integer
     */
    public void setSpecialSizeFlag(Integer specialSizeFlag) {
        this.specialSizeFlag = specialSizeFlag;
    }

    /**
     * Get specialDieCuttingNumberFlag
     *
     * @return specialDieCuttingNumberFlag
     */
    @Basic
    @Column(name = "special_die_cutting_number_flag")
    public Integer getSpecialDieCuttingNumberFlag() {
        return specialDieCuttingNumberFlag;
    }

    /**
     * Set specialDieCuttingNumberFlag
     *
     * @param specialDieCuttingNumberFlag Integer
     */
    public void setSpecialDieCuttingNumberFlag(Integer specialDieCuttingNumberFlag) {
        this.specialDieCuttingNumberFlag = specialDieCuttingNumberFlag;
    }

    /**
     * Get laminationPaperTypeMedium
     *
     * @return laminationPaperTypeMedium
     */
    @Basic
    @Column(name = "lamination_paper_type_medium")
    public Integer getLaminationPaperTypeMedium() {
        return laminationPaperTypeMedium;
    }

    /**
     * Set laminationPaperTypeMedium
     *
     * @param laminationPaperTypeMedium Integer
     */
    public void setLaminationPaperTypeMedium(Integer laminationPaperTypeMedium) {
        this.laminationPaperTypeMedium = laminationPaperTypeMedium;
    }

    /**
     * Get paperHeadApprovalFlag
     *
     * @return paperHeadApprovalFlag
     */
    @Basic
    @Column(name = "paper_head_approval_flag")
    public Integer getPaperHeadApprovalFlag() {
        return paperHeadApprovalFlag;
    }

    /**
     * Set paperHeadApprovalFlag
     *
     * @param paperHeadApprovalFlag Integer
     */
    public void setPaperHeadApprovalFlag(Integer paperHeadApprovalFlag) {
        this.paperHeadApprovalFlag = paperHeadApprovalFlag;
    }

    /**
     * Get laminationPaperTypeBack
     *
     * @return laminationPaperTypeBack
     */
    @Basic
    @Column(name = "lamination_paper_type_back")
    public Integer getLaminationPaperTypeBack() {
        return laminationPaperTypeBack;
    }

    /**
     * Set laminationPaperTypeBack
     *
     * @param laminationPaperTypeBack Integer
     */
    public void setLaminationPaperTypeBack(Integer laminationPaperTypeBack) {
        this.laminationPaperTypeBack = laminationPaperTypeBack;
    }

    /**
     * Get embossingCode
     *
     * @return embossingCode
     */
    @Basic
    @Column(name = "embossing_code")
    public String getEmbossingCode() {
        return embossingCode;
    }

    /**
     * Set embossingCode
     *
     * @param embossingCode String
     */
    public void setEmbossingCode(String embossingCode) {
        this.embossingCode = embossingCode;
    }

    /**
     * Get copyType
     *
     * @return copyType
     */
    @Basic
    @Column(name = "copy_type")
    public Integer getCopyType() {
        return copyType;
    }

    /**
     * Set copyType
     *
     * @param copyType Integer
     */
    public void setCopyType(Integer copyType) {
        this.copyType = copyType;
    }

    /**
     * Get colorF
     *
     * @return colorF
     */
    @Transient
    public MstColorDto getColorF() {
        return colorF;
    }

    /**
     * Set colorF
     *
     * @param colorF MstColorDto
     */
    public void setColorF(MstColorDto colorF) {
        this.colorF = colorF;
    }

    /**
     * Get colorB
     *
     * @return colorB
     */
    @Transient
    public MstColorDto getColorB() {
        return colorB;
    }

    /**
     * Set colorB
     *
     * @param colorB MstColorDto
     */
    public void setColorB(MstColorDto colorB) {
        this.colorB = colorB;
    }

    /**
     * Get packing
     *
     * @return packing
     */
    @Transient
    public MstPackingDto getPacking() {
        return packing;
    }

    /**
     * Set packing
     *
     * @param packing MstPackingDto
     */
    public void setPacking(MstPackingDto packing) {
        this.packing = packing;
    }

    /**
     * Get paper
     *
     * @return paper
     */
    @Transient
    public MstPaperDto getPaper() {
        return paper;
    }

    /**
     * Set paper
     *
     * @param paper MstPaperDto
     */
    public void setPaper(MstPaperDto paper) {
        this.paper = paper;
    }

    /**
     * Get paste
     *
     * @return paste
     */
    @Transient
    public MstPasteDto getPaste() {
        return paste;
    }

    /**
     * Set paste
     *
     * @param paste MstPasteDto
     */
    public void setPaste(MstPasteDto paste) {
        this.paste = paste;
    }

    /**
     * Get stamping
     *
     * @return stamping
     */
    @Transient
    public MstStampingDto getStamping() {
        return stamping;
    }

    /**
     * Set stamping
     *
     * @param stamping MstStampingDto
     */
    public void setStamping(MstStampingDto stamping) {
        this.stamping = stamping;
    }

    /**
     * Get dieCutting
     *
     * @return dieCutting
     */
    @Transient
    public MstDieCuttingDto getDieCutting() {
        return dieCutting;
    }

    /**
     * Set dieCutting
     *
     * @param dieCutting MstDieCuttingDto
     */
    public void setDieCutting(MstDieCuttingDto dieCutting) {
        this.dieCutting = dieCutting;
    }

    /**
     * Get surfaceF
     *
     * @return surfaceF
     */
    @Transient
    public MstSurfaceTreatmentDto getSurfaceF() {
        return surfaceF;
    }

    /**
     * Set surfaceF
     *
     * @param surfaceF MstSurfaceTreatmentDto
     */
    public void setSurfaceF(MstSurfaceTreatmentDto surfaceF) {
        this.surfaceF = surfaceF;
    }

    /**
     * Get surfaceB
     *
     * @return surfaceB
     */
    @Transient
    public MstSurfaceTreatmentDto getSurfaceB() {
        return surfaceB;
    }

    /**
     * Set surfaceB
     *
     * @param surfaceB MstSurfaceTreatmentDto
     */
    public void setSurfaceB(MstSurfaceTreatmentDto surfaceB) {
        this.surfaceB = surfaceB;
    }

    /**
     * Get window
     *
     * @return window
     */
    @Transient
    public MstWindowDto getWindow() {
        return window;
    }

    /**
     * Set window
     *
     * @param window MstWindowDto
     */
    public void setWindow(MstWindowDto window) {
        this.window = window;
    }

    /**
     * Get dealProducts
     *
     * @return dealProducts
     */
    @Transient
    public List<DealProductDto> getDealProducts() {
        return dealProducts;
    }

    /**
     * Set dealProducts
     *
     * @param dealProducts List<DealProductDto>
     */
    public void setDealProducts(List<DealProductDto> dealProducts) {
        this.dealProducts = dealProducts;
    }

    /**
     * Get productFiles
     *
     * @return productFiles
     */
    @Transient
    public List<ProductFileDto> getProductFiles() {
        return productFiles;
    }

    /**
     * Set productFiles
     *
     * @param productFiles List<ProductFileDto>
     */
    public void setProductFiles(List<ProductFileDto> productFiles) {
        this.productFiles = productFiles;
    }

    /**
     * Get productCommon
     *
     * @return productCommon
     */
    @Transient
    public ProductCommonFeeDto getProductCommon() {
        return productCommon;
    }

    /**
     * Set productCommon
     *
     * @param productCommon ProductCommonFeeDto
     */
    public void setProductCommon(ProductCommonFeeDto productCommon) {
        this.productCommon = productCommon;
    }

    /**
     * Get shippingCost
     *
     * @return shippingCost
     */
    @Transient
    public MstShippingCostDto getShippingCost() {
        return shippingCost;
    }

    /**
     * Set shippingCost
     *
     * @param shippingCost MstShippingCostDto
     */
    public void setShippingCost(MstShippingCostDto shippingCost) {
        this.shippingCost = shippingCost;
    }

    /**
     * Get drawingImages
     *
     * @return drawingImages
     */
    @Transient
    public List<DrawingImageDto> getDrawingImages() {
        return drawingImages;
    }

    /**
     * Set drawingImages
     *
     * @param drawingImages List<DrawingImageDto>
     */
    public void setDrawingImages(List<DrawingImageDto> drawingImages) {
        this.drawingImages = drawingImages;
    }


    @Basic
    @Column(name = "lamination_front_basic_weight")
    public BigDecimal getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(BigDecimal laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    @Basic
    @Column(name = "lamination_front_through_wage")
    public BigDecimal getLaminationFrontThroughWage() {
        return laminationFrontThroughWage;
    }

    public void setLaminationFrontThroughWage(BigDecimal laminationFrontThroughWage) {
        this.laminationFrontThroughWage = laminationFrontThroughWage;
    }

    @Basic
    @Column(name = "lamination_paper_type_front")
    public Integer getLaminationPaperTypeFront() {
        return laminationPaperTypeFront;
    }

    public void setLaminationPaperTypeFront(Integer laminationPaperTypeFront) {
        this.laminationPaperTypeFront = laminationPaperTypeFront;
    }

    @Basic
    @Column(name = "lamination_a_basic_weight")
    public BigDecimal getLaminationABasicWeight() {
        return laminationABasicWeight;
    }

    public void setLaminationABasicWeight(BigDecimal laminationABasicWeight) {
        this.laminationABasicWeight = laminationABasicWeight;
    }

    @Basic
    @Column(name = "lamination_a_through_wage")
    public BigDecimal getLaminationAThroughWage() {
        return laminationAThroughWage;
    }

    public void setLaminationAThroughWage(BigDecimal laminationAThroughWage) {
        this.laminationAThroughWage = laminationAThroughWage;
    }

    @Basic
    @Column(name = "lamination_paper_type_a")
    public Integer getLaminationPaperTypeA() {
        return laminationPaperTypeA;
    }

    public void setLaminationPaperTypeA(Integer laminationPaperTypeA) {
        this.laminationPaperTypeA = laminationPaperTypeA;
    }

    @Basic
    @Column(name = "lamination_b_basic_weight")
    public BigDecimal getLaminationBBasicWeight() {
        return laminationBBasicWeight;
    }

    public void setLaminationBBasicWeight(BigDecimal laminationBBasicWeight) {
        this.laminationBBasicWeight = laminationBBasicWeight;
    }

    @Basic
    @Column(name = "lamination_b_through_wage")
    public BigDecimal getLaminationBThroughWage() {
        return laminationBThroughWage;
    }

    public void setLaminationBThroughWage(BigDecimal laminationBThroughWage) {
        this.laminationBThroughWage = laminationBThroughWage;
    }

    @Basic
    @Column(name = "lamination_paper_type_b")
    public Integer getLaminationPaperTypeB() {
        return laminationPaperTypeB;
    }

    public void setLaminationPaperTypeB(Integer laminationPaperTypeB) {
        this.laminationPaperTypeB = laminationPaperTypeB;
    }

    @Basic
    @Column(name = "carton_shipping_type")
    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }

    @Basic
    @Column(name = "carton_tape_cutting")
    public BigDecimal getCartonTapeCutting() {
        return cartonTapeCutting;
    }

    public void setCartonTapeCutting(BigDecimal cartonTapeCutting) {
        this.cartonTapeCutting = cartonTapeCutting;
    }

    @Basic
    @Column(name = "carton_liner_cutting")
    public BigDecimal getCartonLinerCutting() {
        return cartonLinerCutting;
    }

    public void setCartonLinerCutting(BigDecimal cartonLinerCutting) {
        this.cartonLinerCutting = cartonLinerCutting;
    }

    @Basic
    @Column(name = "hand_processing_flag")
    public Integer getHandProcessingFlag() {
        return handProcessingFlag;
    }

    public void setHandProcessingFlag(Integer handProcessingFlag) {
        this.handProcessingFlag = handProcessingFlag;
    }

    @Basic
    @Column(name = "water_repellent_flag")
    public Integer getWaterRepellentFlag() {
        return waterRepellentFlag;
    }

    public void setWaterRepellentFlag(Integer waterRepellentFlag) {
        this.waterRepellentFlag = waterRepellentFlag;
    }

    @Basic
    @Column(name = "request_design_flag")
    public Integer getRequestDesignFlag() {
        return requestDesignFlag;
    }

    public void setRequestDesignFlag(final Integer requestDesignFlag) {
        this.requestDesignFlag = requestDesignFlag;
    }

    @Basic
    @Column(name = "request_production_flag")
    public Integer getRequestProductionFlag() {
        return requestProductionFlag;
    }

    public void setRequestProductionFlag(final Integer requestProductionFlag) {
        this.requestProductionFlag = requestProductionFlag;
    }

    @Basic
    @Column(name = "binding_method")
    public Integer getBindingMethod() {
        return bindingMethod;
    }

    public void setBindingMethod(Integer bindingMethod) {
        this.bindingMethod = bindingMethod;
    }

    @Basic
    @Column(name = "hand_position")
    public Integer getHandPosition() {
        return handPosition;
    }

    public void setHandPosition(Integer handPosition) {
        this.handPosition = handPosition;
    }

    @Basic
    @Column(name = "special_upper_flap_flag")
    public Integer getSpecialUpperFlapFlag() {
        return specialUpperFlapFlag;
    }

    public void setSpecialUpperFlapFlag(Integer specialUpperFlapFlag) {
        this.specialUpperFlapFlag = specialUpperFlapFlag;
    }

    @Basic
    @Column(name = "special_lower_flap_flag")
    public Integer getSpecialLowerFlapFlag() {
        return specialLowerFlapFlag;
    }

    public void setSpecialLowerFlapFlag(Integer specialLowerFlapFlag) {
        this.specialLowerFlapFlag = specialLowerFlapFlag;
    }

    @Basic
    @Column(name = "binding_number")
    public Integer getBindingNumber() {
        return bindingNumber;
    }

    public void setBindingNumber(Integer bindingNumber) {
        this.bindingNumber = bindingNumber;
    }

    @Basic
    @Column(name = "string_color")
    public Integer getStringColor() {
        return stringColor;
    }

    public void setStringColor(Integer stringColor) {
        this.stringColor = stringColor;
    }

    @Basic
    @Column(name = "string_number")
    public Integer getStringNumber() {
        return stringNumber;
    }

    public void setStringNumber(Integer stringNumber) {
        this.stringNumber = stringNumber;
    }

    @Basic
    @Column(name = "hand_type")
    public Integer getHandType() {
        return handType;
    }

    public void setHandType(Integer handType) {
        this.handType = handType;
    }

    @Basic
    @Column(name = "hand_size")
    public Integer getHandSize() {
        return handSize;
    }

    public void setHandSize(Integer handSize) {
        this.handSize = handSize;
    }

    @Basic
    @Column(name = "other_method1")
    public Integer getOtherMethod1() {
        return otherMethod1;
    }

    public void setOtherMethod1(Integer otherMethod1) {
        this.otherMethod1 = otherMethod1;
    }

    @Basic
    @Column(name = "other_method2")
    public Integer getOtherMethod2() {
        return otherMethod2;
    }

    public void setOtherMethod2(Integer otherMethod2) {
        this.otherMethod2 = otherMethod2;
    }

    @Basic
    @Column(name = "other_note1")
    public String getOtherNote1() {
        return otherNote1;
    }

    public void setOtherNote1(String otherNote1) {
        this.otherNote1 = otherNote1;
    }

    @Basic
    @Column(name = "other_note2")
    public String getOtherNote2() {
        return otherNote2;
    }

    public void setOtherNote2(String otherNote2) {
        this.otherNote2 = otherNote2;
    }

    @Basic
    @Column(name = "other_note3")
    public String getOtherNote3() {
        return otherNote3;
    }

    public void setOtherNote3(String otherNote3) {
        this.otherNote3 = otherNote3;
    }

    @Basic
    @Column(name = "special_note1_flag")
    public Integer getSpecialNote1Flag() {
        return specialNote1Flag;
    }

    public void setSpecialNote1Flag(Integer specialNote1Flag) {
        this.specialNote1Flag = specialNote1Flag;
    }

    @Basic
    @Column(name = "lamination_a_id")
    public Integer getLaminationAId() {
        return laminationAId;
    }

    public void setLaminationAId(Integer laminationAId) {
        this.laminationAId = laminationAId;
    }

    @Basic
    @Column(name = "lamination_b_id")
    public Integer getLaminationBId() {
        return laminationBId;
    }

    public void setLaminationBId(Integer laminationBId) {
        this.laminationBId = laminationBId;
    }

    @Basic
    @Column(name = "lamination_front_id")
    public Integer getLaminationFrontId() {
        return laminationFrontId;
    }

    public void setLaminationFrontId(Integer laminationFrontId) {
        this.laminationFrontId = laminationFrontId;
    }

    @Basic
    @Column(name = "lamination_back_id")
    public Integer getLaminationBackId() {
        return laminationBackId;
    }

    public void setLaminationBackId(Integer laminationBackId) {
        this.laminationBackId = laminationBackId;
    }

    @Basic
    @Column(name = "lamination_medium_id")
    public Integer getLaminationMediumId() {
        return laminationMediumId;
    }

    public void setLaminationMediumId(Integer laminationMediumId) {
        this.laminationMediumId = laminationMediumId;
    }

    @Basic
    @Column(name = "request_lot")
    public Integer getRequestLot() {
        return requestLot;
    }

    public void setRequestLot(final Integer requestLot) {
        this.requestLot = requestLot;
    }

    @Basic
    @Column(name = "denno")
    public Integer getDenno() {
        return denno;
    }

    public void setDenno(final Integer denno) {
        this.denno = denno;
    }

    @Basic
    @Column(name = "sample_no")
    public String getSampleNo() {
        return sampleNo;
    }

    public void setSampleNo(String sampleNo) {
        this.sampleNo = sampleNo;
    }

    @Basic
    @Column(name = "foil_color1")
    public String getFoilColor1() {
        return foilColor1;
    }

    public void setFoilColor1(String foilColor1) {
        this.foilColor1 = foilColor1;
    }

    @Basic
    @Column(name = "foil_color2")
    public String getFoilColor2() {
        return foilColor2;
    }

    public void setFoilColor2(String foilColor2) {
        this.foilColor2 = foilColor2;
    }


    @Basic
    @Column(name = "passage_no")
    public String getPassageNo() {
        return passageNo;
    }

    public void setPassageNo(String passageNo) {
        this.passageNo = passageNo;
    }

    @Basic
    @Column(name = "foil_color3")
    public String getFoilColor3() {
        return foilColor3;
    }

    public void setFoilColor3(String foilColor3) {
        this.foilColor3 = foilColor3;
    }

    @Basic
    @Column(name = "packing_input_number")
    public Integer getPackingInputNumber() {
        return packingInputNumber;
    }

    public void setPackingInputNumber(Integer packingInputNumber) {
        this.packingInputNumber = packingInputNumber;
    }

    @Basic
    @Column(name = "packing_note")
    public String getPackingNote() {
        return packingNote;
    }

    public void setPackingNote(String packingNote) {
        this.packingNote = packingNote;
    }

    @Basic
    @Column(name = "die_cutting_flag")
    public Integer getDieCuttingFlag() {
        return dieCuttingFlag;
    }

    public void setDieCuttingFlag(Integer dieCuttingFlag) {
        this.dieCuttingFlag = dieCuttingFlag;
    }

    @Basic
    @Column(name = "stamping_number")
    public Integer getStampingNumber() {
        return stampingNumber;
    }

    public void setStampingNumber(Integer stampingNumber) {
        this.stampingNumber = stampingNumber;
    }

    @Basic
    @Column(name = "supplier_id")
    public Integer getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(Integer supplierId) {
        this.supplierId = supplierId;
    }

    @Basic
    @Column(name = "step_denno")
    public String getStepDenno() {
        return stepDenno;
    }

    public void setStepDenno(String stepDenno) {
        this.stepDenno = stepDenno;
    }

    @Basic
    @Column(name = "corrugator_cutting_width")
    public BigDecimal getCorrugatorCuttingW() {
        return corrugatorCuttingW;
    }

    public void setCorrugatorCuttingW(BigDecimal corrugatorCuttingW) {
        this.corrugatorCuttingW = corrugatorCuttingW;
    }

    @Basic
    @Column(name = "corrugator_cutting_height")
    public BigDecimal getCorrugatorCuttingH() {
        return corrugatorCuttingH;
    }

    public void setCorrugatorCuttingH(BigDecimal corrugatorCuttingH) {
        this.corrugatorCuttingH = corrugatorCuttingH;
    }

    @Basic
    @Column(name = "slitter_cutting_flow_width")
    public BigDecimal getSlitterCuttingFlowW() {
        return slitterCuttingFlowW;
    }

    public void setSlitterCuttingFlowW(BigDecimal slitterCuttingFlowW) {
        this.slitterCuttingFlowW = slitterCuttingFlowW;
    }

    @Basic
    @Column(name = "slitter_cutting_flow_height")
    public BigDecimal getSlitterCuttingFlowH() {
        return slitterCuttingFlowH;
    }

    public void setSlitterCuttingFlowH(BigDecimal slitterCuttingFlowH) {
        this.slitterCuttingFlowH = slitterCuttingFlowH;
    }

    @Basic
    @Column(name = "sc1")
    public BigDecimal getSc1() {
        return sc1;
    }

    public void setSc1(BigDecimal sc1) {
        this.sc1 = sc1;
    }

    @Basic
    @Column(name = "sc2")
    public BigDecimal getSc2() {
        return sc2;
    }

    public void setSc2(BigDecimal sc2) {
        this.sc2 = sc2;
    }

    @Basic
    @Column(name = "sc3")
    public BigDecimal getSc3() {
        return sc3;
    }

    public void setSc3(BigDecimal sc3) {
        this.sc3 = sc3;
    }

    @Basic
    @Column(name = "sc4")
    public BigDecimal getSc4() {
        return sc4;
    }

    public void setSc4(BigDecimal sc4) {
        this.sc4 = sc4;
    }

    @Basic
    @Column(name = "sc5")
    public BigDecimal getSc5() {
        return sc5;
    }

    public void setSc5(BigDecimal sc5) {
        this.sc5 = sc5;
    }

    @Basic
    @Column(name = "sc6")
    public BigDecimal getSc6() {
        return sc6;
    }

    public void setSc6(BigDecimal sc6) {
        this.sc6 = sc6;
    }

    public void setStepDeno(String stepDenno) {
        this.stepDenno = stepDenno;
    }

    @Basic
    @Column(name = "t")
    public BigDecimal getT() {
        return t;
    }

    public void setT(BigDecimal t) {
        this.t = t;
    }
    @Basic
    @Column(name = "sl")
    public BigDecimal getSl() {
        return sl;
    }

    public void setSl(BigDecimal sl) {
        this.sl = sl;
    }

    @Basic
    @Column(name = "seal_version_subcontracting_code")
    public String getSealVersionSubcontractingCode() {
        return sealVersionSubcontractingCode;
    }

    public void setSealVersionSubcontractingCode(String sealVersionSubcontractingCode) {
        this.sealVersionSubcontractingCode = sealVersionSubcontractingCode;
    }

    @Basic
    @Column(name = "created_request_design_date")
    public DateTime getCreateRequestDesignDate() {
        return createRequestDesignDate;
    }

    public void setCreateRequestDesignDate(DateTime createRequestDesignDate) {
        this.createRequestDesignDate = createRequestDesignDate;
    }

    @Basic
    @Column(name = "updated_request_design_date")
    public DateTime getUpdateRequestDesignDate() {
        return updateRequestDesignDate;
    }

    public void setUpdateRequestDesignDate(DateTime updateRequestDesignDate) {
        this.updateRequestDesignDate = updateRequestDesignDate;
    }
    @Basic
    @Column(name = "required_additional_work")
    public Integer getRequiredAdditionalWork() {
        return requiredAdditionalWork;
    }

    public void setRequiredAdditionalWork(Integer requiredAdditionalWork) {
        this.requiredAdditionalWork = requiredAdditionalWork;
    }

    /**
     * @return バーコード1区分値
     */
    @Basic
    @Column(name = "specs_barcode_k1")
    public String getSpecsBarcodeK1() {
        return specsBarcodeK1;
    }

    /**
     * @param specsBarcodeK1 バーコード1区分値
     */
    public void setSpecsBarcodeK1(String specsBarcodeK1) {
        this.specsBarcodeK1 = specsBarcodeK1;
    }

    /**
     * @return バーコード2区分値
     */
    @Basic
    @Column(name = "specs_barcode_k2")
    public String getSpecsBarcodeK2() {
        return specsBarcodeK2;
    }

    /**
     * @param specsBarcodeK1 バーコード2区分値
     */
    public void setSpecsBarcodeK2(String specsBarcodeK2) {
        this.specsBarcodeK2 = specsBarcodeK2;
    }

    /**
     * @return バーコード3区分値
     */
    @Basic
    @Column(name = "specs_barcode_k3")
    public String getSpecsBarcodeK3() {
        return specsBarcodeK3;
    }

    /**
     * @param specsBarcodeK1 バーコード3区分値
     */
    public void setSpecsBarcodeK3(String specsBarcodeK3) {
        this.specsBarcodeK3 = specsBarcodeK3;
    }

    /**
     * @return バーコード1値
     */
    @Basic
    @Column(name = "specs_barcode_1")
    public String getSpecsBarcode1() {
        return specsBarcode1;
    }

    /**
     * @param specsBarcodeK1 バーコード1値
     */
    public void setSpecsBarcode1(String specsBarcode1) {
        this.specsBarcode1 = specsBarcode1;
    }

    /**
     * @return バーコード2値
     */
    @Basic
    @Column(name = "specs_barcode_2")
    public String getSpecsBarcode2() {
        return specsBarcode2;
    }

    /**
     * @param specsBarcodeK1 バーコード2値
     */
    public void setSpecsBarcode2(String specsBarcode2) {
        this.specsBarcode2 = specsBarcode2;
    }

    /**
     * @return バーコード3値
     */
    @Basic
    @Column(name = "specs_barcode_3")
    public String getSpecsBarcode3() {
        return specsBarcode3;
    }

    /**
     * @param specsBarcodeK1 バーコード3値
     */
    public void setSpecsBarcode3(String specsBarcode3) {
        this.specsBarcode3 = specsBarcode3;
    }

    public ProductDto clone() {
        ProductDto dto = new ProductDto();
        dto.setProductName(this.productName);
        dto.setProductType(this.productType);
        dto.setProductCode(this.productCode);
        dto.setSpecs(this.specs);
        dto.setApplication(this.application);
        dto.setMemo1(this.memo1);
        dto.setSizeH(this.sizeH);
        dto.setSizeD(this.sizeD);
        dto.setSizeW(this.sizeW);
        dto.setPaperNameId(this.paperNameId);
        dto.setPaperWeight(this.paperWeight);
        dto.setPaperSizeH(this.paperSizeH);
        dto.setPaperSizeW(this.paperSizeW);
        dto.setCutPaperSizeH(this.cutPaperSizeH);
        dto.setCutPaperSizeW(this.cutPaperSizeW);
        dto.setBlankPaperSizeH(this.blankPaperSizeH);
        dto.setBlankPaperSizeW(this.blankPaperSizeW);
        dto.setPaperId(this.paperId);
        dto.setTakenNumber(this.takenNumber);
        dto.setImpositionNumber(this.impositionNumber);
        dto.setColorFSelect(this.colorFSelect);
        dto.setColorBSelect(this.colorBSelect);
        dto.setSpecialColorF(this.specialColorF);
        dto.setSpecialColorB(this.specialColorB);

        dto.setColorBText1(this.colorBText1);
        dto.setColorBText2(this.colorBText2);
        dto.setColorBText3(this.colorBText3);
        dto.setColorBText4(this.colorBText4);

        dto.setColorFText1(this.colorFText1);
        dto.setColorFText2(this.colorFText2);
        dto.setColorFText3(this.colorFText3);
        dto.setColorFText4(this.colorFText4);
        dto.setColorFText5(this.colorFText5);
        dto.setColorFText6(this.colorFText6);
        dto.setColorFText7(this.colorFText7);
        dto.setColorFText8(this.colorFText8);

        dto.setPrintMethod(this.printMethod);
        dto.setColorIdF(this.colorIdF);
        dto.setColorIdB(this.colorIdB);
        dto.setSurfaceTreatmentIdF(this.surfaceTreatmentIdF);
        dto.setSurfaceTreatmentIdB(this.surfaceTreatmentIdB);
        dto.setEmbossingID(this.embossingID);
        dto.setLaminationFlute(this.laminationFlute);
        dto.setLaminationMediumBasicWeight(this.laminationMediumBasicWeight);
        dto.setLaminationMediumThroughWage(this.laminationMediumThroughWage);
        dto.setLaminationBackBasicWeight(this.laminationBackBasicWeight);
        dto.setLaminationBackThroughWage(this.laminationBackThroughWage);
        dto.setLaminationNumber(this.laminationNumber);
        dto.setLaminationWidth(this.laminationWidth);
        dto.setLaminationCuttingFlow(this.laminationCuttingFlow);
        dto.setDieCuttingId(this.dieCuttingId);
        dto.setDieCuttingThroughNumber(this.dieCuttingThroughNumber);
        dto.setDieCuttingWeight(this.dieCuttingWeight);
        dto.setStampingId(this.stampingId);
        dto.setStampingProcessingType(this.stampingProcessingType);
        dto.setStampingSizeW1(this.stampingSizeW1);
        dto.setStampingSizeW2(this.stampingSizeW2);
        dto.setStampingSizeW3(this.stampingSizeW3);
        dto.setStampingSizeW4(this.stampingSizeW4);
        dto.setStampingSizeH1(this.stampingSizeH1);
        dto.setStampingSizeH2(this.stampingSizeH2);
        dto.setStampingSizeH3(this.stampingSizeH3);
        dto.setStampingSizeH4(this.stampingSizeH4);
        dto.setWindowId(this.windowId);
        dto.setWindowSizeH(this.windowSizeH);
        dto.setWindowSizeW(this.windowSizeW);
        dto.setPasteId(this.pasteId);
        dto.setPasteForm(this.pasteForm);
        dto.setPackingId(this.packingId);
        dto.setInspectionId(this.inspectionId);
        dto.setWoodenCode(this.woodenCode);
        dto.setWoodenCode2(this.woodenCode2);
        dto.setFilmCode(this.filmCode);
        dto.setCustomerProductCode(this.customerProductCode);
        dto.setFactoryId(this.factoryId);
        dto.setMemo2(this.memo2);
        dto.setMemo3(this.memo3);
        dto.setPasteSpecialFormFlag(this.pasteSpecialFormFlag);
        dto.setDeliveryDistance(this.deliveryDistance);
        dto.setOtherExpense1(this.otherExpense1);
        dto.setOtherWage1(this.otherWage1);
        dto.setOtherUnitType1(this.otherUnitType1);
        dto.setOtherExpense2(this.otherExpense2);
        dto.setOtherWage2(this.otherWage2);
        dto.setOtherUnitType2(this.otherUnitType2);
        dto.setOtherExpense3(this.otherExpense3);
        dto.setOtherWage3(this.otherWage3);
        dto.setOtherUnitType3(this.otherUnitType3);
        dto.setShippingCostId(this.shippingCostId);
        dto.setStampingPointsNumber(this.stampingPointsNumber);
        dto.setShapeId(this.shapeId);
        dto.setSheetSizeId(this.sheetSizeId);
        dto.setSheetSizeWidth(this.sheetSizeWidth);
        dto.setSheetSizeHeight(this.sheetSizeHeight);
        dto.setSheetSizeGrain(this.sheetSizeGrain);
        dto.setUpperFlap(this.upperFlap);
        dto.setInsertion(this.insertion);
        dto.setGrain(this.grain);
        dto.setDevelopmentHeight(this.developmentHeight);
        dto.setGroove(this.groove);
        dto.setItemCode(this.itemCode);
        dto.setSpecialSizeFlag(this.specialSizeFlag);
        dto.setSpecialDieCuttingNumberFlag(this.specialDieCuttingNumberFlag);
        dto.setLaminationPaperTypeMedium(this.laminationPaperTypeMedium);
        dto.setPaperHeadApprovalFlag(this.paperHeadApprovalFlag);
        dto.setLaminationPaperTypeBack(this.laminationPaperTypeBack);
        dto.setEmbossingCode(this.embossingCode);
        dto.setCopyType(this.copyType);
        dto.setLaminationFrontBasicWeight(this.laminationFrontBasicWeight);
        dto.setLaminationFrontThroughWage(this.laminationFrontThroughWage);
        dto.setLaminationPaperTypeFront(this.laminationPaperTypeFront);
        dto.setLaminationABasicWeight(this.laminationABasicWeight);
        dto.setLaminationAThroughWage(this.laminationAThroughWage);
        dto.setLaminationPaperTypeA(this.laminationPaperTypeA);
        dto.setLaminationBBasicWeight(this.laminationBBasicWeight);
        dto.setLaminationBThroughWage(this.laminationBThroughWage);
        dto.setLaminationPaperTypeB(this.laminationPaperTypeB);
        dto.setCartonShippingType(this.cartonShippingType);
        dto.setCartonTapeCutting(this.cartonTapeCutting);
        dto.setCartonLinerCutting(this.cartonLinerCutting);
        dto.setHandProcessingFlag(this.handProcessingFlag);
        dto.setWaterRepellentFlag(this.waterRepellentFlag);
        dto.setRequestDesignFlag(this.requestDesignFlag);
        dto.setRequestProductionFlag(this.requestProductionFlag);
        dto.setBindingMethod(this.bindingMethod);
        dto.setHandPosition(this.handPosition);
        dto.setSpecialUpperFlapFlag(this.specialUpperFlapFlag);
        dto.setLowerFlap(this.lowerFlap);
        dto.setSpecialLowerFlapFlag(this.specialLowerFlapFlag);
        dto.setBindingNumber(this.bindingNumber);
        dto.setStringColor(this.stringColor);
        dto.setStringNumber(this.stringNumber);
        dto.setHandType(this.handType);
        dto.setHandSize(this.handSize);
        dto.setOtherMethod1(this.otherMethod1);
        dto.setOtherMethod2(this.otherMethod2);
        dto.setOtherNote1(this.otherNote1);
        dto.setOtherNote2(this.otherNote2);
        dto.setOtherNote3(this.otherNote3);
        dto.setSpecialNote1Flag(this.specialNote1Flag);
        dto.setLaminationAId(this.laminationAId);
        dto.setLaminationBId(this.laminationBId);
        dto.setLaminationFrontId(this.laminationFrontId);
        dto.setLaminationBackId(this.laminationBackId);
        dto.setLaminationMediumId(this.laminationMediumId);
        dto.setRequestLot(this.requestLot);
        dto.setDenno(0);
        dto.setSampleNo(this.sampleNo);
        dto.setFoilColor1(this.foilColor1);
        dto.setFoilColor2(this.foilColor2);
        dto.setFoilColor3(this.foilColor3);
        dto.setPackingInputNumber(this.packingInputNumber);
        dto.setPassageNo(this.passageNo);
        dto.setPackingNote(this.packingNote);
        dto.setDieCuttingFlag(this.dieCuttingFlag);
        dto.setStampingNumber(this.stampingNumber);
        dto.setSupplierId(this.supplierId);
        dto.setStepDeno(this.stepDenno);
        dto.setRequiredAdditionalWork(this.requiredAdditionalWork);
        dto.setSpecsBarcodeK1(this.specsBarcodeK1);
        dto.setSpecsBarcodeK2(this.specsBarcodeK2);
        dto.setSpecsBarcodeK3(this.specsBarcodeK3);
        dto.setSpecsBarcode1(this.specsBarcode1);
        dto.setSpecsBarcode2(this.specsBarcode2);
        dto.setSpecsBarcode3(this.specsBarcode3);
        return dto;
    }

    /**
     * バーコード値が入力されているかどうか判定する
     *
     * @return true: 入力されている, false: 入力されていない
     */
    public boolean hasBarcode() {
        return specsBarcodeK1 != null || specsBarcodeK2 != null || specsBarcodeK3 != null
                || specsBarcode1 != null || specsBarcode2 != null || specsBarcode3 != null;
    }

    /**
     * チェックシートからバーコード欄を埋める
     *
     * @param checksheetDtos {@see vn.vnext.sefuri.sf.service.SV003DealService.sv00326GetCheckSheetsByDealId(Integer)} の戻り値
     */
    public void fillBarcodeFromChecksheet(@Nonnull List<ChecksheetDto> checksheetDtos) {
        // まずはリセット
        specsBarcodeK1 = specsBarcodeK2 = specsBarcodeK3 = null;
        specsBarcode1 = specsBarcode2 = specsBarcode3 = null;

        // ChecksheetDto のリストより現在入力値を復元
        final Integer checkboxOn = 1;
        Map<ChecksheetQuestion, ChecksheetDto> fieldMap = new HashMap<>(checksheetQuestionCodeToBarcodeKubun.size());
        for (ChecksheetDto checksheet : checksheetDtos) {
            ChecksheetQuestion question = ChecksheetQuestion.valueOf(checksheet.getQuestionCode());
            if (checksheetQuestionCodeToBarcodeKubun.containsKey(question) && checkboxOn.equals(checksheet.getCheckBox1())) {
                fieldMap.put(question, checksheet);
            }
        }

        // 最大 3 個取り出す
        List<ChecksheetQuestion> questions = new ArrayList<>(fieldMap.size());
        for (ChecksheetQuestion question : checksheetQuestionCodeToBarcodeKubun.keySet()) {
            ChecksheetDto dto = fieldMap.get(question);
            if (dto != null) {
                questions.add(question);
            }
        }

        // 記入
        if (questions.size() > 0) {
            ChecksheetQuestion question = questions.get(0);
            specsBarcodeK1 = checksheetQuestionCodeToBarcodeKubun.get(question);
            specsBarcode1 = fieldMap.get(question).getTextArea1();
        }
        if (questions.size() > 1) {
            ChecksheetQuestion question = questions.get(1);
            specsBarcodeK2 = checksheetQuestionCodeToBarcodeKubun.get(question);
            specsBarcode2 = fieldMap.get(question).getTextArea1();
        }
        if (questions.size() > 2) {
            ChecksheetQuestion question = questions.get(2);
            specsBarcodeK3 = checksheetQuestionCodeToBarcodeKubun.get(question);
            specsBarcode3 = fieldMap.get(question).getTextArea1();
        }
    }

    /** チェックシート設問コード → バーコード区分値変換表 (順序は JAN, ITF, GTIN, UPC, その他) */
    private static Map<ChecksheetQuestion, String> checksheetQuestionCodeToBarcodeKubun;
    static {
        Map<ChecksheetQuestion, String> map = new LinkedHashMap<>(5);
        map.put(ChecksheetQuestion.BARCODE_JAN, "01");
        map.put(ChecksheetQuestion.BARCODE_ITF, "02");
        map.put(ChecksheetQuestion.BARCODE_GTIN, "04");
        map.put(ChecksheetQuestion.BARCODE_UPC, "03");
        map.put(ChecksheetQuestion.BARCODE_OTHER, "99");
        checksheetQuestionCodeToBarcodeKubun = Collections.unmodifiableMap(map);
    }
}
