package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00204CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/19/2017.
 */
@RoleNeeded
@ImplementedBy(SF00204CtrlImpl.class)
public interface SF00204Ctrl {

    @Transactional
    Result sf0020401InitData();

    @Transactional
    Result sf0020402SearchProducts();

    @Transactional
    Result sf0020403AddProductToDeal();
}
