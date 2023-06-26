package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import java.math.BigDecimal;

/**
 * Contain revenue imported by batch 
 * @author vupt
 */
public class RevenueJson  extends BaseJson<RevenueDto> {

	//売上SEQ
	@JsonProperty("salesSeq")
	private Integer salesSeq;

	//受注番号
	@JsonProperty("orderCode")
	private String orderCode;

	//電脳得意先C
	@JsonProperty("dennoCustomerCode")
	private String dennoCustomerCode;

	//売上日
	@JsonProperty("salesDate")
	private DateTime salesDate;

	//請求売上日
	@JsonProperty("invoiceSalesDate")
	private DateTime invoiceSalesDate;

	//売上区分
	@JsonProperty("salesCategory")
	private Integer salesCategory;

	//売上金額
	@JsonProperty("salesAmount")
	private BigDecimal salesAmount;

	//営業部署
	@JsonProperty("departmentCode")
	private String departmentCode;

	//担当営業
	@JsonProperty("salesRep")
	private String salesRep;

	//売上数
	@JsonProperty("salesNumber")
	private BigDecimal salesNumber;

	//売上単価
	@JsonProperty("salesUnitPrice")
	private BigDecimal salesUnitPrice;

	//製造依頼先
	@JsonProperty("manufactureRequest")
	private String manufactureRequest;

	//電脳品目コード
	@JsonProperty("itemCode")
	private String itemCode;

	//製品名
	@JsonProperty("productName")
	private String productName;

	//productType
	@JsonProperty("productType")
	private Integer productType;


	/**
	 * Get salesSeq
	 *
	 * @return salesSeq
	 */
	public Integer getSalesSeq(){
		return salesSeq;
	}

	/**
	 * Set salesSeq
	 *
	 * @param salesSeq Integer
	 */
	public void setSalesSeq(Integer salesSeq) {
		this.salesSeq = salesSeq;
	}

	/**
	 * Get orderCode
	 *
	 * @return orderCode
	 */
	public String getOrderCode(){
		return orderCode;
	}

	/**
	 * Set orderCode
	 *
	 * @param orderCode String
	 */
	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	/**
	 * Get dennoCustomerCode
	 *
	 * @return dennoCustomerCode
	 */
	public String getDennoCustomerCode(){
		return dennoCustomerCode;
	}

	/**
	 * Set dennoCustomerCode
	 *
	 * @param dennoCustomerCode String
	 */
	public void setDennoCustomerCode(String dennoCustomerCode) {
		this.dennoCustomerCode = dennoCustomerCode;
	}

	/**
	 * Get salesDate
	 *
	 * @return salesDate
	 */
	public DateTime getSalesDate(){
		return salesDate;
	}

	/**
	 * Set salesDate
	 *
	 * @param salesDate DateTime
	 */
	public void setSalesDate(DateTime salesDate) {
		this.salesDate = salesDate;
	}

	/**
	 * Get invoiceSalesDate
	 *
	 * @return invoiceSalesDate
	 */
	public DateTime getInvoiceSalesDate(){
		return invoiceSalesDate;
	}

	/**
	 * Set invoiceSalesDate
	 *
	 * @param invoiceSalesDate DateTime
	 */
	public void setInvoiceSalesDate(DateTime invoiceSalesDate) {
		this.invoiceSalesDate = invoiceSalesDate;
	}

	/**
	 * Get salesCategory
	 *
	 * @return salesCategory
	 */
	public Integer getSalesCategory(){
		return salesCategory;
	}

	/**
	 * Set salesCategory
	 *
	 * @param salesCategory Integer
	 */
	public void setSalesCategory(Integer salesCategory) {
		this.salesCategory = salesCategory;
	}

	/**
	 * Get salesAmount
	 *
	 * @return salesAmount
	 */
	public BigDecimal getSalesAmount(){
		return salesAmount;
	}

	/**
	 * Set salesAmount
	 *
	 * @param salesAmount Integer
	 */
	public void setSalesAmount(BigDecimal salesAmount) {
		this.salesAmount = salesAmount;
	}

	/**
	 * Get departmentCode
	 *
	 * @return departmentCode
	 */
	public String getDepartmentCode(){
		return departmentCode;
	}

	/**
	 * Set departmentCode
	 *
	 * @param departmentCode String
	 */
	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	/**
	 * Get salesRep
	 *
	 * @return salesRep
	 */
	public String getSalesRep(){
		return salesRep;
	}

	/**
	 * Set salesRep
	 *
	 * @param salesRep String
	 */
	public void setSalesRep(String salesRep) {
		this.salesRep = salesRep;
	}

	/**
	 * Get salesNumber
	 *
	 * @return salesNumber
	 */
	public BigDecimal getSalesNumber(){
		return salesNumber;
	}

	/**
	 * Set salesNumber
	 *
	 * @param salesNumber BigDecimal
	 */
	public void setSalesNumber(BigDecimal salesNumber) {
		this.salesNumber = salesNumber;
	}

	/**
	 * Get salesUnitPrice
	 *
	 * @return salesUnitPrice
	 */
	public BigDecimal getSalesUnitPrice(){
		return salesUnitPrice;
	}

	/**
	 * Set salesUnitPrice
	 *
	 * @param salesUnitPrice BigDecimal
	 */
	public void setSalesUnitPrice(BigDecimal salesUnitPrice) {
		this.salesUnitPrice = salesUnitPrice;
	}

	/**
	 * Get manufactureRequest
	 *
	 * @return manufactureRequest
	 */
	public String getManufactureRequest(){
		return manufactureRequest;
	}

	/**
	 * Set manufactureRequest
	 *
	 * @param manufactureRequest String
	 */
	public void setManufactureRequest(String manufactureRequest) {
		this.manufactureRequest = manufactureRequest;
	}

	/**
	 * Get itemCode
	 *
	 * @return itemCode
	 */
	public String getItemCode(){
		return itemCode;
	}

	/**
	 * Set itemCode
	 *
	 * @param itemCode String
	 */
	public void setItemCode(String itemCode) {
		this.itemCode = itemCode;
	}

	/**
	 * Get productName
	 *
	 * @return productName
	 */
	public String getProductName(){
		return productName;
	}

	/**
	 * Set productName
	 *
	 * @param productName String
	 */
	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * Get productType
	 *
	 * @return productType
	 */
	public Integer getProductType(){
		return productType;
	}

	/**
	 * Set productType
	 *
	 * @param productType Integer
	 */
	public void setProductType(Integer productType) {
		this.productType = productType;
	}

	/**
	 * Create RevenueJson
	 *
	 * @param dto RevenueDto
	 */

	public void setData(RevenueDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.salesSeq = dto.getSalesSeq();
		this.orderCode = dto.getOrderCode();
		this.dennoCustomerCode = dto.getDennoCustomerCode();
		this.salesDate = dto.getSalesDate();
		this.invoiceSalesDate = dto.getInvoiceSalesDate();
		this.salesCategory = dto.getSalesCategory();
		this.salesAmount = dto.getSalesAmount();
		this.departmentCode = dto.getDepartmentCode();
		this.salesRep = dto.getSalesRep();
		this.salesNumber = dto.getSalesNumber();
		this.salesUnitPrice = dto.getSalesUnitPrice();
		this.manufactureRequest = dto.getManufactureRequest();
		this.itemCode = dto.getItemCode();
		this.productName = dto.getProductName();
		this.productType = dto.getProductType();
	}

	/**
	 * Create RevenueDto
	 *
	 * @return RevenueDto
	 */

	public RevenueDto getData(){
		RevenueDto dto = new RevenueDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setSalesSeq(salesSeq);
		dto.setOrderCode(orderCode);
		dto.setDennoCustomerCode(dennoCustomerCode);
		dto.setSalesDate(salesDate);
		dto.setInvoiceSalesDate(invoiceSalesDate);
		dto.setSalesCategory(salesCategory);
		dto.setSalesAmount(salesAmount);
		dto.setDepartmentCode(departmentCode);
		dto.setSalesRep(salesRep);
		dto.setSalesNumber(salesNumber);
		dto.setSalesUnitPrice(salesUnitPrice);
		dto.setManufactureRequest(manufactureRequest);
		dto.setItemCode(itemCode);
		dto.setProductName(productName);
		dto.setProductType(productType);
		return dto;
	}
}
