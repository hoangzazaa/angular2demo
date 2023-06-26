package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.*;

/**
 * Contain balance of stock (imported by batch)
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_inventory")
public class InventoryDto extends BaseDto {

    private Integer inoutSeq;
    private DateTime registrationDate;
    private int inoutFlag;
    private String warehouseCode;
    private String destWarehouseCode;
    private Integer shippingPlanId;
    private Integer orderItemId;
    private String shelfNo;
    private int quantity;
    private int completeFlag;

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
    @Column(name = "inout_seq")
    public Integer getInoutSeq() {
        return inoutSeq;
    }

    public void setInoutSeq(Integer inoutSeq) {
        this.inoutSeq = inoutSeq;
    }

    @Basic
    @Column(name = "registration_date")
    public DateTime getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(DateTime registrationDate) {
        this.registrationDate = registrationDate;
    }

    @Basic
    @Column(name = "inout_flag")
    public int getInoutFlag() {
        return inoutFlag;
    }

    public void setInoutFlag(int inoutFlag) {
        this.inoutFlag = inoutFlag;
    }

    @Basic
    @Column(name = "warehouse_code")
    public String getWarehouseCode() {
        return warehouseCode;
    }

    public void setWarehouseCode(String warehouseCode) {
        this.warehouseCode = warehouseCode;
    }

    @Basic
    @Column(name = "dest_warehouse_code")
    public String getDestWarehouseCode() {
        return destWarehouseCode;
    }

    public void setDestWarehouseCode(String destWarehouseCode) {
        this.destWarehouseCode = destWarehouseCode;
    }

    @Basic
    @Column(name = "shipping_plan_id")
    public Integer getShippingPlanId() {
        return shippingPlanId;
    }

    public void setShippingPlanId(Integer shippingPlanId) {
        this.shippingPlanId = shippingPlanId;
    }

    @Basic
    @Column(name = "order_item_id")
    public Integer getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    @Basic
    @Column(name = "shelf_no")
    public String getShelfNo() {
        return shelfNo;
    }

    public void setShelfNo(String shelfNo) {
        this.shelfNo = shelfNo;
    }

    @Basic
    @Column(name = "quantity")
    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "complete_flag")
    public int getCompleteFlag() {
        return completeFlag;
    }

    public void setCompleteFlag(int completeFlag) {
        this.completeFlag = completeFlag;
    }
}