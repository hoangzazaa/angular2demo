package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.OrderItemDto;

import java.util.List;

/**
 * Contain information of item in order
 *
 * @author vupt
 */
public class OrderItemJson extends BaseJson<OrderItemDto> {
    //orderId
    @JsonProperty("orderId")
    private Integer orderId;

    //productId
    @JsonProperty("productId")
    private Integer productId;

    //quantity
    @JsonProperty("quantity")
    private Integer quantity;

    //orderRsOrderItem
    @JsonProperty("order")
    private OrderJson order;

    //orderItemRsProduct
    @JsonProperty("product")
    private ProductJson product;

    //orderItemRsStock
    @JsonProperty("balanceOfStocks")
    private List<BalanceOfStockJson> balanceOfStocks;

    /**
     * Get orderId
     *
     * @return orderId
     */
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
     * Get order
     *
     * @return order
     */
    public OrderJson getOrder() {
        return order;
    }

    /**
     * Set order
     *
     * @param order OrderJson
     */
    public void setOrder(OrderJson order) {
        this.order = order;
    }

    /**
     * Get product
     *
     * @return product
     */
    public ProductJson getProduct() {
        return product;
    }

    /**
     * Set product
     *
     * @param product ProductJson
     */
    public void setProduct(ProductJson product) {
        this.product = product;
    }

    /**
     * Get balanceOfStocks
     *
     * @return balanceOfStocks
     */
    public List<BalanceOfStockJson> getBalanceOfStocks() {
        return balanceOfStocks;
    }

    /**
     * Set balanceOfStocks
     *
     * @param balanceOfStocks List<BalanceOfStockJson>
     */
    public void setBalanceOfStocks(List<BalanceOfStockJson> balanceOfStocks) {
        this.balanceOfStocks = balanceOfStocks;
    }

    /**
     * Create OrderItemJson
     *
     * @param dto OrderItemDto
     */

    public void setData(OrderItemDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.orderId = dto.getOrderId();
        this.productId = dto.getProductId();
        this.quantity = dto.getQuantity();
        this.order = new OrderJson();
        this.order.setId(dto.getOrderId());
        this.product = new ProductJson();
        this.product.setId(dto.getProductId());
    }

    /**
     * Create OrderItemDto
     *
     * @return OrderItemDto
     */

    public OrderItemDto getData() {
        OrderItemDto dto = new OrderItemDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setOrderId(orderId);
        dto.setProductId(productId);
        dto.setQuantity(quantity);
        return dto;
    }
}
