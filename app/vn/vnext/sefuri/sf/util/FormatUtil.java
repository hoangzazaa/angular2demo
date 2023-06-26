package vn.vnext.sefuri.sf.util;

import com.google.common.base.Strings;
import org.apache.commons.lang3.ArrayUtils;
import vn.vnext.sefuri.sf.common.Constants;

import java.math.BigDecimal;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * This class use to custom formats (number, string...).
 *
 * @author manhnv
 */
public final class FormatUtil implements Constants {
    /*Format number as grouping separator by comma, and in 1 decimal point format */
    private static NumberFormat df = new DecimalFormat(DEFAULT_FORMAT_NUMBER);

    /**
     * Format numbers as decimal format within 1 decimal places, grouping separator by comma.
     *
     * @param number the number will be formatted, {@link Number}
     * @return formatted number as string
     */
    public static String decimalFormat(final Number number) {
        if (number == null)
            return df.format(new BigDecimal(0));

        return df.format(number);
    }

    /**
     * Format numbers as decimal based on your pattern provides.
     *
     * @param number  the number will be formatted, {@link Number}
     * @param pattern the pattern format
     * @return formatted number as string
     */
    public static String decimalFormat(final Number number, final String pattern) {
        if (Strings.isNullOrEmpty(pattern))
            return decimalFormat(number);

        return new DecimalFormat(pattern).format(number);
    }

    /**
     * Format data display apply for (Quotation Memo | Product Name | File Name | Field).
     * If length less than 20 characters and display all.
     * Else if length greater than 20 characters then display as '...' from at 20 characters.
     *
     * @param content the current data to format
     * @return new formatted product name
     */
    public static String formatName(final String content) {
        if (Strings.isNullOrEmpty(content)) return BLANK;

        final String newProductName = content.trim();
        if (newProductName.length() <= DEFAULT_OFFSET)
            return newProductName;

        return newProductName.substring(0, DEFAULT_OFFSET - 1) + THREE_DOT;
    }

    /**
     * Format display dimension includes (width-depth-height) or more. Default display as 'width x height x depth'.
     *
     * @param pattern   the separator pattern
     * @param dimension the dimension of each side
     * @return new formatted dimension
     */
    public static String formatDimension(final String pattern, final Integer... dimension) {
        if (ArrayUtils.isEmpty(dimension))
            return BLANK;

        final int length = dimension.length;
        final String defaultPattern = (Strings.isNullOrEmpty(pattern) ? "x" : pattern);
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            Integer size = dimension[i];
            if (size != null) {
                if (i < length - 1)
                    sb.append(size).append(SPACE).append(defaultPattern).append(SPACE);
                else
                    sb.append(size);
            }
        }

        return sb.toString();
    }

    /**
     * Format product id - pad with zeros with 6 chars length.
     *
     * @param productId product id
     * @return new formatted product id
     */
    public static String formatProductId(final Integer productId) {
        if (productId == null)
            return String.format(DEFAULT_FORMAT_PAD_6_ZERO, 0);

        // Pad with zeros and a width of 6 chars.
        return String.format(DEFAULT_FORMAT_PAD_6_ZERO, productId);
    }

    /**
     * Method use to concat items. E.g. メモ1,2,3 to display.
     *
     * @param delimiter to separate item
     * @param items     array of items need to concat
     * @return concat item
     */
    public static String concatItem(final String delimiter, final String... items) {
        if (items == null || items.length == 0) return null;
        return Arrays.stream(items).filter(m -> !Strings.isNullOrEmpty(m)).collect(
                Collectors.joining(Strings.isNullOrEmpty(delimiter) ? Constants.COMMA : delimiter)).trim();
    }
}
