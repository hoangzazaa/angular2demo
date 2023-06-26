package vn.vnext.sefuri.sf.json.SF00202.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.core.ProductJson;

import java.math.BigDecimal;

/**
 * Contain product input information.
 *
 * @author vupt
 */
public class SF00202_ProductJson extends ProductJson {

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

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("originalName")
    private String originalName;

    @JsonProperty("quantityStock")
    private Integer quantityStock;

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

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(Integer quantityStock) {
        this.quantityStock = quantityStock;
    }
}
