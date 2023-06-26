package vn.vnext.sefuri.sf.controller;

import org.junit.Assert;
import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00202.response.SF0020201Res;
import vn.vnext.sefuri.sf.json.SF00202.response.SF0020202Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.SF0020201_01;
import vn.vnext.sefuri.sf.testdata.SF0020202_01;
import vn.vnext.sefuri.sf.testdata.SF0020202_02;
import vn.vnext.sefuri.sf.testdata.SF0020202_03;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by TungNT on 08/03/2017.
 */
public class SF00202CtrlTest extends CommonCtrlTest {
    /**
     * sf0020201Deal
     */
    @Test
    public void sf0020201_01(){
        String json = loadJsonData("SF0020201_01.json");
        //prepare Data
        prepareData(new SF0020201_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0020201", json, true);
        ResponseDataHelper<SF0020201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020201Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020201_01.GET_DEAL_INFO,"9999");
        checkForSelect(SF0020201_01.GET_DEAL_PRODUCT_INFO,"9999");
        checkForSelect(SF0020201_01.GET_MYBOX_INFO,"9999");
        checkForSelect(SF0020201_01.GET_PRODUCT_INFO,"9999");
        checkForSelect(SF0020201_01.GET_LOADING_ADDRESS_INFO,"9999");
        checkForSelect(SF0020201_01.GET_ORDER_INFO,"9999");
        checkForSelect(SF0020201_01.GET_ORDER_ITEM_INFO,"9999");
        checkForSelect(SF0020201_01.GET_QUOTATION_INFO,"9999");
        checkForSelect(SF0020201_01.GET_QUOTATION_ITEM_INFO,"9999");
        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
    /**
     * index<0
     */
    @Test
    public void sf0020301_02(){
        String json = loadJsonData("SF0020301_02.json");

        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0020201", json, true);
        ResponseDataHelper<SF0020201Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020201Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
    /**
     * SF0020202 BOOK mark deal
     * My box =null
     */
    @Test
    public void sf0020202_01(){
        String json = loadJsonData("SF0020202_01.json");

        //prepare Data
        prepareData(new SF0020202_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0020202", json, true);
        ResponseDataHelper<SF0020202Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020202Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020202_01.GET_DEAL_INFO,"9999");
//        checkForSelect(SF0020202_01.GET_USER_INFO,"9999");
        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * SF0020202 BOOK mark deal
     * My box !=null
     */
    @Test
    public void sf0020202_02(){
        String json = loadJsonData("SF0020202_02.json");

        //prepare Data
        prepareData(new SF0020202_02());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0020202", json, true);
        ResponseDataHelper<SF0020202Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020202Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020202_02.GET_DEAL_INFO,"9999");
   //     checkForSelect(SF0020202_02.GET_USER_INFO,"9999");
        checkForSelect(SF0020202_02.GET_MYBOX_INFO,"9999");

        assertEquals(MessageCode.SF00202.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
    /**
     * SF0020202 book mark deal
     * deal =null
     */
    @Test
    public void sf0020202_03(){
        String json = loadJsonData("SF0020202_03.json");

        //prepare Data
        prepareData(new SF0020202_03());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0020202", json, true);
        ResponseDataHelper<SF0020202Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020202Res.class, result);

        // 2.0 Check responseData
        checkForDelete(SF0020202_03.GET_DEAL_INFO);
        Assert.assertEquals(null, resResponseDataHelper.getMessageCode());
        Assert.assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00202.ERR001);
    }



}
