package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00305.response.SF0030501Res;
import vn.vnext.sefuri.sf.testCommon.BlankRes;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.SF0030501_01;
import vn.vnext.sefuri.sf.testdata.SF0030501_02;
import vn.vnext.sefuri.sf.testdata.SF0030501_03;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by TungNT on 22/03/2017.
 */
public class SF00305CtrlTest extends CommonCtrlTest {
    /**
     * Init success
     */
    @Test
    public void SF0030501_01() {
        String quotationCode = "17S09999-M9999";
        //prepare Data
        prepareData(new SF0030501_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030501/" + quotationCode, true);
        ResponseDataHelper<SF0030501Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030501Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030501_01.GET_DEAL_INFO, "9999", "deal name");
        checkForSelect(SF0030501_01.GET_CUSTOMER_INFO, "9999", "江崎グリコ株式会社");
        checkForSelect(SF0030501_01.GET_QUOTATION_INFO, "9999", "gfgfgd");
        checkForSelect(SF0030501_01.GET_QUOTATION_ITEM_INFO, "9999", "Quotation53");
        checkForSelect(SF0030501_01.GET_USER_INFO, "9999", "江副 昭人");
        checkForSelect(SF0030501_01.GET_QUOTATION_PRINT_TEMPLATE_INFO, "9999", "abc");


        assertEquals(MessageCode.SF00305.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Init:quotation not exist
     */
    @Test
    public void SF0030501_02(){
        String quotationCode = "17S09999-M9999";
        //prepare Data
        prepareData(new SF0030501_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030501/" + quotationCode, true);
        ResponseDataHelper<SF0030501Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030501Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030501_01.GET_DEAL_INFO, "9999", "deal name");
        checkForSelect(SF0030501_01.GET_CUSTOMER_INFO, "9999", "江崎グリコ株式会社");
        checkForSelect(SF0030501_01.GET_QUOTATION_PRINT_TEMPLATE_INFO, "9999", "abc");

        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00305.ERR002);
    }
    /**
     * Init: customer+printTemplate null
     */
    @Test
    public void SF0030501_03(){
        String quotationCode = "17S09999-M9999";
        //prepare Data
        prepareData(new SF0030501_03());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030501/" + quotationCode, true);
        ResponseDataHelper<SF0030501Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030501Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030501_01.GET_DEAL_INFO, "9999", "deal name");
        checkForSelect(SF0030501_01.GET_CUSTOMER_INFO, "9999", "江崎グリコ株式会社");
        checkForSelect(SF0030501_01.GET_QUOTATION_INFO, "9999", "gfgfgd");
        checkForSelect(SF0030501_01.GET_QUOTATION_ITEM_INFO, "9999", "Product53");
        checkForSelect(SF0030501_01.GET_USER_INFO, "9999", "江副 昭人");
        checkForSelect(SF0030501_01.GET_QUOTATION_PRINT_TEMPLATE_INFO, "9999", "abc");

        assertEquals(MessageCode.SF00305.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }
    /**
     * Send mail success
     */
    @Test
    public void SF0030502_01(){
        String json = loadJsonData("SF0030502_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030502", json, true);
        ResponseDataHelper<BlankRes> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(BlankRes.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00305.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }
}
