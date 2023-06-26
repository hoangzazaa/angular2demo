package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.CC00101CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

@ImplementedBy(CC00101CtrlImpl.class)
@RoleNeeded
public interface CC00101Ctrl {

    @Transactional
    Result cc0010101LoggingButtonOperation();

    @Transactional
    Result cc0010102LoggingTransition();
}
