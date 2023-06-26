package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;

import java.math.BigDecimal;

/**
 * Basic product info.
 *
 * @author manhnv
 */
public class ProductInfoJson extends BaseJson<ProductDto> {
    /* 製品名 */
    @JsonProperty("productName")
    protected String productName;

    /* productCode */
    @JsonProperty("productCode")
    protected String productCode;

    /* 製品種類 */
    @JsonProperty("productType")
    protected Integer productType;

    /* 製品寸法 Width */
    @JsonProperty("sizeW")
    protected BigDecimal sizeW;

    /* 製品寸法 Height */
    @JsonProperty("sizeH")
    protected BigDecimal sizeH;

    /* 製品寸法 Depth */
    @JsonProperty("sizeD")
    protected BigDecimal sizeD;

    /* woodenCode */
    @JsonProperty("woodenCode")
    protected String woodenCode;

    /* 得意先製品番号 */
    @JsonProperty("customerProductCode")
    protected String customerProductCode;

    /* 原紙名 */
    @JsonProperty("paperNameId")
    protected Integer paperNameId;

    /* 坪量 */
    @JsonProperty("paperWeight")
    protected BigDecimal paperWeight;

    /* request production */
    @JsonProperty("factoryId")
    protected Integer factoryId;

    /* メモ -メモ1,2,3 */
    @JsonProperty("memo")
    protected String memo;

    /* image file path */
    @JsonProperty("srcImg")
    protected String srcImg;

    //lot
    @JsonProperty("lot")
    protected Integer lot;

    //unitPrice
    @JsonProperty("unitPrice")
    protected BigDecimal unitPrice;

    @JsonProperty("totalCost")
    protected BigDecimal totalCost;

    @JsonProperty("shapeId")
    protected Integer shapeId;

    @JsonProperty("requestProduction")
    protected Integer requestProduction;

    @JsonProperty("requestDesign")
    protected Integer requestDesign;


    @JsonProperty("printMethod")
    protected Integer printMethod;

    /* woodenTotalNumber */
    @JsonProperty("woodenTotalNumber")
    protected BigDecimal woodenTotalNumber;

    /* woodenExpiredDate */
    @JsonProperty("woodenExpiredDate")
    protected DateTime woodenExpiredDate;

    /*Quantity Stock*/
    @JsonProperty("quantityStock")
    protected Integer quantityStock;

    @JsonProperty("colorIdF")
    protected Integer colorIdF;

    @JsonProperty("specialColorF")
    protected Integer specialColorF;

    @JsonProperty("colorIdB")
    protected Integer colorIdB;

    @JsonProperty("specialColorB")
    protected Integer specialColorB;

    @JsonProperty("surfaceTreatmentIdF")
    protected Integer surfaceTreatmentIdF;

    @JsonProperty("impositionNumber")
    protected Integer impositionNumber;

    @JsonProperty("cartonShippingType")
    protected Integer cartonShippingType;

    @JsonProperty("blankPaperSizeH")
    protected BigDecimal blankPaperSizeH;

    @JsonProperty("blankPaperSizeW")
    protected BigDecimal blankPaperSizeW;

    @JsonProperty("paperSizeH")
    protected BigDecimal paperSizeH;

    @JsonProperty("paperSizeW")
    protected BigDecimal paperSizeW;

    @JsonProperty("laminationFlute")
    protected Integer laminationFlute;

    @JsonProperty("paper")
    protected MstPaperJson paper;

    @JsonProperty("laminationPaperTypeA")
    protected Integer laminationPaperTypeA;

    @JsonProperty("laminationPaperTypeB")
    protected Integer laminationPaperTypeB;

    @JsonProperty("laminationABasicWeight")
    protected Integer laminationABasicWeight;

    @JsonProperty("laminationBBasicWeight")
    protected Integer laminationBBasicWeight;

    @JsonProperty("laminationPaperTypeFront")
    protected Integer laminationPaperTypeFront;

    @JsonProperty("laminationPaperTypeBack")
    protected Integer laminationPaperTypeBack;

    @JsonProperty("laminationPaperTypeMedium")
    protected Integer laminationPaperTypeMedium;

    @JsonProperty("laminationFrontBasicWeight")
    protected Integer laminationFrontBasicWeight;

    @JsonProperty("laminationMediumBasicWeight")
    protected Integer laminationMediumBasicWeight;

    @JsonProperty("laminationBackBasicWeight")
    protected Integer laminationBackBasicWeight;

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public BigDecimal getSizeW() {
        return sizeW;
    }

    public void setSizeW(BigDecimal sizeW) {
        this.sizeW = sizeW;
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

    public String getWoodenCode() {
        return woodenCode;
    }

    public void setWoodenCode(String woodenCode) {
        this.woodenCode = woodenCode;
    }

    public String getCustomerProductCode() {
        return customerProductCode;
    }

    public void setCustomerProductCode(String customerProductCode) {
        this.customerProductCode = customerProductCode;
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

    public Integer getFactoryId() {
        return factoryId;
    }

    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(String srcImg) {
        this.srcImg = srcImg;
    }

    public Integer getLot() {
        return lot;
    }

    public void setLot(Integer lot) {
        this.lot = lot;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public Integer getRequestProduction() {
        return requestProduction;
    }

    public void setRequestProduction(final Integer requestProduction) {
        this.requestProduction = requestProduction;
    }

    public Integer getRequestDesign() {
        return requestDesign;
    }

    public void setRequestDesign(final Integer requestDesign) {
        this.requestDesign = requestDesign;
    }

    public Integer getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(final Integer printMethod) {
        this.printMethod = printMethod;
    }

    public BigDecimal getWoodenTotalNumber() {
        return woodenTotalNumber;
    }

    public void setWoodenTotalNumber(final BigDecimal woodenTotalNumber) {
        this.woodenTotalNumber = woodenTotalNumber;
    }

    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    public void setWoodenExpiredDate(final DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(final Integer quantityStock) {
        this.quantityStock = quantityStock;
    }

    public Integer getColorIdF() {
        return colorIdF;
    }

    public void setColorIdF(final Integer colorIdF) {
        this.colorIdF = colorIdF;
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

    public Integer getSpecialColorB() {
        return specialColorB;
    }

    public void setSpecialColorB(final Integer specialColorB) {
        this.specialColorB = specialColorB;
    }

    public Integer getSurfaceTreatmentIdF() {
        return surfaceTreatmentIdF;
    }

    public void setSurfaceTreatmentIdF(final Integer surfaceTreatmentIdF) {
        this.surfaceTreatmentIdF = surfaceTreatmentIdF;
    }

    public Integer getImpositionNumber() {
        return impositionNumber;
    }

    public void setImpositionNumber(final Integer impositionNumber) {
        this.impositionNumber = impositionNumber;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(final Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
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

    public Integer getLaminationFlute() {
        return laminationFlute;
    }

    public void setLaminationFlute(final Integer laminationFlute) {
        this.laminationFlute = laminationFlute;
    }

    public MstPaperJson getPaper() {
        return paper;
    }

    public void setPaper(final MstPaperJson paper) {
        this.paper = paper;
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

    public Integer getLaminationABasicWeight() {
        return laminationABasicWeight;
    }

    public void setLaminationABasicWeight(final Integer laminationABasicWeight) {
        this.laminationABasicWeight = laminationABasicWeight;
    }

    public Integer getLaminationBBasicWeight() {
        return laminationBBasicWeight;
    }

    public void setLaminationBBasicWeight(final Integer laminationBBasicWeight) {
        this.laminationBBasicWeight = laminationBBasicWeight;
    }

    public Integer getLaminationPaperTypeFront() {
        return laminationPaperTypeFront;
    }

    public void setLaminationPaperTypeFront(final Integer laminationPaperTypeFront) {
        this.laminationPaperTypeFront = laminationPaperTypeFront;
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

    public Integer getLaminationFrontBasicWeight() {
        return laminationFrontBasicWeight;
    }

    public void setLaminationFrontBasicWeight(final Integer laminationFrontBasicWeight) {
        this.laminationFrontBasicWeight = laminationFrontBasicWeight;
    }

    public Integer getLaminationMediumBasicWeight() {
        return laminationMediumBasicWeight;
    }

    public void setLaminationMediumBasicWeight(final Integer laminationMediumBasicWeight) {
        this.laminationMediumBasicWeight = laminationMediumBasicWeight;
    }

    public Integer getLaminationBackBasicWeight() {
        return laminationBackBasicWeight;
    }

    public void setLaminationBackBasicWeight(final Integer laminationBackBasicWeight) {
        this.laminationBackBasicWeight = laminationBackBasicWeight;
    }

    @Override
    public ProductDto getModel() {
        return null;
    }

    @Override
    public void setModel(final ProductDto dto) {

    }

}
