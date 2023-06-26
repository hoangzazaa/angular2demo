package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.util.FormatUtil;

import java.math.BigDecimal;

/**
 * Basic product info.
 *
 * @author manhnv
 */
public abstract class ProductJson extends BaseJson<ProductDto> {
    @JsonProperty("productName")
    protected String productName;

    @JsonProperty("productType")
    protected Integer productType;

    @JsonProperty("productCode")
    protected String productCode;

    @JsonProperty("sizeH")
    protected BigDecimal sizeH;

    @JsonProperty("sizeD")
    protected BigDecimal sizeD;

    @JsonProperty("sizeW")
    protected BigDecimal sizeW;

    @JsonProperty("memo1")
    protected String memo1;

    @JsonProperty("memo2")
    protected String memo2;

    @JsonProperty("memo3")
    protected String memo3;

    @JsonProperty("paperNameId")
    protected Integer paperNameId;

    @JsonProperty("paperWeight")
    protected BigDecimal paperWeight;

    @JsonProperty("paperSizeH")
    protected BigDecimal paperSizeH;

    @JsonProperty("paperSizeW")
    protected BigDecimal paperSizeW;

    @JsonProperty("cutPaperSizeH")
    protected BigDecimal cutPaperSizeH;

    @JsonProperty("cutPaperSizeW")
    protected BigDecimal cutPaperSizeW;

    @JsonProperty("blankPaperSizeH")
    protected BigDecimal blankPaperSizeH;

    @JsonProperty("blankPaperSizeW")
    protected BigDecimal blankPaperSizeW;

    @JsonProperty("impositionNumber")
    protected Integer impositionNumber;

    @JsonProperty("woodenCode")
    protected String woodenCode;

    @JsonProperty("customerProductCode")
    protected String customerProductCode;

    @JsonProperty("colorIdF")
    protected Integer colorIdF;

    @JsonProperty("colorFSelect")
    protected Integer colorFSelect;

    @JsonProperty("specialColorF")
    protected Integer specialColorF;

    @JsonProperty("colorIdB")
    protected Integer colorIdB;

    @JsonProperty("colorBSelect")
    protected Integer colorBSelect;

    @JsonProperty("specialColorB")
    protected Integer specialColorB;

    @JsonProperty("factoryId")
    protected Integer factoryId;

    @JsonProperty("shapeId")
    protected Integer shapeId;

    @JsonProperty("printMethod")
    protected Integer printMethod;

    @JsonProperty("surfaceTreatmentIdF")
    protected Integer surfaceTreatmentIdF;

    @JsonProperty("surfaceTreatmentIdB")
    protected Integer surfaceTreatmentIdB;

    @JsonProperty("cartonShippingType")
    protected Integer cartonShippingType;

    @JsonProperty("laminationFlute")
    protected Integer laminationFlute;

    @JsonProperty("laminationPaperTypeBack")
    protected Integer laminationPaperTypeBack;

    @JsonProperty("laminationPaperTypeMedium")
    protected Integer laminationPaperTypeMedium;

    @JsonProperty("laminationPaperTypeA")
    protected Integer laminationPaperTypeA;

    @JsonProperty("laminationPaperTypeB")
    protected Integer laminationPaperTypeB;

    @JsonProperty("laminationABasicWeight")
    protected BigDecimal laminationABasicWeight;

    @JsonProperty("laminationBBasicWeight")
    protected BigDecimal laminationBBasicWeight;

    @JsonProperty("laminationPaperTypeFront")
    protected Integer laminationPaperTypeFront;

    @JsonProperty("laminationFrontBasicWeight")
    protected BigDecimal laminationFrontBasicWeight;

    @JsonProperty("laminationMediumBasicWeight")
    protected BigDecimal laminationMediumBasicWeight;

    @JsonProperty("laminationBackBasicWeight")
    protected BigDecimal laminationBackBasicWeight;

    @JsonProperty("laminationAId")
    protected Integer laminationAId;

    @JsonProperty("laminationBId")
    protected Integer laminationBId;

    @JsonProperty("laminationFrontId")
    protected Integer laminationFrontId;

    @JsonProperty("laminationBackId")
    protected Integer laminationBackId;

    @JsonProperty("laminationMediumId")
    protected Integer laminationMediumId;

    @JsonProperty("paper")
    protected MstPaperJson paper = new MstPaperJson();

    public String getProductName() {
        return productName;
    }

    public void setProductName(final String productName) {
        this.productName = productName;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(final Integer productType) {
        this.productType = productType;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(final String productCode) {
        this.productCode = productCode;
    }

    public BigDecimal getSizeH() {
        return sizeH;
    }

    public void setSizeH(final BigDecimal sizeH) {
        this.sizeH = sizeH;
    }

    public BigDecimal getSizeD() {
        return sizeD;
    }

    public void setSizeD(final BigDecimal sizeD) {
        this.sizeD = sizeD;
    }

    public BigDecimal getSizeW() {
        return sizeW;
    }

    public void setSizeW(final BigDecimal sizeW) {
        this.sizeW = sizeW;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(final String memo1) {
        this.memo1 = memo1;
    }

    public String getMemo2() {
        return memo2;
    }

    public void setMemo2(final String memo2) {
        this.memo2 = memo2;
    }

    public String getMemo3() {
        return memo3;
    }

    public void setMemo3(final String memo3) {
        this.memo3 = memo3;
    }

    public Integer getPaperNameId() {
        return paperNameId;
    }

    public void setPaperNameId(final Integer paperNameId) {
        this.paperNameId = paperNameId;
    }

    public BigDecimal getPaperWeight() {
        return paperWeight;
    }

    public void setPaperWeight(final BigDecimal paperWeight) {
        this.paperWeight = paperWeight;
    }

    public BigDecimal getPaperSizeH() {
        return paperSizeH;
    }

    public void setPaperSizeH(final BigDecimal paperSizeH) {
        this.paperSizeH = paperSizeH;
    }

    public BigDecimal getPaperSizeW() {
        return paperSizeW;
    }

    public void setPaperSizeW(final BigDecimal paperSizeW) {
        this.paperSizeW = paperSizeW;
    }

    public BigDecimal getCutPaperSizeH() {
        return cutPaperSizeH;
    }

    public void setCutPaperSizeH(final BigDecimal cutPaperSizeH) {
        this.cutPaperSizeH = cutPaperSizeH;
    }

    public BigDecimal getCutPaperSizeW() {
        return cutPaperSizeW;
    }

    public void setCutPaperSizeW(final BigDecimal cutPaperSizeW) {
        this.cutPaperSizeW = cutPaperSizeW;
    }

    public BigDecimal getBlankPaperSizeH() {
        return blankPaperSizeH;
    }

    public void setBlankPaperSizeH(final BigDecimal blankPaperSizeH) {
        this.blankPaperSizeH = blankPaperSizeH;
    }

    public BigDecimal getBlankPaperSizeW() {
        return blankPaperSizeW;
    }

    public void setBlankPaperSizeW(final BigDecimal blankPaperSizeW) {
        this.blankPaperSizeW = blankPaperSizeW;
    }

    public Integer getImpositionNumber() {
        return impositionNumber;
    }

    public void setImpositionNumber(final Integer impositionNumber) {
        this.impositionNumber = impositionNumber;
    }

    public String getWoodenCode() {
        return woodenCode;
    }

    public void setWoodenCode(final String woodenCode) {
        this.woodenCode = woodenCode;
    }

    public String getCustomerProductCode() {
        return customerProductCode;
    }

    public void setCustomerProductCode(final String customerProductCode) {
        this.customerProductCode = customerProductCode;
    }

    public Integer getColorIdF() {
        return colorIdF;
    }

    public void setColorIdF(final Integer colorIdF) {
        this.colorIdF = colorIdF;
    }

    public Integer getColorFSelect() {
        return colorFSelect;
    }

    public void setColorFSelect(final Integer colorFSelect) {
        this.colorFSelect = colorFSelect;
    }

    public Integer getSpecialColorF() {
        return specialColorF;
    }

    public void setSpecialColorF(final Integer specialColorF) {
        this.specialColorF = specialColorF;
    }

    public Integer getColorIdB() {
        return colorIdB;
    }

    public void setColorIdB(final Integer colorIdB) {
        this.colorIdB = colorIdB;
    }

    public Integer getColorBSelect() {
        return colorBSelect;
    }

    public void setColorBSelect(final Integer colorBSelect) {
        this.colorBSelect = colorBSelect;
    }

    public Integer getSpecialColorB() {
        return specialColorB;
    }

    public void setSpecialColorB(final Integer specialColorB) {
        this.specialColorB = specialColorB;
    }

    public Integer getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(final Integer factoryId) {
        this.factoryId = factoryId;
    }

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(final Integer shapeId) {
        this.shapeId = shapeId;
    }

    public Integer getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(final Integer printMethod) {
        this.printMethod = printMethod;
    }

    public Integer getSurfaceTreatmentIdF() {
        return surfaceTreatmentIdF;
    }

    public void setSurfaceTreatmentIdF(final Integer surfaceTreatmentIdF) {
        this.surfaceTreatmentIdF = surfaceTreatmentIdF;
    }

    public Integer getSurfaceTreatmentIdB() {
        return surfaceTreatmentIdB;
    }

    public void setSurfaceTreatmentIdB(final Integer surfaceTreatmentIdB) {
        this.surfaceTreatmentIdB = surfaceTreatmentIdB;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(final Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }

    public Integer getLaminationFlute() {
        return laminationFlute;
    }

    public void setLaminationFlute(final Integer laminationFlute) {
        this.laminationFlute = laminationFlute;
    }

    public Integer getLaminationPaperTypeBack() {
        return laminationPaperTypeBack;
    }

    public void setLaminationPaperTypeBack(final Integer laminationPaperTypeBack) {
        this.laminationPaperTypeBack = laminationPaperTypeBack;
    }

    public Integer getLaminationPaperTypeMedium() {
        return laminationPaperTypeMedium;
    }

    public void setLaminationPaperTypeMedium(final Integer laminationPaperTypeMedium) {
        this.laminationPaperTypeMedium = laminationPaperTypeMedium;
    }

    public Integer getLaminationPaperTypeA() {
        return laminationPaperTypeA;
    }

    public void setLaminationPaperTypeA(final Integer laminationPaperTypeA) {
        this.laminationPaperTypeA = laminationPaperTypeA;
    }

    public Integer getLaminationPaperTypeB() {
        return laminationPaperTypeB;
    }

    public void setLaminationPaperTypeB(final Integer laminationPaperTypeB) {
        this.laminationPaperTypeB = laminationPaperTypeB;
    }

    public BigDecimal getLaminationABasicWeight() {
        return laminationABasicWeight;
    }

    public void setLaminationABasicWeight(final BigDecimal laminationABasicWeight) {
        this.laminationABasicWeight = laminationABasicWeight;
    }

    public BigDecimal getLaminationBBasicWeight() {
        return laminationBBasicWeight;
    }

    public void setLaminationBBasicWeight(final BigDecimal laminationBBasicWeight) {
        this.laminationBBasicWeight = laminationBBasicWeight;
    }

    public Integer getLaminationPaperTypeFront() {
        return laminationPaperTypeFront;
    }

    public void setLaminationPaperTypeFront(final Integer laminationPaperTypeFront) {
        this.laminationPaperTypeFront = laminationPaperTypeFront;
    }

    public BigDecimal getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(final BigDecimal laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    public BigDecimal getLaminationMediumBasicWeight() {
        return laminationMediumBasicWeight;
    }

    public void setLaminationMediumBasicWeight(final BigDecimal laminationMediumBasicWeight) {
        this.laminationMediumBasicWeight = laminationMediumBasicWeight;
    }

    public BigDecimal getLaminationBackBasicWeight() {
        return laminationBackBasicWeight;
    }

    public void setLaminationBackBasicWeight(final BigDecimal laminationBackBasicWeight) {
        this.laminationBackBasicWeight = laminationBackBasicWeight;
    }

    public Integer getLaminationAId() {
        return laminationAId;
    }

    public void setLaminationAId(final Integer laminationAId) {
        this.laminationAId = laminationAId;
    }

    public Integer getLaminationBId() {
        return laminationBId;
    }

    public void setLaminationBId(final Integer laminationBId) {
        this.laminationBId = laminationBId;
    }

    public Integer getLaminationFrontId() {
        return laminationFrontId;
    }

    public void setLaminationFrontId(final Integer laminationFrontId) {
        this.laminationFrontId = laminationFrontId;
    }

    public Integer getLaminationBackId() {
        return laminationBackId;
    }

    public void setLaminationBackId(final Integer laminationBackId) {
        this.laminationBackId = laminationBackId;
    }

    public Integer getLaminationMediumId() {
        return laminationMediumId;
    }

    public void setLaminationMediumId(final Integer laminationMediumId) {
        this.laminationMediumId = laminationMediumId;
    }

    public MstPaperJson getPaper() {
        return paper;
    }

    public void setPaper(final MstPaperJson paper) {
        this.paper = paper;
    }

    /* メモ -メモ1,2,3 */
    public String getMemo() {
        return FormatUtil.concatItem(Constants.COMMA, memo1, memo2, memo3);
    }

    @Override
    public ProductDto getModel() {
        return null;
    }

    @Override
    public void setModel(final ProductDto dto) {
        if (dto != null) {
            super.setData(dto);

            this.productType = dto.getProductType();
            this.productName = dto.getProductName();
            this.productCode = dto.getProductCode();
            this.sizeH = dto.getSizeH();
            this.sizeD = dto.getSizeD();
            this.sizeW = dto.getSizeW();
            this.memo1 = dto.getMemo1();
            this.memo2 = dto.getMemo2();
            this.memo3 = dto.getMemo3();

            this.paperNameId = dto.getPaperNameId();
            this.paperWeight = dto.getPaperWeight();
            this.paperSizeH = dto.getPaperSizeH();
            this.paperSizeW = dto.getPaperSizeW();
            this.cutPaperSizeH = dto.getCutPaperSizeH();
            this.cutPaperSizeW = dto.getCutPaperSizeW();
            this.blankPaperSizeH = dto.getBlankPaperSizeH();
            this.blankPaperSizeW = dto.getBlankPaperSizeW();
            this.impositionNumber = dto.getImpositionNumber();
            this.woodenCode = dto.getWoodenCode();
            this.customerProductCode = dto.getCustomerProductCode();

            this.colorIdF = dto.getColorIdF();
            this.colorFSelect = dto.getColorFSelect();
            this.specialColorF = dto.getSpecialColorF();
            this.colorIdB = dto.getColorIdB();
            this.colorBSelect = dto.getColorBSelect();
            this.specialColorB = dto.getSpecialColorB();

            this.factoryId = dto.getFactoryId();
            this.shapeId = dto.getShapeId();
            this.printMethod = dto.getPrintMethod();
            this.surfaceTreatmentIdF = dto.getSurfaceTreatmentIdF();
            this.surfaceTreatmentIdB = dto.getSurfaceTreatmentIdB();
            this.cartonShippingType = dto.getCartonShippingType();

            this.laminationFlute = dto.getLaminationFlute();
            this.laminationPaperTypeBack = dto.getLaminationPaperTypeBack();
            this.laminationPaperTypeMedium = dto.getLaminationPaperTypeMedium();

            this.laminationPaperTypeA = dto.getLaminationPaperTypeA();
            this.laminationPaperTypeB = dto.getLaminationPaperTypeB();
            this.laminationABasicWeight = dto.getLaminationABasicWeight();
            this.laminationBBasicWeight = dto.getLaminationBBasicWeight();
            this.laminationPaperTypeFront = dto.getLaminationPaperTypeFront();
            this.laminationFrontBasicWeight = dto.getLaminationFrontBasicWeight();
            this.laminationMediumBasicWeight = dto.getLaminationMediumBasicWeight();
            this.laminationBackBasicWeight = dto.getLaminationBackBasicWeight();

            this.laminationAId = dto.getLaminationAId();
            this.laminationBId = dto.getLaminationBId();
            this.laminationFrontId = dto.getLaminationFrontId();
            this.laminationBackId = dto.getLaminationBackId();
            this.laminationMediumId = dto.getLaminationMediumId();

            this.paper = new MstPaperJson();
            this.paper.setId(dto.getPaperId());

        }
    }

}
