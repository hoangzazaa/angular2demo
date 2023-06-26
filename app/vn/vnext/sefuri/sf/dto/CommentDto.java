package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain comments of user for each deal
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_comment")
public class CommentDto extends BaseDto {

    /* 活動状況 */
    private String value;
    /* userId */
    private Integer userId;
    /* dealId */

    private Integer dealId;
    /* dealRsComment */
    private DealDto deal;
    /* userRsComment */
    private UserDto user;

    // レコードの情報タイプのフラグ
    // 0: 活動状況, 1: 見積書提出, 2: 設計依頼, 3: 通常サンプル依頼, 4: 一時包装サンプル依頼, 5: デザイン依頼, 6: 版下依頼, 7: ダミー作成依頼
    // not null, default 0
    private Integer commentType;

    // タイトル
    private String title;

    /**
     * Get value
     *
     * @return value
     */
    @Basic
    @Column(name = "value")
    public String getValue() {
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

    @Basic
    @Column(name = "comment_type")
    public Integer getCommentType() {
        return commentType;
    }

    public void setCommentType(Integer commentType) {
        this.commentType = commentType;
    }

    @Basic
    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
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
}