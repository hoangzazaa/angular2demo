package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain master wooden 
 * @author vupt
 */
public class MstWoodenJson  extends BaseJson<MstWoodenDto> {

	//woodenCode
	@JsonProperty("woodenCode")
	private String woodenCode;

	//woodenTotalNumber
	@JsonProperty("woodenTotalNumber")
	private BigDecimal woodenTotalNumber;

	//woodenExpiredDate
	@JsonProperty("woodenExpiredDate")
	private DateTime woodenExpiredDate;


	/**
	 * Get woodenCode
	 *
	 * @return woodenCode
	 */
	public String getWoodenCode(){
		return woodenCode;
	}

	/**
	 * Set woodenCode
	 *
	 * @param woodenCode String
	 */
	public void setWoodenCode(String woodenCode) {
		this.woodenCode = woodenCode;
	}

	/**
	 * Get woodenTotalNumber
	 *
	 * @return woodenTotalNumber
	 */
	public BigDecimal getWoodenTotalNumber(){
		return woodenTotalNumber;
	}

	/**
	 * Set woodenTotalNumber
	 *
	 * @param woodenTotalNumber BigDecimal
	 */
	public void setWoodenTotalNumber(BigDecimal woodenTotalNumber) {
		this.woodenTotalNumber = woodenTotalNumber;
	}

	/**
	 * Get woodenExpiredDate
	 *
	 * @return woodenExpiredDate
	 */
	public DateTime getWoodenExpiredDate(){
		return woodenExpiredDate;
	}

	/**
	 * Set woodenExpiredDate
	 *
	 * @param woodenExpiredDate DateTime
	 */
	public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
		this.woodenExpiredDate = woodenExpiredDate;
	}

	/**
	 * Create MstWoodenJson
	 *
	 * @param dto MstWoodenDto
	 */

	public void setData(MstWoodenDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.woodenCode = dto.getWoodenCode();
		this.woodenTotalNumber = dto.getWoodenTotalNumber();
		this.woodenExpiredDate = dto.getWoodenExpiredDate();
	}

	/**
	 * Create MstWoodenDto
	 *
	 * @return MstWoodenDto
	 */

	public MstWoodenDto getData(){
		MstWoodenDto dto = new MstWoodenDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setWoodenCode(woodenCode);
		dto.setWoodenTotalNumber(woodenTotalNumber);
		dto.setWoodenExpiredDate(woodenExpiredDate);
		return dto;
	}
}
