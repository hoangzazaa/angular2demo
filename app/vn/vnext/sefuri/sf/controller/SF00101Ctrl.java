package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00101CtrlImpl;

/**
 * Created by VuPT on 12/12/2016.
 */
@ImplementedBy(SF00101CtrlImpl.class)
public interface SF00101Ctrl {

    @Transactional
    Result sf0010101getUrl();
}
