package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.SF00308.response.SF0030801Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.SF0030801_01;
import vn.vnext.sefuri.sf.testdata.SF0030801_02;
import vn.vnext.sefuri.sf.testdata.SF0030802_01;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by TungNT on 20/03/2017.
 */
public class SF00308CtrlTest extends CommonCtrlTest {
    /**
     * Init
     */
    @Test
    public void sf0030801_01() {
        String dealCode = "TMP000999";
        //prepare Data
        prepareData(new SF0030801_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030801/" + dealCode, true);
        ResponseDataHelper<SF0030801Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030801Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030801_01.GET_DEAL_INFO, "9999", "deal name");
        checkForSelect(SF0030801_01.GET_CHECKSHEET_INFO, "9999", "1005");
        checkForSelect(SF0030801_01.GET_CUSTOMER_INFO, "9999", "江崎グリコ株式会社");
        checkForSelect(SF0030801_01.GET_USER_INFO, "9999", "江副 昭人");
        checkForSelect(SF0030801_01.GET_DEPARTMENT_INFO, "9999", "福岡支店");


        assertEquals(MessageCode.SF00308.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);

    }

    /**
     * Init:Deal not exist
     */
    @Test
    public void sf0030801_02() {
        String dealCode = "TMP000999";
        //prepare Data
        prepareData(new SF0030801_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030801/" + dealCode, true);
        ResponseDataHelper<SF0030801Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030801Res.class, result);

        // 2.0 Check responseData
        checkForDelete(SF0030801_02.GET_DEAL_INFO);
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00308.ERR001);

    }

    /**
     * Save
     */
    @Test
    public void sf0030802_01() {
        String json = loadJsonData("SF0030802_01.json");
        //prepare Data
        prepareData(new SF0030802_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0030802", json, true);
        ResponseDataHelper<SF0030801Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030801Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030802_01.GET_DEAL_INFO, "9999", "deal name");
        checkForSelect(SF0030802_01.GET_CHECKSHEET_INFO, "9999", "1002");
        checkForSelect(SF0030802_01.GET_CUSTOMER_INFO, "9999", "江崎グリコ株式会社");
        assertEquals(MessageCode.SF00308.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }
}
