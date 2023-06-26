package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.CommentDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain comments of user for each deal 
 * @author vupt
 */
public class CommentJson  extends BaseJson<CommentDto> {

	//活動状況
	@JsonProperty("value")
	private String value;

	//userId
	@JsonProperty("userId")
	private Integer userId;

	//dealId
	@JsonProperty("dealId")
	private Integer dealId;

	//dealRsComment
	@JsonProperty("deal")
	private DealJson deal;

	//userRsComment
	@JsonProperty("user")
	private UserJson user;


	/**
	 * Get value
	 *
	 * @return value
	 */
	public String getValue(){
		return value;
	}

	/**
	 * Set value
	 *
	 * @param value String
	 */
	public void setValue(String value) {
		this.value = value;
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
	 * Get dealId
	 *
	 * @return dealId
	 */
	public Integer getDealId(){
		return dealId;
	}

	/**
	 * Set dealId
	 *
	 * @param dealId Integer
	 */
	public void setDealId(Integer dealId) {
		this.dealId = dealId;
	}

	/**
	 * Get deal
	 *
	 * @return deal
	 */
	public DealJson getDeal(){
		return deal;
	}

	/**
	 * Set deal
	 *
	 * @param deal DealJson
	 */
	public void setDeal(DealJson deal) {
		this.deal = deal;
	}

	/**
	 * Get user
	 *
	 * @return user
	 */
	public UserJson getUser(){
		return user;
	}

	/**
	 * Set user
	 *
	 * @param user UserJson
	 */
	public void setUser(UserJson user) {
		this.user = user;
	}

	/**
	 * Create CommentJson
	 *
	 * @param dto CommentDto
	 */

	public void setData(CommentDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.value = dto.getValue();
		this.userId = dto.getUserId();
		this.dealId = dto.getDealId();
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
		this.user = new UserJson();
		this.user.setId(dto.getUserId());
	}

	/**
	 * Create CommentDto
	 *
	 * @return CommentDto
	 */

	public CommentDto getData(){
		CommentDto dto = new CommentDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setValue(value);
		dto.setUserId(userId);
		dto.setDealId(dealId);
		return dto;
	}
}
