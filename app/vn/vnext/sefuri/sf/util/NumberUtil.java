package vn.vnext.sefuri.sf.util;

import java.math.BigDecimal;

/**
 * 数値に関するユーティリティ
 */
public abstract class NumberUtil {

    /**
     * 小数点以下を四捨五入する
     *
     * @param value 値
     * @return 四捨五入した値 (null: value が null)
     */
    public static BigDecimal roundHalfUp(BigDecimal value) {
        return value != null ? value.setScale(0, BigDecimal.ROUND_HALF_UP) : null;
    }

}
