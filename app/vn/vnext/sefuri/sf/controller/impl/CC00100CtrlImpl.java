package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Http;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.CC00100Ctrl;
import vn.vnext.sefuri.sf.json.request.CC0010001Req;
import vn.vnext.sefuri.sf.json.response.CC0010001Res;
import vn.vnext.sefuri.sf.json.response.CC0010003Res;
import vn.vnext.sefuri.sf.service.SV001AuthService;

import javax.inject.Inject;

/**
 * CC001 screen controller implement
 *
 * @author haipt
 */
public class CC00100CtrlImpl extends CommonCtrl implements CC00100Ctrl, Constants {

    /* inject sv001AuthService */
    @Inject
    private SV001AuthService sv001AuthService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Result cc0010001Login() {
        // get request
        CC0010001Req req = requestJson(CC0010001Req.class);

        // do login
        String token = sv001AuthService.sv00101CheckLogin(req.getEmail(), req.getPassword());

        if (token == null) {
            // logout fail
            response().discardCookie(COOKIE_TOKEN);
            return unauthorized(WRONG_PASSWORD);
        }

        // login success, check for remember or not
        Integer rememberDuration = null;
        if (req.isRememberMe()) {
            // set maxAge valid for 30 days (30*24*60*60 = 2,592,000 seconds)
            rememberDuration = 2592000;
        }
        // set cookie
        response().setCookie(new Http.Cookie(COOKIE_TOKEN, token, rememberDuration, "/", "", false, true));

        // response user data
        CC0010001Res res = new CC0010001Res(sv001AuthService.getCurrentUser());
        return responseJson(res, MessageCode.COM.INF001);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Result cc0010002Authorize() {
        // get client token cookie
        Http.Cookie cookie = request().cookie(COOKIE_TOKEN);
        if (cookie != null) {
            // if cookie exists, validate token
            boolean isAuth = sv001AuthService.sv00102AuthenticateUser(cookie.value());
            if (isAuth) {
                // authorize done
                CC0010003Res res = new CC0010003Res(sv001AuthService.getCurrentUser());
                return responseJson(res, MessageCode.COM.INF001);
            } else {
                // authorize fail, return unauthorized
                response().discardCookie(COOKIE_TOKEN);
                return unauthorized(INVALID_TOKEN);
            }
        }

        // cookie not exists, return unauthorized
        return unauthorized(TOKEN_NOT_FOUND);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Result cc0010003Logout() {
        // discard cookie
        response().discardCookie(COOKIE_TOKEN);
        // response empty
        return responseOk();
    }

}
