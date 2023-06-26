package vn.vnext.sefuri.sf.module.export.model;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;

import vn.vnext.sefuri.sf.common.enums.BarcodeKubun;

/**
 * Jasper バーコードフィールド用のインターフェース
 */
public interface BarcodeField {

    /**
     * バーコード種別の表示文字列
     *
     * @return バーコード種別の表示文字列
     */
    String getTypeDisplayName();

    /**
     * バーコードの値
     *
     * @return バーコードの値
     */
    String getValue();

    /**
     * バーコードを表示するかどうか
     *
     * @return true: 表示する, false: 表示しない
     */
    default boolean isShow() {
        return !StringUtils.isEmpty(getTypeDisplayName());
    }

    /**
     * 空のフィールド
     */
    public static final BarcodeField EMPTY = valueOf("", "");

    /**
     * ファクトリ
     *
     * @param typeDisplayName バーコード種別の表示文字列
     * @param value バーコードの値
     * @return バーコードフィールド
     */
    public static BarcodeField valueOf(@Nonnull String typeDisplayName, @Nonnull String value) {
        return new BarcodeField() {
            @Override
            public String getValue() {
                return value;
            }

            @Override
            public String getTypeDisplayName() {
                return typeDisplayName;
            }

            @Override
            public String toString() {
                return "BarcodeField[typeDisplayName=" + getTypeDisplayName() + ", value=" + value + "]";
            }
        };
    }
}
