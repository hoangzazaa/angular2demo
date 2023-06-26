package vn.vnext.sefuri.sf.util;

import com.google.common.base.Strings;
import org.apache.commons.lang3.Validate;
import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.helper.JodaTimeConverter;

import java.text.DateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * This class provides the common method to convert & format date used for system.
 *
 * @author manhnv
 */
public final class DateUtil implements Constants {
    public static final String MM_DD_DATE_FORMAT = "MM/dd";
    public static final String DEFAULT_JP_DATE_FORMAT = "yyyy年M月d日";
    private static DateTimeFormatter dateFormatterJp = DateTimeFormat.forPattern(DEFAULT_JP_DATE_FORMAT);
    private static DateTimeFormatter dateFormatter = DateTimeFormat.forPattern(DEFAULT_DATE_FORMAT);
    private static DateTimeFormatter dateTimeFormatter = DateTimeFormat.forPattern(DEFAULT_DATETIME_FORMAT);

    /**
     * Format {@link DateTime} to date string.
     *
     * @param date the date will be formatted
     * @return date string
     */
    public static String formatDate(final DateTime date) {
        if (date == null)
            return BLANK;

        return dateFormatter.print(date);
    }

    /**
     * Format {@link DateTime} to date string.
     *
     * @param date    the date will be formatted
     * @param pattern the pattern syntax
     * @return date string
     */
    public static String formatDate(final DateTime date, final String pattern) {
        if (date == null || Strings.isNullOrEmpty(pattern))
            // format as default Sfr date format
            return formatDate(date);

        // format as custom date format
        return DateTimeFormat.forPattern(pattern).print(date);
    }

    /**
     * Format {@link DateTime} to date time string.
     *
     * @param date the date will be formatted
     * @return date string
     */
    public static String formatDateTime(final DateTime date) {
        if (date == null)
            return BLANK;

        return dateTimeFormatter.print(date);
    }

    /**
     * Format {@link DateTime} to date time string.
     *
     * @param date    the date will be formatted
     * @param pattern the pattern syntax
     * @return date string
     */
    public static String formatDateTime(final DateTime date, final String pattern) {
        if (date == null || Strings.isNullOrEmpty(pattern))
            // format as default
            return formatDateTime(date);

        // format as custom date format
        return DateTimeFormat.forPattern(pattern).print(date);
    }

    /**
     * Get system date time as {@link DateTime}.
     *
     * @return current date time
     */
    public static DateTime getSysDate() {
        return DateTime.now();
    }

    public static int getFinancialYear(DateTime date) {
        Validate.notNull(date);

        int month = date.getMonthOfYear();
        int year = date.getYear();
        // if month < April then down year by 1
        if (month < Constants.MONTH_FINANCIAL_YEAR_START) {
            year = year - 1;
        }
        // return financial year
        return year;
    }

    public static int monthToFinancialMonth(int month) {
        if (month < 4) {
            return month + 9;
        } else {
            return month - 3;
        }
    }

    /**
     * Format {@link Date} to date string as Japanese date format.
     *
     * @param date the date will be formatted
     * @return date string (#example: 2017年5月19日)
     */
    public static String formatDateJp(final Date date) {
        if (date == null)
            return BLANK;

        DateFormat df = DateFormat.getDateInstance(DateFormat.FULL, Locale.JAPAN);
        return df.format(date);
    }

    /**
     * Format {@link DateTime} to date string as Japanese date format.
     *
     * @param date the date will be formatted
     * @return date string (#example: 2017年5月19日)
     */
    public static String formatDateJp(final DateTime date) {
        if (date == null)
            return BLANK;

        return dateFormatterJp.withLocale(Locale.JAPAN).print(date);
    }

    /**
     * Format {@link DateTime} to date string as Japanese date format.
     *
     * @param date    the date will be formatted
     * @param pattern the pattern syntax
     * @return date string (#example: 2017年5月19日)
     */
    public static String formatDateJp(final DateTime date, final String pattern) {
        if (date == null || Strings.isNullOrEmpty(pattern))
            // format as default Sfr date format
            return formatDateJp(date);

        // format as custom date format
        return DateTimeFormat.forPattern(pattern).withLocale(Locale.JAPAN).print(date);
    }

    public static DateTime getFirstDayOfMonth(DateTime dateTime) {
        return new DateTime(dateTime.getYear(), dateTime.getMonthOfYear(), 1, 0, 0, 0);
    }

    public static DateTime getLastDayOfMonth(DateTime dateTime) {
        // reset to the first day of month
        DateTime fistDayOfMonth = getFirstDayOfMonth(dateTime);
        // get the last day of month
        DateTime lastDay = fistDayOfMonth.dayOfMonth().withMaximumValue();
        return new DateTime(lastDay.getYear(), lastDay.getMonthOfYear(), lastDay.getDayOfMonth(), 23, 59, 59);
    }

    public static JodaTimeConverter getJodaDateTimeConverter() {
        return new JodaTimeConverter();
    }

    public static int daysDiff(DateTime startDate, DateTime endDate) {
        // check null
        if (startDate == null || endDate == null) {
            return 0;
        }
        int days = Days.daysBetween(startDate.toLocalDate(), endDate.toLocalDate()).getDays();

        return days;
    }

    public static DateTime getDateTime(Object object, DateTime defaultValue) {
        if (object == null) {
            return defaultValue;
        }
        try {
            return new DateTime(object);
        } catch (Exception ex) {
            return defaultValue;
        }
    }
}
