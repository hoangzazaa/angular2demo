package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00203.response.SF0020301Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.SF0020301_01;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by TungNT on 10/03/2017.
 */
public class SF00203CtrlTest extends CommonCtrlTest {
    /**
     * Init
     */
    @Test
    public void sf0020301_01(){
        String json = loadJsonData("SF0020301_01.json");
        //prepare Data
        prepareData(new SF0020301_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0020301", json, true);
        ResponseDataHelper<SF0020301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020301Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020301_01.GET_DEAL_INFO,"9999");
        checkForSelect(SF0020301_01.GET_DEAL_PRODUCT_INFO,"9999");
        checkForSelect(SF0020301_01.GET_MYBOX_INFO,"9999");
        checkForSelect(SF0020301_01.GET_PRODUCT_INFO,"9999");
        checkForSelect(SF0020301_01.GET_LOADING_ADDRESS_INFO,"9999");
        checkForSelect(SF0020301_01.GET_ORDER_INFO,"9999");
        checkForSelect(SF0020301_01.GET_ORDER_ITEM_INFO,"9999");
        checkForSelect(SF0020301_01.GET_QUOTATION_INFO,"9999");
        checkForSelect(SF0020301_01.GET_QUOTATION_ITEM_INFO,"9999");
       // checkForSelect(SF0020301_01.GET_SHIPPING_INFO,"9999");
        assertEquals(MessageCode.SF00203.INF001, resResponseDataHelper.getMessageCode());
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

        Result result = sendPostRequest("/SF0020301", json, true);
        ResponseDataHelper<SF0020301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020301Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00203.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
}
