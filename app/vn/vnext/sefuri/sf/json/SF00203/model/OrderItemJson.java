package vn.vnext.sefuri.sf.json.SF00203.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.OrderItemDto;

import java.math.BigDecimal;

/**
 * Created by TungNT on 09/03/2017.
 */
public class OrderItemJson  {

    //productId
    @JsonProperty("productId")
    private Integer productId;

    //quantity
    @JsonProperty("quantity")
    private Integer quantity;

    //updatedDate
    @JsonProperty("updatedDate")
    private DateTime updatedDate;

    //submittedPrice
    @JsonProperty("submittedPrice")
    private BigDecimal submittedPrice;

    //金額
    @JsonProperty("total")
    private BigDecimal total;


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

    public void setDataJson(OrderItemDto dto){
        this.productId = dto.getProductId();
        this.submittedPrice=dto.getSubmittedPrice();
        this.total=dto.getTotal();
        this.quantity=dto.getQuantity();
    }



}
