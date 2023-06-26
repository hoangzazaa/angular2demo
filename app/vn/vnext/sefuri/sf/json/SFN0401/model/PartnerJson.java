package vn.vnext.sefuri.sf.json.SFN0401.model;

import java.util.List;

import org.joda.time.DateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 取引先 JSON (得意先または仕入先)
 *
 * <p>SFN0401 (取引先検索) 専用
 * <p>対応する TypeScript は client/src/app/view/SF/SFN0401/model/SFN0401_Partner.model.ts
 * @see vn.vnext.sefuri.sf.json.SFN0402.model.PartnerJson SFN0402 (取引先照会) 専用 PartnerJson
 */
public class PartnerJson {

    @JsonProperty("code")
    private String code;
    @JsonProperty("name")
    private String name;
    @JsonProperty("updateDate")
    private DateTime updateDate;
    @JsonProperty("abbr")
    private String abbr;
    @JsonProperty("postalCode")
    private String postalCode;
    @JsonProperty("address1")
    private String address1;
    @JsonProperty("address2")
    private String address2;
    @JsonProperty("tel")
    private String tel;
    @JsonProperty("ext")
    private String ext;
    @JsonProperty("fax")
    private String fax;
    @JsonProperty("hpInfo")
    private int hpInfo;
    @JsonProperty("createdDate")
    private DateTime createdDate;
    @JsonProperty("startYear")
    private Integer startYear;
    @JsonProperty("contactName")
    private String contactName;
    @JsonProperty("billingMethod")
    private String billingMethod;
    @JsonProperty("note1")
    private String note1;
    @JsonProperty("note2")
    private String note2;
    @JsonProperty("memo")
    private String memo;

    @JsonProperty("sales")
    private UserJson sales;
    @JsonProperty("revenues")
    private List<RevenueJson> revenues;
    @JsonProperty("inventories")
    private List<InventoryJson> inventories;
    @JsonProperty("orders")
    private List<OrderJson> orders;


    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DateTime getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(DateTime updateDate) {
        this.updateDate = updateDate;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(String abbr) {
        this.abbr = abbr;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getExt() {
        return ext;
    }

    public void setExt(String ext) {
        this.ext = ext;
    }

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public int getHpInfo() {
        return hpInfo;
    }

    public void setHpInfo(int hpInfo) {
        this.hpInfo = hpInfo;
    }

    public DateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(DateTime createdDate) {
        this.createdDate = createdDate;
    }

    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    public String getContactName() {
        return contactName;
    }

    public void setContactName(String contactName) {
        this.contactName = contactName;
    }

    public String getBillingMethod() {
        return billingMethod;
    }

    public void setBillingMethod(String billingMethod) {
        this.billingMethod = billingMethod;
    }

    public String getNote1() {
        return note1;
    }

    public void setNote1(String note1) {
        this.note1 = note1;
    }

    public String getNote2() {
        return note2;
    }

    public void setNote2(String note2) {
        this.note2 = note2;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public UserJson getSales() {
        return sales;
    }

    public void setSales(UserJson sales) {
        this.sales = sales;
    }

    public List<RevenueJson> getRevenues() {
        return revenues;
    }

    public void setRevenues(List<RevenueJson> revenues) {
        this.revenues = revenues;
    }

    public List<InventoryJson> getInventories() {
        return inventories;
    }

    public void setInventories(List<InventoryJson> inventories) {
        this.inventories = inventories;
    }

    public List<OrderJson> getOrders() {
        return orders;
    }

    public void setOrders(List<OrderJson> orders) {
        this.orders = orders;
    }
}
