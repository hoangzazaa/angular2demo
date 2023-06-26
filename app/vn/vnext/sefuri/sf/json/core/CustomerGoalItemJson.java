package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.CustomerGoalItemDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain customer goal items 
 * @author vupt
 */
public class CustomerGoalItemJson  extends BaseJson<CustomerGoalItemDto> {

	//type
	@JsonProperty("type")
	private Integer type;

	//goal
	@JsonProperty("goal")
	private BigDecimal goal;

	//month
	@JsonProperty("month")
	private Integer month;

	//customerGoalId
	@JsonProperty("customerGoalId")
	private Integer customerGoalId;

	//customerType
	@JsonProperty("customerType")
	private Integer customerType;

	//customerGoalRsGoalItem
	@JsonProperty("customerGoal")
	private CustomerGoalJson customerGoal;


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
	 * Get customerGoalId
	 *
	 * @return customerGoalId
	 */
	public Integer getCustomerGoalId(){
		return customerGoalId;
	}

	/**
	 * Set customerGoalId
	 *
	 * @param customerGoalId Integer
	 */
	public void setCustomerGoalId(Integer customerGoalId) {
		this.customerGoalId = customerGoalId;
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
	 * Get customerGoal
	 *
	 * @return customerGoal
	 */
	public CustomerGoalJson getCustomerGoal(){
		return customerGoal;
	}

	/**
	 * Set customerGoal
	 *
	 * @param customerGoal CustomerGoalJson
	 */
	public void setCustomerGoal(CustomerGoalJson customerGoal) {
		this.customerGoal = customerGoal;
	}

	/**
	 * Create CustomerGoalItemJson
	 *
	 * @param dto CustomerGoalItemDto
	 */

	public void setData(CustomerGoalItemDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.type = dto.getType();
		this.goal = dto.getGoal();
		this.month = dto.getMonth();
		this.customerGoalId = dto.getCustomerGoalId();
		this.customerType = dto.getCustomerType();
		this.customerGoal = new CustomerGoalJson();
		this.customerGoal.setId(dto.getCustomerGoalId());
	}

	/**
	 * Create CustomerGoalItemDto
	 *
	 * @return CustomerGoalItemDto
	 */

	public CustomerGoalItemDto getData(){
		CustomerGoalItemDto dto = new CustomerGoalItemDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setType(type);
		dto.setGoal(goal);
		dto.setMonth(month);
		dto.setCustomerGoalId(customerGoalId);
		dto.setCustomerType(customerType);
		return dto;
	}
}
