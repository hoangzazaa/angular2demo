package vn.vnext.sefuri.sf.json.SFN0702;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.util.List;

/**
 * For SFN07-02
 */
public class DealProductJson extends BaseJson<DealProductDto> {
    //dealId
    @JsonProperty("dealId")
    private Integer dealId;

    //productId
    @JsonProperty("productId")
    private Integer productId;

    //productRsDealProduct
    @JsonProperty("product")
    private ProductJson product;

    //dealProductRsOffer
    @JsonProperty("offers")
    private List<OfferJson> offers;

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }

    public List<OfferJson> getOffers() {
        return offers;
    }

    public void setOffers(List<OfferJson> offers) {
        this.offers = offers;
    }

    @Override
    public void setData(DealProductDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.dealId = dto.getDealId();
        this.productId = dto.getProductId();
    }

    @Override
    public DealProductDto getData() {
        DealProductDto dto = new DealProductDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setDealId(dealId);
        dto.setProductId(productId);
        return null;
    }
}
