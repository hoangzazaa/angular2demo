package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstShippingCostDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain master shipping cost 
 * @author vupt
 */
public class MstShippingCostJson  extends BaseJson<MstShippingCostDto> {

	//distance
	@JsonProperty("distance")
	private Integer distance;

	//weight
	@JsonProperty("weight")
	private Integer weight;

	//cost
	@JsonProperty("cost")
	private BigDecimal cost;

	//factoryId
	@JsonProperty("factoryId")
	private Integer factoryId;


	/**
	 * Get distance
	 *
	 * @return distance
	 */
	public Integer getDistance(){
		return distance;
	}

	/**
	 * Set distance
	 *
	 * @param distance Integer
	 */
	public void setDistance(Integer distance) {
		this.distance = distance;
	}

	/**
	 * Get weight
	 *
	 * @return weight
	 */
	public Integer getWeight(){
		return weight;
	}

	/**
	 * Set weight
	 *
	 * @param weight Integer
	 */
	public void setWeight(Integer weight) {
		this.weight = weight;
	}

	/**
	 * Get cost
	 *
	 * @return cost
	 */
	public BigDecimal getCost(){
		return cost;
	}

	/**
	 * Set cost
	 *
	 * @param cost BigDecimal
	 */
	public void setCost(BigDecimal cost) {
		this.cost = cost;
	}

	/**
	 * Get factoryId
	 *
	 * @return factoryId
	 */
	public Integer getFactoryId(){
		return factoryId;
	}

	/**
	 * Set factoryId
	 *
	 * @param factoryId Integer
	 */
	public void setFactoryId(Integer factoryId) {
		this.factoryId = factoryId;
	}

	/**
	 * Create MstShippingCostJson
	 *
	 * @param dto MstShippingCostDto
	 */

	public void setData(MstShippingCostDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.distance = dto.getDistance();
		this.weight = dto.getWeight();
		this.cost = dto.getCost();
		this.factoryId = dto.getFactoryId();
	}

	/**
	 * Create MstShippingCostDto
	 *
	 * @return MstShippingCostDto
	 */

	public MstShippingCostDto getData(){
		MstShippingCostDto dto = new MstShippingCostDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDistance(distance);
		dto.setWeight(weight);
		dto.setCost(cost);
		dto.setFactoryId(factoryId);
		return dto;
	}
}
