package vn.vnext.sefuri.sf.json.SF00201.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.util.FormatUtil;

import java.math.BigDecimal;

/**
 * Created by TungNT on 2/24/2017.
 */
public class ProductJson extends BaseJson<ProductDto> {

    //製品名
    @JsonProperty("productName")
    private String productName;

    //用途
    @JsonProperty("application")
    private String application;

    /* メモ -メモ1,2,3 */
    @JsonProperty("memo")
    private String memo;

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

    //面付数
    @JsonProperty("impositionNumber")
    private Integer impositionNumber;

    //色（オモテ）
    @JsonProperty("colorFSelect")
    private Integer colorFSelect;

    //woodenCode
    @JsonProperty("woodenCode")
    private String woodenCode;

    //板紙種類
    @JsonProperty("surfaceF_varnishType")
    private Integer varnishType;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("originalName")
    private String originalName;

    @JsonProperty("paperName")
    private String paperName;

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
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

    public Integer getVarnishType() {
        return varnishType;
    }

    public void setVarnishType(Integer varnishType) {
        this.varnishType = varnishType;
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

    public String getWoodenCode() {
        return woodenCode;
    }

    public void setWoodenCode(String woodenCode) {
        this.woodenCode = woodenCode;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    @Override
    public ProductDto getData() {
        return null;
    }

    public void setData(ProductDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.productName = dto.getProductName();
        this.application = dto.getApplication();
        this.memo = FormatUtil.concatItem(Constants.COMMA, dto.getMemo1(), dto.getMemo2(), dto.getMemo3());
        this.sizeH = dto.getSizeH();
        this.sizeD = dto.getSizeD();
        this.sizeW = dto.getSizeW();
        this.paperNameId = dto.getPaperNameId();
        this.paperWeight = dto.getPaperWeight();
        this.impositionNumber = dto.getImpositionNumber();
        this.colorFSelect = dto.getColorFSelect();
        this.woodenCode = dto.getWoodenCode();
    }

}
