package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

public class ShippingJson {

    @JsonProperty("id")
    private Integer id;
    @JsonProperty("no")
    private int no;
    @JsonProperty("shippingDate")
    private DateTime shippingDate;
    @JsonProperty("deliveryDate")
    private DateTime deliveryDate;
    @JsonProperty("loadingAddress")
    private LoadingJson loadingAddress;
    @JsonProperty("loadingAddressName")
    private String loadingAddressName;
    @JsonProperty("quantity")
    private int quantity;
    @JsonProperty("shippingCompany")
    private Integer shippingCompany;
    @JsonProperty("specifyTime")
    private Integer specifyTime;
    @JsonProperty("specifyTimeName")
    private String specifyTimeName;
    @JsonProperty("specifyTimeHour")
    private Integer specifyTimeHour;
    @JsonProperty("specifyTimeMinute")
    private Integer specifyTimeMinute;
    @JsonProperty("specifyTimePeriod")
    private Integer specifyTimePeriod;
    @JsonProperty("destinationId")
    private int destinationId;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getNo() {
        return no;
    }

    public void setNo(int no) {
        this.no = no;
    }

    public DateTime getShippingDate() {
        return shippingDate;
    }

    public void setShippingDate(DateTime shippingDate) {
        this.shippingDate = shippingDate;
    }

    public DateTime getDeliveryDate() {
        return deliveryDate;
    }

    public void setDeliveryDate(DateTime deliveryDate) {
        this.deliveryDate = deliveryDate;
    }

    public LoadingJson getLoadingAddress() {
        return loadingAddress;
    }

    public void setLoadingAddress(LoadingJson loadingAddress) {
        this.loadingAddress = loadingAddress;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Integer getShippingCompany() {
        return shippingCompany;
    }

    public void setShippingCompany(Integer shippingCompany) {
        this.shippingCompany = shippingCompany;
    }

    public Integer getSpecifyTime() {
        return specifyTime;
    }

    public void setSpecifyTime(Integer specifyTime) {
        this.specifyTime = specifyTime;
    }

    public Integer getSpecifyTimeHour() {
        return specifyTimeHour;
    }

    public void setSpecifyTimeHour(Integer specifyTimeHour) {
        this.specifyTimeHour = specifyTimeHour;
    }

    public Integer getSpecifyTimeMinute() {
        return specifyTimeMinute;
    }

    public void setSpecifyTimeMinute(Integer specifyTimeMinute) {
        this.specifyTimeMinute = specifyTimeMinute;
    }

    public Integer getSpecifyTimePeriod() {
        return specifyTimePeriod;
    }

    public void setSpecifyTimePeriod(Integer specifyTimePeriod) {
        this.specifyTimePeriod = specifyTimePeriod;
    }

    public int getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(int destinationId) {
        this.destinationId = destinationId;
    }

    public String getLoadingAddressName() {
        return loadingAddressName;
    }

    public void setLoadingAddressName(String loadingAddressName) {
        this.loadingAddressName = loadingAddressName;
    }

    public String getSpecifyTimeName() {
        return specifyTimeName;
    }

    public void setSpecifyTimeName(String specifyTimeName) {
        this.specifyTimeName = specifyTimeName;
    }
}
