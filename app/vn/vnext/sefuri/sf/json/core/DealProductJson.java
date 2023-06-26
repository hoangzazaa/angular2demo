package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain deal products in deal. 
 * @author vupt
 */
public class DealProductJson  extends BaseJson<DealProductDto> {

	//dealId
	@JsonProperty("dealId")
	private Integer dealId;

	//productId
	@JsonProperty("productId")
	private Integer productId;

	//highlightFlag
	@JsonProperty("highlightFlag")
	private Integer highlightFlag;

	//type
	@JsonProperty("type")
	private Integer type;

	//dealRsDealProduct
	@JsonProperty("deal")
	private DealJson deal;

	//productRsDealProduct
	@JsonProperty("product")
	private ProductJson product;

	//dealProductRsQuotationItem
	@JsonProperty("quotationItems")
	private List<QuotationItemJson> quotationItems;

	//dealProductRsOffer
	@JsonProperty("offers")
	private List<OfferJson> offers;


	/**
	 * Get dealId
	 *
	 * @return dealId
	 */
	public Integer getDealId(){
		return dealId;
	}

	/**
	 * Set dealId
	 *
	 * @param dealId Integer
	 */
	public void setDealId(Integer dealId) {
		this.dealId = dealId;
	}

	/**
	 * Get productId
	 *
	 * @return productId
	 */
	public Integer getProductId(){
		return productId;
	}

	/**
	 * Set productId
	 *
	 * @param productId Integer
	 */
	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	/**
	 * Get highlightFlag
	 *
	 * @return highlightFlag
	 */
	public Integer getHighlightFlag(){
		return highlightFlag;
	}

	/**
	 * Set highlightFlag
	 *
	 * @param highlightFlag Integer
	 */
	public void setHighlightFlag(Integer highlightFlag) {
		this.highlightFlag = highlightFlag;
	}

	/**
	 * Get type
	 *
	 * @return type
	 */
	public Integer getType(){
		return type;
	}

	/**
	 * Set type
	 *
	 * @param type Integer
	 */
	public void setType(Integer type) {
		this.type = type;
	}

	/**
	 * Get deal
	 *
	 * @return deal
	 */
	public DealJson getDeal(){
		return deal;
	}

	/**
	 * Set deal
	 *
	 * @param deal DealJson
	 */
	public void setDeal(DealJson deal) {
		this.deal = deal;
	}

	/**
	 * Get product
	 *
	 * @return product
	 */
	public ProductJson getProduct(){
		return product;
	}

	/**
	 * Set product
	 *
	 * @param product ProductJson
	 */
	public void setProduct(ProductJson product) {
		this.product = product;
	}

	/**
	 * Get quotationItems
	 *
	 * @return quotationItems
	 */
	public List<QuotationItemJson> getQuotationItems(){
		return quotationItems;
	}

	/**
	 * Set quotationItems
	 *
	 * @param quotationItems List<QuotationItemJson>
	 */
	public void setQuotationItems(List<QuotationItemJson> quotationItems) {
		this.quotationItems = quotationItems;
	}

	/**
	 * Get offers
	 *
	 * @return offers
	 */
	public List<OfferJson> getOffers(){
		return offers;
	}

	/**
	 * Set offers
	 *
	 * @param offers List<OfferJson>
	 */
	public void setOffers(List<OfferJson> offers) {
		this.offers = offers;
	}

	/**
	 * Create DealProductJson
	 *
	 * @param dto DealProductDto
	 */

	public void setData(DealProductDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.dealId = dto.getDealId();
		this.productId = dto.getProductId();
		this.highlightFlag = dto.getHighlightFlag();
		this.type = dto.getType();
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
		this.product = new ProductJson();
		this.product.setId(dto.getProductId());
	}

	/**
	 * Create DealProductDto
	 *
	 * @return DealProductDto
	 */

	public DealProductDto getData(){
		DealProductDto dto = new DealProductDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDealId(dealId);
		dto.setProductId(productId);
		dto.setHighlightFlag(highlightFlag);
		dto.setType(type);
		return dto;
	}
}
