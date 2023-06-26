package vn.vnext.sefuri.sf.controller.impl;

import com.google.inject.Inject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.CC00201Ctrl;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.json.request.CC0020101Req;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.util.JsonUtil;

import static vn.vnext.sefuri.sf.common.Constants.COOKIE_TOKEN;

/**
 * CC00201 screen controller implement
 *
 * @author haipt
 */
public class CC00201CtrlImpl extends CommonCtrl implements CC00201Ctrl {

    private static final Logger logger = LoggerFactory.getLogger(CC00201CtrlImpl.class);

    /* inject SV002 */
    @Inject
    private SV002UserService sv002UserService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Result cc0020101RecoverPassword() {
        /* parse user email from request */
        CC0020101Req req = requestJson(CC0020101Req.class);

        logger.info("request body : {}", JsonUtil.toJsonString(req));

        /* try to create a recover token */
        try {
            sv002UserService.sv00201CreateRecoverKey(req.getEmail());
        } catch (SfrException exception) {
            logger.warn("SfrException : handled error.", exception);
            return responseError(MessageCode.CC00201.ERR001);
        } catch (Exception e) {
            logger.warn("Exception : Server error.", e);
            return responseError(MessageCode.CC00201.ERR002);
        }

        // forced user to re-login
        response().discardCookie(COOKIE_TOKEN);

        /* if all task well done, send successful response */
        return responseOk();
    }

}
