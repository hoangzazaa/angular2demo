package vn.vnext.sefuri.sf.controller;


import org.junit.Assert;
import org.junit.Test;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.MessageCode;

import vn.vnext.sefuri.sf.json.response.SF0030301Res;
import vn.vnext.sefuri.sf.testCommon.CommonCtrlTest;
import vn.vnext.sefuri.sf.testCommon.ResponseDataHelper;
import vn.vnext.sefuri.sf.testdata.*;

import static junit.framework.TestCase.assertEquals;

/**
 * Created by Administrator on 1/12/2017.
 */
public class SF00303CtrlTest extends CommonCtrlTest {

    /**
     * 01:Get Quotation Info
     */
    //Tested
    @Test
    public void sf0030300GetQuotationInfo_01() {
        String dealCode = "TMP000999";
        String quotationCode = "17S09999";
        //prepare Data
        prepareData(new SF0030300_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030300/" + dealCode + "/" + quotationCode, true);
        ResponseDataHelper<SF0030301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030301Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030300_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030300_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_OFFER_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_COMMON_FEE_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_USER_INFO, "9999");


        assertEquals(MessageCode.SF00303.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(resResponseDataHelper.getErrorCode(), null);

    }


    /**
     * 01:Save Quotation OK
     */
    @Test
    public void sf0030301SaveQuotation_01() {
        String json = loadJsonData("SF0030301_01.json");
        //prepare Data
        prepareData(new SF0030301_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030301", json, true);
        ResponseDataHelper<SF0030301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030301Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030301_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030301_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030301_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030301_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030301_01.GET_OFFER_INFO, "9999");
        checkForSelect(SF0030301_01.GET_PRODUCT_COMMON_FEE_INFO, "9999");
        checkForSelect(SF0030301_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030301_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030301_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030301_01.GET_USER_INFO, "9999");
        checkForSelect(SF0030301_01.GET_QUOTATION_INFO, "9999", "Save quotation");
        assertEquals(MessageCode.SF00303.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01:Duplicate Quotation
     */
    @Test
    public void sf0030302DuplicateQuotation_01() {
        String json = loadJsonData("SF0030302_01.json");
        //prepare Data
        prepareData(new SF0030302_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");

        Result result = sendPostRequest("/SF0030302", json, true);
        ResponseDataHelper<SF0030301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030301Res.class, result);

        // 2.0 Check responseData
        checkForSelect(SF0030302_01.GET_QUOTATION_COPY_INFO, "2");
        checkForSelect(SF0030302_01.GET_QUOTATION_ITEM_COPY_INFO, "3");

        checkForSelect(SF0030302_01.GET_QUOTATION_INFO, "9999");
        checkForSelect(SF0030302_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030302_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030302_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030302_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030302_01.GET_OFFER_INFO, "9999");
        checkForSelect(SF0030302_01.GET_PRODUCT_COMMON_FEE_INFO, "9999");
        checkForSelect(SF0030302_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030302_01.GET_QUOTATION_ITEM_INFO, "9999");
        checkForSelect(SF0030302_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030302_01.GET_USER_INFO, "9999");

        assertEquals(MessageCode.SF00303.INF001, resResponseDataHelper.getMessageCode());
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

    /**
     * 01:Delete Quotation OK
     */
    @Test
    public void sf0030303DeleteQuotation_01() {
        String quotationCode = "17S09999";
        //prepare Data
        prepareData(new SF0030303_01());
        // 1.0 login user
        loginUser("admin@vnext.vn", "123456");
        Result result = sendGetRequest("/SF0030303/" + quotationCode, true);
        ResponseDataHelper<SF0030301Res> resResponseDataHelper = new ResponseDataHelper<>();
        resResponseDataHelper.parseData(SF0030301Res.class, result);
        // 2.0 Check responseData
        checkForDelete(SF0030300_01.GET_QUOTATION_ITEM_INFO);
        checkForDelete(SF0030300_01.GET_QUOTATION_INFO);

        checkForSelect(SF0030300_01.GET_CUSTOMER_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEAL_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEAL_PRODUCT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_DEPARTMENT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_OFFER_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_COMMON_FEE_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_OUTPUT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_PRODUCT_INFO, "9999");
        checkForSelect(SF0030300_01.GET_USER_INFO, "9999");
        assertEquals(null, resResponseDataHelper.getErrorCode());
    }

}
