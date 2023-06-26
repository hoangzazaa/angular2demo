package vn.vnext.sefuri.sf.json.SF00501.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.core.ProductJson;

import java.math.BigDecimal;

/**
 * Contain product input information.
 *
 * @author vupt
 */
public class SF00501_ProductJson extends ProductJson {
    @JsonProperty("lot")
    private Integer lot;

    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("highlightFlag")
    public Integer highlightFlag;

    @JsonProperty("memo")
    public String memo;

    @JsonProperty("dealProductId")
    public Integer dealProductId;

    @JsonProperty("woodenExpiredDate")
    private DateTime woodenExpiredDate;

    @JsonProperty("woodenTotalNumber")
    private BigDecimal woodenTotalNumber;

    @JsonProperty("estimatedUnitPrice")
    private BigDecimal estimatedUnitPrice;

    @JsonProperty("quantityStock")
    private Integer quantityStock;

    @JsonProperty("paperName")
    private String paperName;

    @JsonProperty("originalName")
    private String originalName;

    public Integer getLot() {
        return lot;
    }

    public void setLot(Integer lot) {
        this.lot = lot;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(String srcImg) {
        this.srcImg = srcImg;
    }

    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public Integer getDealProductId() {
        return dealProductId;
    }

    public void setDealProductId(Integer dealProductId) {
        this.dealProductId = dealProductId;
    }

    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }

    public BigDecimal getWoodenTotalNumber() {
        return woodenTotalNumber;
    }

    public void setWoodenTotalNumber(BigDecimal woodenTotalNumber) {
        this.woodenTotalNumber = woodenTotalNumber;
    }

    public BigDecimal getEstimatedUnitPrice() {
        return estimatedUnitPrice;
    }

    public void setEstimatedUnitPrice(BigDecimal estimatedUnitPrice) {
        this.estimatedUnitPrice = estimatedUnitPrice;
    }

    public Integer getQuantityStock() {
        return quantityStock;
    }

    public void setQuantityStock(Integer quantityStock) {
        this.quantityStock = quantityStock;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }
}
