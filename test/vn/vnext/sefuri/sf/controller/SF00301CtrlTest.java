package vn.vnext.sefuri.sf.controller;

import org.junit.Assert;
import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00301.response.SF0030116Res;
import vn.vnext.sefuri.sf.json.response.*;
import vn.vnext.sefuri.sf.testCommon.BlankRes;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.*;

import static org.junit.Assert.assertEquals;

/**
 * Created by ngocnm on 1/13/2017.
 */
public class SF00301CtrlTest extends CommonCtrlTest {

    /**
     * 01: get info successful
     */
    // Tested
    @Test
    public void sf0030101Init_01() {
        String dealCode = "TMP000999";

        // prepare data
        prepareData(new SF0030101_01());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030101/" + dealCode, true);
        ResponseDataHelper<SF0030101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030101Res.class, result);

        // 2.0 Check responseData
//       checkForSelect(SF0030101_01.GET_CHECKSHEET_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_DEAL_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_DEAL_FILE_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_DEAL_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_DEPARTMENT_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_PRODUCT_FILE_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_PRODUCT_OUTPUT_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_QUOTATION_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_QUOTATION_ITEM_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_COMMENT_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_CUSTOMER_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_MYBOX_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_LOADING_ADDRESS_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_SHIPPING_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_WOODEN_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_FILE_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_ORDER_INFO, "9999");
//        checkForSelect(SF0030101_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * 01: deal ==null
     */
    // Tested
    @Test
    public void sf0030101Init_02() {
        String dealCode = "TMP000999";

        // prepare data
        prepareData(new SF0030101_02());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030101/" + dealCode, true);
        ResponseDataHelper<SF0030101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030101Res.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00300.ERR001);
    }

    /**
     * 01: quotation ==null
     * file==null
     */
    @Test
    public void sf0030101Init_03() {
        String dealCode = "TMP000999";

        // prepare data
        prepareData(new SF0030101_03());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030101/" + dealCode, true);
        ResponseDataHelper<SF0030101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030101Res.class, result);

        // 2.0 Check responseData
//        checkForSelect(SF0030101_03.GET_CHECKSHEET_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_DEAL_INFO, "9999");
//        checkForDelete(SF0030101_03.GET_DEAL_FILE_INFO);
//        checkForSelect(SF0030101_03.GET_DEAL_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_DEPARTMENT_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_PRODUCT_FILE_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_PRODUCT_OUTPUT_INFO, "9999");
//        checkForDelete(SF0030101_03.GET_QUOTATION_INFO);
//        checkForDelete(SF0030101_03.GET_QUOTATION_ITEM_INFO);
//        checkForSelect(SF0030101_03.GET_COMMENT_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_CUSTOMER_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_MYBOX_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_LOADING_ADDRESS_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_SHIPPING_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_WOODEN_INFO, "9999");
//        checkForDelete(SF0030101_03.GET_FILE_INFO);
//        checkForSelect(SF0030101_03.GET_ORDER_INFO, "9999");
//        checkForSelect(SF0030101_03.GET_ORDER_ITEM_INFO, "9999");
        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * 02: save deal
     */
    // Tested
    @Test
    public void sf0030102SaveDeal_01() {
        String json = loadJsonData("SF0030102_01.json");
        //prepare Data
        prepareData(new SF0030102_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030102", json, true);
        ResponseDataHelper<SF0030102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030102Res.class, result);

        // 2.0 Check responseData
//        checkForSelect(SF0030102_01.GET_CHECKSHEET_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_DEAL_INFO, "9999", "886688");
//        checkForSelect(SF0030102_01.GET_DEAL_FILE_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_DEAL_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_DEPARTMENT_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_PRODUCT_FILE_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_PRODUCT_OUTPUT_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_QUOTATION_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_QUOTATION_ITEM_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_COMMENT_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_CUSTOMER_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_MYBOX_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_LOADING_ADDRESS_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_SHIPPING_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_WOODEN_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_FILE_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_ORDER_INFO, "9999");
//        checkForSelect(SF0030102_01.GET_ORDER_ITEM_INFO, "9999");
        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

//    /**
//     * 03: upload file successful
//     */
//    // Tested
//    @Test
//    public void sf0030103UploadDealFile_01() {
//        //TODO: remove product file
//        assertEquals(1, 1);
//    }
//
//    /**
//     * 03: upload fail - file null
//     */
//    // Tested
//    @Test
//    public void sf0030103UploadDealFile_02() {
//        //TODO: remove product file
//        assertEquals(1, 1);
//    }
//

    /**
     * 04: creat deal file
     */
    // Tested
    @Test
    public void sf0030103SaveDealFile_01() {
        //TODO: file is not exist
        String json = loadJsonData("SF0030103_01.json");
        //prepare Data
        prepareData(new SF0030103_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0030103", json, true);
        ResponseDataHelper<SF0030104Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030104Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030103_01.GET_COUNT_DEAL_FILE, "2");
        checkForSelect(SF0030103_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030103_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030103_01.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030103_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030103_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030103_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030103_01.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030103_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030103_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030103_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030103_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030103_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030103_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030103_01.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030103_01.GET_SHIPPING_INFO, "9999");
        checkForSelect(SF0030103_01.GET_WOODEN_INFO, "9999");
        checkForSelect(SF0030103_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0030103_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030103_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * Update deal file
     */
    @Test
    public void sf0030104_01() {
        //TODO: file is not exist
        String json = loadJsonData("SF0030104_01.json");
        //prepare Data
        prepareData(new SF0030104_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0030104", json, true);
        ResponseDataHelper<SF0030104Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030104Res.class, result);

        // 2.0 Check responseData

        checkForSelect(SF0030104_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030104_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030104_01.GET_DEAL_FILE_INFO, "9999", "updateDealFile");
        checkForSelect(SF0030104_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030104_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030104_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030104_01.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030104_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030104_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030104_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030104_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030104_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030104_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030104_01.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030104_01.GET_SHIPPING_INFO, "9999");
        checkForSelect(SF0030104_01.GET_WOODEN_INFO, "9999");
        checkForSelect(SF0030104_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0030104_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030104_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 05: remove deal file successful
     */
    // Tested
    @Test
    public void sf0030105RemoveDeadFile_01() {
        String json = loadJsonData("SF0030105_01.json");
        //prepare Data
        prepareData(new SF0030105_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0030105", json, true);

        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030105_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030105_01.GET_DEAL_INFO, "9999");
        checkForDelete(SF0030105_01.GET_DEAL_FILE_INFO);
        checkForDelete(SF0030105_01.GET_FILE_INFO);
        checkForSelect(SF0030105_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030105_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030105_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030105_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030105_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030105_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030105_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030105_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030105_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030105_01.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030105_01.GET_SHIPPING_INFO, "9999");
        checkForSelect(SF0030105_01.GET_WOODEN_INFO, "9999");
        checkForSelect(SF0030105_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030105_01.GET_ORDER_ITEM_INFO, "9999");
        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
//

    /**
     * 06: remove quotation successful
     */
    // Tested
    @Test
    public void sf0030106RemoveQuotation_01() {
        String json = loadJsonData("SF0030106_01.json");

        // prepare data
        prepareData(new SF0030106());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030106", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData

        checkForSelect(SF0030106.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030106.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030106.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030106.GET_FILE_INFO, "9999");
        checkForSelect(SF0030106.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030106.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030106.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030106.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForDelete(SF0030106.GET_QUOTATION_INFO);
        checkForDelete(SF0030106.GET_QUOTATION_ITEM_INFO);
        checkForSelect(SF0030106.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030106.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030106.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030106.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030106.GET_SHIPPING_INFO, "9999");
        checkForSelect(SF0030106.GET_WOODEN_INFO, "9999");
        checkForSelect(SF0030106.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030106.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 07: remove deal product
     */
    // Tested
    @Test
    public void sf0030107RemoveDealProduct_01() {
        String json = loadJsonData("SF0030107_01.json");
        //prepare Data
        prepareData(new SF0030107_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030107", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030107_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030107_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030107_01.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030107_01.GET_DEAL_PRODUCT_INFO);
        checkForSelect(SF0030107_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030107_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030107_01.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030107_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030107_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030107_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030107_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030107_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030107_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030107_01.GET_LOADING_ADDRESS_INFO, "9999");
        //checkForSelect(SF0030107_01.GET_SHIPPING_INFO,"9999");
        //checkForSelect(SF0030107_01.GET_WOODEN_INFO,"9999");
        checkForSelect(SF0030107_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0030107_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030107_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 07:remove deal product failt
     * dealproduct ==null
     */
    @Test
    public void sf0030107RemoveDealProduct_02() {
        String json = loadJsonData("SF0030107_01.json");
        //prepare Data
        prepareData(new SF0030107_02());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030107", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030107_02.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030107_02.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030107_02.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030107_02.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030107_02.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030107_02.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030107_02.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030107_02.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030107_02.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030107_02.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030107_02.GET_LOADING_ADDRESS_INFO, "9999");
        // checkForSelect(SF0030107_02.GET_SHIPPING_INFO,"9999");
        //checkForSelect(SF0030107_02.GET_WOODEN_INFO,"9999");
        checkForSelect(SF0030107_02.GET_FILE_INFO, "9999");
        checkForSelect(SF0030107_02.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030107_02.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00301.ERR004);
    }

    /**
     * 07:remove deal product failt
     * quotationItem ==null
     */
    @Test
    public void sf0030107RemoveDealProduct_03() {
        String json = loadJsonData("SF0030107_01.json");
        //prepare Data
        prepareData(new SF0030107_03());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030107", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
//        checkForSelect(SF0030107_03.GET_CHECKSHEET_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_DEAL_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_DEAL_FILE_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_DEPARTMENT_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_PRODUCT_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_PRODUCT_FILE_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_QUOTATION_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_COMMENT_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_CUSTOMER_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_MYBOX_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_LOADING_ADDRESS_INFO,"9999");
//       // checkForSelect(SF0030107_03.GET_SHIPPING_INFO,"9999");
//       // checkForSelect(SF0030107_03.GET_WOODEN_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_FILE_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_ORDER_INFO,"9999");
//        checkForSelect(SF0030107_03.GET_ORDER_ITEM_INFO,"9999");

        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00301.ERR004);
    }

//    /**
//     * 08: remove product file
//     */
//    // Tested
//    @Test
//    public void sf0030108RemoveProductFile_01() {
//        //TODO: remove product file
//        assertEquals(1, 1);
//    }
//

    /**
     * 09: add comment
     */
    // Tested
    @Test
    public void sf0030109AddComment_01() {
        String json = loadJsonData("SF0030109_01.json");
        //prepare Data
        prepareData(new SF0030109_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030109", json, true);
        ResponseDataHelper<SF0030109Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030109Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030109_01.GET_COMMENT_COUNT_INFO, "2");

        checkForSelect(SF0030109_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030109_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030109_01.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030109_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030109_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030109_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030109_01.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030109_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030109_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030109_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030109_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030109_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030109_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030109_01.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030109_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0030109_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030109_01.GET_ORDER_ITEM_INFO, "9999");


        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 10: show more comment
     */
    // Tested
    @Test
    public void sf0030110ShowMoreComment_01() {
        String json = loadJsonData("SF0030110_01.json");
        //prepare Data
        prepareData(new SF0030110_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030110", json, true);
        ResponseDataHelper<SF0030110Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030110Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030110_01.GET_COMMENT_COUNT_INFO, "11");
        checkForSelect(SF0030110_01.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030110_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030110_01.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030110_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030110_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030110_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030110_01.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030110_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030110_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030110_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030110_01.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030110_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030110_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030110_01.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030110_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0030110_01.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030110_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 12: remove deal
     */
    // Tested
    @Test
    public void sf0030112DeleteDeal_01() {
        String json = loadJsonData("SF0030112_01.json");
        // prepare data
        prepareData(new SF0030112());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0030112", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030112.GET_DEAL_DELETE_INFO, "9999", "1");
        checkForSelect(SF0030112.GET_CHECKSHEET_INFO, "9999");
        checkForSelect(SF0030112.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030112.GET_DEAL_FILE_INFO, "9999");
        checkForSelect(SF0030112.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030112.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030112.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030112.GET_PRODUCT_FILE_INFO, "9999");
        checkForSelect(SF0030112.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030112.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030112.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030112.GET_COMMENT_INFO, "9999");
        checkForSelect(SF0030112.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030112.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0030112.GET_LOADING_ADDRESS_INFO, "9999");
        checkForSelect(SF0030112.GET_SHIPPING_INFO, "9999");
        checkForSelect(SF0030112.GET_WOODEN_INFO, "9999");
        checkForSelect(SF0030112.GET_FILE_INFO, "9999");
        checkForSelect(SF0030112.GET_ORDER_INFO, "9999");
        checkForSelect(SF0030112.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * SF0030113: BOOK mark deal
     * My box =null
     */
    @Test
    public void sf0030113BookmarkDealInfo_01() {
        String json = loadJsonData("SF0020202_01.json");

        //prepare Data
        prepareData(new SF0020202_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030113", json, true);
        ResponseDataHelper<SF0030113Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030113Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020202_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0020202_01.GET_USER_INFO, "9999");
        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * SF0030113 BOOK mark deal
     * My box !=null
     */
    @Test
    public void sf0020202_02() {
        String json = loadJsonData("SF0020202_02.json");

        //prepare Data
        prepareData(new SF0020202_02());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030113", json, true);
        ResponseDataHelper<SF0030113Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030113Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020202_02.GET_DEAL_INFO, "9999");
        checkForSelect(SF0020202_02.GET_USER_INFO, "9999");
        checkForSelect(SF0020202_02.GET_MYBOX_INFO, "9999");

        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * SF0030113 book mark deal
     * deal =null
     */
    @Test
    public void sf0020202_03() {
        String json = loadJsonData("SF0020202_03.json");

        //prepare Data
        prepareData(new SF0020202_03());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030113", json, true);
        ResponseDataHelper<SF0030113Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030113Res.class, result);

        // 2.0 Check responseData
        checkForDelete(SF0020202_03.GET_DEAL_INFO);
        Assert.assertEquals(null, resResponseDataHelper.getMessageCode());
        Assert.assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00301.ERR002);
    }


    /**
     * 14: unbookmark deal info
     */
    // Tested
    @Test
    public void sf0030114UnBookmarkDealInfo_01() {
        String json = loadJsonData("SF0030114_01.json");

        // prepare data
        prepareData(new SF0030114());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030114", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        checkForDelete(SF0030114.GET_MYBOX_INFO);
        checkForSelect(SF0030114.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030114.GET_USER_INFO, "9999");
        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 15: Get deal my box info
     */
    // Tested
    @Test
    public void sf0030115GetDealMybox_01() {
        String json = loadJsonData("SF0030115_01.json");

        // prepare data
        prepareData(new SF0030115());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030115", json, true);
        ResponseDataHelper<SF0030115Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030115Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030115.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030115.GET_MYBOX_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
    /**
     * 16:Copy and Save Deal
     */
    @Test
    public void sf0030116_01(){
        String json = loadJsonData("SF0030116_01.json");

        // prepare data
        prepareData(new SF0030116_01());

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030116", json, true);
        ResponseDataHelper<SF0030116Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030116Res.class, result);

        // 2.0 Check responseData
//        checkForSelect(SF0030116_01.GET_CHECKSHEET_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_DEAL_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_DEAL_FILE_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_DEAL_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_DEPARTMENT_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_PRODUCT_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_PRODUCT_FILE_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_PRODUCT_OUTPUT_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_QUOTATION_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_QUOTATION_ITEM_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_COMMENT_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_CUSTOMER_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_MYBOX_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_LOADING_ADDRESS_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_SHIPPING_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_WOODEN_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_FILE_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_ORDER_INFO, "9999");
//        checkForSelect(SF0030116_01.GET_ORDER_ITEM_INFO, "9999");

        assertEquals(MessageCode.SF00301.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
}
