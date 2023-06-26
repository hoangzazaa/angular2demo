package vn.vnext.sefuri.sf.json.SF00501.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.json.core.DealProductJson;
import vn.vnext.sefuri.sf.json.core.QuotationJson;

import java.math.BigDecimal;

/**
 * Created by TungNT on 3/3/2017.
 */

    public class QuotationItemJson  extends BaseJson<QuotationItemDto> {

        //no
        @JsonProperty("no")
        private Integer no;

        //itemIndex
        @JsonProperty("itemIndex")
        private Integer itemIndex;

        //itemType
        @JsonProperty("itemType")
        private Integer itemType;

        //品名
        @JsonProperty("name")
        private String name;

        //仕様
        @JsonProperty("description")
        private String description;

        //単価
        @JsonProperty("submittedPrice")
        private BigDecimal submittedPrice;

        //数量
        @JsonProperty("quantity")
        private BigDecimal quantity;

        //金額
        @JsonProperty("total")
        private BigDecimal total;

        //単位
        @JsonProperty("productType")
        private Integer productType;

        //setClosedFlag
        @JsonProperty("setClosedFlag")
        private Integer setClosedFlag;

        //parentId
        @JsonProperty("parentId")
        private Integer parentId;

        //quotationId
        @JsonProperty("quotationId")
        private Integer quotationId;

        //dealProductId
        @JsonProperty("dealProductId")
        private Integer dealProductId;

        //interestRate
        @JsonProperty("interestRate")
        private BigDecimal interestRate;

        //quotationRsQuotationItem
        @JsonProperty("quotation")
        private QuotationJson quotation;

        //quotationItemRsDealProduct
        @JsonProperty("dealProduct")
        private DealProductJson dealProduct;


        /**
         * Get no
         *
         * @return no
         */
        public Integer getNo(){
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
        public Integer getItemIndex(){
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
        public Integer getItemType(){
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
        public String getName(){
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
        public String getDescription(){
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
        public BigDecimal getSubmittedPrice(){
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
        public BigDecimal getQuantity(){
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
        public BigDecimal getTotal(){
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
        public Integer getProductType(){
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
        public Integer getSetClosedFlag(){
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
        public Integer getParentId(){
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
        public Integer getQuotationId(){
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
        public Integer getDealProductId(){
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
        public BigDecimal getInterestRate(){
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
        public QuotationJson getQuotation(){
            return quotation;
        }

        /**
         * Set quotation
         *
         * @param quotation QuotationJson
         */
        public void setQuotation(QuotationJson quotation) {
            this.quotation = quotation;
        }

        /**
         * Get dealProduct
         *
         * @return dealProduct
         */
        public DealProductJson getDealProduct(){
            return dealProduct;
        }

        /**
         * Set dealProduct
         *
         * @param dealProduct DealProductJson
         */
        public void setDealProduct(DealProductJson dealProduct) {
            this.dealProduct = dealProduct;
        }

        /**
         * Create QuotationItemJson
         *
         * @param dto QuotationItemDto
         */

        public void setData(QuotationItemDto dto){
            this.id = dto.getId();
            this.createdUser = dto.getCreatedUser();
            this.updatedUser = dto.getUpdatedUser();
            this.createdDate = dto.getCreatedDate();
            this.updatedDate = dto.getUpdatedDate();
            this.no = dto.getNo();
            this.itemIndex = dto.getItemIndex();
            this.itemType = dto.getItemType();
            this.name = dto.getName();
            this.description = dto.getDescription();
            this.submittedPrice = dto.getSubmittedPrice();
            this.quantity = dto.getQuantity();
            this.total = dto.getTotal();
            this.productType = dto.getProductType();
            this.setClosedFlag = dto.getSetClosedFlag();
            this.parentId = dto.getParentId();
            this.quotationId = dto.getQuotationId();
            this.dealProductId = dto.getDealProductId();
            this.interestRate = dto.getInterestRate();
            this.quotation = new QuotationJson();
            this.quotation.setId(dto.getQuotationId());
            this.dealProduct = new DealProductJson();
            this.dealProduct.setId(dto.getDealProductId());
        }

        /**
         * Create QuotationItemDto
         *
         * @return QuotationItemDto
         */

        public QuotationItemDto getData(){
            QuotationItemDto dto = new QuotationItemDto();
            dto.setId(id);
            dto.setCreatedUser(createdUser);
            dto.setUpdatedUser(updatedUser);
            dto.setCreatedDate(createdDate);
            dto.setUpdatedDate(updatedDate);
            dto.setNo(no);
            dto.setItemIndex(itemIndex);
            dto.setItemType(itemType);
            dto.setName(name);
            dto.setDescription(description);
            dto.setSubmittedPrice(submittedPrice);
            dto.setQuantity(quantity);
            dto.setTotal(total);
            dto.setProductType(productType);
            dto.setSetClosedFlag(setClosedFlag);
            dto.setParentId(parentId);
            dto.setQuotationId(quotationId);
            dto.setDealProductId(dealProductId);
            dto.setInterestRate(interestRate);
            return dto;
        }
}
