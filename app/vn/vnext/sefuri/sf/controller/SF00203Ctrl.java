package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00203CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by DungTQ on 3/8/2017.
 */

@ImplementedBy(SF00203CtrlImpl.class)
@RoleNeeded
public interface SF00203Ctrl {
    @Transactional
    Result sf0020301Init();
}
