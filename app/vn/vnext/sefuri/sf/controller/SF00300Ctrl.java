package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00300CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

@ImplementedBy(SF00300CtrlImpl.class)
@RoleNeeded
public interface SF00300Ctrl {

    @Transactional
    Result sf0030001GetDealByDealCode(String dealCode);

    @Transactional
    Result sf0030002BookmarkDeal();

    @Transactional
    Result sf0030003UnBookmarkDeal();

}
