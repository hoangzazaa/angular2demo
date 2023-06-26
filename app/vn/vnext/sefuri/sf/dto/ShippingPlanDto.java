package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.*;

/**
 * Created by manhnv on 7/18/2017.
 */
@Entity
@Table(name = "sfr_sf_shipping_plan")
public class ShippingPlanDto extends BaseDto {
    /*order_item_id*/
    private Integer orderItemId;
    /*no*/
    private Integer no;
    /* shipping_date */
    private DateTime shippingDate;
    /* delivery_date */
    private DateTime deliveryDate;
    /*loading_address_id*/
    private Integer loadingAddressId;
    private String loadingAddressName;
    /*quantity*/
    private Integer quantity;
    /*shipping_company*/
    private Integer shippingCompany;
    /* specify_time */
    private Integer specifyTime;
    private String specifyTimeName;
    /* specify_time_hour */
    private Integer specifyTimeHour;
    /* specify_time_minute */
    private Integer specifyTimeMinute;
    /* specify_time_period */
    private Integer specifyTimePeriod;
    /*destination_id*/
    private Integer destinationId;

    private OrderItemDto orderItem;
    private LoadingAddressDto loadingAddress;
    private ShippingDestinationDto shippingDestination;

    @Basic
    @Column(name = "order_item_id")
    public Integer getOrderItemId() {
        return orderItemId;
    }

    public void setOrderItemId(final Integer orderItemId) {
        this.orderItemId = orderItemId;
    }

    @Basic
    @Column(name = "no")
    public Integer getNo() {
        return no;
    }

    public void setNo(final Integer no) {
        this.no = no;
    }

    @Basic
    @Column(name = "shipping_date")
    public DateTime getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(final DateTime shippingDate) {
        this.shippingDate = shippingDate;
    }

    @Basic
    @Column(name = "delivery_date")
    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(final DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    @Basic
    @Column(name = "loading_address_id")
    public Integer getLoadingAddressId() {
        return loadingAddressId;
    }

    public void setLoadingAddressId(final Integer loadingAddressId) {
        this.loadingAddressId = loadingAddressId;
    }

    @Basic
    @Column(name = "loading_address_name")
    public String getLoadingAddressName() {
        return loadingAddressName;
    }

    public void setLoadingAddressName(String loadingAddressName) {
        this.loadingAddressName = loadingAddressName;
    }

    @Basic
    @Column(name = "quantity")
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(final Integer quantity) {
        this.quantity = quantity;
    }

    @Basic
    @Column(name = "shipping_company")
    public Integer getShippingCompany() {
        return shippingCompany;
    }

    public void setShippingCompany(final Integer shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    @Basic
    @Column(name = "specify_time")
    public Integer getSpecifyTime() {
        return specifyTime;
    }

    public void setSpecifyTime(final Integer specifyTime) {
        this.specifyTime = specifyTime;
    }

    @Basic
    @Column(name = "specify_time_name")
    public String getSpecifyTimeName() {
        return specifyTimeName;
    }

    public void setSpecifyTimeName(String specifyTimeName) {
        this.specifyTimeName = specifyTimeName;
    }

    @Basic
    @Column(name = "specify_time_hour")
    public Integer getSpecifyTimeHour() {
        return specifyTimeHour;
    }

    public void setSpecifyTimeHour(final Integer specifyTimeHour) {
        this.specifyTimeHour = specifyTimeHour;
    }

    @Basic
    @Column(name = "specify_time_minute")
    public Integer getSpecifyTimeMinute() {
        return specifyTimeMinute;
    }

    public void setSpecifyTimeMinute(final Integer specifyTimeMinute) {
        this.specifyTimeMinute = specifyTimeMinute;
    }

    @Basic
    @Column(name = "specify_time_period")
    public Integer getSpecifyTimePeriod() {
        return specifyTimePeriod;
    }

    public void setSpecifyTimePeriod(final Integer specifyTimePeriod) {
        this.specifyTimePeriod = specifyTimePeriod;
    }

    @Basic
    @Column(name = "destination_id")
    public Integer getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(final Integer destinationId) {
        this.destinationId = destinationId;
    }

    @Transient
    public OrderItemDto getOrderItem() {
        return orderItem;
    }

    public void setOrderItem(final OrderItemDto orderItem) {
        this.orderItem = orderItem;
    }

    @Transient
    public LoadingAddressDto getLoadingAddress() {
        return loadingAddress;
    }

    public void setLoadingAddress(final LoadingAddressDto loadingAddress) {
        this.loadingAddress = loadingAddress;
    }

    @Transient
    public ShippingDestinationDto getShippingDestination() {
        return shippingDestination;
    }

    public void setShippingDestination(final ShippingDestinationDto shippingDestination) {
        this.shippingDestination = shippingDestination;
    }
}
