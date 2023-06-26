package vn.vnext.sefuri.sf.module.export;

import java.io.Serializable;
import java.util.Objects;

/**
 * 上と下のサイズを保持するインターフェース
 */
public interface UpperLower {

    /**
     * @return 上のサイズ
     */
    double getUpper();

    /**
     * @return 下のサイズ
     */
    double getLower();

    /**
     * 生成
     *
     * @param upper 上のサイズ
     * @param lower 下のサイズ
     */
    public static UpperLower of(double upper, double lower) {
        return new ImmotalUpperLowerImpl(upper, lower);
    }


    /**
     * 実装 (不変クラス)
     */
    static class ImmotalUpperLowerImpl implements UpperLower, Serializable {
        private static final long serialVersionUID = -2577074089742672453L;

        /** 上のサイズ */
        final double upper;
        /** 下のサイズ */
        final double lower;

        /**
         * コンストラクタ
         *
         * @param upper 上のサイズ
         * @param lower 下のサイズ
         */
        ImmotalUpperLowerImpl(double upper, double lower) {
            this.upper = upper;
            this.lower = lower;
        }

        @Override
        public double getUpper() {
            return upper;
        }

        @Override
        public double getLower() {
            return lower;
        }

        @Override
        public boolean equals(Object obj) {
            // NaN があると false と判定されます。
            if (this == obj) {
                return true;
            } else if (obj instanceof UpperLower) {
                UpperLower peer = (UpperLower)obj;
                return upper == peer.getUpper() && lower == peer.getLower();
            } else {
                return false;
            }
        }

        @Override
        public int hashCode() {
            return Objects.hash(upper, lower);
        }

        @Override
        public String toString() {
            return "UpperLower[upper=" + upper + ",lower=" + lower + "]";
        }
    }
}
