package vn.vnext.sefuri.sf.json.SF00100.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.common.ActivityJson;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain deals managed by all user
 *
 * @author nguyenpk
 */
public class DealJson extends BaseJson<DealDto> {
    //DealCode
    @JsonProperty("dealCode")
    private String dealCode;
    //案件名
    @JsonProperty("dealName")
    private String dealName;

    //案件区分
    @JsonProperty("dealType")
    private Integer dealType;

    //isInMyBox
    @JsonProperty("isInMybox")
    private boolean isInMybox;

    //images
    @JsonProperty("filePath")
    private List<String> filePath;
    //担当営業名
    @JsonProperty("saleName")
    private String saleName;

    //受注予定額
    @JsonProperty("estTotalDeal")
    private BigDecimal estTotalDeal;

    //ステータス
    @JsonProperty("dealStatus")
    private Integer dealStatus;

    //納期
    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;

    //CustomerName
    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("products")
    private List<SF00100_ProductJson> products;

    //OrderItemJson
    @JsonProperty("orderItems")
    private List<OrderItemJson> orderItems;

    @JsonProperty("selectedProductId")
    private Integer selectedProductId;

    @JsonProperty("activity")
    private ActivityJson activity;

    @JsonProperty("isEdit")
    private boolean isEdit;

    public Integer getSelectedProductId() {
        return selectedProductId;
    }

    public void setSelectedProductId(Integer selectedProductId) {
        this.selectedProductId = selectedProductId;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public List<String> getFilePath() {
        return filePath;
    }

    public void setFilePath(List<String> filePath) {
        this.filePath = filePath;
    }

    /**
     * Get dealName
     *
     * @return dealName
     */
    public String getDealName() {
        return dealName;
    }

    /**
     * Set dealName
     *
     * @param dealName String
     */
    public void setDealName(String dealName) {
        this.dealName = dealName;
    }


    /**
     * Get dealType
     *
     * @return dealType
     */
    public Integer getDealType() {
        return dealType;
    }

    /**
     * Set dealType
     *
     * @param dealType Integer
     */
    public void setDealType(Integer dealType) {
        this.dealType = dealType;
    }


    /**
     * Get estTotalDeal
     *
     * @return estTotalDeal
     */
    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    /**
     * Set estTotalDeal
     *
     * @param estTotalDeal BigDecimal
     */
    public void setEstTotalDeal(BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    /**
     * Get dealStatus
     *
     * @return dealStatus
     */
    public Integer getDealStatus() {
        return dealStatus;
    }

    /**
     * Set dealStatus
     *
     * @param dealStatus Integer
     */
    public void setDealStatus(Integer dealStatus) {
        this.dealStatus = dealStatus;
    }


    /**
     * Get deliveryDate
     *
     * @return deliveryDate
     */
    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    /**
     * Set deliveryDate
     *
     * @param deliveryDate DateTime
     */
    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }


    public String getCustomerName() {

        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public boolean isInMybox() {
        return isInMybox;
    }

    public void setInMybox(boolean inMybox) {
        isInMybox = inMybox;
    }

    public List<SF00100_ProductJson> getProducts() {
        return products;
    }

    public void setProducts(List<SF00100_ProductJson> products) {
        this.products = products;
    }

    public List<OrderItemJson> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemJson> orderItems) {
        this.orderItems = orderItems;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(String saleName) {
        this.saleName = saleName;
    }

    public boolean getIsInMybox() {
        return isInMybox;
    }

    public void setIsInMybox(boolean inMybox) {
        isInMybox = inMybox;
    }

    public ActivityJson getActivity() {
        return activity;
    }

    public void setActivity(final ActivityJson activity) {
        this.activity = activity;
    }

    public boolean isEdit() {
        return isEdit;
    }

    public void setEdit(final boolean edit) {
        isEdit = edit;
    }

    /**
     * Create DealJson
     *
     * @param dto DealDto
     */

    public void setData(DealDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.dealCode = dto.getDealCode();
        this.dealName = dto.getDealName();
        this.dealType = dto.getDealType();
        this.estTotalDeal = dto.getEstTotalDeal();
        this.dealStatus = dto.getDealStatus();
        this.deliveryDate = dto.getDeliveryDate();
        this.customerName = dto.getCustomerName();
    }

    /**
     * Create DealDto
     *
     * @return DealDto
     */

    public DealDto getData() {
        DealDto dto = new DealDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setDealCode(dealCode);
        dto.setDealName(dealName);
        dto.setDealType(dealType);
        dto.setEstTotalDeal(estTotalDeal);
        dto.setDealStatus(dealStatus);
        dto.setDeliveryDate(deliveryDate);
        dto.setCustomerName(customerName);
        return dto;
    }
}
