package vn.vnext.sefuri.sf.json.SF00306.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.core.ProductJson;

import java.math.BigDecimal;

/**
 * Created by manhnv on 4/11/2017.
 */
public class SF00306_ProductJson extends ProductJson {
    @JsonProperty(value = "memo")
    private String memo;
    @JsonProperty(value = "paperName")
    private String paperName;
    @JsonProperty(value = "srcImg")
    private String srcImg;
    @JsonProperty(value = "lot")
    private Integer lot;
    @JsonProperty(value = "totalCost")
    private BigDecimal totalCost;
    @JsonProperty(value = "unitPrice")
    private BigDecimal unitPrice;

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
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

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
}
