package vn.vnext.sefuri.sf.util;

import org.joda.time.DateTime;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;
import play.test.WithApplication;
import vn.vnext.sefuri.sf.common.Constants;

/**
 * Test class for coverage all test case in {@link DateUtil}
 *
 * @author manhnv
 */
public class DateUtilTest extends WithApplication {

    private String newDf = "MM/dd/yyyy";
    private String newDtf = "MM/dd/yyyy HH:mm:ss";

    private static DateTime dateTime;

    @BeforeClass
    public static void init() throws Exception {
        dateTime = new DateTime(2016, 10, 31, 11, 30, 15, 100);
    }

    @AfterClass
    public static void destroy() throws Exception {
        dateTime = null;
    }

    @Test
    public void formatDate() {
        String actual = DateUtil.formatDate(null);
        Assert.assertEquals(Constants.BLANK, actual);

        actual = DateUtil.formatDate(dateTime);
        Assert.assertEquals("2016/10/31", actual);

        actual = DateUtil.formatDate(dateTime, null);
        //the pattern is null then must return default format
        Assert.assertEquals("2016/10/31", actual);

        actual = DateUtil.formatDate(null, newDf);
        //the date is null then must return default format
        Assert.assertEquals(Constants.BLANK, actual);

        actual = DateUtil.formatDate(dateTime, newDf);
        Assert.assertEquals("10/31/2016", actual);
    }

    @Test
    public void formatDateTime() {
        String actual = DateUtil.formatDateTime(null);
        Assert.assertEquals(Constants.BLANK, actual);

        actual = DateUtil.formatDateTime(dateTime);
        Assert.assertEquals("2016/10/31 11:30:15", actual);

        actual = DateUtil.formatDateTime(dateTime, null);
        //the pattern is null then must return default format
        Assert.assertEquals("2016/10/31 11:30:15", actual);

        actual = DateUtil.formatDateTime(null, newDtf);
        //the date is null then must return default format
        Assert.assertEquals(Constants.BLANK, actual);

        actual = DateUtil.formatDateTime(dateTime, newDtf);
        Assert.assertEquals("10/31/2016 11:30:15", actual);
    }

    @Test
    public void getSysDate() {
        Assert.assertEquals(DateTime.now().yearOfCentury().get(), DateUtil.getSysDate().yearOfCentury().get());
    }
}
