package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00502CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by NgocNM on 2/9/2017.
 */
@ImplementedBy(SF00502CtrlImpl.class)
@RoleNeeded
public interface SF00502Ctrl {

    @Transactional
    Result sf0050201GetDepartmentList();

    @Transactional
    Result sf0050202GetDepartmentData();

    @Transactional
    Result sf0050203SaveNote();

    @Transactional
    Result sf0050204SavePrediction();

    @Transactional
    Result sf0050205GetCompanyData();
}
