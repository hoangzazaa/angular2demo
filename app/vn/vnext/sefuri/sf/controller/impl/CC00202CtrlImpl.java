package vn.vnext.sefuri.sf.controller.impl;

import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.controller.CC00202Ctrl;
import vn.vnext.sefuri.sf.json.request.CC0020102Req;
import vn.vnext.sefuri.sf.service.SV002UserService;

import static vn.vnext.sefuri.sf.common.Constants.COOKIE_TOKEN;

/*
 * {@inheritDoc}
 */
public class CC00202CtrlImpl extends CommonCtrl implements CC00202Ctrl {

    /* inject SV002 */
    @Inject
    private SV002UserService serviceRecoverPassword;

    @Override
    public Result cc0020102ResetPassword() {
        /* parse needed information from request */
        CC0020102Req req = requestJson(CC0020102Req.class);
        String tokenKey = req.getTokenKey();
        String password = req.getPassword();

        /* try to reset password for who clicked reset password link. get user's email if success */
        serviceRecoverPassword.sv00202ResetUserPassword(tokenKey, password);

        // forced user to re-login
        response().discardCookie(COOKIE_TOKEN);

        /* if all task well done, send successful response */
        return responseOk();
    }
}
