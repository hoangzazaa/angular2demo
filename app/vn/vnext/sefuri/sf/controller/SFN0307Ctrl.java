package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0307CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SFN0307CtrlImpl.class)
@RoleNeeded
public interface SFN0307Ctrl {

    /* constant order mode */
    int MODE_CREATE = 1;
    int MODE_UPDATE = 2;

    @Transactional
    Result sfn030701GetOrderInfo();

    @Transactional
    Result sfn030702AddShippingAddress();

    @Transactional
    Result sfn030703RequestOrder();

    @Transactional
    Result sfn030704ExportProduct();
}
