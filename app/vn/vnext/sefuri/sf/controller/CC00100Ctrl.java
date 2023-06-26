package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CC00100CtrlImpl;

/**
 * CC001 screen controller
 * <ul>
 * <li>cc0010001Login</li>
 * <li>cc0010002Authorize</li>
 * <li>cc0010003Logout</li>
 * </ul>
 *
 * @author haipt
 */
@ImplementedBy(CC00100CtrlImpl.class)
public interface CC00100Ctrl {

    /**
     * handling login request
     */
    @Transactional
    public Result cc0010001Login();

    /**
     * handling authorize request
     */
    @Transactional
    public Result cc0010002Authorize();

    /**
     * handling logout request
     */
    @Transactional
    public Result cc0010003Logout();
}
