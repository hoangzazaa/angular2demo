package vn.vnext.sefuri.sf.common.fields;

import java.io.Serializable;
import java.util.Map;

import javax.annotation.Nonnull;

import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * 時間指定フィールド (不変)
 *
 * <p>sfr_sf_shipping_destination の
 * <ul>
 * <li>specify_time
 * <li>specify_time_hour
 * <li>specify_time_minute
 * <li>specify_time_period
 * </ul>
 */
public class SpecifyTime implements Serializable {
    private static final long serialVersionUID = -5044169461039320666L;

    /** 時間指定区分 */
    private final Kubun kubun;
    /** 時間指定(時) */
    private final int hour;
    /** 時間指定(分) */
    private final int minute;
    /** 時間指定期間 */
    private final PeriodKubun periodKubun;

    /** 空 */
    private static final SpecifyTime EMPTY = new SpecifyTime(null, 0, 0, null);


    /**
     * コンストラクタ
     *
     * @param kubun 時間指定区分
     * @param hour 時
     * @param minute 分
     * @param periodKubun 時間指定期間
     */
    private SpecifyTime(Kubun kubun, Integer hour, Integer minute, PeriodKubun periodKubun) {
        this.kubun = kubun;
        this.hour = hour;
        this.minute = minute;
        this.periodKubun = periodKubun;
    }

    /**
     * ファクトリメソッド
     *
     * @param value 時間指定区分値
     * @param hour 時
     * @param minute 分
     * @param period 時間指定期間区分値
     * @return SpecifyTime
     */
    public static SpecifyTime of(Integer value, Integer hour, Integer minute, Integer period) {
        Kubun kubun = Kubun.of(value);
        if (kubun == null || !kubun.isHavingTime()) {
            // 時間なし区分
            return new SpecifyTime(kubun, 0, 0, null);
        } else if (hour != null || minute != null) {
            // 時間あり区分
            return new SpecifyTime(
                    kubun,
                    hour != null ? hour : 0,
                    minute != null ? minute : 0,
                    PeriodKubun.of(period));
        } else {
            // 時間あり区分だが、時間が入力されていない
            return EMPTY;
        }
    }

    /**
     * @return 時間指定区分
     */
    public Kubun getKubun() {
        return kubun;
    }

    /**
     * @return 時間指定(時)
     */
    public int getHour() {
        return hour;
    }

    /**
     * @return 時間指定(分)
     */
    public int getMinute() {
        return minute;
    }

    /**
     * @return 時間指定期間
     */
    public PeriodKubun getPeriodKubun() {
        return periodKubun;
    }

    /**
     * 時間指定の表示文字列を取得する
     *
     * <p>client/src/app/component/specify-time-modal/SpecifyTimeModal.helper.ts の SpecifyTimeModalHelper.getSpecifyTimeName() と同じ
     *
     * @return 時間指定の表示文字列
     */
    public String getDisplayString() {
        if (kubun == null) {
            return "";
        } else if (!kubun.isHavingTime()) {
            return kubun.getDiaplayName();
        } else {
            String suffix = "";
            switch (kubun) {
            case AT:
                suffix = "に";
                break;
            case UNTIL:
                suffix = "迄";
                break;
            case AFTER:
                suffix = "以降";
                break;
            }
            return hour + "時" + minute + "分" + suffix;
        }
    }


    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + hour;
        result = prime * result + ((kubun == null) ? 0 : kubun.hashCode());
        result = prime * result + minute;
        result = prime * result + ((periodKubun == null) ? 0 : periodKubun.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SpecifyTime other = (SpecifyTime) obj;
        if (hour != other.hour)
            return false;
        if (kubun != other.kubun)
            return false;
        if (minute != other.minute)
            return false;
        if (periodKubun != other.periodKubun)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "SpecifyTime [kubun=" + kubun + ", hour=" + hour + ", minute=" + minute + ", periodKubun=" + periodKubun
                + "]";
    }



    /**
     * 時間指定区分値 (specify_time)
     */
    public enum Kubun {
        /** 直送 */
        DIRECT(1, "直送"),
        /** 何時何分に */
        AT(2, "何時何分に"),
        /** 何時何分迄 */
        UNTIL(3, "何時何分迄"),
        /** 午前中 */
        IN_THE_MORNING(4, "午前中"),
        /** 何時何分以降 */
        AFTER(5, "何時何分以降"),
        /** 午後から */
        AFTERNOON(6, "午後から"),
        /** 当日中 */
        IN_THE_DAY(7, "当日中"),
        /** 引き取り */
        TAKE_OFF(8, "引き取り"),
        /** 営業便 */
        SALES(9, "営業便"),
        /** 指定無し */
        UNSPECIFIED(10, "指定無し"),
        /** 在庫補充 */
        REPLENISHMENT(11, "在庫補充"),
        /** セット　部品 */
        SET_PARTS(12, "セット　部品"),
        /** お客様ｻﾝﾌﾟﾙ */
        CUSTOMER_SAMPLE(13, "お客様ｻﾝﾌﾟﾙ"),
        /** 内部ｻﾝﾌﾟﾙ */
        HOUSE_SAMPLE(14, "内部ｻﾝﾌﾟﾙ");

        /** 区分値 */
        private final int id;
        /** 画面表示名 */
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, Kubun> idMap
            = CollectionUtil.toUnmodifiableMap(values(), Kubun::getId);

        /**
         * コンストラクタ
         *
         * @param id 区分値
         * @param displayName 画面表示名
         */
        Kubun(int id, String displayName) {
            this.id = id;
            this.displayName = displayName;
        }

        /**
         * @return 区分値
         */
        public @Nonnull Integer getId() {
            return id;
        }

        /**
         * @return 画面表示名
         */
        public String getDiaplayName() {
            return displayName;
        }

        /**
         * 時間指定が必要な区分かどうか判定する
         *
         * @return true: 時間指定必要, false: 時間指定不要
         */
        public boolean isHavingTime() {
            return this == AT || this == UNTIL || this == AFTER;
        }


        /**
         * id を元に SpecifyTime.Kubun を解決する
         *
         * @param id ID 値
         * @return SpecifyTime.Kubun (null: id 値不正)
         */
        public static Kubun of(Integer id) {
            return idMap.get(id);
        }
    }

    /**
     * 時間指定期間区分値 (specify_time_period)
     */
    public enum PeriodKubun {
        /** に */
        AT(1, "に"),
        /** まで */
        UNTIL(2, "まで"),
        /** 以降 */
        AFTER(3, "以降");

        /** 区分値 */
        private final int id;
        /** 画面表示名 */
        private final String displayName;

        /** ID → enum 変換表 */
        private static final Map<Integer, PeriodKubun> idMap
            = CollectionUtil.toUnmodifiableMap(values(), PeriodKubun::getId);

        /**
         * コンストラクタ
         *
         * @param id 区分値
         * @param displayName 画面表示名
         */
        PeriodKubun(int id, String displayName) {
            this.id = id;
            this.displayName = displayName;
        }

        /**
         * @return 区分値
         */
        public @Nonnull Integer getId() {
            return id;
        }

        /**
         * @return 画面表示名
         */
        public String getDiaplayName() {
            return displayName;
        }

        /**
         * id を元に SpecifyTime.PeriodKubun を解決する
         *
         * @param id ID 値
         * @return SpecifyTime.PeriodKubun (null: id 値不正)
         */
        public static PeriodKubun of(Integer id) {
            return idMap.get(id);
        }
    }
}
