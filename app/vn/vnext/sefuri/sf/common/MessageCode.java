package vn.vnext.sefuri.sf.common;

/**
 * Common interface to define message code using Sefuri system.
 *
 * @author manhnv
 */
public interface MessageCode {

    /* General message code */
    /** 正常 */
    String INF001 = "INF001";
    String INF002 = "INF002";
    String INF003 = "INF003";
    String WRN001 = "WRN001";
    String WRN002 = "WRN002";
    String WRN003 = "WRN003";
    String ERR001 = "ERR001";
    String ERR002 = "ERR002";
    String ERR003 = "ERR003";
    /** 要求電文エラー (パラメーターエラーなど) */
    String ERR004 = "ERR004";

    /*Common message code*/
    interface COM {
        String INF001 = "COM_INF001";
        String WRN001 = "COM_WRN001";
        String ERR001 = "COM_ERR001";
    }

    /*CC00300 screen*/
    interface CC00201 {
        String INF001 = "CC00201_INF001";
        /*User does not exist*/
        String ERR001 = "CC00201_ERR001";
        /*Unexpected*/
        String ERR002 = "CC00201_ERR002";
    }

    /*CC00300 screen*/
    interface CC00300 {
        String INF001 = "CC00300_INF001";
        /*User does not exist*/
        String ERR001 = "CC00300_ERR001";
    }

    /*CM00101 files api*/
    interface CM00101 {
        /** 正常終了 */
        String INF001 = "CC00101_INF001";
        String INF002 = "CC00101_INF001";

        /** パラメーターエラー */
        String ERR001 = "CC00101_ERR001";
        /** ファイルアップロードエラー */
        String ERR002 = "CC00101_ERR002"; // upload fail
        /** PDF サムネイル作成エラー */
        String ERR003 = "CC00101_ERR003"; // #3491
    }

    /*SF002-01 screen*/
    interface SF00201 {
        String INF001 = "SF00201_INF001";
        String WRN001 = "SF00201_WRN001";
        //List MyboxItem is empty
        String ERR001 = "SF00201_ERR001";
        //Deal is null
        String ERR002 = "SF00201_ERR002";
        //Delete fail
        String ERR003 = "SF00201_ERR003";
        //Delete DealProduct fail
        String ERR004 = "SF00201_ERR004";
    }

    /*SF002-02 screen*/
    interface SF00202 {
        String INF001 = "SF00202_INF001";
        String WRN001 = "SF00202_WRN001";
        //Add my box error
        String ERR001 = "SF00202_ERR001";
        //dealId is null
        String ERR002 = "SF00202_ERR002";

    }

    /*SF002-03 screen*/
    interface SF00203 {
        String INF001 = "SF00203_INF001";
    }

    /*SF003-01 screen*/
    interface SF00301 {
        String INF001 = "SF00301_INF001";
        String WRN001 = "SF00301_WRN001";
        //File is null
        String ERR001 = "SF00301_ERR001";
        //Deal is null
        String ERR002 = "SF00301_ERR002";
        //Delete fail
        String ERR003 = "SF00301_ERR003";
        //Delete DealProduct fail
        String ERR004 = "SF00301_ERR004";
        //Customer not exists any more
        String ERR005 = "SF00301_ERR005";
        //Saler not exists any more
        String ERR006 = "SF00301_ERR006";
        //Deal can not be deleted
        String ERR007 = "SF00301_ERR007";
        //unexpected exception
        String ERR999 = "SF00301_ERR999";
    }

    /*SF00300 common deal*/
    interface SF00300 {
        String INF001 = "SF00300_INF001";
        String ERR001 = "SF00300_ERR001";
    }

    /*SF003-02 screen*/
    interface SF00302 {
        String INF001 = "SF00302_INF001";
        //Save Input Only
        String INF002 = "SF00302_INF002";
        String WRN001 = "SF00302_WRN001";
        // Deal not found
        String ERR001 = "SF00302_ERR001";
        // DealProductId is null
        String ERR002 = "SF00302_ERR002";
        // dealCode and productCode is mot match
        String ERR003 = "SF00302_ERR003";
        // productFileId is null
        String ERR004 = "SF00302_ERR004";
        // error while delete file product
        String ERR005 = "SF00302_ERR005";
        //dealCode is null
        String ERR006 = "SF00302_ERR006";
    }

    /*SF003-03 screen*/
    interface SF00303 {
        String INF001 = "SF00303_INF001";
        String WRN001 = "SF00303_WRN001";
        //dealCode and productCode is invalid
        String ERR001 = "SF00303_ERR001";
        //deal not found
        String ERR002 = "SF00303_ERR002";
        //quotation not found
        String ERR003 = "SF00303_ERR003";
        //delete quotation error
        String ERR004 = "SF00303_ERR004";
    }

    interface SF00305 {
        String INF001 = "SF00305_INF001"; // normal
        String ERR001 = "SF00305_ERR001"; // send mail fail
        String ERR002 = "SF00305_ERR002"; // quotation not found
        String ERR003 = "SF00305_ERR003"; // Parse email template error
        String ERR004 = "SF00305_ERR004"; // Body mail or recipients list is empty
        String ERR005 = "SF00305_ERR005"; // Body mail or recipients list is empty
    }

    interface SF00308 {
        String INF001 = "SF00308_INF001";
        String ERR001 = "SF00308_ERR001"; //deal is not exist
        String ERR002 = "SF00308_ERR002"; //save checksheet error
        String ERR003 = "SF00308_ERR003";
    }

    interface SF00309 {
        String INF001 = "SF00309_INF001";
        String ERR001 = "SF00309_ERR001"; //deal is not exist
        String ERR002 = "SF00309_ERR002"; //save checksheet error
        String ERR003 = "SF00309_ERR003"; // Body mail or recipients list is empty
        String ERR004 = "SF00309_ERR003"; // parse email error
        String WRN001 = "SF00309_WRN001";
    }

    interface SF00310 {
        String INF001 = "SF00310_INF001";
        String ERR001 = "SF00310_ERR001"; //deal is not exist
        String ERR002 = "SF00310_ERR002"; //save checksheet error
        String ERR003 = "SF00310_ERR003"; // parse email error
        String WRN001 = "SF00310_WRN001";
    }

    interface SF00800 {
        String INF031 = "SF00800_INF031"; // upload successfully
        String ERR031 = "SF00303_ERR031"; // no any canvas part
        String ERR032 = "SF00303_ERR032"; // io exception
    }

    interface SF00501 {
        String INF001 = "SF00501_INF001";
        String WRN001 = "SF00501_WRN001";
        String ERR001 = "SF00501_ERR001";


    }

    interface SF00503 {
        String INF001 = "SF00503_INF001";
        String WRN001 = "SF00503_WRN001";
        //UserGoal is null
        String ERR001 = "SF00503_ERR001";
        //CustomerGoal is null
        String ERR002 = "SF00503_ERR002";
        //Delete CustomerGoal fail
        String ERR003 = "SF00503_ERR003";
        //List<DepartmentDto> is empty
        String ERR004 = "SF00503_ERR004";

    }

    /*SF00306 screen*/
    interface SF00306 {
        String INF001 = "SF00306_INF001";
        String INF002 = "SF00306_INF002"; //Send fail but update product
        String WRN001 = "SF00306_WRN001";
        String ERR001 = "SF00306_ERR001";
        String ERR002 = "SF00306_ERR002"; // Body mail or recipients list is empty
        String ERR003 = "SF00306_ERR003"; // Body mail or recipients list is empty
        String ERR006 = "SF00306_ERR006";
        String ERR007 = "SF00306_ERR007";
        String ERR008 = "SF00306_ERR008";
    }

    /*SF00307 screen*/
    interface SF00307 {
        String INF001 = "SF00307_INF001";
        String WRN001 = "SF00307_WRN001";
        String ERR001 = "SF00307_ERR001";
        String ERR002 = "SF00307_ERR002";
        String ERR003 = "SF00307_ERR003";
        String ERR004 = "SF00307_ERR004";
        String ERR005 = "SF00307_ERR005"; // deal status not valid to create/repeat order
    }


    /*SF00306 screen*/
    interface SF00204 {
        String INF001 = "SF00204_INF001";
        String WRN001 = "SF00204_WRN001";
    }

    /*SF00100 screen*/
    interface SF00100 {
        String INF001 = "SF00100_INF001";
        String ERR001 = "SF00100_ERR001";
        String WRN001 = "SF00100_WRN001";
    }

    /*SFN0402 得意先照会画面*/
    interface SFN0402 {
        /** エラー： 得意先・取引先が見つからない */
        String ERR001 = "SFN0402_ERR001";
        /** エラー： 届け先が見つからない */
        String ERR004 = "SFN0402_ERR004";
        /** エラー： PDF 出力エラー */
        String ERR005 = "SFN0402_ERR005";
    }
}
