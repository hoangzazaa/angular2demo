package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0504CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SFN0504CtrlImpl.class)
@RoleNeeded
public interface SFN0504Ctrl {

    @Transactional
    Result sfn050401BaseScreenData();

    @Transactional
    Result sfn050402GetStockData();
}
