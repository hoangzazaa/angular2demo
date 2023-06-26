package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;

/**
 * 届け先
 *
 * 対応する TypeScript は client/src/app/model/core/ShippingDestination.model.ts
 * @author vupt
 */
public class ShippingDestinationJson extends SimpleShippingDestinationJson {

    //住所
    @JsonProperty("deliveryAddress1")
    private String deliveryAddress1;

    //TEL
    @JsonProperty("tel")
    private String tel;

    //FAX
    @JsonProperty("fax")
    private String fax;

    //納入可能車両サイズ
    @JsonProperty("availableVehicleSize")
    private Integer availableVehicleSize;

    //付帯作業
    @JsonProperty("extraWork")
    private String extraWork;

    //専用伝票有無
    @JsonProperty("extraMethod")
    private String extraMethod;

    //メモ
    @JsonProperty("memo1")
    private String memo1;

    //memo2
    @JsonProperty("memo2")
    private String memo2;

    //customerId
    @JsonProperty("customerId")
    private Integer customerId;

    //地区コード
    @JsonProperty("districtCode")
    private String districtCode;

    //abbreviation
    @JsonProperty("abbreviation")
    private String abbreviation;

    //フリガナ
    @JsonProperty("furigana")
    private String furigana;

    //略称フリガナ
    @JsonProperty("abbrFurigana")
    private String abbrFurigana;

    //郵便番号
    @JsonProperty("postalCode")
    private String postalCode;

    //deliveryAddress2
    @JsonProperty("deliveryAddress2")
    private String deliveryAddress2;

    //extension
    @JsonProperty("extension")
    private String extension;

    //defaultFlag
    @JsonProperty("defaultFlag")
    private Integer defaultFlag;

    //dennoPartnerCode
    @JsonProperty("dennoPartnerCode")
    private String dennoPartnerCode;

    //customerRsShippingDestination
    @JsonProperty("customer")
    private CustomerJson customer;

    /* 担当部署 */
    @JsonProperty("deptName")
    private String deptName;
    /* 得意先担当者  */
    @JsonProperty("salerName")
    private String salerName;

    /* specify_time */
    @JsonProperty("specifyTime")
    private Integer specifyTime;

    /* specify_time_hour */
    @JsonProperty("specifyTimeHour")
    private Integer specifyTimeHour;

    /* specify_time_minute */
    @JsonProperty("specifyTimeMinute")
    private Integer specifyTimeMinute;

    /* specify_time_period */
    @JsonProperty("specifyTimePeriod")
    private Integer specifyTimePeriod;


    /**
     * Get deliveryAddress1
     *
     * @return deliveryAddress1
     */
    public String getDeliveryAddress1() {
        return deliveryAddress1;
    }

    /**
     * Set deliveryAddress1
     *
     * @param deliveryAddress1 String
     */
    public void setDeliveryAddress1(String deliveryAddress1) {
        this.deliveryAddress1 = deliveryAddress1;
    }

    /**
     * Get tel
     *
     * @return tel
     */
    public String getTel() {
        return tel;
    }

    /**
     * Set tel
     *
     * @param tel String
     */
    public void setTel(String tel) {
        this.tel = tel;
    }

    /**
     * Get fax
     *
     * @return fax
     */
    public String getFax() {
        return fax;
    }

    /**
     * Set fax
     *
     * @param fax String
     */
    public void setFax(String fax) {
        this.fax = fax;
    }

    /**
     * Get availableVehicleSize
     *
     * @return availableVehicleSize
     */
    public Integer getAvailableVehicleSize() {
        return availableVehicleSize;
    }

    /**
     * Set availableVehicleSize
     *
     * @param availableVehicleSize String
     */
    public void setAvailableVehicleSize(Integer availableVehicleSize) {
        this.availableVehicleSize = availableVehicleSize;
    }

    /**
     * Get extraWork
     *
     * @return extraWork
     */
    public String getExtraWork() {
        return extraWork;
    }

    /**
     * Set extraWork
     *
     * @param extraWork String
     */
    public void setExtraWork(String extraWork) {
        this.extraWork = extraWork;
    }

    /**
     * Get extraMethod
     *
     * @return extraMethod
     */
    public String getExtraMethod() {
        return extraMethod;
    }

    /**
     * Set extraMethod
     *
     * @param extraMethod String
     */
    public void setExtraMethod(String extraMethod) {
        this.extraMethod = extraMethod;
    }

    /**
     * Get memo1
     *
     * @return memo1
     */
    public String getMemo1() {
        return memo1;
    }

    /**
     * Set memo1
     *
     * @param memo1 String
     */
    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    /**
     * Get memo2
     *
     * @return memo2
     */
    public String getMemo2() {
        return memo2;
    }

    /**
     * Set memo2
     *
     * @param memo2 String
     */
    public void setMemo2(String memo2) {
        this.memo2 = memo2;
    }

    /**
     * Get customerId
     *
     * @return customerId
     */
    public Integer getCustomerId() {
        return customerId;
    }

    /**
     * Set customerId
     *
     * @param customerId Integer
     */
    public void setCustomerId(Integer customerId) {
        this.customerId = customerId;
    }

    /**
     * Get districtCode
     *
     * @return districtCode
     */
    public String getDistrictCode() {
        return districtCode;
    }

    /**
     * Set districtCode
     *
     * @param districtCode String
     */
    public void setDistrictCode(String districtCode) {
        this.districtCode = districtCode;
    }

    /**
     * Get abbreviation
     *
     * @return abbreviation
     */
    public String getAbbreviation() {
        return abbreviation;
    }

    /**
     * Set abbreviation
     *
     * @param abbreviation String
     */
    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    /**
     * Get furigana
     *
     * @return furigana
     */
    public String getFurigana() {
        return furigana;
    }

    /**
     * Set furigana
     *
     * @param furigana String
     */
    public void setFurigana(String furigana) {
        this.furigana = furigana;
    }

    /**
     * Get abbrFurigana
     *
     * @return abbrFurigana
     */
    public String getAbbrFurigana() {
        return abbrFurigana;
    }

    /**
     * Set abbrFurigana
     *
     * @param abbrFurigana String
     */
    public void setAbbrFurigana(String abbrFurigana) {
        this.abbrFurigana = abbrFurigana;
    }

    /**
     * Get postalCode
     *
     * @return postalCode
     */
    public String getPostalCode() {
        return postalCode;
    }

    /**
     * Set postalCode
     *
     * @param postalCode String
     */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    /**
     * Get deliveryAddress2
     *
     * @return deliveryAddress2
     */
    public String getDeliveryAddress2() {
        return deliveryAddress2;
    }

    /**
     * Set deliveryAddress2
     *
     * @param deliveryAddress2 String
     */
    public void setDeliveryAddress2(String deliveryAddress2) {
        this.deliveryAddress2 = deliveryAddress2;
    }

    /**
     * Get extension
     *
     * @return extension
     */
    public String getExtension() {
        return extension;
    }

    /**
     * Set extension
     *
     * @param extension String
     */
    public void setExtension(String extension) {
        this.extension = extension;
    }

    /**
     * Get defaultFlag
     *
     * @return defaultFlag
     */
    public Integer getDefaultFlag() {
        return defaultFlag;
    }

    /**
     * Set defaultFlag
     *
     * @param defaultFlag Integer
     */
    public void setDefaultFlag(Integer defaultFlag) {
        this.defaultFlag = defaultFlag;
    }

    /**
     * Get dennoPartnerCode
     *
     * @return dennoPartnerCode
     */
    public String getDennoPartnerCode() {
        return dennoPartnerCode;
    }

    /**
     * Set dennoPartnerCode
     *
     * @param dennoPartnerCode String
     */
    public void setDennoPartnerCode(String dennoPartnerCode) {
        this.dennoPartnerCode = dennoPartnerCode;
    }

    /**
     * Get customer
     *
     * @return customer
     */
    public CustomerJson getCustomer() {
        return customer;
    }

    /**
     * Set customer
     *
     * @param customer CustomerJson
     */
    public void setCustomer(CustomerJson customer) {
        this.customer = customer;
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

    public Integer getSpecifyTime() {
        return specifyTime;
    }

    public void setSpecifyTime(final Integer specifyTime) {
        this.specifyTime = specifyTime;
    }

    public Integer getSpecifyTimeHour() {
        return specifyTimeHour;
    }

    public void setSpecifyTimeHour(final Integer specifyTimeHour) {
        this.specifyTimeHour = specifyTimeHour;
    }

    public Integer getSpecifyTimeMinute() {
        return specifyTimeMinute;
    }

    public void setSpecifyTimeMinute(final Integer specifyTimeMinute) {
        this.specifyTimeMinute = specifyTimeMinute;
    }

    public Integer getSpecifyTimePeriod() {
        return specifyTimePeriod;
    }

    public void setSpecifyTimePeriod(final Integer specifyTimePeriod) {
        this.specifyTimePeriod = specifyTimePeriod;
    }


    /**
     * Create ShippingDestinationJson
     *
     * @param dto ShippingDestinationDto
     */
    public void setData(ShippingDestinationDto dto) {
        super.setData(dto);

        this.deliveryAddress1 = dto.getDeliveryAddress1();
        this.tel = dto.getTel();
        this.fax = dto.getFax();
        this.availableVehicleSize = dto.getAvailableVehicleSize();
        this.extraWork = dto.getExtraWork();
        this.extraMethod = dto.getExtraMethod();
        this.memo1 = dto.getMemo1();
        this.memo2 = dto.getMemo2();
        this.customerId = dto.getCustomerId();
        this.districtCode = dto.getDistrictCode();
        this.abbreviation = dto.getAbbreviation();
        this.furigana = dto.getFurigana();
        this.abbrFurigana = dto.getAbbrFurigana();
        this.postalCode = dto.getPostalCode();
        this.deliveryAddress2 = dto.getDeliveryAddress2();
        this.extension = dto.getExtension();
        this.defaultFlag = dto.getDefaultFlag();
        this.dennoPartnerCode = dto.getDennoPartnerCode();
        this.customer = new CustomerJson();
        this.customer.setId(dto.getCustomerId());
        this.deptName = dto.getDeptName();
        this.salerName = dto.getSalerName();

        this.specifyTime = dto.getSpecifyTime();
        this.specifyTimeHour = dto.getSpecifyTimeHour();
        this.specifyTimeMinute = dto.getSpecifyTimeMinute();
        this.specifyTimePeriod = dto.getSpecifyTimePeriod();
    }

    /**
     * Create ShippingDestinationDto
     *
     * @return ShippingDestinationDto
     */
    public ShippingDestinationDto getData() {
        ShippingDestinationDto dto = super.getData();

        dto.setDeliveryAddress1(deliveryAddress1);
        dto.setTel(tel);
        dto.setFax(fax);
        dto.setAvailableVehicleSize(availableVehicleSize);
        dto.setExtraWork(extraWork);
        dto.setExtraMethod(extraMethod);
        dto.setMemo1(memo1);
        dto.setMemo2(memo2);
        dto.setCustomerId(customerId);
        dto.setDistrictCode(districtCode);
        dto.setAbbreviation(abbreviation);
        dto.setFurigana(furigana);
        dto.setAbbrFurigana(abbrFurigana);
        dto.setPostalCode(postalCode);
        dto.setDeliveryAddress2(deliveryAddress2);
        dto.setExtension(extension);
        dto.setDefaultFlag(defaultFlag);
        dto.setDennoPartnerCode(dennoPartnerCode);
        dto.setDeptName(this.deptName);
        dto.setSalerName(this.salerName);
        dto.setSpecifyTime(this.specifyTime);
        dto.setSpecifyTimeHour(this.specifyTimeHour);
        dto.setSpecifyTimeMinute(this.specifyTimeMinute);
        dto.setSpecifyTimePeriod(this.specifyTimePeriod);

        return dto;
    }
}
