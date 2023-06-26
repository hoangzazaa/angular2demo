package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstPasteDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain paste master data used for simulation 
 * @author vupt
 */
public class MstPasteJson  extends BaseJson<MstPasteDto> {

	//紙種類
	@JsonProperty("paperType")
	private Integer paperType;

	//ロット
	@JsonProperty("form")
	private Integer form;

	//ﾌﾞﾗﾝｸｻｲｽﾞ
	@JsonProperty("blankSize")
	private Integer blankSize;

	//基本料
	@JsonProperty("basicCost")
	private BigDecimal basicCost;

	//工賃
	@JsonProperty("throughWage")
	private BigDecimal throughWage;


	/**
	 * Get paperType
	 *
	 * @return paperType
	 */
	public Integer getPaperType(){
		return paperType;
	}

	/**
	 * Set paperType
	 *
	 * @param paperType Integer
	 */
	public void setPaperType(Integer paperType) {
		this.paperType = paperType;
	}

	/**
	 * Get form
	 *
	 * @return form
	 */
	public Integer getForm(){
		return form;
	}

	/**
	 * Set form
	 *
	 * @param form Integer
	 */
	public void setForm(Integer form) {
		this.form = form;
	}

	/**
	 * Get blankSize
	 *
	 * @return blankSize
	 */
	public Integer getBlankSize(){
		return blankSize;
	}

	/**
	 * Set blankSize
	 *
	 * @param blankSize Integer
	 */
	public void setBlankSize(Integer blankSize) {
		this.blankSize = blankSize;
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
	 * Create MstPasteJson
	 *
	 * @param dto MstPasteDto
	 */

	public void setData(MstPasteDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.paperType = dto.getPaperType();
		this.form = dto.getForm();
		this.blankSize = dto.getBlankSize();
		this.basicCost = dto.getBasicCost();
		this.throughWage = dto.getThroughWage();
	}

	/**
	 * Create MstPasteDto
	 *
	 * @return MstPasteDto
	 */

	public MstPasteDto getData(){
		MstPasteDto dto = new MstPasteDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setPaperType(paperType);
		dto.setForm(form);
		dto.setBlankSize(blankSize);
		dto.setBasicCost(basicCost);
		dto.setThroughWage(throughWage);
		return dto;
	}
}
