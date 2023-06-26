package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstPackingDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain packing master data used for simulation 
 * @author vupt
 */
public class MstPackingJson  extends BaseJson<MstPackingDto> {

	//方法
	@JsonProperty("method")
	private Integer method;

	//ロット
	@JsonProperty("lot")
	private Integer lot;

	//％
	@JsonProperty("percent")
	private BigDecimal percent;


	/**
	 * Get method
	 *
	 * @return method
	 */
	public Integer getMethod(){
		return method;
	}

	/**
	 * Set method
	 *
	 * @param method Integer
	 */
	public void setMethod(Integer method) {
		this.method = method;
	}

	/**
	 * Get lot
	 *
	 * @return lot
	 */
	public Integer getLot(){
		return lot;
	}

	/**
	 * Set lot
	 *
	 * @param lot Integer
	 */
	public void setLot(Integer lot) {
		this.lot = lot;
	}

	/**
	 * Get percent
	 *
	 * @return percent
	 */
	public BigDecimal getPercent(){
		return percent;
	}

	/**
	 * Set percent
	 *
	 * @param percent BigDecimal
	 */
	public void setPercent(BigDecimal percent) {
		this.percent = percent;
	}

	/**
	 * Create MstPackingJson
	 *
	 * @param dto MstPackingDto
	 */

	public void setData(MstPackingDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.method = dto.getMethod();
		this.lot = dto.getLot();
		this.percent = dto.getPercent();
	}

	/**
	 * Create MstPackingDto
	 *
	 * @return MstPackingDto
	 */

	public MstPackingDto getData(){
		MstPackingDto dto = new MstPackingDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setMethod(method);
		dto.setLot(lot);
		dto.setPercent(percent);
		return dto;
	}
}
