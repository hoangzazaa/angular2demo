package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00100CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by DungTQ on 6/5/2017.
 */
@ImplementedBy(SF00100CtrlImpl.class)
@RoleNeeded
public interface SF00100Ctrl {
    @Transactional
    Result sf0010001GetDepartment();

    @Transactional
    Result sf0010002GetTab1Data();

    @Transactional
    Result sf0010003GetTab2Data();

    @Transactional
    Result sf0010004Save();

    @Transactional
    Result sf0010005GetDeals();

}
