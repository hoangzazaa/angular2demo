package vn.vnext.sefuri.sf.module.export.model;

import java.io.File;
import java.util.Objects;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import vn.vnext.sefuri.sf.dto.ShippingDestinationImageDto;

/**
 * 届け先カルテ画像情報 PDF 出力用モデル
 */
public class ShippingDestinationKarteImageModel {

    /** 届け先画像情報 */
    private final ShippingDestinationImageDto image;
    /** 画像ファイル */
    private final File imageFile;

    /**
     * コンストラクタ
     *
     * @param image 画像情報
     * @param imageFile 画像ファイル
     */
    public ShippingDestinationKarteImageModel(@Nonnull ShippingDestinationImageDto image, @Nonnull File imageFile) {
        this.image = Objects.requireNonNull(image);
        this.imageFile = Objects.requireNonNull(imageFile);
    }

    /**
     * @return 届け先 ID
     */
    public Integer getShippingDestinationId() {
        return image.getShippingDestinationId();
    }

    /**
     * @return 表示順
     */
    public Integer getDisplayOrder() {
        return image.getDisplayOrder();
    }

    /**
     * @return メモ
     */
    public String getMemo() {
        return StringUtils.defaultString(image.getMemo());
    }

    /**
     * @return 画像ファイル
     */
    public File getImageFile() {
        return imageFile;
    }

    @Override
    public String toString() {
        return "ShippingDestinationKarteImageModel [imageFile=" + imageFile
                + ", displayOrder=" + getDisplayOrder() + ", memo=" + getMemo() + "]";
    }

}
