package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testdata.UserData;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.OK;

/**
 * Created by haipt on 10/17/2016.
 */
public class CC00201CtrlTest extends CommonCtrlTest {

    /**
     * Test service cc0020101RecoverPassword
     * 01: valid email
     */
    @Test
    public void cc0020101RecoverPasswordTest_01() {

        // prepare data
        prepareData(new UserData());

        // start test
        String req = "{\"email\":\"test@test.com\"}";
        Result result = sendPostRequest("/CC00201", req, false);

        // confirm result
        assertEquals(OK, result.status());
    }

    /**
     * Test service cc0020101RecoverPassword
     * 02: email not exists
     */
    @Test
    public void cc0020101RecoverPasswordTest_02() {

        // start test
        String req = "{\"email\":\"test@test.com\"}";
        Result result = sendPostRequest("/CC00201", req, false);

        // confirm result
        assertEquals(OK, result.status());
    }
}
