package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain all order
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_order")
public class OrderDto extends BaseDto {

	/* dealId */

    private Integer dealId;
    /* orderRsOrderItem */
    private List<OrderItemDto> orderItems;
    /* dealRsOrder */
    private DealDto deal;


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
     * Get orderItems
     *
     * @return orderItems
     */
    @Transient
    public List<OrderItemDto> getOrderItems() {
        return orderItems;
    }

    /**
     * Set orderItems
     *
     * @param orderItems List<OrderItemDto>
     */
    public void setOrderItems(List<OrderItemDto> orderItems) {
        this.orderItems = orderItems;
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