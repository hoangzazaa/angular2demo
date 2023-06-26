package vn.vnext.sefuri.sf.util;

import org.junit.Test;
import play.test.WithApplication;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

/**
 * Test class for coverage all test case in {@link GenerateUtil}
 *
 * @author manhnv
 */
public class GenerateUtilTest extends WithApplication {
    private String actualCode = null;
    private Integer actualId = null;

    @Test
    public void generateTemplateCode() {
        actualCode = GenerateUtil.generateTemplateCode(1);
        assertEquals("TMP00001", actualCode);

        actualCode = GenerateUtil.generateTemplateCode(10001);
        assertEquals("TMP10001", actualCode);

        actualCode = GenerateUtil.generateTemplateCode(999999);
        assertEquals("TMP999999", actualCode);
    }

    @Test(expected = IllegalArgumentException.class)
    public void generateTemplateCodeWithinException() {
        GenerateUtil.generateTemplateCode(null);
    }

    @Test
    public void generateDealCode() {
        String expected = DateUtil.getSysDate().yearOfCentury().get() + GenerateUtil.FIXED_DEAL + "00001";
        actualCode = GenerateUtil.generateDealCode(1);
        assertEquals(expected, actualCode);

        expected = DateUtil.getSysDate().yearOfCentury().get() + GenerateUtil.FIXED_DEAL + "10001";
        actualCode = GenerateUtil.generateDealCode(10001);
        assertEquals(expected, actualCode);

        expected = DateUtil.getSysDate().yearOfCentury().get() + GenerateUtil.FIXED_DEAL + "999999";
        actualCode = GenerateUtil.generateDealCode(999999);
        assertEquals(expected, actualCode);
    }

    @Test(expected = IllegalArgumentException.class)
    public void generateDealCodeWithinException() {
        GenerateUtil.generateDealCode(null);
    }

    @Test
    public void getTemplateIdByCode() {
        actualId = GenerateUtil.getTemplateIdByCode("TMP00001");
        assertTrue(actualId == 1);

        actualId = GenerateUtil.getTemplateIdByCode("TMP10001");
        assertTrue(actualId == 10001);

        actualId = GenerateUtil.getTemplateIdByCode("TMP999999");
        assertTrue(actualId == 999999);
    }

    @Test(expected = IllegalArgumentException.class)
    public void getTemplateIdByCodeWithinException() {
        GenerateUtil.getTemplateIdByCode(null);
    }

    @Test
    public void getDealIdByCode() {
        actualId = GenerateUtil.getDealIdByCode("16S00001");
        assertTrue(actualId == 1);

        actualId = GenerateUtil.getDealIdByCode("16S10001");
        assertTrue(actualId == 10001);

        actualId = GenerateUtil.getDealIdByCode("16S999999");
        assertTrue(actualId == 999999);
    }

    @Test(expected = IllegalArgumentException.class)
    public void getDealIdByCodeWithinException() {
        GenerateUtil.getDealIdByCode(null);
    }

}
