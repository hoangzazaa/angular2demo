package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstShippingCompanyDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain master shipping company 
 * @author vupt
 */
public class MstShippingCompanyJson  extends BaseJson<MstShippingCompanyDto> {

	//companyId
	@JsonProperty("companyId")
	private Integer companyId;

	//companyName
	@JsonProperty("companyName")
	private String companyName;


	/**
	 * Get companyId
	 *
	 * @return companyId
	 */
	public Integer getCompanyId(){
		return companyId;
	}

	/**
	 * Set companyId
	 *
	 * @param companyId Integer
	 */
	public void setCompanyId(Integer companyId) {
		this.companyId = companyId;
	}

	/**
	 * Get companyName
	 *
	 * @return companyName
	 */
	public String getCompanyName(){
		return companyName;
	}

	/**
	 * Set companyName
	 *
	 * @param companyName String
	 */
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	/**
	 * Create MstShippingCompanyJson
	 *
	 * @param dto MstShippingCompanyDto
	 */

	public void setData(MstShippingCompanyDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.companyId = dto.getCompanyId();
		this.companyName = dto.getCompanyName();
	}

	/**
	 * Create MstShippingCompanyDto
	 *
	 * @return MstShippingCompanyDto
	 */

	public MstShippingCompanyDto getData(){
		MstShippingCompanyDto dto = new MstShippingCompanyDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setCompanyId(companyId);
		dto.setCompanyName(companyName);
		return dto;
	}
}
