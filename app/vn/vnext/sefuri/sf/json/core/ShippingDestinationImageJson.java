package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * 届け先画像情報 Json
 *
 * 対応する TypeScript は client/src/app/model/core/ShippingDestinationImage.model.ts
 */
public class ShippingDestinationImageJson {

    /** 届け先画像情報 ID (応答のみ) */
    @JsonProperty("id")
    private Integer id;
    /** 画像 URL (応答のみ) */
    @JsonProperty("image")
    private String image;
    /** テンポラリファイル名(画像アップロード時のみ必須) */
    @JsonProperty("temporaryFileName")
    private String temporaryFileName;
    /** コメント */
    @JsonProperty("memo")
    private String memo;


    /**
     * @return 届け先画像情報 ID (応答のみ)
     */
    public Integer getId() {
        return id;
    }

    /**
     * @param id 届け先画像情報 ID (応答のみ)
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * @return 画像 URL (応答のみ)
     */
    public String getImage() {
        return image;
    }

    /**
     * @param image 画像 URL (応答のみ)
     */
    public void setImage(String image) {
        this.image = image;
    }

    /**
     * @return テンポラリファイル名(画像アップロード時のみ必須)
     */
    public String getTemporaryFileName() {
        return temporaryFileName;
    }

    /**
     * @param temporaryFileName テンポラリファイル名(画像アップロード時のみ必須)
     */
    public void setTemporaryFileName(String temporaryFileName) {
        this.temporaryFileName = temporaryFileName;
    }

    /**
     * @return コメント
     */
    public String getMemo() {
        return memo;
    }

    /**
     * @param memo コメント
     */
    public void setMemo(String memo) {
        this.memo = memo;
    }
}
