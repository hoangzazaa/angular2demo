package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain deals managed by all user
 * @author vupt
 */
public class DealJson  extends BaseJson<DealDto> {

	//案件名
	@JsonProperty("dealName")
	private String dealName;

	//案件ID
	@JsonProperty("dealCode")
	private String dealCode;

	//案件区分
	@JsonProperty("dealType")
	private Integer dealType;

	//担当営業名
	@JsonProperty("salesId")
	private Integer salesId;

	//受注予定額
	@JsonProperty("estTotalDeal")
	private BigDecimal estTotalDeal;

	//ステータス
	@JsonProperty("dealStatus")
	private Integer dealStatus;

	//得意先ID
	@JsonProperty("customerId")
	private Integer customerId;

	//得意先ID
	@JsonProperty("customerName")
	private String customerName;

	//userId
	@JsonProperty("userId")
	private Integer userId;

	//納期
	@JsonProperty("deliveryDate")
	private DateTime deliveryDate;

	//templateFlag
	@JsonProperty("templateFlag")
	private Integer templateFlag;

	//deleteFlag
	@JsonProperty("deleteFlag")
	private Integer deleteFlag;

	//closedFlag
	@JsonProperty("closedFlag")
	private Integer closedFlag;

	//userRsDeal
	@JsonProperty("user")
	private UserJson user;

	//customerRsDeal
	@JsonProperty("customer")
	private CustomerJson customer;

	//dealRsMyboxItem
	@JsonProperty("myboxItems")
	private List<MyboxItemJson> myboxItems;

	//dealRsDealProduct
	@JsonProperty("dealProducts")
	private List<DealProductJson> dealProducts;

	//dealRsQuotation
	@JsonProperty("quotations")
	private List<QuotationJson> quotations;

	//dealRsComment
	@JsonProperty("comments")
	private List<CommentJson> comments;

	//dealRsChecklist
	@JsonProperty("checklist")
	private List<ChecksheetJson> checklist;

	//dealRsDealFile
	@JsonProperty("dealFiles")
	private List<DealFileJson> dealFiles;

	//dealRsOrder
	@JsonProperty("order")
	private OrderJson order;

	//salesRsDeal
	@JsonProperty("sales")
	private UserJson sales;


	/**
	 * Get dealName
	 *
	 * @return dealName
	 */
	public String getDealName(){
		return dealName;
	}

	/**
	 * Set dealName
	 *
	 * @param dealName String
	 */
	public void setDealName(String dealName) {
		this.dealName = dealName;
	}

	/**
	 * Get dealCode
	 *
	 * @return dealCode
	 */
	public String getDealCode(){
		return dealCode;
	}

	/**
	 * Set dealCode
	 *
	 * @param dealCode String
	 */
	public void setDealCode(String dealCode) {
		this.dealCode = dealCode;
	}

	/**
	 * Get dealType
	 *
	 * @return dealType
	 */
	public Integer getDealType(){
		return dealType;
	}

	/**
	 * Set dealType
	 *
	 * @param dealType Integer
	 */
	public void setDealType(Integer dealType) {
		this.dealType = dealType;
	}

	/**
	 * Get salesId
	 *
	 * @return salesId
	 */
	public Integer getSalesId(){
		return salesId;
	}

	/**
	 * Set salesId
	 *
	 * @param salesId Integer
	 */
	public void setSalesId(Integer salesId) {
		this.salesId = salesId;
	}

	/**
	 * Get estTotalDeal
	 *
	 * @return estTotalDeal
	 */
	public BigDecimal getEstTotalDeal(){
		return estTotalDeal;
	}

	/**
	 * Set estTotalDeal
	 *
	 * @param estTotalDeal BigDecimal
	 */
	public void setEstTotalDeal(BigDecimal estTotalDeal) {
		this.estTotalDeal = estTotalDeal;
	}

	/**
	 * Get dealStatus
	 *
	 * @return dealStatus
	 */
	public Integer getDealStatus(){
		return dealStatus;
	}

	/**
	 * Set dealStatus
	 *
	 * @param dealStatus Integer
	 */
	public void setDealStatus(Integer dealStatus) {
		this.dealStatus = dealStatus;
	}

	/**
	 * Get customerId
	 *
	 * @return customerId
	 */
	public Integer getCustomerId(){
		return customerId;
	}

	/**
	 * Set customerId
	 *
	 * @param customerId Integer
	 */
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * Get userId
	 *
	 * @return userId
	 */
	public Integer getUserId(){
		return userId;
	}

	/**
	 * Set userId
	 *
	 * @param userId Integer
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * Get deliveryDate
	 *
	 * @return deliveryDate
	 */
	public DateTime getDeliveryDate(){
		return deliveryDate;
	}

	/**
	 * Set deliveryDate
	 *
	 * @param deliveryDate DateTime
	 */
	public void setDeliveryDate(DateTime deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	/**
	 * Get templateFlag
	 *
	 * @return templateFlag
	 */
	public Integer getTemplateFlag(){
		return templateFlag;
	}

	/**
	 * Set templateFlag
	 *
	 * @param templateFlag Integer
	 */
	public void setTemplateFlag(Integer templateFlag) {
		this.templateFlag = templateFlag;
	}

	/**
	 * Get deleteFlag
	 *
	 * @return deleteFlag
	 */
	public Integer getDeleteFlag(){
		return deleteFlag;
	}

	/**
	 * Set deleteFlag
	 *
	 * @param deleteFlag Integer
	 */
	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public Integer getClosedFlag() {
		return closedFlag;
	}

	public void setClosedFlag(Integer closedFlag) {
		this.closedFlag = closedFlag;
	}

	/**
	 * Get user
	 *
	 * @return user
	 */
	public UserJson getUser(){
		return user;
	}

	/**
	 * Set user
	 *
	 * @param user UserJson
	 */
	public void setUser(UserJson user) {
		this.user = user;
	}

	/**
	 * Get customer
	 *
	 * @return customer
	 */
	public CustomerJson getCustomer(){
		return customer;
	}

	/**
	 * Set customer
	 *
	 * @param customer CustomerJson
	 */
	public void setCustomer(CustomerJson customer) {
		this.customer = customer;
	}

	/**
	 * Get myboxItems
	 *
	 * @return myboxItems
	 */
	public List<MyboxItemJson> getMyboxItems(){
		return myboxItems;
	}

	/**
	 * Set myboxItems
	 *
	 * @param myboxItems List<MyboxItemJson>
	 */
	public void setMyboxItems(List<MyboxItemJson> myboxItems) {
		this.myboxItems = myboxItems;
	}

	/**
	 * Get dealProducts
	 *
	 * @return dealProducts
	 */
	public List<DealProductJson> getDealProducts(){
		return dealProducts;
	}

	/**
	 * Set dealProducts
	 *
	 * @param dealProducts List<DealProductJson>
	 */
	public void setDealProducts(List<DealProductJson> dealProducts) {
		this.dealProducts = dealProducts;
	}

	/**
	 * Get quotations
	 *
	 * @return quotations
	 */
	public List<QuotationJson> getQuotations(){
		return quotations;
	}

	/**
	 * Set quotations
	 *
	 * @param quotations List<QuotationJson>
	 */
	public void setQuotations(List<QuotationJson> quotations) {
		this.quotations = quotations;
	}

	/**
	 * Get comments
	 *
	 * @return comments
	 */
	public List<CommentJson> getComments(){
		return comments;
	}

	/**
	 * Set comments
	 *
	 * @param comments List<CommentJson>
	 */
	public void setComments(List<CommentJson> comments) {
		this.comments = comments;
	}

	/**
	 * Get checklist
	 *
	 * @return checklist
	 */
	public List<ChecksheetJson> getChecklist(){
		return checklist;
	}

	/**
	 * Set checklist
	 *
	 * @param checklist List<ChecklistJson>
	 */
	public void setChecklist(List<ChecksheetJson> checklist) {
		this.checklist = checklist;
	}

	/**
	 * Get dealFiles
	 *
	 * @return dealFiles
	 */
	public List<DealFileJson> getDealFiles(){
		return dealFiles;
	}

	/**
	 * Set dealFiles
	 *
	 * @param dealFiles List<DealFileJson>
	 */
	public void setDealFiles(List<DealFileJson> dealFiles) {
		this.dealFiles = dealFiles;
	}

	/**
	 * Get order
	 *
	 * @return order
	 */
	public OrderJson getOrder(){
		return order;
	}

	/**
	 * Set order
	 *
	 * @param order OrderJson
	 */
	public void setOrder(OrderJson order) {
		this.order = order;
	}

	/**
	 * Get sales
	 *
	 * @return sales
	 */
	public UserJson getSales(){
		return sales;
	}

	/**
	 * Set sales
	 *
	 * @param sales UserJson
	 */
	public void setSales(UserJson sales) {
		this.sales = sales;
	}

	/**
	 * Create DealJson
	 *
	 * @param dto DealDto
	 */

	public void setData(DealDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.dealName = dto.getDealName();
		this.dealCode = dto.getDealCode();
		this.dealType = dto.getDealType();
		this.salesId = dto.getSalesId();
		this.estTotalDeal = dto.getEstTotalDeal();
		this.dealStatus = dto.getDealStatus();
		this.customerId = dto.getCustomerId();
		this.customerName = dto.getCustomerName();
		this.deliveryDate = dto.getDeliveryDate();
		this.templateFlag = dto.getTemplateFlag();
		this.deleteFlag = dto.getDeleteFlag();
		this.closedFlag = dto.getClosedFlag();
		this.customer = new CustomerJson();
		this.customer.setId(dto.getCustomerId());
		this.order = new OrderJson();
		this.order.setDealId(dto.getId());
		this.sales = new UserJson();
		this.sales.setId(dto.getSalesId());
	}

	/**
	 * Create DealDto
	 *
	 * @return DealDto
	 */

	public DealDto getData(){
		DealDto dto = new DealDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDealName(dealName);
		dto.setDealCode(dealCode);
		dto.setDealType(dealType);
		dto.setSalesId(salesId);
		dto.setEstTotalDeal(estTotalDeal);
		dto.setDealStatus(dealStatus);
		dto.setCustomerId(customerId);
		dto.setCustomerName(customerName);
		dto.setDeliveryDate(deliveryDate);
		dto.setTemplateFlag(templateFlag);
		dto.setDeleteFlag(deleteFlag);
		dto.setClosedFlag(closedFlag);
		return dto;
	}
}
