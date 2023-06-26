package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstDieCuttingDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain die cutting master data used for simulation 
 * @author vupt
 */
public class MstDieCuttingJson  extends BaseJson<MstDieCuttingDto> {

	//板紙種類
	@JsonProperty("paperboardType")
	private Integer paperboardType;

	//サイズ 
	@JsonProperty("size")
	private Integer size;

	//面付
	@JsonProperty("impositionNumber")
	private Integer impositionNumber;

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
	 * Get paperboardType
	 *
	 * @return paperboardType
	 */
	public Integer getPaperboardType(){
		return paperboardType;
	}

	/**
	 * Set paperboardType
	 *
	 * @param paperboardType Integer
	 */
	public void setPaperboardType(Integer paperboardType) {
		this.paperboardType = paperboardType;
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
	 * Get impositionNumber
	 *
	 * @return impositionNumber
	 */
	public Integer getImpositionNumber(){
		return impositionNumber;
	}

	/**
	 * Set impositionNumber
	 *
	 * @param impositionNumber Integer
	 */
	public void setImpositionNumber(Integer impositionNumber) {
		this.impositionNumber = impositionNumber;
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
	 * Create MstDieCuttingJson
	 *
	 * @param dto MstDieCuttingDto
	 */

	public void setData(MstDieCuttingDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.paperboardType = dto.getPaperboardType();
		this.size = dto.getSize();
		this.impositionNumber = dto.getImpositionNumber();
		this.throughNumber = dto.getThroughNumber();
		this.basicCost = dto.getBasicCost();
		this.throughWage = dto.getThroughWage();
	}

	/**
	 * Create MstDieCuttingDto
	 *
	 * @return MstDieCuttingDto
	 */

	public MstDieCuttingDto getData(){
		MstDieCuttingDto dto = new MstDieCuttingDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setPaperboardType(paperboardType);
		dto.setSize(size);
		dto.setImpositionNumber(impositionNumber);
		dto.setThroughNumber(throughNumber);
		dto.setBasicCost(basicCost);
		dto.setThroughWage(throughWage);
		return dto;
	}
}
