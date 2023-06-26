package vn.vnext.sefuri.sf.json.core;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;

/**
 * 届け先 (詳細)
 *
 * 対応する TypeScript は client/src/app/model/core/ShippingDestinationDetail.model.ts
 */
public class ShippingDestinationDetailJson extends ShippingDestinationJson {

    /** 路線会社指定 */
    @JsonProperty("deliveryCompany")
    private String deliveryCompany;
    /** 配送車両指定 */
    @JsonProperty("specifyVehicle")
    private Integer specifyVehicle;
    /** 配送車両指定(その他) */
    @JsonProperty("specifyVehicleOthers")
    private String specifyVehicleOthers;
    /** 納品時間 */
    @JsonProperty("deliveryTime")
    private String deliveryTime;
    /** 納品前TEL true(1): 要, false(0): 不要, null: 未記入 */
    @JsonProperty("telBeforeDelivery")
    private Boolean telBeforeDelivery;
    /** エボ添付 true(1): 要, false(0): 不要, null: 未記入 */
    @JsonProperty("attachmentEbo")
    private Boolean attachmentEbo;
    /** 天候不良時納品 true(1): 可, false(0): 不可, null: 未記入 */
    @JsonProperty("deliveryInCaseOfBadWeather")
    private Boolean deliveryInCaseOfBadWeather;
    /** ストレッチフィルム巻き true(1): 有, false(0): 無, null: 未記入 */
    @JsonProperty("stretchFilm")
    private Boolean stretchFilm;
    /** 2F上げ true(1): 有, false(0): 無, null: 未記入 */
    @JsonProperty("upstairs")
    private Boolean upstairs;
    /** 2F上げ (有の内容) */
    @JsonProperty("upstairsDetail")
    private Integer upstairsDetail;
    /** 2F上げその他 */
    @JsonProperty("upstairsDetailOthers")
    private String upstairsDetailOthers;
    /** パレット納品 true(1): 有, false(0): 無, null: 未記入 */
    @JsonProperty("paletteDelivery")
    private Boolean paletteDelivery;
    /** パレット引取 true(1): 有, false(0): 無, null: 未記入 */
    @JsonProperty("paletteTakeBack")
    private Boolean paletteTakeBack;
    /** 数量制限 */
    @JsonProperty("limitQuantity")
    private Integer limitQuantity;
    /** 降ろし場所指定 */
    @JsonProperty("unloadingPlace")
    private String unloadingPlace;
    /** 車両停車位置 */
    @JsonProperty("parkingPlace")
    private String parkingPlace;
    /** 荷降ろし時のリフト使用者 */
    @JsonProperty("liftUserInUnloading")
    private Integer liftUserInUnloading;
    /** 荷降ろし形態 */
    @JsonProperty("unloadForm")
    private String unloadForm;
    /** その他注意事項 */
    @JsonProperty("attention")
    private String attention;

    /** 届け先画像情報 (表示順) */
    @JsonProperty("imageList")
    private List<ShippingDestinationImageJson> imageList;


    /**
     * @return 路線会社指定
     */
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
    public String getAttention() {
        return attention;
    }

    /**
     * @param attention その他注意事項
     */
    public void setAttention(String attention) {
        this.attention = attention;
    }

    /** @return 届け先画像情報 (表示順) */
    public List<ShippingDestinationImageJson> getImageList() {
        return imageList;
    }

    /** @param fileList 届け先画像情報 (表示順) */
    public void setImageList(List<ShippingDestinationImageJson> imageList) {
        this.imageList = imageList;
    }

    /**
     * Create ShippingDestinationJson
     *
     *　<p>注: 画像情報はエンコードしません。
     *
     * @param dto ShippingDestinationDto
     */
    public void setData(ShippingDestinationDto dto) {
        super.setData(dto);

        this.deliveryCompany = dto.getDeliveryCompany();
        this.specifyVehicle = dto.getSpecifyVehicle();
        this.specifyVehicleOthers = dto.getSpecifyVehicleOthers();
        this.deliveryTime = dto.getDeliveryTime();
        this.telBeforeDelivery = dto.getTelBeforeDelivery();
        this.attachmentEbo = dto.getAttachmentEbo();
        this.deliveryInCaseOfBadWeather = dto.getDeliveryInCaseOfBadWeather();
        this.stretchFilm = dto.getStretchFilm();
        this.upstairs = dto.getUpstairs();
        this.upstairsDetail = dto.getUpstairsDetail();
        this.upstairsDetailOthers = dto.getUpstairsDetailOthers();
        this.paletteDelivery = dto.getPaletteDelivery();
        this.paletteTakeBack = dto.getPaletteTakeBack();
        this.limitQuantity = dto.getLimitQuantity();
        this.unloadingPlace = dto.getUnloadingPlace();
        this.parkingPlace = dto.getParkingPlace();
        this.liftUserInUnloading = dto.getLiftUserInUnloading();
        this.unloadForm = dto.getUnloadForm();
        this.attention = dto.getAttention();
        this.imageList = null;  // このメソッドではエンコードしません。呼び出し元で設定してください。
    }

    /**
     * Create ShippingDestinationDto
     *
     *　<p>注: 画像情報はデコードしません。
     *
     * @return ShippingDestinationDto
     */
    public ShippingDestinationDto getData() {
        ShippingDestinationDto dto = super.getData();

        dto.setDeliveryCompany(this.deliveryCompany);
        dto.setSpecifyVehicle(this.specifyVehicle);
        dto.setSpecifyVehicleOthers(this.specifyVehicleOthers);
        dto.setDeliveryTime(this.deliveryTime);
        dto.setTelBeforeDelivery(this.telBeforeDelivery);
        dto.setAttachmentEbo(this.attachmentEbo);
        dto.setDeliveryInCaseOfBadWeather(this.deliveryInCaseOfBadWeather);
        dto.setStretchFilm(this.stretchFilm);
        dto.setUpstairs(this.upstairs);
        dto.setUpstairsDetail(this.upstairsDetail);
        dto.setUpstairsDetailOthers(this.upstairsDetailOthers);
        dto.setPaletteDelivery(this.paletteDelivery);
        dto.setPaletteTakeBack(this.paletteTakeBack);
        dto.setLimitQuantity(this.limitQuantity);
        dto.setUnloadingPlace(this.unloadingPlace);
        dto.setParkingPlace(this.parkingPlace);
        dto.setLiftUserInUnloading(this.liftUserInUnloading);
        dto.setUnloadForm(this.unloadForm);
        dto.setAttention(this.attention);
        dto.setImageList(null);  // このメソッドではデコードしません。呼び出し元で設定してください。

        return dto;
    }
}
