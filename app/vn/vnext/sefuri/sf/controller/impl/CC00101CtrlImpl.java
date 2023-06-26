package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.controller.CC00101Ctrl;
import vn.vnext.sefuri.sf.json.request.CC0010101Req;
import vn.vnext.sefuri.sf.json.request.CC0010102Req;

public class CC00101CtrlImpl extends CommonCtrl implements CC00101Ctrl {

    @Override
    public Result cc0010101LoggingButtonOperation() {

        CC0010101Req req = requestJson(CC0010101Req.class);

        // リクエストに問題があるため400エラーとしたいが、利用方法的に200以外を返すとエラーの元になりそうなのでここでは200を返す。
        if(req == null) return ok();

        dbLoggingService.sv90106ButtonOperation(req.getFunction(), req.getButtonName());

        return ok();
    }

    @Override
    public Result cc0010102LoggingTransition() {

        CC0010102Req req = requestJson(CC0010102Req.class);

        // リクエストに問題があるため400エラーとしたいが、利用方法的に200以外を返すとエラーの元になりそうなのでここでは200を返す。
        if(req == null) return ok();

        dbLoggingService.sv90107Transition(req.getFunction(), req.getTransitionPath());

        return ok();
    }
}
