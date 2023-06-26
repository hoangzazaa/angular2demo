package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00305CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by DungTQ on 3/15/2017.
 */

@ImplementedBy(SF00305CtrlImpl.class)
@RoleNeeded
public interface SF00305Ctrl {

    @Transactional
    Result sf0030501Init(String quotationCode);

    @Transactional
    Result sf0030502SendMail();
}
