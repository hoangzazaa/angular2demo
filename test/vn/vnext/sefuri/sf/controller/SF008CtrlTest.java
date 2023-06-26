package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.json.response.SF0080101Res;
import vn.vnext.sefuri.sf.json.response.SF0080102Res;
import vn.vnext.sefuri.sf.json.response.SF0080103Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.SF00800DataHelper;
import vn.vnext.sefuri.sf.testdata.SF0080101_04;
import vn.vnext.sefuri.sf.testdata.SF0080102_01;
import vn.vnext.sefuri.sf.testdata.SF0080102_04;

import static org.junit.Assert.assertEquals;

/**
 * Created by TungNT on 2/9/2017.
 */
public class SF008CtrlTest extends CommonCtrlTest {
    /**
     * 01:get infor success
     */
    @Test
    public void sf0080101Init_01() {
        Integer productId = 1;
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0080101/" + productId, true);
        SF00800DataHelper<SF0080101Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080101Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());

    }

    /**
     * 02:get infor fail
     * product null
     */
    @Test
    public void sf0080101Init_02() {
        Integer productId = 4000;
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0080101/" + productId, true);
        SF00800DataHelper<SF0080101Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080101Res.class, result);

        // 2.0 Check responseData
        assertEquals("0", resResponseDataHelper.getStatus());
    }

    /**
     * 03:drawingImageList is empty
     */
    @Test
    public void sf0080101Init_03() {
        Integer productId = 4;
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0080101/" + productId, true);
        SF00800DataHelper<SF0080101Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080101Res.class, result);

        // 2.0 Check responseData
        assertEquals("0", resResponseDataHelper.getStatus());
    }

    /**
     * 04:MstShape is null
     */
    @Test
    public void sf0080101Init_04() {
        Integer productId = 1;
        // prepare data
        prepareData(new SF0080101_04());

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0080101/" + productId, true);
        SF00800DataHelper<SF0080101Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080101Res.class, result);

        // 2.0 Check responseData
        assertEquals("0", resResponseDataHelper.getStatus());
    }

    /**
     * 01: Save info successful - normal case
     */
    @Test
    public void sf0080102Save_01() {
        String json = loadJsonData("SF0080102_01.json");
        prepareData(new SF0080102_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0080102", json, true);
        SF00800DataHelper<SF0080102Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080102Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());
    }

    /**
     * 01: Save info successful- drawingImageJsons is empty
     */
    @Test
    public void sf0080102Save_02() {
        String json = loadJsonData("SF0080102_02.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0080102", json, true);
        SF00800DataHelper<SF0080102Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080102Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());
    }

    /**
     * 01: Save info successful - drawingImageJson is not exist
     */
    @Test
    public void sf0080102Save_03() {
        String json = loadJsonData("SF0080102_03.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0080102", json, true);
        SF00800DataHelper<SF0080102Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080102Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());
    }

    /**
     * 01: Save info successful - drawingImageJson is not exist
     */
    @Test
    public void sf0080102Save_04() {
        String json = loadJsonData("SF0080102_04.json");
        // prepare data
        prepareData(new SF0080102_04());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0080102", json, true);
        SF00800DataHelper<SF0080102Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080102Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());
    }
    /**
     * Save Drawing Image
     */
    @Test
    public void sf0080103SaveDrawings(){
        String json=loadJsonData("SF0080103_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0080103", json, true);
        SF00800DataHelper<SF0080103Res> resResponseDataHelper = new SF00800DataHelper<>();
        resResponseDataHelper.parseData(SF0080103Res.class, result);

        // 2.0 Check responseData
        assertEquals("1", resResponseDataHelper.getStatus());
    }
}
