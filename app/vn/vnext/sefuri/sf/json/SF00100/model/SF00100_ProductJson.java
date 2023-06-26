package vn.vnext.sefuri.sf.json.SF00100.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.core.ProductJson;

import java.math.BigDecimal;

/**
 * Contain product input information.
 *
 * @author nguyenpk
 */
public class SF00100_ProductJson extends ProductJson {
    //lot
    @JsonProperty("lot")
    private Integer lot;

    //estimatedUnitPrice
    @JsonProperty("estimatedUnitPrice")
    private BigDecimal estimatedUnitPrice;

    /*Product Code*/
    @JsonProperty("productCode")
    private String productCode;

    /*Quantity Stock*/
    @JsonProperty("quantityStock")
    private Integer quantityStock;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    /* woodenTotalNumber */
    @JsonProperty("woodenTotalNumber")
    private BigDecimal woodenTotalNumber;

    /* woodenExpiredDate */
    @JsonProperty("woodenExpiredDate")
    private DateTime woodenExpiredDate;

    @JsonProperty("originalName")
    private String originalName;

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

    @Override
    public String getProductCode() {
        return productCode;
    }

    @Override
    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(Integer quantityStock) {
        this.quantityStock = quantityStock;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(String srcImg) {
        this.srcImg = srcImg;
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

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }
}
