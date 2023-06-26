package vn.vnext.sefuri.sf.json.SF00302.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;

/**
 * Contain
 *
 * @author vupt
 */
public class OfferJson extends BaseJson<OfferDto> {

    //dealProductId
    @JsonProperty("dealProductId")
    private Integer dealProductId;

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

    //dealProductRsOffer
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    //productOutputRsOffer
    @JsonProperty("productOutput")
    private ProductOutputJson productOutput;


    /**
     * Get dealProductId
     *
     * @return dealProductId
     */
    public Integer getDealProductId() {
        return dealProductId;
    }

    /**
     * Set dealProductId
     *
     * @param dealProductId Integer
     */
    public void setDealProductId(Integer dealProductId) {
        this.dealProductId = dealProductId;
    }

    /**
     * Get unitPrice
     *
     * @return unitPrice
     */
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    /**
     * Set unitPrice
     *
     * @param unitPrice BigDecimal
     */
    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    /**
     * Get total
     *
     * @return total
     */
    public BigDecimal getTotal() {
        return total;
    }

    /**
     * Set total
     *
     * @param total BigDecimal
     */
    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    /**
     * Get profitRate
     *
     * @return profitRate
     */
    public BigDecimal getProfitRate() {
        return profitRate;
    }

    /**
     * Set profitRate
     *
     * @param profitRate BigDecimal
     */
    public void setProfitRate(BigDecimal profitRate) {
        this.profitRate = profitRate;
    }

    /**
     * Get productOutputId
     *
     * @return productOutputId
     */
    public Integer getProductOutputId() {
        return productOutputId;
    }

    /**
     * Set productOutputId
     *
     * @param productOutputId Integer
     */
    public void setProductOutputId(Integer productOutputId) {
        this.productOutputId = productOutputId;
    }

    /**
     * Get dealProduct
     *
     * @return dealProduct
     */
    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    /**
     * Set dealProduct
     *
     * @param dealProduct DealProductJson
     */
    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }

    /**
     * Get productOutput
     *
     * @return productOutput
     */
    public ProductOutputJson getProductOutput() {
        return productOutput;
    }

    /**
     * Set productOutput
     *
     * @param productOutput ProductOutputJson
     */
    public void setProductOutput(ProductOutputJson productOutput) {
        this.productOutput = productOutput;
    }

    /**
     * Create OfferDto
     *
     * @return OfferDto
     */

    public OfferDto getData() {
        OfferDto dto = new OfferDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
//        dto.setDealProductId(dealProductId);
        dto.setUnitPrice(unitPrice);
        dto.setTotal(total);
        dto.setProfitRate(profitRate);
        return dto;
    }

    /**
     * Create OfferJson
     *
     * @param dto OfferDto
     */

    public void setData(OfferDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
//        this.dealProductId = dto.getDealProductId();
        this.unitPrice = dto.getUnitPrice();
        this.total = dto.getTotal();
        this.profitRate = dto.getProfitRate();
        this.dealProduct = new DealProductJson();
//        this.dealProduct.setId(dto.getDealProductId());
        this.productOutput = new ProductOutputJson();
    }
}
