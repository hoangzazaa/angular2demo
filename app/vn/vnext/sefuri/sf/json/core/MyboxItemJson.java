package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain all information of items included in my box 
 * @author vupt
 */
public class MyboxItemJson  extends BaseJson<MyboxItemDto> {

	//userId
	@JsonProperty("userId")
	private Integer userId;

	//dealId
	@JsonProperty("dealId")
	private Integer dealId;

	//userRsMyboxItem
	@JsonProperty("user")
	private UserJson user;

	//dealRsMyboxItem
	@JsonProperty("deal")
	private DealJson deal;


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
	 * Create MyboxItemJson
	 *
	 * @param dto MyboxItemDto
	 */

	public void setData(MyboxItemDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.userId = dto.getUserId();
		this.dealId = dto.getDealId();
		this.user = new UserJson();
		this.user.setId(dto.getUserId());
		this.deal = new DealJson();
		this.deal.setId(dto.getDealId());
	}

	/**
	 * Create MyboxItemDto
	 *
	 * @return MyboxItemDto
	 */

	public MyboxItemDto getData(){
		MyboxItemDto dto = new MyboxItemDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setUserId(userId);
		dto.setDealId(dealId);
		return dto;
	}
}
