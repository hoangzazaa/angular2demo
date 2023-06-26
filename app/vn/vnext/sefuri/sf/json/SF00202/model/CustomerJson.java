package vn.vnext.sefuri.sf.json.SF00202.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.json.core.DealJson;
import vn.vnext.sefuri.sf.json.core.ShippingDestinationJson;

import java.util.List;

/**
 * Contain all customer infos. 
 * @author vupt
 */
public class CustomerJson extends BaseJson<CustomerDto> {

	//得意先名
	@JsonProperty("name")
	private String name;

	//担当部署
	@JsonProperty("deptName")
	private String deptName;


	//担当営業 
	@JsonProperty("saleName")
	private String salerName;

	//HP経由
	@JsonProperty("hpInfo")
	private Integer hpInfo;

	//備考 （カルテ）
	@JsonProperty("memo")
	private String memo;

	//customerCode
	@JsonProperty("customerCode")
	private String customerCode;

	//deleteFlag
	@JsonProperty("deleteFlag")
	private Integer deleteFlag;

	//abbreviation
	@JsonProperty("abbreviation")
	private String abbreviation;

	//furigana
	@JsonProperty("furigana")
	private String furigana;

	//abbrFurigana
	@JsonProperty("abbrFurigana")
	private String abbrFurigana;

	//customerRep
	@JsonProperty("customerRep")
	private String customerRep;

	//得意先担当者
	@JsonProperty("customerContact")
	private String customerContact;

	//業務担当
	@JsonProperty("picCode")
	private String picCode;

	//customerRsDeal
	@JsonProperty("deal")
	private List<vn.vnext.sefuri.sf.json.core.DealJson> deal;

	//customerRsShippingDestination
	@JsonProperty("shippingDestinations")
	private List<ShippingDestinationJson> shippingDestinations;


	/**
	 * Get name
	 *
	 * @return name
	 */
	public String getName(){
		return name;
	}

	/**
	 * Set name
	 *
	 * @param name String
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get deptName
	 *
	 * @return deptName
	 */
	public String getDeptName(){
		return deptName;
	}

	/**
	 * Set deptName
	 *
	 * @param deptName String
	 */
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	/**
	 * Get saleName
	 *
	 * @return saleName
	 */
	public String getSalerName(){
		return salerName;
	}

	/**
	 * Set saleName
	 *
	 * @param salerName String
	 */
	public void setSalerName(String salerName) {
		this.salerName = salerName;
	}

	/**
	 * Get hpInfo
	 *
	 * @return hpInfo
	 */
	public Integer getHpInfo(){
		return hpInfo;
	}

	/**
	 * Set hpInfo
	 *
	 * @param hpInfo String
	 */
	public void setHpInfo(Integer hpInfo) {
		this.hpInfo = hpInfo;
	}

	/**
	 * Get memo
	 *
	 * @return memo
	 */
	public String getMemo(){
		return memo;
	}

	/**
	 * Set memo
	 *
	 * @param memo String
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * Get customerCode
	 *
	 * @return customerCode
	 */
	public String getCustomerCode(){
		return customerCode;
	}

	/**
	 * Set customerCode
	 *
	 * @param customerCode String
	 */
	public void setCustomerCode(String customerCode) {
		this.customerCode = customerCode;
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

	/**
	 * Get abbreviation
	 *
	 * @return abbreviation
	 */
	public String getAbbreviation(){
		return abbreviation;
	}

	/**
	 * Set abbreviation
	 *
	 * @param abbreviation String
	 */
	public void setAbbreviation(String abbreviation) {
		this.abbreviation = abbreviation;
	}

	/**
	 * Get furigana
	 *
	 * @return furigana
	 */
	public String getFurigana(){
		return furigana;
	}

	/**
	 * Set furigana
	 *
	 * @param furigana String
	 */
	public void setFurigana(String furigana) {
		this.furigana = furigana;
	}

	/**
	 * Get abbrFurigana
	 *
	 * @return abbrFurigana
	 */
	public String getAbbrFurigana(){
		return abbrFurigana;
	}

	/**
	 * Set abbrFurigana
	 *
	 * @param abbrFurigana String
	 */
	public void setAbbrFurigana(String abbrFurigana) {
		this.abbrFurigana = abbrFurigana;
	}

	/**
	 * Get customerRep
	 *
	 * @return customerRep
	 */
	public String getCustomerRep(){
		return customerRep;
	}

	/**
	 * Set customerRep
	 *
	 * @param customerRep String
	 */
	public void setCustomerRep(String customerRep) {
		this.customerRep = customerRep;
	}

	/**
	 * Get customerContact
	 *
	 * @return customerContact
	 */
	public String getCustomerContact(){
		return customerContact;
	}

	/**
	 * Set customerContact
	 *
	 * @param customerContact String
	 */
	public void setCustomerContact(String customerContact) {
		this.customerContact = customerContact;
	}

	/**
	 * Get picCode
	 *
	 * @return picCode
	 */
	public String getPicCode(){
		return picCode;
	}

	/**
	 * Set picCode
	 *
	 * @param picCode String
	 */
	public void setPicCode(String picCode) {
		this.picCode = picCode;
	}

	/**
	 * Get deal
	 *
	 * @return deal
	 */
	public List<vn.vnext.sefuri.sf.json.core.DealJson> getDeal(){
		return deal;
	}

	/**
	 * Set deal
	 *
	 * @param deal List<DealJson>
	 */
	public void setDeal(List<DealJson> deal) {
		this.deal = deal;
	}

	/**
	 * Get shippingDestinations
	 *
	 * @return shippingDestinations
	 */
	public List<ShippingDestinationJson> getShippingDestinations(){
		return shippingDestinations;
	}

	/**
	 * Set shippingDestinations
	 *
	 * @param shippingDestinations List<ShippingDestinationJson>
	 */
	public void setShippingDestinations(List<ShippingDestinationJson> shippingDestinations) {
		this.shippingDestinations = shippingDestinations;
	}

	/**
	 * Create CustomerJson
	 *
	 * @param dto CustomerDto
	 */

	public void setData(CustomerDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.name = dto.getName();
		this.salerName = dto.getSalerName();
		this.hpInfo = dto.getHpInfo();
		this.memo = dto.getMemo();
		this.customerCode = dto.getCustomerCode();
		this.deleteFlag = dto.getDeleteFlag();
		this.abbreviation = dto.getAbbreviation();
		this.furigana = dto.getFurigana();
		this.abbrFurigana = dto.getAbbrFurigana();
		this.customerRep = dto.getCustomerRep();
		this.customerContact = dto.getCustomerContact();
		this.picCode = dto.getPicCode();
	}

	/**
	 * Create CustomerDto
	 *
	 * @return CustomerDto
	 */

	public CustomerDto getData(){
		CustomerDto dto = new CustomerDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setName(name);
		dto.setSalerName(salerName);
		dto.setHpInfo(hpInfo);
		dto.setMemo(memo);
		dto.setCustomerCode(customerCode);
		dto.setDeleteFlag(deleteFlag);
		dto.setAbbreviation(abbreviation);
		dto.setFurigana(furigana);
		dto.setAbbrFurigana(abbrFurigana);
		dto.setCustomerRep(customerRep);
		dto.setCustomerContact(customerContact);
		dto.setPicCode(picCode);
		return dto;
	}
}
