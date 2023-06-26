package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00307CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SF00307CtrlImpl.class)
@RoleNeeded
public interface SF00307Ctrl {
    /**
     * Get data for UI
     *
     * @param dealCode: String
     * @return Result
     */
    @Transactional
    Result sf0030701Init(String dealCode);

    @Transactional
    Result sf0030702ExportProduct();

    /**
     * Find product list by quotationId
     *
     * @return
     */
    @Transactional
    Result sf0030703FindProducts();

    @Transactional
    Result sf0030704RequestOrder();

}
