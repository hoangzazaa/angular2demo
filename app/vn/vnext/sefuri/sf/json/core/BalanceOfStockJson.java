package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.BalanceOfStockDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain balance of stock (imported by batch) 
 * @author vupt
 */
public class BalanceOfStockJson  extends BaseJson<BalanceOfStockDto> {

	//dennoProductCode
	@JsonProperty("dennoProductCode")
	private String dennoProductCode;

	//value
	@JsonProperty("value")
	private Integer value;

	//type
	@JsonProperty("type")
	private Integer type;


	/**
	 * Get dennoProductCode
	 *
	 * @return dennoProductCode
	 */
	public String getDennoProductCode(){
		return dennoProductCode;
	}

	/**
	 * Set dennoProductCode
	 *
	 * @param dennoProductCode String
	 */
	public void setDennoProductCode(String dennoProductCode) {
		this.dennoProductCode = dennoProductCode;
	}

	/**
	 * Get value
	 *
	 * @return value
	 */
	public Integer getValue(){
		return value;
	}

	/**
	 * Set value
	 *
	 * @param value Integer
	 */
	public void setValue(Integer value) {
		this.value = value;
	}

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
	 * Create BalanceOfStockJson
	 *
	 * @param dto BalanceOfStockDto
	 */

	public void setData(BalanceOfStockDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.dennoProductCode = dto.getDennoProductCode();
		this.value = dto.getValue();
		this.type = dto.getType();
	}

	/**
	 * Create BalanceOfStockDto
	 *
	 * @return BalanceOfStockDto
	 */

	public BalanceOfStockDto getData(){
		BalanceOfStockDto dto = new BalanceOfStockDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDennoProductCode(dennoProductCode);
		dto.setValue(value);
		dto.setType(type);
		return dto;
	}
}
