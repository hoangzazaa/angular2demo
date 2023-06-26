package vn.vnext.sefuri.sf.util;

import org.junit.Test;
import play.test.WithApplication;
import vn.vnext.sefuri.sf.common.Constants;

import static org.junit.Assert.assertEquals;

/**
 * Test class for coverage cases in {@link FormatUtil}
 *
 * @author manhnv
 */
public class FormatUtilTest extends WithApplication {
    private String actual = null;

    @Test
    public void decimalFormat() {
        actual = FormatUtil.decimalFormat(null);
        assertEquals("0.0", actual);

        actual = FormatUtil.decimalFormat(1.0);
        assertEquals("1.0", actual);
        actual = FormatUtil.decimalFormat(0.1);
        assertEquals("0.1", actual);
        actual = FormatUtil.decimalFormat(123456789.23);
        assertEquals("123,456,789.2", actual);

        actual = FormatUtil.decimalFormat(10.15, null);
        assertEquals("10.2", actual);

        actual = FormatUtil.decimalFormat(10.15, "#.##");
        assertEquals("10.15", actual);
        actual = FormatUtil.decimalFormat(0.1, "#.00");
        assertEquals(".10", actual);
        actual = FormatUtil.decimalFormat(123456789.23, "#0.##");
        assertEquals("123456789.23", actual);
    }

    @Test
    public void formatName() {
        assertEquals(Constants.BLANK, FormatUtil.formatName(null));
        assertEquals(Constants.BLANK, FormatUtil.formatName(""));

        String data = "ABCDEFGHIJKLMN";
        assertEquals(data, FormatUtil.formatName(data));

        assertEquals("ABCDEFGHIJKLMNOPQRS...", FormatUtil.formatName("ABCDEFGHIJKLMNOPQRSTUVWXYZ"));
    }

    @Test
    public void formatDimension() {
        Integer[] dimension = {};
        assertEquals(Constants.BLANK, FormatUtil.formatDimension(FormatUtil.X_SEPARATOR, dimension));

        assertEquals("400 x 140", FormatUtil.formatDimension(null, 400, 140));

        assertEquals("400 x 140 x 45", FormatUtil.formatDimension(null, 400, 140, 45));

        assertEquals("400 x 140 x 45 x 15", FormatUtil.formatDimension(null, 400, 140, 45, 15));

        assertEquals("400 ~ 140 ~ 45", FormatUtil.formatDimension("~", 400, 140, 45));
    }

    @Test
    public void formatProductId() {
        assertEquals("000000", FormatUtil.formatProductId(null));
        assertEquals("000000", FormatUtil.formatProductId(0));
        assertEquals("000001", FormatUtil.formatProductId(01));
        assertEquals("000101", FormatUtil.formatProductId(101));
        assertEquals("009999", FormatUtil.formatProductId(9999));
        assertEquals("099999", FormatUtil.formatProductId(99999));
        assertEquals("999999", FormatUtil.formatProductId(999999));
        assertEquals("9999999", FormatUtil.formatProductId(9999999));
    }
}
