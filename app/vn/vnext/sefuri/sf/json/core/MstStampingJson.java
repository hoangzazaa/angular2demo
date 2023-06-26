package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstStampingDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain stamping master data used for simulation 
 * @author vupt
 */
public class MstStampingJson  extends BaseJson<MstStampingDto> {

	//加工種類
	@JsonProperty("processingType")
	private Integer processingType;

	//ﾌﾞﾗﾝｸ
	@JsonProperty("blank")
	private Integer blank;

	//基本料
	@JsonProperty("basicCost")
	private BigDecimal basicCost;

	//工賃
	@JsonProperty("throughWage")
	private BigDecimal throughWage;


	/**
	 * Get processingType
	 *
	 * @return processingType
	 */
	public Integer getProcessingType(){
		return processingType;
	}

	/**
	 * Set processingType
	 *
	 * @param processingType Integer
	 */
	public void setProcessingType(Integer processingType) {
		this.processingType = processingType;
	}

	/**
	 * Get blank
	 *
	 * @return blank
	 */
	public Integer getBlank(){
		return blank;
	}

	/**
	 * Set blank
	 *
	 * @param blank Integer
	 */
	public void setBlank(Integer blank) {
		this.blank = blank;
	}

	/**
	 * Get basicCost
	 *
	 * @return basicCost
	 */
	public BigDecimal getBasicCost(){
		return basicCost;
	}

	/**
	 * Set basicCost
	 *
	 * @param basicCost BigDecimal
	 */
	public void setBasicCost(BigDecimal basicCost) {
		this.basicCost = basicCost;
	}

	/**
	 * Get throughWage
	 *
	 * @return throughWage
	 */
	public BigDecimal getThroughWage(){
		return throughWage;
	}

	/**
	 * Set throughWage
	 *
	 * @param throughWage BigDecimal
	 */
	public void setThroughWage(BigDecimal throughWage) {
		this.throughWage = throughWage;
	}

	/**
	 * Create MstStampingJson
	 *
	 * @param dto MstStampingDto
	 */

	public void setData(MstStampingDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.processingType = dto.getProcessingType();
		this.blank = dto.getBlank();
		this.basicCost = dto.getBasicCost();
		this.throughWage = dto.getThroughWage();
	}

	/**
	 * Create MstStampingDto
	 *
	 * @return MstStampingDto
	 */

	public MstStampingDto getData(){
		MstStampingDto dto = new MstStampingDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setProcessingType(processingType);
		dto.setBlank(blank);
		dto.setBasicCost(basicCost);
		dto.setThroughWage(throughWage);
		return dto;
	}
}
