package vn.vnext.sefuri.sf.dto;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * 届け先(納入先)
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_shipping_destination")
public class ShippingDestinationDto extends BaseDto {
    /* 納入先名  */
    private String deliveryName;
    /* 住所 */
    private String deliveryAddress1;
    /* TEL */
    private String tel;
    /* FAX */
    private String fax;
    /* 納入可能車両サイズ */
    private Integer availableVehicleSize;
    /* 付帯作業 */
    private String extraWork;
    /* 専用伝票有無 */
    private String extraMethod;
    /* メモ */
    private String memo1;
    /* memo2 */
    private String memo2;
    /* customerId */
    private Integer customerId;
    /* 地区コード */
    private String districtCode;
    /* abbreviation */
    private String abbreviation;
    /* フリガナ */
    private String furigana;
    /* 略称フリガナ */
    private String abbrFurigana;
    /* 郵便番号 */
    private String postalCode;
    /* deliveryAddress2 */
    private String deliveryAddress2;
    /* extension */
    private String extension;
    /* defaultFlag */
    private Integer defaultFlag = 0;
    /* 担当部署 */
    @Deprecated
    private String deptName;
    /* 得意先担当者  */
    @Deprecated
    private String salerName;
    /* dennoPartnerCode */
    private String dennoPartnerCode;
    /* specify_time */
    private Integer specifyTime;
    /* specify_time_hour */
    private Integer specifyTimeHour;
    /* specify_time_minute */
    private Integer specifyTimeMinute;
    /* specify_time_period */
    private Integer specifyTimePeriod;

    /** 路線会社指定 */
    private String deliveryCompany;
    /** 配送車両指定 */
    private Integer specifyVehicle;
    /** 配送車両指定(その他) */
    private String specifyVehicleOthers;
    /** 納品時間 */
    private String deliveryTime;
    /** 納品前TEL true(1): 要, false(0): 不要, null: 未記入 */
    private Boolean telBeforeDelivery;
    /** エボ添付 true(1): 要, false(0): 不要, null: 未記入 */
    private Boolean attachmentEbo;
    /** 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入 */
    private Boolean deliveryInCaseOfBadWeather;
    /** ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入 */
    private Boolean stretchFilm;
    /** 2F上げ true(1): 有, false(0): 無, null: 未記入 */
    private Boolean upstairs;
    /** 2F上げ (有の内容) */
    private Integer upstairsDetail;
    /** 2F上げその他 */
    private String upstairsDetailOthers;
    /** パレット納品 true(1): 有, false(0): 無, null: 未記入 */
    private Boolean paletteDelivery;
    /** パレット引取 true(1): 有, false(0): 無, null: 未記入 */
    private Boolean paletteTakeBack;
    /** 数量制限 */
    private Integer limitQuantity;
    /** 降ろし場所指定 */
    private String unloadingPlace;
    /** 車両停車位置 */
    private String parkingPlace;
    /** 荷降ろし時のリフト使用者 */
    private Integer liftUserInUnloading;
    /** 荷降ろし形態 */
    private String unloadForm;
    /** その他注意事項 */
    private String attention;

    /** 画像情報 (表示順) */
    private List<ShippingDestinationImageDto> imageList;

    /* customerRsShippingDestination */
    private CustomerDto customer;


    /**
     * Get deliveryName
     *
     * @return deliveryName
     */
    @Basic
    @Column(name = "delivery_name")
    public String getDeliveryName() {
        return deliveryName;
    }

    /**
     * Set deliveryName
     *
     * @param deliveryName String
     */
    public void setDeliveryName(String deliveryName) {
        this.deliveryName = deliveryName;
    }

    /**
     * Get deliveryAddress1
     *
     * @return deliveryAddress1
     */
    @Basic
    @Column(name = "delivery_address1")
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
    @Basic
    @Column(name = "tel")
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
    @Basic
    @Column(name = "fax")
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
    @Basic
    @Column(name = "available_vehicle_size")
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
    @Basic
    @Column(name = "extra_work")
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
    @Basic
    @Column(name = "extra_method")
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
    @Basic
    @Column(name = "memo1")
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
    @Basic
    @Column(name = "memo2")
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
    @Basic
    @Column(name = "customer_id")
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
    @Basic
    @Column(name = "district_code")
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
    @Basic
    @Column(name = "abbreviation")
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
    @Basic
    @Column(name = "furigana")
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
    @Basic
    @Column(name = "abbr_furigana")
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
    @Basic
    @Column(name = "postal_code")
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
    @Basic
    @Column(name = "delivery_address2")
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
    @Basic
    @Column(name = "extension")
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
    @Basic
    @Column(name = "default_flag")
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
    @Basic
    @Column(name = "denno_partner_code")
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
    @Transient
    public CustomerDto getCustomer() {
        return customer;
    }

    /**
     * Set customer
     *
     * @param customer CustomerDto
     */
    public void setCustomer(CustomerDto customer) {
        this.customer = customer;
    }

    @Basic
    @Column(name = "dept_name")
    @Deprecated
    public String getDeptName() {
        return deptName;
    }

    @Deprecated
    public void setDeptName(String deptName) {
        this.deptName = deptName;
    }

    @Basic
    @Column(name = "saler_name")
    @Deprecated
    public String getSalerName() {
        return salerName;
    }

    @Deprecated
    public void setSalerName(String salerName) {
        this.salerName = salerName;
    }

    @Basic
    @Column(name = "specify_time")
    public Integer getSpecifyTime() {
        return specifyTime;
    }

    public void setSpecifyTime(final Integer specifyTime) {
        this.specifyTime = specifyTime;
    }

    @Basic
    @Column(name = "specify_time_hour")
    public Integer getSpecifyTimeHour() {
        return specifyTimeHour;
    }

    public void setSpecifyTimeHour(final Integer specifyTimeHour) {
        this.specifyTimeHour = specifyTimeHour;
    }

    @Basic
    @Column(name = "specify_time_minute")
    public Integer getSpecifyTimeMinute() {
        return specifyTimeMinute;
    }

    public void setSpecifyTimeMinute(final Integer specifyTimeMinute) {
        this.specifyTimeMinute = specifyTimeMinute;
    }

    @Basic
    @Column(name = "specify_time_period")
    public Integer getSpecifyTimePeriod() {
        return specifyTimePeriod;
    }

    public void setSpecifyTimePeriod(final Integer specifyTimePeriod) {
        this.specifyTimePeriod = specifyTimePeriod;
    }

    /**
     * @return 路線会社指定
     */
    @Basic
    @Column(name = "delivery_company")
    public String getDeliveryCompany() {
        return deliveryCompany;
    }

    /**
     * @param deliveryCompany 路線会社指定
     */
    public void setDeliveryCompany(String deliveryCompany) {
        this.deliveryCompany = deliveryCompany;
    }

    /**
     * @return 配送車両指定
     */
    @Basic
    @Column(name = "specify_vehicle")
    public Integer getSpecifyVehicle() {
        return specifyVehicle;
    }

    /**
     * @param specifyVehicle 配送車両指定
     */
    public void setSpecifyVehicle(Integer specifyVehicle) {
        this.specifyVehicle = specifyVehicle;
    }

    /**
     * @return 配送車両指定(その他)
     */
    @Basic
    @Column(name = "specify_vehicle_others")
    public String getSpecifyVehicleOthers() {
        return specifyVehicleOthers;
    }

    /**
     * @param specifyVehicleOthers 配送車両指定(その他)
     */
    public void setSpecifyVehicleOthers(String specifyVehicleOthers) {
        this.specifyVehicleOthers = specifyVehicleOthers;
    }

    /**
     * @return 納品時間
     */
    @Basic
    @Column(name = "delivery_time")
    public String getDeliveryTime() {
        return deliveryTime;
    }

    /**
     * @param deliveryTime 納品時間
     */
    public void setDeliveryTime(String deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    /**
     * @return 納品前TEL true(1): 要, false(0): 不要, null: 未記入
     */
    @Basic
    @Column(name = "tel_before_delivery")
    public Boolean getTelBeforeDelivery() {
        return telBeforeDelivery;
    }

    /**
     * @param telBeforeDelivery 納品前TEL true(1): 要, false(0): 不要, null: 未記入
     */
    public void setTelBeforeDelivery(Boolean telBeforeDelivery) {
        this.telBeforeDelivery = telBeforeDelivery;
    }

    /**
     * @return エボ添付 true(1): 要, false(0): 不要, null: 未記入
     */
    @Basic
    @Column(name = "attachment_ebo")
    public Boolean getAttachmentEbo() {
        return attachmentEbo;
    }

    /**
     * @param attachmentEbo エボ添付 true(1): 要, false(0): 不要, null: 未記入
     */
    public void setAttachmentEbo(Boolean attachmentEbo) {
        this.attachmentEbo = attachmentEbo;
    }

    /**
     * @return 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入
     */
    @Basic
    @Column(name = "delivery_in_case_of_bad_weather")
    public Boolean getDeliveryInCaseOfBadWeather() {
        return deliveryInCaseOfBadWeather;
    }

    /**
     * @param deliveryInCaseOfBadWeather 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入
     */
    public void setDeliveryInCaseOfBadWeather(Boolean deliveryInCaseOfBadWeather) {
        this.deliveryInCaseOfBadWeather = deliveryInCaseOfBadWeather;
    }

    /**
     * @return ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入
     */
    @Basic
    @Column(name = "stretch_film")
    public Boolean getStretchFilm() {
        return stretchFilm;
    }

    /**
     * @param stretchFilm ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入
     */
    public void setStretchFilm(Boolean stretchFilm) {
        this.stretchFilm = stretchFilm;
    }

    /**
     * @return 2F上げ true(1): 有, false(0): 無, null: 未記入
     */
    @Basic
    @Column(name = "upstairs")
    public Boolean getUpstairs() {
        return upstairs;
    }

    /**
     * @param upstairs 2F上げ true(1): 有, false(0): 無, null: 未記入
     */
    public void setUpstairs(Boolean upstairs) {
        this.upstairs = upstairs;
    }

    /**
     * @return 2F上げ (有の内容)
     */
    @Basic
    @Column(name = "upstairs_detail")
    public Integer getUpstairsDetail() {
        return upstairsDetail;
    }

    /**
     * @param upstairsDetail 2F上げ (有の内容)
     */
    public void setUpstairsDetail(Integer upstairsDetail) {
        this.upstairsDetail = upstairsDetail;
    }

    /**
     * @return 2F上げその他
     */
    @Basic
    @Column(name = "upstairs_detail_others")
    public String getUpstairsDetailOthers() {
        return upstairsDetailOthers;
    }

    /**
     * @param upstairsDetailOthers 2F上げその他
     */
    public void setUpstairsDetailOthers(String upstairsDetailOthers) {
        this.upstairsDetailOthers = upstairsDetailOthers;
    }

    /**
     * @return パレット納品 true(1): 有, false(0): 無, null: 未記入
     */
    @Basic
    @Column(name = "palette_delivery")
    public Boolean getPaletteDelivery() {
        return paletteDelivery;
    }

    /**
     * @param paletteDelivery パレット納品 true(1): 有, false(0): 無, null: 未記入
     */
    public void setPaletteDelivery(Boolean paletteDelivery) {
        this.paletteDelivery = paletteDelivery;
    }

    /**
     * @return パレット引取 true(1): 有, false(0): 無, null: 未記入
     */
    @Basic
    @Column(name = "palette_take_back")
    public Boolean getPaletteTakeBack() {
        return paletteTakeBack;
    }

    /**
     * @param paletteTakeBack パレット引取 true(1): 有, false(0): 無, null: 未記入
     */
    public void setPaletteTakeBack(Boolean paletteTakeBack) {
        this.paletteTakeBack = paletteTakeBack;
    }

    /**
     * @return 数量制限
     */
    @Basic
    @Column(name = "limit_quantity")
    public Integer getLimitQuantity() {
        return limitQuantity;
    }

    /**
     * @param limitQuantity 数量制限
     */
    public void setLimitQuantity(Integer limitQuantity) {
        this.limitQuantity = limitQuantity;
    }

    /**
     * @return 降ろし場所指定
     */
    @Basic
    @Column(name = "unloading_place")
    public String getUnloadingPlace() {
        return unloadingPlace;
    }

    /**
     * @param unloadingPlace 降ろし場所指定
     */
    public void setUnloadingPlace(String unloadingPlace) {
        this.unloadingPlace = unloadingPlace;
    }

    /**
     * @return 車両停車位置
     */
    @Basic
    @Column(name = "parking_place")
    public String getParkingPlace() {
        return parkingPlace;
    }

    /**
     * @param parkingPlace 車両停車位置
     */
    public void setParkingPlace(String parkingPlace) {
        this.parkingPlace = parkingPlace;
    }

    /**
     * @return 荷降ろし時のリフト使用者
     */
    @Basic
    @Column(name = "lift_user_in_unloading")
    public Integer getLiftUserInUnloading() {
        return liftUserInUnloading;
    }

    /**
     * @param liftUserInUnloading 荷降ろし時のリフト使用者
     */
    public void setLiftUserInUnloading(Integer liftUserInUnloading) {
        this.liftUserInUnloading = liftUserInUnloading;
    }

    /**
     * @return 荷降ろし形態
     */
    @Basic
    @Column(name = "unload_form")
    public String getUnloadForm() {
        return unloadForm;
    }

    /**
     * @param unloadForm 荷降ろし形態
     */
    public void setUnloadForm(String unloadForm) {
        this.unloadForm = unloadForm;
    }

    /**
     * @return その他注意事項
     */
    @Basic
    @Column(name = "attention", columnDefinition = "TEXT")
    public String getAttention() {
        return attention;
    }

    /**
     * @param attention その他注意事項
     */
    public void setAttention(String attention) {
        this.attention = attention;
    }

    /**
     * @return 画像情報 (表示順)
     */
    @Transient
    public List<ShippingDestinationImageDto> getImageList() {
        return imageList;
    }

    /**
     * @param imageList 画像情報 (表示順)
     */
    public void setImageList(List<ShippingDestinationImageDto> imageList) {
        this.imageList = imageList;
    }
}
