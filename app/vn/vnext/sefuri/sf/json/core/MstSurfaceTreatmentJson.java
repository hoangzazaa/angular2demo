package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstSurfaceTreatmentDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain surface master data used for simulation 
 * @author vupt
 */
public class MstSurfaceTreatmentJson  extends BaseJson<MstSurfaceTreatmentDto> {

	//板紙種類
	@JsonProperty("varnishType")
	private Integer varnishType;

	//サイズ 
	@JsonProperty("size")
	private Integer size;

	//通数
	@JsonProperty("throughNumber")
	private Integer throughNumber;

	//基本料
	@JsonProperty("basicCost")
	private BigDecimal basicCost;

	//通工賃
	@JsonProperty("throughWage")
	private BigDecimal throughWage;


	/**
	 * Get varnishType
	 *
	 * @return varnishType
	 */
	public Integer getVarnishType(){
		return varnishType;
	}

	/**
	 * Set varnishType
	 *
	 * @param varnishType Integer
	 */
	public void setVarnishType(Integer varnishType) {
		this.varnishType = varnishType;
	}

	/**
	 * Get size
	 *
	 * @return size
	 */
	public Integer getSize(){
		return size;
	}

	/**
	 * Set size
	 *
	 * @param size Integer
	 */
	public void setSize(Integer size) {
		this.size = size;
	}

	/**
	 * Get throughNumber
	 *
	 * @return throughNumber
	 */
	public Integer getThroughNumber(){
		return throughNumber;
	}

	/**
	 * Set throughNumber
	 *
	 * @param throughNumber Integer
	 */
	public void setThroughNumber(Integer throughNumber) {
		this.throughNumber = throughNumber;
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
	 * Create MstSurfaceTreatmentJson
	 *
	 * @param dto MstSurfaceTreatmentDto
	 */

	public void setData(MstSurfaceTreatmentDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.varnishType = dto.getVarnishType();
		this.size = dto.getSize();
		this.throughNumber = dto.getThroughNumber();
		this.basicCost = dto.getBasicCost();
		this.throughWage = dto.getThroughWage();
	}

	/**
	 * Create MstSurfaceTreatmentDto
	 *
	 * @return MstSurfaceTreatmentDto
	 */

	public MstSurfaceTreatmentDto getData(){
		MstSurfaceTreatmentDto dto = new MstSurfaceTreatmentDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setVarnishType(varnishType);
		dto.setSize(size);
		dto.setThroughNumber(throughNumber);
		dto.setBasicCost(basicCost);
		dto.setThroughWage(throughWage);
		return dto;
	}
}
