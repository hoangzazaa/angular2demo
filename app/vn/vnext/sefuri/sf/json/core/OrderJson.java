package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.OrderDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain all order  
 * @author vupt
 */
public class OrderJson  extends BaseJson<OrderDto> {

	//quotationId
	@JsonProperty("quotationId")
	private Integer quotationId;

	//dealId
	@JsonProperty("dealId")
	private Integer dealId;

	//quotationRsOrder
	@JsonProperty("quotation")
	private QuotationJson quotation;

	//orderRsOrderItem
	@JsonProperty("orderItems")
	private List<OrderItemJson> orderItems;

	//dealRsOrder
	@JsonProperty("deal")
	private DealJson deal;


	/**
	 * Get quotationId
	 *
	 * @return quotationId
	 */
	public Integer getQuotationId(){
		return quotationId;
	}

	/**
	 * Set quotationId
	 *
	 * @param quotationId Integer
	 */
	public void setQuotationId(Integer quotationId) {
		this.quotationId = quotationId;
	}

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
	 * Get quotation
	 *
	 * @return quotation
	 */
	public QuotationJson getQuotation(){
		return quotation;
	}

	/**
	 * Set quotation
	 *
	 * @param quotation QuotationJson
	 */
	public void setQuotation(QuotationJson quotation) {
		this.quotation = quotation;
	}

	/**
	 * Get orderItems
	 *
	 * @return orderItems
	 */
	public List<OrderItemJson> getOrderItems(){
		return orderItems;
	}

	/**
	 * Set orderItems
	 *
	 * @param orderItems List<OrderItemJson>
	 */
	public void setOrderItems(List<OrderItemJson> orderItems) {
		this.orderItems = orderItems;
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
	 * Create OrderJson
	 *
	 * @param dto OrderDto
	 */

	public void setData(OrderDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
//		this.quotationId = dto.getQuotationId();
		this.dealId = dto.getDealId();
		this.quotation = new QuotationJson();
//		this.quotation.setId(dto.getQuotationId());
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
	}

	/**
	 * Create OrderDto
	 *
	 * @return OrderDto
	 */

	public OrderDto getData(){
		OrderDto dto = new OrderDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
//		dto.setQuotationId(quotationId);
		dto.setDealId(dealId);
		return dto;
	}
}
