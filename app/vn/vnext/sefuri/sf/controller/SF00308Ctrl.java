package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00308CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by TungNT on 16/03/2017.
 */
@ImplementedBy(SF00308CtrlImpl.class)
@RoleNeeded
public interface SF00308Ctrl {
    @Transactional
    Result sf0030801Init(String dealCode);
    @Transactional
    Result sf0030802Save();
}
