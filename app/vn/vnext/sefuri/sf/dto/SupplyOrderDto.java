package vn.vnext.sefuri.sf.dto;


import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "sfr_sf_supply_order")
public class SupplyOrderDto extends BaseDto {
    private int orderItemId;
    private Integer quantity;
    private BigDecimal price;
    private BigDecimal amount;

    //region Transient
    private OrderItemDto orderItemDto;

    @Transient
    public OrderItemDto getOrderItemDto() {
        return orderItemDto;
    }

    public void setOrderItemDto(OrderItemDto orderItemDto) {
        this.orderItemDto = orderItemDto;
    }
    //endregion

    @Basic
    @Column(name = "order_item_id")
    public int getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(int orderItemId) {
        this.orderItemId = orderItemId;
    }

    @Basic
    @Column(name = "quantity")
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "amount")
    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
