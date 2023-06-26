package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain revenue imported by batch
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_revenue")
public class RevenueDto extends BaseDto {

    /* 売上SEQ */
    private Integer salesSeq;
    /* 受注番号 */
    private String orderCode;
    /* 電脳得意先C */
    private String dennoCustomerCode;
    /* 売上日 */
    private DateTime salesDate;
    /* 請求売上日 */
    private DateTime invoiceSalesDate;
    /* 売上区分 */
    private Integer salesCategory;
    /* 売上金額 */
    private BigDecimal salesAmount;
    /* 営業部署 */
    private String departmentCode;
    /* 担当営業 */
    private String salesRep;
    /* 売上数 */
    private BigDecimal salesNumber;
    /* 売上単価 */
    private BigDecimal salesUnitPrice;
    /* 製造依頼先 */
    private String manufactureRequest;
    /* 電脳品目コード */
    private String itemCode;
    /* 製品名 */
    private String productName;
    /* productType */
    private Integer productType;
    /* salesSeq2 */
    private Integer salesSeq2;

    //region Transient
    private OrderItemDto orderItemDto;
    private CustomerDto customerDto;
    private ProductDto productDto;

    @Transient
    public OrderItemDto getOrderItemDto() {
        return orderItemDto;
    }

    public void setOrderItemDto(OrderItemDto orderItemDto) {
        this.orderItemDto = orderItemDto;
    }

    @Transient
    public CustomerDto getCustomerDto() {
        return customerDto;
    }

    public void setCustomerDto(CustomerDto customerDto) {
        this.customerDto = customerDto;
    }

    @Transient
    public ProductDto getProductDto() {
        return productDto;
    }

    public void setProductDto(ProductDto productDto) {
        this.productDto = productDto;
    }

//endregion

    /**
     * Get salesSeq
     *
     * @return salesSeq
     */
    @Basic
    @Column(name = "sales_seq")
    public Integer getSalesSeq() {
        return salesSeq;
    }

    /**
     * Set salesSeq
     *
     * @param salesSeq Integer
     */
    public void setSalesSeq(Integer salesSeq) {
        this.salesSeq = salesSeq;
    }

    /**
     * Get orderCode
     *
     * @return orderCode
     */
    @Basic
    @Column(name = "order_code")
    public String getOrderCode() {
        return orderCode;
    }

    /**
     * Set orderCode
     *
     * @param orderCode String
     */
    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode;
    }

    /**
     * Get dennoCustomerCode
     *
     * @return dennoCustomerCode
     */
    @Basic
    @Column(name = "denno_customer_code")
    public String getDennoCustomerCode() {
        return dennoCustomerCode;
    }

    /**
     * Set dennoCustomerCode
     *
     * @param dennoCustomerCode String
     */
    public void setDennoCustomerCode(String dennoCustomerCode) {
        this.dennoCustomerCode = dennoCustomerCode;
    }

    /**
     * Get salesDate
     *
     * @return salesDate
     */
    @Basic
    @Column(name = "sales_date")
    public DateTime getSalesDate() {
        return salesDate;
    }

    /**
     * Set salesDate
     *
     * @param salesDate DateTime
     */
    public void setSalesDate(DateTime salesDate) {
        this.salesDate = salesDate;
    }

    /**
     * Get invoiceSalesDate
     *
     * @return invoiceSalesDate
     */
    @Basic
    @Column(name = "invoice_sales_date")
    public DateTime getInvoiceSalesDate() {
        return invoiceSalesDate;
    }

    /**
     * Set invoiceSalesDate
     *
     * @param invoiceSalesDate DateTime
     */
    public void setInvoiceSalesDate(DateTime invoiceSalesDate) {
        this.invoiceSalesDate = invoiceSalesDate;
    }

    /**
     * Get salesCategory
     *
     * @return salesCategory
     */
    @Basic
    @Column(name = "sales_category")
    public Integer getSalesCategory() {
        return salesCategory;
    }

    /**
     * Set salesCategory
     *
     * @param salesCategory Integer
     */
    public void setSalesCategory(Integer salesCategory) {
        this.salesCategory = salesCategory;
    }

    /**
     * Get salesAmount
     *
     * @return salesAmount
     */
    @Basic
    @Column(name = "sales_amount")
    public BigDecimal getSalesAmount() {
        return salesAmount;
    }

    /**
     * Set salesAmount
     *
     * @param salesAmount Integer
     */
    public void setSalesAmount(BigDecimal salesAmount) {
        this.salesAmount = salesAmount;
    }

    /**
     * Get departmentCode
     *
     * @return departmentCode
     */
    @Basic
    @Column(name = "department_code")
    public String getDepartmentCode() {
        return departmentCode;
    }

    /**
     * Set departmentCode
     *
     * @param departmentCode String
     */
    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    /**
     * Get salesRep
     *
     * @return salesRep
     */
    @Basic
    @Column(name = "sales_rep")
    public String getSalesRep() {
        return salesRep;
    }

    /**
     * Set salesRep
     *
     * @param salesRep String
     */
    public void setSalesRep(String salesRep) {
        this.salesRep = salesRep;
    }

    /**
     * Get salesNumber
     *
     * @return salesNumber
     */
    @Basic
    @Column(name = "sales_number")
    public BigDecimal getSalesNumber() {
        return salesNumber;
    }

    /**
     * Set salesNumber
     *
     * @param salesNumber BigDecimal
     */
    public void setSalesNumber(BigDecimal salesNumber) {
        this.salesNumber = salesNumber;
    }

    /**
     * Get salesUnitPrice
     *
     * @return salesUnitPrice
     */
    @Basic
    @Column(name = "sales_unit_price")
    public BigDecimal getSalesUnitPrice() {
        return salesUnitPrice;
    }

    /**
     * Set salesUnitPrice
     *
     * @param salesUnitPrice BigDecimal
     */
    public void setSalesUnitPrice(BigDecimal salesUnitPrice) {
        this.salesUnitPrice = salesUnitPrice;
    }

    /**
     * Get manufactureRequest
     *
     * @return manufactureRequest
     */
    @Basic
    @Column(name = "manufacture_request")
    public String getManufactureRequest() {
        return manufactureRequest;
    }

    /**
     * Set manufactureRequest
     *
     * @param manufactureRequest String
     */
    public void setManufactureRequest(String manufactureRequest) {
        this.manufactureRequest = manufactureRequest;
    }

    /**
     * Get itemCode
     *
     * @return itemCode
     */
    @Basic
    @Column(name = "item_code")
    public String getItemCode() {
        return itemCode;
    }

    /**
     * Set itemCode
     *
     * @param itemCode String
     */
    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    /**
     * Get productName
     *
     * @return productName
     */
    @Basic
    @Column(name = "product_name")
    public String getProductName() {
        return productName;
    }

    /**
     * Set productName
     *
     * @param productName String
     */
    public void setProductName(String productName) {
        this.productName = productName;
    }

    /**
     * Get productType
     *
     * @return productType
     */
    @Basic
    @Column(name = "product_type")
    public Integer getProductType() {
        return productType;
    }

    /**
     * Set productType
     *
     * @param productType Integer
     */
    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    /**
     * Get salesSeq2
     *
     * @return salesSeq2
     */
    @Basic
    @Column(name = "sales_seq2")
    public Integer getSalesSeq2() {
        return salesSeq2;
    }

    /**
     * Set salesSeq2
     *
     * @param salesSeq2 Integer
     */
    public void setSalesSeq2(Integer salesSeq2) {
        this.salesSeq2 = salesSeq2;
    }
}