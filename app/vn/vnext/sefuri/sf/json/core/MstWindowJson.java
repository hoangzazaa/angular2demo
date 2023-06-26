package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstWindowDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain window creating master data used for simulation 
 * @author vupt
 */
public class MstWindowJson  extends BaseJson<MstWindowDto> {

	//寸法
	@JsonProperty("windowSize")
	private Integer windowSize;

	//ロット
	@JsonProperty("windowLot")
	private Integer windowLot;

	//材質
	@JsonProperty("windowMaterial")
	private Integer windowMaterial;

	//準備料
	@JsonProperty("windowPreparationFee")
	private BigDecimal windowPreparationFee;

	//通工賃
	@JsonProperty("windowThroughWage")
	private BigDecimal windowThroughWage;


	/**
	 * Get windowSize
	 *
	 * @return windowSize
	 */
	public Integer getWindowSize(){
		return windowSize;
	}

	/**
	 * Set windowSize
	 *
	 * @param windowSize Integer
	 */
	public void setWindowSize(Integer windowSize) {
		this.windowSize = windowSize;
	}

	/**
	 * Get windowLot
	 *
	 * @return windowLot
	 */
	public Integer getWindowLot(){
		return windowLot;
	}

	/**
	 * Set windowLot
	 *
	 * @param windowLot Integer
	 */
	public void setWindowLot(Integer windowLot) {
		this.windowLot = windowLot;
	}

	/**
	 * Get windowMaterial
	 *
	 * @return windowMaterial
	 */
	public Integer getWindowMaterial(){
		return windowMaterial;
	}

	/**
	 * Set windowMaterial
	 *
	 * @param windowMaterial Integer
	 */
	public void setWindowMaterial(Integer windowMaterial) {
		this.windowMaterial = windowMaterial;
	}

	/**
	 * Get windowPreparationFee
	 *
	 * @return windowPreparationFee
	 */
	public BigDecimal getWindowPreparationFee(){
		return windowPreparationFee;
	}

	/**
	 * Set windowPreparationFee
	 *
	 * @param windowPreparationFee BigDecimal
	 */
	public void setWindowPreparationFee(BigDecimal windowPreparationFee) {
		this.windowPreparationFee = windowPreparationFee;
	}

	/**
	 * Get windowThroughWage
	 *
	 * @return windowThroughWage
	 */
	public BigDecimal getWindowThroughWage(){
		return windowThroughWage;
	}

	/**
	 * Set windowThroughWage
	 *
	 * @param windowThroughWage BigDecimal
	 */
	public void setWindowThroughWage(BigDecimal windowThroughWage) {
		this.windowThroughWage = windowThroughWage;
	}

	/**
	 * Create MstWindowJson
	 *
	 * @param dto MstWindowDto
	 */

	public void setData(MstWindowDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.windowSize = dto.getWindowSize();
		this.windowLot = dto.getWindowLot();
		this.windowMaterial = dto.getWindowMaterial();
		this.windowPreparationFee = dto.getWindowPreparationFee();
		this.windowThroughWage = dto.getWindowThroughWage();
	}

	/**
	 * Create MstWindowDto
	 *
	 * @return MstWindowDto
	 */

	public MstWindowDto getData(){
		MstWindowDto dto = new MstWindowDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setWindowSize(windowSize);
		dto.setWindowLot(windowLot);
		dto.setWindowMaterial(windowMaterial);
		dto.setWindowPreparationFee(windowPreparationFee);
		dto.setWindowThroughWage(windowThroughWage);
		return dto;
	}
}
