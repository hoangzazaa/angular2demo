package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain customer goal 
 * @author vupt
 */
public class CustomerGoalJson  extends BaseJson<CustomerGoalDto> {

	//year
	@JsonProperty("year")
	private Integer year;

	//activityPolicy
	@JsonProperty("activityPolicy")
	private String activityPolicy;

	//customerId
	@JsonProperty("customerId")
	private Integer customerId;

	//picId
	@JsonProperty("picId")
	private Integer picId;

	//departmentId
	@JsonProperty("departmentId")
	private Integer departmentId;

	//customerRsCustomerGoal
	@JsonProperty("customer")
	private CustomerJson customer;

	//customerGoalRsCustomerGoalItem
	@JsonProperty("goalItems")
	private List<CustomerGoalItemJson> goalItems;

	//customerRsUser
	@JsonProperty("user")
	private UserJson user;

	//departmentRsDepartmentGoal
	@JsonProperty("department")
	private DepartmentJson department;


	/**
	 * Get year
	 *
	 * @return year
	 */
	public Integer getYear(){
		return year;
	}

	/**
	 * Set year
	 *
	 * @param year Integer
	 */
	public void setYear(Integer year) {
		this.year = year;
	}

	/**
	 * Get activityPolicy
	 *
	 * @return activityPolicy
	 */
	public String getActivityPolicy(){
		return activityPolicy;
	}

	/**
	 * Set activityPolicy
	 *
	 * @param activityPolicy String
	 */
	public void setActivityPolicy(String activityPolicy) {
		this.activityPolicy = activityPolicy;
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

	/**
	 * Get picId
	 *
	 * @return picId
	 */
	public Integer getPicId(){
		return picId;
	}

	/**
	 * Set picId
	 *
	 * @param picId Integer
	 */
	public void setPicId(Integer picId) {
		this.picId = picId;
	}

	/**
	 * Get departmentId
	 *
	 * @return departmentId
	 */
	public Integer getDepartmentId(){
		return departmentId;
	}

	/**
	 * Set departmentId
	 *
	 * @param departmentId Integer
	 */
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
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
	 * Get goalItems
	 *
	 * @return goalItems
	 */
	public List<CustomerGoalItemJson> getGoalItems(){
		return goalItems;
	}

	/**
	 * Set goalItems
	 *
	 * @param goalItems List<CustomerGoalItemJson>
	 */
	public void setGoalItems(List<CustomerGoalItemJson> goalItems) {
		this.goalItems = goalItems;
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
	 * Get department
	 *
	 * @return department
	 */
	public DepartmentJson getDepartment(){
		return department;
	}

	/**
	 * Set department
	 *
	 * @param department DepartmentJson
	 */
	public void setDepartment(DepartmentJson department) {
		this.department = department;
	}

	/**
	 * Create CustomerGoalJson
	 *
	 * @param dto CustomerGoalDto
	 */

	public void setData(CustomerGoalDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.year = dto.getYear();
		this.activityPolicy = dto.getActivityPolicy();
		this.customerId = dto.getCustomerId();
		this.picId = dto.getPicId();
		this.departmentId = dto.getDepartmentId();
		this.customer = new CustomerJson();
		this.customer.setId(dto.getCustomerId());
		this.user = new UserJson();
		this.user.setId(dto.getPicId());
		this.department = new DepartmentJson();
		this.department.setId(dto.getDepartmentId());
	}

	/**
	 * Create CustomerGoalDto
	 *
	 * @return CustomerGoalDto
	 */

	public CustomerGoalDto getData(){
		CustomerGoalDto dto = new CustomerGoalDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setYear(year);
		dto.setActivityPolicy(activityPolicy);
		dto.setCustomerId(customerId);
		dto.setPicId(picId);
		dto.setDepartmentId(departmentId);
		return dto;
	}
}
