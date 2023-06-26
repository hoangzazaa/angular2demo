package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00101Ctrl;
import vn.vnext.sefuri.sf.json.response.SF0010101Res;
import vn.vnext.sefuri.sf.util.MessagesUtil;

/**
 * Created by VuPT on 12/12/2016.
 */
public class SF00101CtrlImpl extends CommonCtrl implements SF00101Ctrl {
    @Override
    public Result sf0010101getUrl() {
        SF0010101Res res = new SF0010101Res();
        res.setSf00301Url(MessagesUtil.getPropertyValue("dashboard.properties", "SF003_01_URL").split(","));
        res.setSf00302Url(MessagesUtil.getPropertyValue("dashboard.properties", "SF003_02_URL").split(","));
//        res.setSf00303Url(MessagesUtil.getPropertyValue("dashboard.properties", "SF003_03_URL").split(","));
//        res.setSf00304Url(MessagesUtil.getPropertyValue("dashboard.properties", "SF003_04_URL").split(","));
        return responseJson(res, MessageCode.COM.INF001);
    }
}
