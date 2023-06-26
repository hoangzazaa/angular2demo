package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.UserPasswordRecoverDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain information of password recovery 
 * @author vupt
 */
public class UserPasswordRecoverJson  extends BaseJson<UserPasswordRecoverDto> {

	//tokenKey
	@JsonProperty("tokenKey")
	private String tokenKey;

	//expiredDate
	@JsonProperty("expiredDate")
	private DateTime expiredDate;

	//usedFlag
	@JsonProperty("usedFlag")
	private Integer usedFlag;

	//activatedDate
	@JsonProperty("activatedDate")
	private DateTime activatedDate;

	//userId
	@JsonProperty("userId")
	private Integer userId;


	/**
	 * Get tokenKey
	 *
	 * @return tokenKey
	 */
	public String getTokenKey(){
		return tokenKey;
	}

	/**
	 * Set tokenKey
	 *
	 * @param tokenKey String
	 */
	public void setTokenKey(String tokenKey) {
		this.tokenKey = tokenKey;
	}

	/**
	 * Get expiredDate
	 *
	 * @return expiredDate
	 */
	public DateTime getExpiredDate(){
		return expiredDate;
	}

	/**
	 * Set expiredDate
	 *
	 * @param expiredDate DateTime
	 */
	public void setExpiredDate(DateTime expiredDate) {
		this.expiredDate = expiredDate;
	}

	/**
	 * Get usedFlag
	 *
	 * @return usedFlag
	 */
	public Integer getUsedFlag(){
		return usedFlag;
	}

	/**
	 * Set usedFlag
	 *
	 * @param usedFlag Integer
	 */
	public void setUsedFlag(Integer usedFlag) {
		this.usedFlag = usedFlag;
	}

	/**
	 * Get activatedDate
	 *
	 * @return activatedDate
	 */
	public DateTime getActivatedDate(){
		return activatedDate;
	}

	/**
	 * Set activatedDate
	 *
	 * @param activatedDate DateTime
	 */
	public void setActivatedDate(DateTime activatedDate) {
		this.activatedDate = activatedDate;
	}

	/**
	 * Get userId
	 *
	 * @return userId
	 */
	public Integer getUserId(){
		return userId;
	}

	/**
	 * Set userId
	 *
	 * @param userId Integer
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * Create UserPasswordRecoverJson
	 *
	 * @param dto UserPasswordRecoverDto
	 */

	public void setData(UserPasswordRecoverDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.tokenKey = dto.getTokenKey();
		this.expiredDate = dto.getExpiredDate();
		this.usedFlag = dto.getUsedFlag();
		this.activatedDate = dto.getActivatedDate();
		this.userId = dto.getUserId();
	}

	/**
	 * Create UserPasswordRecoverDto
	 *
	 * @return UserPasswordRecoverDto
	 */

	public UserPasswordRecoverDto getData(){
		UserPasswordRecoverDto dto = new UserPasswordRecoverDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setTokenKey(tokenKey);
		dto.setExpiredDate(expiredDate);
		dto.setUsedFlag(usedFlag);
		dto.setActivatedDate(activatedDate);
		dto.setUserId(userId);
		return dto;
	}
}
