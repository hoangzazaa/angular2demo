package vn.vnext.sefuri.sf.json.SF00308.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 2/24/2017.
 */
public class DealJson extends BaseJson<DealDto> {


    //案件名
    @JsonProperty("dealName")
    private String dealName;

    @JsonProperty("customerId")
    private String customerId;

    @JsonProperty("customerName")
    private String customerName;

    @JsonProperty("saleName")
    private String saleName;

    @JsonProperty("dealType")
    private Integer dealType;

    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;

    @JsonProperty("estMoney")
    private BigDecimal estTotalDeal;

    @JsonProperty("answers")
    private List<AnswerJson> checksheetJsons;



    @Override
    public DealDto getData() {
        return null;
    }

    public void setData(DealDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.dealName=dto.getDealName();
        this.dealType=dto.getDealType();
        this.deliveryDate=dto.getDeliveryDate();
        this.estTotalDeal=dto.getEstTotalDeal();

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(String saleName) {
        this.saleName = saleName;
    }

    public Integer getDealType() {
        return dealType;
    }

    public void setDealType(Integer dealType) {
        this.dealType = dealType;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public BigDecimal getEstTotalDeal() {
        return estTotalDeal;
    }

    public void setEstTotalDeal(BigDecimal estTotalDeal) {
        this.estTotalDeal = estTotalDeal;
    }

    public List<AnswerJson> getChecksheetJsons() {
        return checksheetJsons;
    }

    public void setChecksheetJsons(List<AnswerJson> checksheetJsons) {
        this.checksheetJsons = checksheetJsons;
    }
}
