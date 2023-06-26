package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00310CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by ASUS on 5/8/2017.
 */
@ImplementedBy(SF00310CtrlImpl.class)
@RoleNeeded
public interface SF00310Ctrl {

    /**
     * Init data info
     * @param dealCode
     * @return
     */
    @Transactional
    Result sf00310Init(final String dealCode);

    /**
     * Request create design. Send mail
     * @return
     */
    @Transactional
    Result sf00310RequestDesign();
}
