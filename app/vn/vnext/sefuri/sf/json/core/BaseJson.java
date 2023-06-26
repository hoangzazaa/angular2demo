package vn.vnext.sefuri.sf.json.core;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.BaseDto;

/**
 * Contain common columns used in all table
 *
 * 対応する TypeScript は client/src/app/model/core/BaseModel.model.ts
 * @author vupt
 */
public abstract class BaseJson<T extends BaseDto> {

	//id
	@JsonProperty("id")
	protected Integer id;

	//createdUser
	@JsonProperty("createdUser")
	protected Integer createdUser;

	//updatedUser
	@JsonProperty("updatedUser")
	protected Integer updatedUser;

	//createdDate
	@JsonProperty("createdDate")
	protected DateTime createdDate;

	//updatedDate
	@JsonProperty("updatedDate")
	protected DateTime updatedDate;


	/**
	 * Get id
	 *
	 * @return id
	 */
	public Integer getId(){
		return id;
	}

	/**
	 * Set id
	 *
	 * @param id Integer
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Get createdUser
	 *
	 * @return createdUser
	 */
	public Integer getCreatedUser(){
		return createdUser;
	}

	/**
	 * Set createdUser
	 *
	 * @param createdUser Integer
	 */
	public void setCreatedUser(Integer createdUser) {
		this.createdUser = createdUser;
	}

	/**
	 * Get updatedUser
	 *
	 * @return updatedUser
	 */
	public Integer getUpdatedUser(){
		return updatedUser;
	}

	/**
	 * Set updatedUser
	 *
	 * @param updatedUser Integer
	 */
	public void setUpdatedUser(Integer updatedUser) {
		this.updatedUser = updatedUser;
	}

	/**
	 * Get createdDate
	 *
	 * @return createdDate
	 */
	public DateTime getCreatedDate(){
		return createdDate;
	}

	/**
	 * Set createdDate
	 *
	 * @param createdDate DateTime
	 */
	public void setCreatedDate(DateTime createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Get updatedDate
	 *
	 * @return updatedDate
	 */
	public DateTime getUpdatedDate(){
		return updatedDate;
	}

	/**
	 * Set updatedDate
	 *
	 * @param updatedDate DateTime
	 */
	public void setUpdatedDate(DateTime updatedDate) {
		this.updatedDate = updatedDate;
	}
	public abstract void setData(T dataDto);

	@JsonIgnore
	public abstract T getData();
}
