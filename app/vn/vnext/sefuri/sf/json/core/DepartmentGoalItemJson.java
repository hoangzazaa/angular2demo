package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain department goal item 
 * @author vupt
 */
public class DepartmentGoalItemJson  extends BaseJson<DepartmentGoalItemDto> {

	//type
	@JsonProperty("type")
	private Integer type;

	//goal
	@JsonProperty("goal")
	private BigDecimal goal;

	//month
	@JsonProperty("month")
	private Integer month;

	//departmentGoalId
	@JsonProperty("departmentGoalId")
	private Integer departmentGoalId;

	//customerType
	@JsonProperty("customerType")
	private Integer customerType;

	//departmentGoalRsDepartmentGoalItem
	@JsonProperty("departmentGoal")
	private DepartmentGoalJson departmentGoal;


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
	 * Get goal
	 *
	 * @return goal
	 */
	public BigDecimal getGoal(){
		return goal;
	}

	/**
	 * Set goal
	 *
	 * @param goal BigDecimal
	 */
	public void setGoal(BigDecimal goal) {
		this.goal = goal;
	}

	/**
	 * Get month
	 *
	 * @return month
	 */
	public Integer getMonth(){
		return month;
	}

	/**
	 * Set month
	 *
	 * @param month Integer
	 */
	public void setMonth(Integer month) {
		this.month = month;
	}

	/**
	 * Get departmentGoalId
	 *
	 * @return departmentGoalId
	 */
	public Integer getDepartmentGoalId(){
		return departmentGoalId;
	}

	/**
	 * Set departmentGoalId
	 *
	 * @param departmentGoalId Integer
	 */
	public void setDepartmentGoalId(Integer departmentGoalId) {
		this.departmentGoalId = departmentGoalId;
	}

	/**
	 * Get customerType
	 *
	 * @return customerType
	 */
	public Integer getCustomerType(){
		return customerType;
	}

	/**
	 * Set customerType
	 *
	 * @param customerType Integer
	 */
	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}

	/**
	 * Get departmentGoal
	 *
	 * @return departmentGoal
	 */
	public DepartmentGoalJson getDepartmentGoal(){
		return departmentGoal;
	}

	/**
	 * Set departmentGoal
	 *
	 * @param departmentGoal DepartmentGoalJson
	 */
	public void setDepartmentGoal(DepartmentGoalJson departmentGoal) {
		this.departmentGoal = departmentGoal;
	}

	/**
	 * Create DepartmentGoalItemJson
	 *
	 * @param dto DepartmentGoalItemDto
	 */

	public void setData(DepartmentGoalItemDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.type = dto.getType();
		this.goal = dto.getGoal();
		this.month = dto.getMonth();
		this.departmentGoalId = dto.getDepartmentGoalId();
		this.customerType = dto.getCustomerType();
		this.departmentGoal = new DepartmentGoalJson();
		this.departmentGoal.setId(dto.getDepartmentGoalId());
	}

	/**
	 * Create DepartmentGoalItemDto
	 *
	 * @return DepartmentGoalItemDto
	 */

	public DepartmentGoalItemDto getData(){
		DepartmentGoalItemDto dto = new DepartmentGoalItemDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setType(type);
		dto.setGoal(goal);
		dto.setMonth(month);
		dto.setDepartmentGoalId(departmentGoalId);
		dto.setCustomerType(customerType);
		return dto;
	}
}
