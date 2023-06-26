package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;

import java.math.BigDecimal;
import java.util.List;

public class OrderItemJson {

    @JsonProperty("shippings")
    List<ShippingJson> shippings;
    @JsonProperty("id")
    private Integer id;
    @JsonProperty("productId")
    private int productId;
    @JsonProperty("quantity")
    private Integer quantity;
    @JsonProperty("orderCode")
    private String orderCode;
    @JsonProperty("orderCode2")
    private String orderCode2;
    @JsonProperty("unitPrice")
    private BigDecimal unitPrice;
    @JsonProperty("customerManagedId")
    private String customerManagedId;
    @JsonProperty("productionSpecs")
    private Integer productionSpecs;
    @JsonProperty("printVersion")
    private Integer printVersion;
    @JsonProperty("wooden")
    private Integer wooden;
    @JsonProperty("mold")
    private Integer mold;
    @JsonProperty("passageOrder")
    private String passageOrder;
    @JsonProperty("sampleLift")
    private Integer sampleLift;
    @JsonProperty("sampleSales")
    private Integer sampleSales;
    @JsonProperty("sampleCustomer")
    private Integer sampleCustomer;
    @JsonProperty("sampleItem")
    private Integer sampleItem;
    @JsonProperty("sampleProduct")
    private Integer sampleProduct;
    @JsonProperty("specialNote")
    private String specialNote;
    @JsonProperty("woodenExpiredDate")
    private DateTime woodenExpiredDate;

    public List<ShippingJson> getShippings() {
        return shippings;
    }

    public void setShippings(List<ShippingJson> shippings) {
        this.shippings = shippings;
    }

    public String getSpecialNote() {
        return specialNote;
    }

    public void setSpecialNote(String specialNote) {
        this.specialNote = specialNote;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    /**
     * Get orderCode
     *
     * @return orderCode
     */
    public String getOrderCode() {
        return orderCode;
    }

    /**
     * Set orderCode
     *
     * @param orderCode String
     */
    public void setOrderCode(String str) {
        this.orderCode = str;
    }

    public String getOrderCode2() {
        return orderCode2;
    }
    public void setOrderCode2(String str) {
        this.orderCode2 = str;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getProductionSpecs() {
        return productionSpecs;
    }

    public void setProductionSpecs(Integer productionSpecs) {
        this.productionSpecs = productionSpecs;
    }

    public Integer getPrintVersion() {
        return printVersion;
    }

    public void setPrintVersion(Integer printVersion) {
        this.printVersion = printVersion;
    }

    public Integer getWooden() {
        return wooden;
    }

    public void setWooden(Integer wooden) {
        this.wooden = wooden;
    }

    public Integer getMold() {
        return mold;
    }

    public void setMold(Integer mold) {
        this.mold = mold;
    }

    public String getPassageOrder() {
        return passageOrder;
    }

    public void setPassageOrder(String passageOrder) {
        this.passageOrder = passageOrder;
    }

    public Integer getSampleLift() {
        return sampleLift;
    }

    public void setSampleLift(Integer sampleLift) {
        this.sampleLift = sampleLift;
    }

    public Integer getSampleSales() {
        return sampleSales;
    }

    public void setSampleSales(Integer sampleSales) {
        this.sampleSales = sampleSales;
    }

    public Integer getSampleCustomer() {
        return sampleCustomer;
    }

    public void setSampleCustomer(Integer sampleCustomer) {
        this.sampleCustomer = sampleCustomer;
    }

    public Integer getSampleItem() {
        return sampleItem;
    }

    public void setSampleItem(Integer sampleItem) {
        this.sampleItem = sampleItem;
    }

    public Integer getSampleProduct() {
        return sampleProduct;
    }

    public void setSampleProduct(Integer sampleProduct) {
        this.sampleProduct = sampleProduct;
    }


    public String getCustomerManagedId() {
        return customerManagedId;
    }

    public void setCustomerManagedId(String customerManagedId) {
        this.customerManagedId = customerManagedId;
    }

    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }
}
