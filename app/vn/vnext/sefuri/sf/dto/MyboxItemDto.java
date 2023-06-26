package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain all information of items included in my box
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mybox_item")
public class MyboxItemDto extends BaseDto {

    /* userId */
    private Integer userId;
    /* dealId */

    private Integer dealId;
    /* userRsMyboxItem */
    private UserDto user;
    /* dealRsMyboxItem */
    private DealDto deal;

    /**
     * Get userId
     *
     * @return userId
     */
    @Basic
    @Column(name = "user_id")
    public Integer getUserId() {
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
    @Basic
    @Column(name = "deal_id")
    public Integer getDealId() {
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
    @Transient
    public UserDto getUser() {
        return user;
    }

    /**
     * Set user
     *
     * @param user UserDto
     */
    public void setUser(UserDto user) {
        this.user = user;
    }

    /**
     * Get deal
     *
     * @return deal
     */
    @Transient
    public DealDto getDeal() {
        return deal;
    }

    /**
     * Set deal
     *
     * @param deal DealDto
     */
    public void setDeal(DealDto deal) {
        this.deal = deal;
    }

}