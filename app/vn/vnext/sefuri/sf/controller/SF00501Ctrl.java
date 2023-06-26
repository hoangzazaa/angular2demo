package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00501CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

@ImplementedBy(SF00501CtrlImpl.class)
@RoleNeeded
public interface SF00501Ctrl {

    @Transactional
    Result sf0050101GetDepartmentList();

    @Transactional
    Result sf0050102GetPerformanceData();

    @Transactional
    Result sf0050103GetMonthDeals();
}
