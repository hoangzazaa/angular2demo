package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0702CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

@ImplementedBy(SFN0702CtrlImpl.class)
@RoleNeeded
public interface SFN0702Ctrl {
    @Transactional
    Result sfn070201GetDealProduct(String dealCode, String productCode);
}
