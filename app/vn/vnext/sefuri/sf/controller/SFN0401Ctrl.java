package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0401CtrlImpl;
import vn.vnext.sefuri.sf.controller.impl.SFN0505CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SFN0401CtrlImpl.class)
@RoleNeeded
public interface SFN0401Ctrl {

    @Transactional
    Result sfn040101SearchCustomer();

    @Transactional
    Result sfn040102SearchSupplier();
}
