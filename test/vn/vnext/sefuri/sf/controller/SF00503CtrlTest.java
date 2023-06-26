package vn.vnext.sefuri.sf.controller;

import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.json.response.SF0050300Res;
import vn.vnext.sefuri.sf.json.response.SF0050302Res;
import vn.vnext.sefuri.sf.json.response.SF0050303Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.*;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by TungNT on 2/17/2017.
 */
public class SF00503CtrlTest extends CommonCtrlTest {
    /**
     * Get department success
     */
    @Test
    public void sf0050300_01() {
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0050300", true);
        ResponseDataHelper<SF0050300Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050300Res.class, result);
        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);

    }
    /**
     * Init success
     */
    @Test
    public void  sf0050301_01(){
        String json = loadJsonData("SF0050301_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0050301", json, true);
        ResponseDataHelper<SF0050300Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050300Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);

    }

    /**
     * Save if departmentGoal not existed
     */
    @Test
    public void sf0050302_01() {
        String json = loadJsonData("SF0050302_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050302", json, true);
        ResponseDataHelper<SF0050302Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050302Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Update if departmentGoal existed
     */
    @Test
    public void sf0050302_02() {
        String json = loadJsonData("SF0050302_02.json");
        //Prepare data
        prepareData(new SF0050302_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050302", json, true);
        ResponseDataHelper<SF0050302Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050302Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }


    @Test
    public void sf0050303_01() {
        String json = loadJsonData("SF0050303_01.json");
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050303", json, true);
        ResponseDataHelper<SF0050303Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050303Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Update if departmentGoal existed
     */
    @Test
    public void sf0050303_02() {
        String json = loadJsonData("SF0050303_02.json");
        //Prepare data
        prepareData(new SF0050303_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050303", json, true);
        ResponseDataHelper<SF0050303Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050303Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

    /**
     * Delete tab02 success
     */
    @Test
    public void sf0050304_01(){
        String json = loadJsonData("SF0050304_01.json");
        //Prepare data
        prepareData(new SF0050304_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050304", json, true);
        ResponseDataHelper<SF0050302Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050302Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }
    /**
     * Delete tab 02 error
     */
    @Test
    public void sf0050304_02(){
        String json = loadJsonData("SF0050304_02.json");
        //Prepare data
        prepareData(new SF0050304_02());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050304", json, true);
        ResponseDataHelper<SF0050302Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050302Res.class, result);

        // 2.0 Check responseData
        assertEquals(null, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), MessageCode.SF00503.ERR003);
    }
    /**
     * Init 02
     */
    @Test
    public void sf0050305_01(){
        String json = loadJsonData("SF0050305_01.json");
        //Prepare data
        prepareData(new SF0050305());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendPostRequest("/SF0050305", json, true);
        ResponseDataHelper<SF0050302Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0050302Res.class, result);

        // 2.0 Check responseData
        assertEquals(MessageCode.SF00503.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);
    }

}
