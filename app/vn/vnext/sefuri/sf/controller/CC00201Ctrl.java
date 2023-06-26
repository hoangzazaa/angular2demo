package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CC00201CtrlImpl;

/**
 * CC00201 screen controller
 * <ul>
 * <li>cc0020101RecoverPassword</li>
 * </ul>
 *
 * @author haipt
 */
@ImplementedBy(CC00201CtrlImpl.class)
public interface CC00201Ctrl {

    /**
     * handling recover password request
     */
    @Transactional
    Result cc0020101RecoverPassword();
}
