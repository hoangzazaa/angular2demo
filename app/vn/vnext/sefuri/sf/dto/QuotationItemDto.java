package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Contain information of item in quotation
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_quotation_item")
public class QuotationItemDto extends BaseDto {

    /* no */
    private Integer no;
    /* itemIndex */
    private Integer itemIndex;
    /* itemType */
    private Integer itemType;
    /* 品名 */
    private String name;
    /* 仕様 */
    private String description;
    /* 単価 */
    private BigDecimal submittedPrice;
    /* 数量 */
    private BigDecimal quantity;
    /* 金額 */
    private BigDecimal total;
    /* 単位 */
    private Integer productType;
    /* setClosedFlag */
    private Integer setClosedFlag = 0;
    /* parentId */
    private Integer parentId;
    /* quotationId */
    private Integer quotationId;
    /* dealProductId */
    private Integer dealProductId;
    /* interestRate */

    private BigDecimal interestRate;
    /* quotationRsQuotationItem */
    private QuotationDto quotation;
    /* quotationItemRsDealProduct */
    private DealProductDto dealProduct;

    private String productTypeName;

    @Basic
    @Column(name = "product_type_name")
    public String getProductTypeName() {
        return productTypeName;
    }

    public void setProductTypeName(String productTypeName) {
        this.productTypeName = productTypeName;
    }

    /**
     * Get no
     *
     * @return no
     */
    @Basic
    @Column(name = "no")
    public Integer getNo() {
        return no;
    }

    /**
     * Set no
     *
     * @param no Integer
     */
    public void setNo(Integer no) {
        this.no = no;
    }

    /**
     * Get itemIndex
     *
     * @return itemIndex
     */
    @Basic
    @Column(name = "item_index")
    public Integer getItemIndex() {
        return itemIndex;
    }

    /**
     * Set itemIndex
     *
     * @param itemIndex Integer
     */
    public void setItemIndex(Integer itemIndex) {
        this.itemIndex = itemIndex;
    }

    /**
     * Get itemType
     *
     * @return itemType
     */
    @Basic
    @Column(name = "item_type")
    public Integer getItemType() {
        return itemType;
    }

    /**
     * Set itemType
     *
     * @param itemType Integer
     */
    public void setItemType(Integer itemType) {
        this.itemType = itemType;
    }

    /**
     * Get name
     *
     * @return name
     */
    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    /**
     * Set name
     *
     * @param name String
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Get description
     *
     * @return description
     */
    @Basic
    @Column(name = "description")
    public String getDescription() {
        return description;
    }

    /**
     * Set description
     *
     * @param description String
     */
    public void setDescription(String description) {
        this.description = description;
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
     * Get quantity
     *
     * @return quantity
     */
    @Basic
    @Column(name = "quantity")
    public BigDecimal getQuantity() {
        return quantity;
    }

    /**
     * Set quantity
     *
     * @param quantity BigDecimal
     */
    public void setQuantity(BigDecimal quantity) {
        this.quantity = quantity;
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
     * Get setClosedFlag
     *
     * @return setClosedFlag
     */
    @Basic
    @Column(name = "set_closed_flag")
    public Integer getSetClosedFlag() {
        return setClosedFlag;
    }

    /**
     * Set setClosedFlag
     *
     * @param setClosedFlag Integer
     */
    public void setSetClosedFlag(Integer setClosedFlag) {
        this.setClosedFlag = setClosedFlag;
    }

    /**
     * Get parentId
     *
     * @return parentId
     */
    @Basic
    @Column(name = "parent_id")
    public Integer getParentId() {
        return parentId;
    }

    /**
     * Set parentId
     *
     * @param parentId Integer
     */
    public void setParentId(Integer parentId) {
        this.parentId = parentId;
    }

    /**
     * Get quotationId
     *
     * @return quotationId
     */
    @Basic
    @Column(name = "quotation_id")
    public Integer getQuotationId() {
        return quotationId;
    }

    /**
     * Set quotationId
     *
     * @param quotationId Integer
     */
    public void setQuotationId(Integer quotationId) {
        this.quotationId = quotationId;
    }

    /**
     * Get dealProductId
     *
     * @return dealProductId
     */
    @Basic
    @Column(name = "deal_product_id")
    public Integer getDealProductId() {
        return dealProductId;
    }

    /**
     * Set dealProductId
     *
     * @param dealProductId Integer
     */
    public void setDealProductId(Integer dealProductId) {
        this.dealProductId = dealProductId;
    }

    /**
     * Get interestRate
     *
     * @return interestRate
     */
    @Basic
    @Column(name = "interest_rate")
    public BigDecimal getInterestRate() {
        return interestRate;
    }

    /**
     * Set interestRate
     *
     * @param interestRate BigDecimal
     */
    public void setInterestRate(BigDecimal interestRate) {
        this.interestRate = interestRate;
    }

    /**
     * Get quotation
     *
     * @return quotation
     */
    @Transient
    public QuotationDto getQuotation() {
        return quotation;
    }

    /**
     * Set quotation
     *
     * @param quotation QuotationDto
     */
    public void setQuotation(QuotationDto quotation) {
        this.quotation = quotation;
    }

    /**
     * Get dealProduct
     *
     * @return dealProduct
     */
    @Transient
    public DealProductDto getDealProduct() {
        return dealProduct;
    }

    /**
     * Set dealProduct
     *
     * @param dealProduct DealProductDto
     */
    public void setDealProduct(DealProductDto dealProduct) {
        this.dealProduct = dealProduct;
    }

}
