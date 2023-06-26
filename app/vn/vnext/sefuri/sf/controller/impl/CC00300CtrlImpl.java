package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.CC00300Ctrl;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.request.CC0030001Req;
import vn.vnext.sefuri.sf.json.response.CC0030001Res;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.util.GenerateUtil;

import javax.inject.Inject;

import static vn.vnext.sefuri.sf.common.Constants.COOKIE_TOKEN;

/**
 * CC003 screen controller implementation.
 *
 * @author manhnv
 */
public class CC00300CtrlImpl extends CommonCtrl implements CC00300Ctrl {
    @Inject
    private SV001AuthService sv001AuthService;

    @Inject
    private SV002UserService sv002UserService;

    @Override
    public Result cc0030001changePassword() {
        try {
            CC0030001Req req = requestJson(CC0030001Req.class);

            UserDto user = sv001AuthService.getCurrentUser();
            if (user == null || !GenerateUtil.encode(req.getCurrentPassword()).equals(user.getPassword()))
                return responseError(MessageCode.CC00300.ERR001);

            // update current password by new password
            user.setPassword(GenerateUtil.encode(req.getNewPassword()));
            sv002UserService.sv00203ChangePassword(user);

            // forced users to re-login after change their password
            response().discardCookie(COOKIE_TOKEN);

            CC0030001Res res = new CC0030001Res(user);
            return responseJson(res, MessageCode.CC00300.INF001);
        } catch (Exception e) {
            return responseError(MessageCode.COM.ERR001);
        }
    }
}
