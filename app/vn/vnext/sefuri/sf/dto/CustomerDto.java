package vn.vnext.sefuri.sf.dto;

import java.util.List;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Transient;

/**
 * Contain all customer infos.
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_customer")
public class CustomerDto extends BaseDto {

    /* 得意先名 */
    private String name;
    /* 担当営業  */
    private String salerName;
    /* HP経由 */
    private Integer hpInfo;
    /* 備考(営業カルテ) */
    private String memo;
    /* customerCode */
    private String customerCode;
    /* deleteFlag */
    private Integer deleteFlag = 0;
    /* abbreviation */
    private String abbreviation;
    /* furigana */
    private String furigana;
    /* abbrFurigana */
    private String abbrFurigana;
    /* customerRep */
    private String customerRep;
    /* 得意先担当者 */
    private String customerContact;
    /* 業務担当 */
    private String picCode;
    /* 請求方法区分 */
    private String billingMethod;
    /* startYear */
    private Integer startYear;
    /* customerRsDeal */
    private List<DealDto> deal;
    /* customerRsShippingDestination */
    private List<ShippingDestinationDto> shippingDestinations;
    /** 備考(出荷部門用カルテ) */
    private String remarksForShipping;


    //region Transient

    private UserDto picUser;

    @Transient
    public UserDto getPicUser() {
        return picUser;
    }

    public void setPicUser(UserDto picUser) {
        this.picUser = picUser;
    }

    //endregion

    /**
     * @return DFW_M30M.取引先名1
     */
    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    /**
     * @param name DFW_M30M.取引先名1
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return DFW_M30M.業務担当C
     */
    @Basic
    @Column(name = "saler_name")
    public String getSalerName() {
        return salerName;
    }

    /**
     * @param salerName DFW_M30M.業務担当C
     */
    public void setSalerName(String salerName) {
        this.salerName = salerName;
    }

    /**
     * @return hpInfo DFW_M30M.暑中見舞
     */
    @Basic
    @Column(name = "hp_info")
    public Integer getHpInfo() {
        return hpInfo;
    }

    /**
     * @param hpInfo DFW_M30M.暑中見舞
     */
    public void setHpInfo(Integer hpInfo) {
        this.hpInfo = hpInfo;
    }

    /**
     * @return 備考(営業カルテ)
     */
    @Basic
    @Column(name = "memo")
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo 備考(営業カルテ)
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }

    /**
     * @return DFW_M30M.取引先C
     */
    @Basic
    @Column(name = "customer_code")
    public String getCustomerCode() {
        return customerCode;
    }

    /**
     * @param customerCode DFW_M30M.取引先C
     */
    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    /**
     * Get deleteFlag
     *
     * 1: Considered as delete record
     *
     * @return deleteFlag
     */
    @Basic
    @Column(name = "delete_flag")
    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    /**
     * Set deleteFlag
     *
     * @param deleteFlag Integer
     */
    public void setDeleteFlag(Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    /**
     * @return DFW_M30M.略称漢字
     */
    @Basic
    @Column(name = "abbreviation")
    public String getAbbreviation() {
        return abbreviation;
    }

    /**
     * @param abbreviation DFW_M30M.略称漢字
     */
    public void setAbbreviation(String abbreviation) {
        this.abbreviation = abbreviation;
    }

    /**
     * @return DFW_M30M.フリガナ
     */
    @Basic
    @Column(name = "furigana")
    public String getFurigana() {
        return furigana;
    }

    /**
     * @param furigana DFW_M30M.フリガナ
     */
    public void setFurigana(String furigana) {
        this.furigana = furigana;
    }

    /**
     * @return DFW_M30M.略称カナ
     */
    @Basic
    @Column(name = "abbr_furigana")
    public String getAbbrFurigana() {
        return abbrFurigana;
    }

    /**
     * @param abbrFurigana DFW_M30M.略称カナ
     */
    public void setAbbrFurigana(String abbrFurigana) {
        this.abbrFurigana = abbrFurigana;
    }

    /**
     * @return DFW_M30M.客先代表者名
     */
    @Basic
    @Column(name = "customer_rep")
    public String getCustomerRep() {
        return customerRep;
    }

    /**
     * @param customerRep DFW_M30M.客先代表者名
     */
    public void setCustomerRep(String customerRep) {
        this.customerRep = customerRep;
    }

    /**
     * @return DFW_M30M.客先担当者名
     */
    @Basic
    @Column(name = "customer_contact")
    public String getCustomerContact() {
        return customerContact;
    }

    /**
     * @param customerContact DFW_M30M.客先担当者名
     */
    public void setCustomerContact(String customerContact) {
        this.customerContact = customerContact;
    }

    /**
     * @return DFW_M30M.営業担当者C
     */
    @Basic
    @Column(name = "pic_code")
    public String getPicCode() {
        return picCode;
    }

    /**
     * @param picCode DFW_M30M.営業担当者C
     */
    public void setPicCode(String picCode) {
        this.picCode = picCode;
    }

    @Basic
    @Column(name = "start_year")
    public Integer getStartYear() {
        return startYear;
    }

    public void setStartYear(Integer startYear) {
        this.startYear = startYear;
    }

    /**
     * @return DFW_M30M.FILLER20
     */
    @Basic
    @Column(name = "billing_method")
    public String getBillingMethod() {
        return billingMethod;
    }

    /**
     * @param billingMethod DFW_M30M.FILLER20
     */
    public void setBillingMethod(String billingMethod) {
        this.billingMethod = billingMethod;
    }

    /**
     * Get deal
     *
     * @return deal
     */
    @Transient
    public List<DealDto> getDeal() {
        return deal;
    }

    /**
     * Set deal
     *
     * @param deal List<DealDto>
     */
    public void setDeal(List<DealDto> deal) {
        this.deal = deal;
    }

    /**
     * Get shippingDestinations
     *
     * @return shippingDestinations
     */
    @Transient
    public List<ShippingDestinationDto> getShippingDestinations() {
        return shippingDestinations;
    }

    /**
     * Set shippingDestinations
     *
     * @param shippingDestinations List<ShippingDestinationDto>
     */
    public void setShippingDestinations(List<ShippingDestinationDto> shippingDestinations) {
        this.shippingDestinations = shippingDestinations;
    }

    /**
     * @return 備考(出荷部門用カルテ)
     */
    @Basic
    @Column(name = "remarks_for_shipping", columnDefinition = "TEXT")
    public String getRemarksForShipping() {
        return remarksForShipping;
    }

    /**
     * @param remarksForShipping 備考(出荷部門用カルテ)
     */
    public void setRemarksForShipping(String remarksForShipping) {
        this.remarksForShipping = remarksForShipping;
    }
}