package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CC00300CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * CC003 screen controller to handle change password action.
 *
 * @author manhnv
 */
@RoleNeeded
@ImplementedBy(CC00300CtrlImpl.class)
public interface CC00300Ctrl {
    /**
     * Method use to handles request for changing password.
     */
    @Transactional
    Result cc0030001changePassword();
}
