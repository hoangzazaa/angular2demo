package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00205CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by manhnv on 6/14/2017.
 */
@RoleNeeded
@ImplementedBy(SF00205CtrlImpl.class)
public interface SF00205Ctrl {
    @Transactional
    Result sf0020501Init();

    @Transactional
    Result sf0020502GetDeals();

    @Transactional
    Result sf0020503BookmarkDeal();

}
