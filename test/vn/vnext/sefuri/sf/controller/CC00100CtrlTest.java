package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testdata.UserData;

import static org.junit.Assert.assertEquals;
import static play.mvc.Http.Status.*;

/**
 * Created by haipt on 10/17/2016.
 */
public class CC00100CtrlTest extends CommonCtrlTest {

    /**
     * Test service cc0010001Login
     * 01: login successful
     */
    @Test
    public void cc0010001LoginTest_01() {

        // prepare data
        prepareData(new UserData());

        // start test
        String req = "{\"email\":\"admin@vnext.vn\",\"password\":\"123456\"}";
        Result result = sendPostRequest("/CC00101", req, false);

        // confirm result
        assertEquals(OK, result.status());
    }

    /**
     * Test service cc0010001Login
     * 02: login fail, no user
     */
    @Test
    public void cc0010001LoginTest_02() {

        // start test
        String req = "{\"email\":\"hoangtd@vnext\",\"password\":\"123456\"}";
        Result result = sendPostRequest("/CC00101", req, false);

        // confirm result
        assertEquals(UNAUTHORIZED, result.status());
    }

    /**
     * Test service cc0010001Login
     * 02: login fail, no request body
     */
    @Test
    public void cc0010001LoginTest_03() {

        // start test
        Result result = sendPostRequest("/CC00101", null, false);

        // confirm result
        assertEquals(BAD_REQUEST, result.status());
    }

    /**
     * Test service cc0010002Authorize
     * 01: authen successful
     */
    @Test
    public void cc0010002AuthorizeTest_01() {
        // prepare data
        prepareData(new UserData());

        // login user
        loginUser("test@test.com", "1234");

        // start test
        Result result = sendGetRequest("/CC00102", true);

        // confirm result
        assertEquals(OK, result.status());
    }

    /**
     * Test service cc0010002Authorize
     * 02: no cookie
     */
    @Test
    public void cc0010002AuthorizeTest_02() {
        // start test
        Result result = sendGetRequest("/CC00102", false);

        // confirm result
        assertEquals(UNAUTHORIZED, result.status());
    }

    /**
     * Test service cc0010002Authorize
     * 03: cookie invalid
     */
    @Test
    public void cc0010002AuthorizeTest_03() {
        // prepare invalid cookie
        tokenCookie = new Http.Cookie("token", "invalid", 1000, "/", "", false, false);

        // start test
        Result result = sendGetRequest("/CC00102", true);

        // confirm result
        assertEquals(UNAUTHORIZED, result.status());
    }

    /**
     * Test service cc0010003Logout
     * 01: logout success
     */
    @Test
    public void cc0010003LogoutTest_01() {
        // prepare data
        prepareData(new UserData());

        // login user
        loginUser("test@test.com", "1234");

        // start test
        Result result = sendGetRequest("/CC00103", true);

        // confirm result
        assertEquals(OK, result.status());
    }

    /**
     * Test service cc0010003Logout
     * 01: logout fail (not loged in)
     */
    @Test
    public void cc0010003LogoutTest_02() {
        // start test
        Result result = sendGetRequest("/CC00103", false);

        // confirm result
        assertEquals(OK, result.status());
    }
}
