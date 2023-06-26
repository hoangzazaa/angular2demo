package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00309CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by ASUS on 5/8/2017.
 */
@ImplementedBy(SF00309CtrlImpl.class)
@RoleNeeded
public interface SF00309Ctrl {
    /**
     * Init data info
     *
     * @param dealCode
     * @return
     */
    @Transactional
    Result sf0030901Init(final String dealCode, Integer requestType);

    /**
     * Request sample. Send mail
     *
     * @return
     */
    @Transactional
    Result sf0030902RequestSample();
}
