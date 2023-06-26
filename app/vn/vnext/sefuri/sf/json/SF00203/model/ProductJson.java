package vn.vnext.sefuri.sf.json.SF00203.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.util.FormatUtil;

import java.math.BigDecimal;

/**
 * Created by TungNT on 09/03/2017.
 */
public class ProductJson extends BaseJson<ProductDto> {

    //製品名
    @JsonProperty("productName")
    private String productName;

    //製品種類
    @JsonProperty("productType")
    private Integer productType;

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

    @JsonProperty("paperWeight")
    private BigDecimal paperWeight;

    @JsonProperty("printMethod")
    private Integer printMethod;
    //woodenCode
    @JsonProperty("woodenCode")
    private String woodenCode;

    @JsonProperty("customerProductCode")
    private String customerProductCode;
    /* woodenTotalNumber */
    @JsonProperty("woodenTotalNumber")
    private BigDecimal woodenTotalNumber;

    /* woodenExpiredDate */
    @JsonProperty("woodenExpiredDate")
    private DateTime woodenExpiredDate;

    //lot
    @JsonProperty("lot")
    private Integer lot;

    //estimatedUnitPrice
    @JsonProperty("estimatedUnitPrice")
    private BigDecimal estimatedUnitPrice;

    /*Product Code*/
    @JsonProperty("productCode")
    private String productCode;

    /* メモ -メモ1,2,3 */
    @JsonProperty("memo")
    private String memo;

    //面付数
    @JsonProperty("impositionNumber")
    private Integer impositionNumber;

    //色（オモテ）
    @JsonProperty("colorFSelect")
    private Integer colorFSelect;

    //用途
    @JsonProperty("application")
    private String application;

    //板紙種類
    @JsonProperty("surfaceF_varnishType")
    private Integer varnishType;

    //Quantity Stock
    @JsonProperty("quantityStock")
    private Integer quantityStock;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("paperName")
    private String paperName;

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(Integer quantityStock) {
        this.quantityStock = quantityStock;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

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
     * Set paperName
     *
     * @param paperNameId paperNameId
     */
    public void setPaperNameId(Integer paperNameId) {
        this.paperNameId = paperNameId;
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

    public String getCustomerProductCode() {
        return customerProductCode;
    }

    public void setCustomerProductCode(String customerProductCode) {
        this.customerProductCode = customerProductCode;
    }

    public BigDecimal getPaperWeight() {
        return paperWeight;
    }

    public void setPaperWeight(BigDecimal paperWeight) {
        this.paperWeight = paperWeight;
    }

    public Integer getPrintMethod() {
        return printMethod;
    }

    public void setPrintMethod(Integer printMethod) {
        this.printMethod = printMethod;
    }

    public BigDecimal getWoodenTotalNumber() {
        return woodenTotalNumber;
    }

    public void setWoodenTotalNumber(BigDecimal woodenTotalNumber) {
        this.woodenTotalNumber = woodenTotalNumber;
    }

    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }

    public Integer getLot() {
        return lot;
    }

    public void setLot(Integer lot) {
        this.lot = lot;
    }

    public BigDecimal getEstimatedUnitPrice() {
        return estimatedUnitPrice;
    }

    public void setEstimatedUnitPrice(BigDecimal estimatedUnitPrice) {
        this.estimatedUnitPrice = estimatedUnitPrice;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
    }

    public Integer getImpositionNumber() {
        return impositionNumber;
    }

    public void setImpositionNumber(Integer impositionNumber) {
        this.impositionNumber = impositionNumber;
    }

    public Integer getColorFSelect() {
        return colorFSelect;
    }

    public void setColorFSelect(Integer colorFSelect) {
        this.colorFSelect = colorFSelect;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public Integer getVarnishType() {
        return varnishType;
    }

    public void setVarnishType(Integer varnishType) {
        this.varnishType = varnishType;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

    public ProductDto getData() {
        return null;
    }

    /**
     * Create SF00202_ProductJson
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
        this.sizeH = dto.getSizeH();
        this.sizeD = dto.getSizeD();
        this.sizeW = dto.getSizeW();
        this.paperNameId = dto.getPaperNameId();
        this.paperWeight = dto.getPaperWeight();
        this.printMethod = dto.getPrintMethod();
        this.woodenCode = dto.getWoodenCode();
        this.customerProductCode = dto.getCustomerProductCode();
        this.productCode = dto.getProductCode();
        this.application = dto.getApplication();
        this.memo = FormatUtil.concatItem(Constants.COMMA, dto.getMemo1(), dto.getMemo2(), dto.getMemo3());
        this.colorFSelect = dto.getColorFSelect();
        this.impositionNumber = dto.getImpositionNumber();
    }
}
