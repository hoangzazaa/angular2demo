package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.BaseDto;
import java.util.List;
import java.math.BigDecimal;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;

/**
 * Contain deal products in deal. 
 * @author vupt 
 */
@Entity
@Table(name = "sfr_sf_deal_product")
public class DealProductDto extends BaseDto {

	/* dealId */
	private Integer dealId;
	/* productId */
	private Integer productId;
	/* highlightFlag */
	private Integer highlightFlag = 0;
	/* type */

	private Integer type;
	/* dealRsDealProduct */
	private DealDto deal;
	/* productRsDealProduct */
	private ProductDto product;
	/* dealProductRsQuotationItem */
	private List<QuotationItemDto> quotationItems;
	/* dealProductRsProductOutput */
	private List<ProductOutputDto> productOutputs;

	/**
	 * Get dealId
	 *
	 * @return dealId
	 */
	@Basic
	@Column(name = "deal_id")
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
	@Basic
	@Column(name = "product_id")
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
	@Basic
	@Column(name = "highlight_flag")
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
	@Basic
	@Column(name = "type")
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
	@Transient
	public DealDto getDeal(){
		return deal;
	}

	/**
	 * Set deal
	 *
	 * @param deal DealDto
	 */
	public void setDeal(DealDto deal) {
		this.deal = deal;
	}

	/**
	 * Get product
	 *
	 * @return product
	 */
	@Transient
	public ProductDto getProduct(){
		return product;
	}

	/**
	 * Set product
	 *
	 * @param product ProductDto
	 */
	public void setProduct(ProductDto product) {
		this.product = product;
	}

	/**
	 * Get quotationItems
	 *
	 * @return quotationItems
	 */
	@Transient
	public List<QuotationItemDto> getQuotationItems(){
		return quotationItems;
	}

	/**
	 * Set quotationItems
	 *
	 * @param quotationItems List<QuotationItemDto>
	 */
	public void setQuotationItems(List<QuotationItemDto> quotationItems) {
		this.quotationItems = quotationItems;
	}

	/**
	 * Get productOutputs
	 *
	 * @return productOutputs
	 */
	@Transient
	public List<ProductOutputDto> getProductOutputs(){
		return productOutputs;
	}

	/**
	 * Set productOutputs
	 *
	 * @param productOutputs List<ProductOutputDto>
	 */
	public void setProductOutputs(List<ProductOutputDto> productOutputs) {
		this.productOutputs = productOutputs;
	}

}