package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CC00202CtrlImpl;

/**
 * CC00202 screen controller
 * <ul>
 * <li>cc0020102ResetPassword</li>
 * </ul>
 *
 * @author sonnb
 */
@ImplementedBy(CC00202CtrlImpl.class)
public interface CC00202Ctrl {

    /**
     * handling recover password request
     */
    @Transactional
    Result cc0020102ResetPassword();
}
