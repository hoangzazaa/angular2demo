package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain department goal 
 * @author vupt
 */
public class DepartmentGoalJson  extends BaseJson<DepartmentGoalDto> {

	//year
	@JsonProperty("year")
	private Integer year;

	//activityPolicy
	@JsonProperty("activityPolicy")
	private String activityPolicy;

	//departmentId
	@JsonProperty("departmentId")
	private Integer departmentId;

	//departmentRsDepartmentGoal
	@JsonProperty("department")
	private DepartmentJson department;

	//departmentGoalRsDepartmentGoalItem
	@JsonProperty("goalItems")
	private List<DepartmentGoalItemJson> goalItems;


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
	 * Get goalItems
	 *
	 * @return goalItems
	 */
	public List<DepartmentGoalItemJson> getGoalItems(){
		return goalItems;
	}

	/**
	 * Set goalItems
	 *
	 * @param goalItems List<DepartmentGoalItemJson>
	 */
	public void setGoalItems(List<DepartmentGoalItemJson> goalItems) {
		this.goalItems = goalItems;
	}

	/**
	 * Create DepartmentGoalJson
	 *
	 * @param dto DepartmentGoalDto
	 */

	public void setData(DepartmentGoalDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.year = dto.getYear();
		this.activityPolicy = dto.getActivityPolicy();
		this.departmentId = dto.getDepartmentId();
		this.department = new DepartmentJson();
		this.department.setId(dto.getDepartmentId());
	}

	/**
	 * Create DepartmentGoalDto
	 *
	 * @return DepartmentGoalDto
	 */

	public DepartmentGoalDto getData(){
		DepartmentGoalDto dto = new DepartmentGoalDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setYear(year);
		dto.setActivityPolicy(activityPolicy);
		dto.setDepartmentId(departmentId);
		return dto;
	}
}
