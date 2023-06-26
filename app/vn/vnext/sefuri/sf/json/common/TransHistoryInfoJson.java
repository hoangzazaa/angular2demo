package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.OrderItemDto;

import java.math.BigDecimal;

/**
 * Basic order item stock.
 *
 * @author manhnv
 */
public abstract class TransHistoryInfoJson {
    //productId
    @JsonProperty("productId")
    protected Integer productId;

    //updatedDate
    @JsonProperty("updatedDate")
    protected DateTime updatedDate;

    //quantity
    @JsonProperty("quantity")
    protected Integer quantity;

    //submittedPrice
    @JsonProperty("submittedPrice")
    protected BigDecimal submittedPrice;

    //金額
    @JsonProperty("total")
    protected BigDecimal total;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public DateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(DateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public BigDecimal getSubmittedPrice() {
        return submittedPrice;
    }

    public void setSubmittedPrice(BigDecimal submittedPrice) {
        this.submittedPrice = submittedPrice;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    public void setModel(final OrderItemDto dto) {
        if (dto != null) {
            this.productId = dto.getProductId();
            this.quantity = dto.getQuantity();
            this.submittedPrice = dto.getSubmittedPrice();
            this.total = dto.getTotal();
        }
    }

}

