package vn.vnext.sefuri.sf.json.SFN0307.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class DestinationJson {

    // Id
    @JsonProperty("id")
    private int id;
    // dennoPartnerCode
    @JsonProperty("code")
    private String code;
    // customerId
    @JsonProperty("customerId")
    private Integer customerId;
    // 納入先名
    @JsonProperty("deliveryName")
    private String deliveryName;
    // 納入先名（略称）
    @JsonProperty("abbreviation")
    private String abbreviation;
    // フリガナ
    @JsonProperty("furigana")
    private String furigana;
    // 略称カナ
    @JsonProperty("abbrFurigana")
    private String abbrFurigana;
    // 郵便番号
    @JsonProperty("postalCode")
    private String postalCode;
    // 地区コード
    @JsonProperty("districtCode")
    private String districtCode;
    // 住所１
    @JsonProperty("address1")
    private String address1;
    // 住所２
    @JsonProperty("address2")
    private String address2;
    // TEL
    @JsonProperty("tel")
    private String tel;
    // FAX
    @JsonProperty("fax")
    private String fax;
    // 担当部署
    @JsonProperty("deptName")
    private String deptName;
    // 得意先担当者
    @JsonProperty("salerName")
    private String salerName;
    // 納入可能車両サイズ
    @JsonProperty("availableVehicleSize")
    private Integer availableVehicleSize;
    // 時間指定有無
    @JsonProperty("specifyTime")
    private Integer specifyTime;
    @JsonProperty("specifyTimeHour")
    private Integer specifyTimeHour;
    @JsonProperty("specifyTimeMinute")
    private Integer specifyTimeMinute;
    @JsonProperty("specifyTimePeriod")
    private Integer specifyTimePeriod;
    // 付帯作業
    @JsonProperty("extraWork")
    private String extraWork;
    // 専用伝票有無
    @JsonProperty("extraMethod")
    private String extraMethod;
    // 備考
    @JsonProperty("memo")
    private String memo;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    public String getDeliveryName() {
        return deliveryName;
    }

    public void setDeliveryName(String deliveryName) {
        this.deliveryName = deliveryName;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    public String getFurigana() {
        return furigana;
    }

    public void setFurigana(String furigana) {
        this.furigana = furigana;
    }

    public String getAbbrFurigana() {
        return abbrFurigana;
    }

    public void setAbbrFurigana(String abbrFurigana) {
        this.abbrFurigana = abbrFurigana;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getDistrictCode() {
        return districtCode;
    }

    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
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

    public String getFax() {
        return fax;
    }

    public void setFax(String fax) {
        this.fax = fax;
    }

    public String getDeptName() {
        return deptName;
    }

    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    public String getSalerName() {
        return salerName;
    }

    public void setSalerName(String salerName) {
        this.salerName = salerName;
    }

    public Integer getAvailableVehicleSize() {
        return availableVehicleSize;
    }

    public void setAvailableVehicleSize(Integer availableVehicleSize) {
        this.availableVehicleSize = availableVehicleSize;
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

    public String getExtraWork() {
        return extraWork;
    }

    public void setExtraWork(String extraWork) {
        this.extraWork = extraWork;
    }

    public String getExtraMethod() {
        return extraMethod;
    }

    public void setExtraMethod(String extraMethod) {
        this.extraMethod = extraMethod;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }
}
