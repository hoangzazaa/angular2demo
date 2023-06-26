package vn.vnext.sefuri.sf.json.SF00205.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.common.ActivityJson;
import vn.vnext.sefuri.sf.json.common.BaseJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by manhnv on 6/15/2017.
 */
public class SF00205_DealJson extends BaseJson<DealDto> {
    //DealCode
    @JsonProperty("dealCode")
    private String dealCode;

    //案件名
    @JsonProperty("dealName")
    private String dealName;

    //案件区分
    @JsonProperty("dealType")
    private Integer dealType;

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

    @JsonProperty("isInMybox")
    private boolean isInMybox;

    @JsonProperty("selectedProductId")
    private Integer selectedProductId;

    @JsonProperty("products")
    private List<SF00205_ProductJson> products;

    @JsonProperty("activity")
    private ActivityJson activity;

    @JsonProperty("laminations")
    private List<MstLaminationJson> laminations = Lists.newArrayList();

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(final String dealCode) {
        this.dealCode = dealCode;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(final String dealName) {
        this.dealName = dealName;
    }

    public Integer getDealType() {
        return dealType;
    }

    public void setDealType(final Integer dealType) {
        this.dealType = dealType;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(final String saleName) {
        this.saleName = saleName;
    }

    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    public void setEstTotalDeal(final BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(final Integer dealStatus) {
        this.dealStatus = dealStatus;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(final DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(final String customerName) {
        this.customerName = customerName;
    }

    public boolean isInMybox() {
        return isInMybox;
    }

    public void setInMybox(boolean inMybox) {
        isInMybox = inMybox;
    }

    public Integer getSelectedProductId() {
        return selectedProductId;
    }

    public void setSelectedProductId(final Integer selectedProductId) {
        this.selectedProductId = selectedProductId;
    }

    public List<SF00205_ProductJson> getProducts() {
        return products;
    }

    public void setProducts(final List<SF00205_ProductJson> products) {
        this.products = products;
    }

    public List<MstLaminationJson> getLaminations() {
        return laminations;
    }

    public void setLaminations(final List<MstLaminationJson> laminations) {
        this.laminations = laminations;
    }

    public ActivityJson getActivity() {
        return activity;
    }

    public void setActivity(final ActivityJson activity) {
        this.activity = activity;
    }

    @Override
    public DealDto getModel() {
        return null;
    }

    @Override
    public void setModel(final DealDto dto) {
        if (dto != null) {
            super.setData(dto);

            this.dealCode = dto.getDealCode();
            this.dealName = dto.getDealName();
            this.dealType = dto.getDealType();
            this.estTotalDeal = dto.getEstTotalDeal();
            this.dealStatus = dto.getDealStatus();
            this.deliveryDate = dto.getDeliveryDate();
            this.customerName = dto.getCustomerName();
        }
    }

    /**
     * Check permission to view for editing.
     * <code>
     * 1.Login-user in support department.
     * 2.Only deal in owner department.
     * </code>
     */
    @JsonProperty("isEdit")
    private boolean isEdit;

    public boolean isEdit() {
        return isEdit;
    }

    public void setEdit(final boolean edit) {
        isEdit = edit;
    }

}
