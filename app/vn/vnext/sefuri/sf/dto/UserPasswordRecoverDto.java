package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Contain information of password recovery 
 * @author vupt 
 */
@Entity
@Table(name = "sfr_sf_user_password_recover")
public class UserPasswordRecoverDto extends BaseDto {

	/* tokenKey */
	private String tokenKey;
	/* expiredDate */
	private DateTime expiredDate;
	/* usedFlag */
	private Integer usedFlag = 0;
	/* activatedDate */
	private DateTime activatedDate;
	/* userId */

	private Integer userId;

	/**
	 * Get tokenKey
	 *
	 * @return tokenKey
	 */
	@Basic
	@Column(name = "token_key")
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
	@Basic
	@Column(name = "expired_date")
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
	@Basic
	@Column(name = "used_flag")
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
	@Basic
	@Column(name = "activated_date")
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
	@Basic
	@Column(name = "user_id")
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

}