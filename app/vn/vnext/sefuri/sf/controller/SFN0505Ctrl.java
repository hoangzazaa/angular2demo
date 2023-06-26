package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0307CtrlImpl;
import vn.vnext.sefuri.sf.controller.impl.SFN0505CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SFN0505CtrlImpl.class)
@RoleNeeded
public interface SFN0505Ctrl {

    @Transactional
    Result sfn050501BaseScreenData();

    @Transactional
    Result sfn050502GetShippingData();
}
