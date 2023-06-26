package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.response.*;
import vn.vnext.sefuri.sf.testCommon.BlankRes;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.*;

import static org.junit.Assert.assertEquals;

/**
 * Created by DungTQ on 1/11/2017.
 */
public class SF00302CtrlTest extends CommonCtrlTest {

    /**
     * 01: get DealProduct info successful
     */
    // Tested
    @Test
    public void sf0030201GetDealProduct_01() {
        String dealCode = "17S00002";
        String productCode = "P000042";

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030201/" + dealCode + "/" + productCode, true);
        ResponseDataHelper<SF0030201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030201Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * 02: dealCode and productCode is invalid
     */
    // Tested
    @Test
    public void sf0030201GetDealProduct_02() {
        String dealCode = "TMP0009101";
        String productCode = "P0009101";

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030201/" + dealCode + "/" + productCode, true);
        ResponseDataHelper<SF0030201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030201Res.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00302.ERR003);
    }

    /**
     * 03: dealCode not found
     */
    // Tested
    @Test
    public void sf0030201GetDealProduct_03() {
        String dealCode = "TMP01001";
        String productCode = "P000042";
        //prepare data
        prepareData(new SF0030201_03());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030201/" + dealCode + "/" + productCode, true);
        ResponseDataHelper<SF0030201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030201Res.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00302.ERR001);
    }

    /**
     * 01: CreateDealProduct successful
     */
    // Tested
    @Test
    public void sf0030202CreateDealProduct_01() {
        String json = loadJsonData("SF0030202_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030202", json, true);
        ResponseDataHelper<SF0030201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030201Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: CreateDealProduct error
     */
    // Tested
    @Test
    public void sf0030202CreateDealProduct_02() {
        String json = loadJsonData("SF0030202_02.json");
        //prepare data
        prepareData(new SF0030202_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030202", json, true);
        ResponseDataHelper<SF0030202Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030202Res.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(MessageCode.SF00302.ERR001, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Update DealProduct OK
     */
    // Tested
    @Test
    public void sf0030203UpdateProduct_01() {
        String json = loadJsonData("SF0030203_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030203", json, true);
        ResponseDataHelper<SF0030203Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030203Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Dupplicate product OK
     */
    // Tested
    @Test
    public void sf0030204DuplicateProductForDeal_01() {
        String json = loadJsonData("SF0030204_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030204", json, true);
        ResponseDataHelper<SF0030204Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030204Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Delete Deal Product OK
     */
    @Test
    public void sf0030205DeleteDealProduct_01() {
        String json = loadJsonData("SF0030205_01.json");
        //prepare data
        prepareData(new SF0030205_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030205", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Update ProductOutput OK
     */
    // Tested
    @Test
    public void sf0030209UpdateProductOutput_01() {
        String json = loadJsonData("SF0030209_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030209", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Update ProductCommonFee OK
     */
    // Tested
    @Test
    public void sf0030210UpdateProductCommonFee_01() {
        String json = loadJsonData("SF0030210_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030210", json, true);
        ResponseDataHelper<SF0030210Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030210Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01: Update ProductCommonFee OK
     */
    // Tested
    @Test
    public void sf0030211UpdateOffer_01() {
        String json = loadJsonData("SF0030211_01.json");

        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030211", json, true);
        ResponseDataHelper<SF0030211Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030211Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
    /**
     * Creat ProductFile SUCCESS
     *
     */
    @Test
    public void sf0030206_01(){
        String json=loadJsonData("SF0030206_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030206", json, true);
        ResponseDataHelper<SF0030206Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030206Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());

    }
    /**
     * Update ProductFile
     */
    @Test
    public void sf0030207_01(){
        String json=loadJsonData("SF0030207_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030207", json, true);
        ResponseDataHelper<SF0030207Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030207Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());

    }
    /**
     * Delete Product File
     */
    @Test
    public void sf0030208_01(){
        String json=loadJsonData("SF0030208_01.json");
        //prepare Data
        prepareData(new SF0030208_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030208", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());

    }

    /**
     * Update Product Input
     */
    @Test
    public void sf0030212_01(){
        String json=loadJsonData("SF0030212_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030212", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00302.INF002, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
}
