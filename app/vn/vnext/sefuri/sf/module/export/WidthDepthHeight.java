package vn.vnext.sefuri.sf.module.export;

import java.io.Serializable;
import java.util.Objects;

/**
 * 寸法
 */
public interface WidthDepthHeight {

    /**
     * @return 巾 or 縦
     */
    double getWidth();

    /**
     * @return 流れ or 横
     */
    double getDepth();

    /**
     * @return 高さ
     */
    double getHeight();

    /**
     * 生成
     *
     * @param width 巾 or 縦
     * @param depth 流れ or 横
     * @param height 高さ
     * @return 寸法 (不変)
     */
    public static WidthDepthHeight of(double width, double depth, double height) {
        return new ImmotalWidthDepthHeightImpl(width, depth, height);
    }

    /**
     * 生成
     *
     * @param width 巾 or 縦
     * @param depth 流れ or 横
     * @return 寸法 (不変)
     */
    public static WidthDepthHeight of(double width, double depth) {
        return new ImmotalWidthDepthHeightImpl(width, depth, 0.0);
    }


    /**
     * 実装 (不変クラス)
     */
    static class ImmotalWidthDepthHeightImpl implements WidthDepthHeight, Serializable {
        private static final long serialVersionUID = 8548469770687331946L;

        /** 巾 or 縦 */
        final double width;
        /** 流れ or 横 */
        final double depth;
        /** 高さ */
        final double height;

        /**
         * コンストラクタ
         *
         * @param width 巾 or 縦
         * @param depth 流れ or 横
         * @param height 高さ
         */
        ImmotalWidthDepthHeightImpl(double width, double depth, double height) {
            this.width = width;
            this.depth = depth;
            this.height = height;
        }

        @Override
        public double getWidth() {
            return width;
        }

        @Override
        public double getDepth() {
            return depth;
        }

        @Override
        public double getHeight() {
            return height;
        }

        @Override
        public boolean equals(Object obj) {
            // 注: NaN が含まれている場合は false と判定されます。
            if (this == obj) {
                return true;
            } else if (obj instanceof WidthDepthHeight) {
                WidthDepthHeight peer = (WidthDepthHeight)obj;
                return width == peer.getWidth() && depth == peer.getDepth() && height == peer.getHeight();
            } else {
                return false;
            }
        }

        @Override
        public int hashCode() {
            return Objects.hash(width, depth, height);
        }

        @Override
        public String toString() {
            return "WidthDepthHeight[width=" + width + ",depth=" + depth + ",height=" + height + "]";
        }
    }
}
