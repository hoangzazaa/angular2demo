package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00201.response.SF0020101Res;
import vn.vnext.sefuri.sf.json.SF00201.response.SF0020102Res;
import vn.vnext.sefuri.sf.json.SF00201.response.SF0020103Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.SF0020101_01;
import vn.vnext.sefuri.sf.testdata.SF0020102_01;
import vn.vnext.sefuri.sf.testdata.SF0020102_02;
import vn.vnext.sefuri.sf.testdata.SF0020102_03;

import static org.junit.Assert.assertEquals;

/**
 * Created by TungNT on 2/27/2017.
 */
public class SF00201CtrlTest extends CommonCtrlTest {
    /**
     * Get templates
     */
    @Test
    public void sf0020101_01() {
        Integer offset = 0;
        Integer limit = 5;
        //prepare Data
        prepareData(new SF0020101_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0020101/" + offset + "/" + limit, true);
        ResponseDataHelper<SF0020101Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020101Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020101_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0020101_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0020101_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0020101_01.GET_MYBOX_INFO, "9999");
        checkForSelect(SF0020101_01.GET_FILE_INFO, "9999");
        checkForSelect(SF0020101_01.GET_PRODUCT_FILE_INFO, "9999");
        assertEquals(MessageCode.SF00201.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Add template to mybox
     * myboxItemDto == null
     */
    @Test
    public void sf0020102_01() {
        Integer dealId = 9999;
        // prepare data
        prepareData(new SF0020102_01());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0020102/" + dealId, true);
        ResponseDataHelper<SF0020102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020102Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020102_01.GET_DEAL_INFO, "9999");
//        checkForSelect(SF0020102_01.GET_USER_INFO,"9999");
        assertEquals(MessageCode.SF00201.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Add template to mybox
     * myboxItemDto !=null
     */
    @Test
    public void sf0020102_03() {
        Integer dealId = 9999;
        // prepare data
        prepareData(new SF0020102_03());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        // prepare data
        Result result = sendGetRequest("/SF0020102/" + dealId, true);
        ResponseDataHelper<SF0020102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020102Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0020102_03.GET_DEAL_INFO, "9999");
        checkForSelect(SF0020102_03.GET_MYBOX_INFO, "9999");

        assertEquals(MessageCode.SF00201.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Add template to mybox error
     * deal ís null
     */
    @Test
    public void sf0020102_02() {
        Integer dealId = 9999;
        // prepare data
        prepareData(new SF0020102_02());
        //1.0 Login User
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0020102/" + dealId, true);
        ResponseDataHelper<SF0020102Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0020102Res.class, result);

        // 2.0 Check responseData
        checkForDelete(SF0020102_02.GET_DEAL_INFO);
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00201.ERR002);

    }
}

