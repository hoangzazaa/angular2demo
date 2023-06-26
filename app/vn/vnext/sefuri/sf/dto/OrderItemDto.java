package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain information of item in order
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_order_item")
public class OrderItemDto extends BaseDto {
    /* orderId */
    private Integer orderId;
    /* productId */
    private Integer productId;
    /* quantity */
    private Integer quantity;
    /* 単価 */
    private BigDecimal submittedPrice;
    /* 金額 */
    private BigDecimal total;
    private String orderCode;
    private String orderCode2; /* 多久工場向けorder_code */
    private Integer productionSpecs;
    private Integer printVersion;
    private Integer wooden;
    private Integer mold;
    private String passageOrder;
    private Integer sampleLift;
    private Integer sampleSales;
    private Integer sampleCustomer;
    private Integer sampleItem;
    private Integer sampleProduct;
    private Integer deposit;
    private String  specialNote;

    private String  customerManagedId;


    //region Transient
    private DealDto dealDto;
    private ProductDto productDto;

    @Transient
    public DealDto getDealDto() {
        return dealDto;
    }

    public void setDealDto(DealDto dealDto) {
        this.dealDto = dealDto;
    }

    @Transient
    public ProductDto getProductDto() {
        return productDto;
    }

    public void setProductDto(ProductDto productDto) {
        this.productDto = productDto;
    }

    @Column(name = "special_note")
    public String getSpecialNote() {
        return specialNote;
    }

    public void setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
    }

    //endregion

    /**
     * Get orderId
     *
     * @return orderId
     */
    @Basic
    @Column(name = "order_id")
    public Integer getOrderId() {
        return orderId;
    }

    /**
     * Set orderId
     *
     * @param orderId Integer
     */
    public void setOrderId(Integer orderId) {
        this.orderId = orderId;
    }

    /**
     * Get productId
     *
     * @return productId
     */
    @Basic
    @Column(name = "product_id")
    public Integer getProductId() {
        return productId;
    }

    /**
     * Set productId
     *
     * @param productId Integer
     */
    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    /**
     * Get quantity
     *
     * @return quantity
     */
    @Basic
    @Column(name = "quantity")
    public Integer getQuantity() {
        return quantity;
    }

    /**
     * Set quantity
     *
     * @param quantity Integer
     */
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * Get submittedPrice
     *
     * @return submittedPrice
     */
    @Basic
    @Column(name = "submitted_price")
    public BigDecimal getSubmittedPrice() {
        return submittedPrice;
    }

    /**
     * Set submittedPrice
     *
     * @param submittedPrice BigDecimal
     */
    public void setSubmittedPrice(BigDecimal submittedPrice) {
        this.submittedPrice = submittedPrice;
    }

    /**
     * Get total
     *
     * @return total
     */
    @Basic
    @Column(name = "total")
    public BigDecimal getTotal() {
        return total;
    }

    /**
     * Set total
     *
     * @param total BigDecimal
     */
    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    @Basic
    @Column(name = "order_code")
    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    @Basic
    @Column(name = "order_code2")
    public String getOrderCode2() {
        return orderCode2;
    }

    public void setOrderCode2(String orderCode2) {
        this.orderCode2 = orderCode2;
    }

    @Basic
    @Column(name = "production_specs")
    public Integer getProductionSpecs() {
        return productionSpecs;
    }

    public void setProductionSpecs(Integer productionSpecs) {
        this.productionSpecs = productionSpecs;
    }

    @Basic
    @Column(name = "print_version")
    public Integer getPrintVersion() {
        return printVersion;
    }

    public void setPrintVersion(Integer printVersion) {
        this.printVersion = printVersion;
    }

    @Basic
    @Column(name = "wooden")
    public Integer getWooden() {
        return wooden;
    }

    public void setWooden(Integer wooden) {
        this.wooden = wooden;
    }

    @Basic
    @Column(name = "mold")
    public Integer getMold() {
        return mold;
    }

    public void setMold(Integer mold) {
        this.mold = mold;
    }

    @Basic
    @Column(name = "passage_order")
    public String getPassageOrder() {
        return passageOrder;
    }

    public void setPassageOrder(String passageOrder) {
        this.passageOrder = passageOrder;
    }

    @Basic
    @Column(name = "sample_lift")
    public Integer getSampleLift() {
        return sampleLift;
    }

    public void setSampleLift(Integer sampleLift) {
        this.sampleLift = sampleLift;
    }

    @Basic
    @Column(name = "sample_sales")
    public Integer getSampleSales() {
        return sampleSales;
    }

    public void setSampleSales(Integer sampleSales) {
        this.sampleSales = sampleSales;
    }

    @Basic
    @Column(name = "sample_customer")
    public Integer getSampleCustomer() {
        return sampleCustomer;
    }

    public void setSampleCustomer(Integer sampleCustomer) {
        this.sampleCustomer = sampleCustomer;
    }

    @Basic
    @Column(name = "sample_item")
    public Integer getSampleItem() {
        return sampleItem;
    }

    public void setSampleItem(Integer sampleItem) {
        this.sampleItem = sampleItem;
    }

    @Basic
    @Column(name = "sample_product")
    public Integer getSampleProduct() {
        return sampleProduct;
    }

    public void setSampleProduct(Integer sampleProduct) {
        this.sampleProduct = sampleProduct;
    }

    @Basic
    @Column(name = "deposit")
    public Integer getDeposit() {
        return deposit;
    }

    public void setDeposit(Integer deposit) {
        this.deposit = deposit;
    }

    @Basic
    @Column(name = "customer_managed_id")
    public String getCustomerManagedId() {
        return customerManagedId;
    }

    public void setCustomerManagedId(String customerManagedId) {
        this.customerManagedId = customerManagedId;
    }

}
