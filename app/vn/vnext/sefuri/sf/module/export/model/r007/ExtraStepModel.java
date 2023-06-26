package vn.vnext.sefuri.sf.module.export.model.r007;

import java.util.Objects;

import javax.annotation.Nonnull;

/**
 * 段ボール追加工程 製造仕様書出力用モデル
 */
public class ExtraStepModel {

    /** 追加工程表示名 */
    @Nonnull private String displayName;

    /**
     * @return 追加工程表示名
     */
    public String getDisplayName() {
        return displayName;
    }

    /**
     * 追加工程表示名を設定
     *
     * @param displayName 追加工程表示名
     */
    public void setDisplayName(@Nonnull String displayName) {
        this.displayName = Objects.requireNonNull(displayName);
    }

    /**
     * コンストラクタ
     */
    public ExtraStepModel() {
    }

    /**
     * コンストラクタ
     *
     * @param displayName 追加工程表示名
     */
    public ExtraStepModel(@Nonnull String displayName) {
        this.displayName = Objects.requireNonNull(displayName);
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        } else if (obj instanceof ExtraStepModel) {
            return Objects.equals(this.getDisplayName(), ((ExtraStepModel)obj).getDisplayName());
        } else {
            return false;
        }
    }

    @Override
    public int hashCode() {
        return getDisplayName().hashCode() + 1;
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName()
                + "[displayName=" + getDisplayName() + "]";
    }
}
