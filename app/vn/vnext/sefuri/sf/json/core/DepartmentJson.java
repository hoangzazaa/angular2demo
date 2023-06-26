package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DepartmentDto;

import java.util.List;

/**
 * Contain department info 
 * @author vupt
 */
public class DepartmentJson  extends BaseJson<DepartmentDto> {

	//department
	@JsonProperty("department")
	private String department;

	//departmentCode
	@JsonProperty("departmentCode")
	private String departmentCode;

	//type
	@JsonProperty("type")
	private Integer type;

	@JsonProperty("mailGroupFlag")
	private Integer mailGroupFlag;

	//departmentRsUser
	@JsonProperty("users")
	private List<UserJson> users;

	//departmentRsDepartmentGoal
	@JsonProperty("departmentGoals")
	private List<DepartmentGoalJson> departmentGoals;

	//departmentRsCustomerGoal
	@JsonProperty("customerGoals")
	private List<CustomerGoalJson> customerGoals;


	/**
	 * Get department
	 *
	 * @return department
	 */
	public String getDepartment(){
		return department;
	}

	/**
	 * Set department
	 *
	 * @param department String
	 */
	public void setDepartment(String department) {
		this.department = department;
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
	 * Get users
	 *
	 * @return users
	 */
	public List<UserJson> getUsers(){
		return users;
	}

	/**
	 * Set users
	 *
	 * @param users List<UserJson>
	 */
	public void setUsers(List<UserJson> users) {
		this.users = users;
	}

	/**
	 * Get departmentGoals
	 *
	 * @return departmentGoals
	 */
	public List<DepartmentGoalJson> getDepartmentGoals(){
		return departmentGoals;
	}

	/**
	 * Set departmentGoals
	 *
	 * @param departmentGoals List<DepartmentGoalJson>
	 */
	public void setDepartmentGoals(List<DepartmentGoalJson> departmentGoals) {
		this.departmentGoals = departmentGoals;
	}

	/**
	 * Get customerGoals
	 *
	 * @return customerGoals
	 */
	public List<CustomerGoalJson> getCustomerGoals(){
		return customerGoals;
	}

	/**
	 * Set customerGoals
	 *
	 * @param customerGoals List<CustomerGoalJson>
	 */
	public void setCustomerGoals(List<CustomerGoalJson> customerGoals) {
		this.customerGoals = customerGoals;
	}

	public Integer getMailGroupFlag() {
		return mailGroupFlag;
	}

	public void setMailGroupFlag(Integer mailGroupFlag) {
		this.mailGroupFlag = mailGroupFlag;
	}

	/**
	 * Create DepartmentJson
	 *
	 * @param dto DepartmentDto
	 */

	public void setData(DepartmentDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.department = dto.getDepartment();
		this.departmentCode = dto.getDepartmentCode();
		this.type = dto.getType();
		this.mailGroupFlag = dto.getMailGroupFlag();
	}

	/**
	 * Create DepartmentDto
	 *
	 * @return DepartmentDto
	 */
	public DepartmentDto getData(){
		DepartmentDto dto = new DepartmentDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDepartment(department);
		dto.setDepartmentCode(departmentCode);
		dto.setType(type);
		dto.setMailGroupFlag(mailGroupFlag);
		return dto;
	}
}
