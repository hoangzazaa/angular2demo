package vn.vnext.sefuri.sf.json.SFN0702;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;

public class OfferJson extends BaseJson<OfferDto> {

    //unitPrice
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;

    //total
    @JsonProperty("total")
    private BigDecimal total;

    //profitRate
    @JsonProperty("profitRate")
    private BigDecimal profitRate;

    //productOutputId
    @JsonProperty("productOutputId")
    private Integer productOutputId;

    //productOutputRsOffer
    @JsonProperty("productOutput")
    private ProductOutputJson productOutput;

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public BigDecimal getProfitRate() {
        return profitRate;
    }

    public void setProfitRate(BigDecimal profitRate) {
        this.profitRate = profitRate;
    }

    public Integer getProductOutputId() {
        return productOutputId;
    }

    public void setProductOutputId(Integer productOutputId) {
        this.productOutputId = productOutputId;
    }

    public ProductOutputJson getProductOutput() {
        return productOutput;
    }

    public void setProductOutput(ProductOutputJson productOutput) {
        this.productOutput = productOutput;
    }

    @Override
    public void setData(OfferDto dataDto) {
        OfferDto dto = new OfferDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setUnitPrice(unitPrice);
        dto.setTotal(total);
        dto.setProfitRate(profitRate);
    }


    @Override
    public OfferDto getData() {
        OfferDto dto = new OfferDto();
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.unitPrice = dto.getUnitPrice();
        this.total = dto.getTotal();
        this.profitRate = dto.getProfitRate();
        this.productOutput = new ProductOutputJson();
        return dto;
    }
}
