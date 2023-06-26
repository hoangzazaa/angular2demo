package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00306CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by NguyenPK on 11/04/2017.
 */
@ImplementedBy(SF00306CtrlImpl.class)
@RoleNeeded
public interface SF00306Ctrl {

    /**
     * Get data deal info, checksheet
     *
     * @param dealCode: String
     * @return Result
     */
    @Transactional
    Result sf0030601Init(String dealCode);

    /**
     * Sen email product
     *
     * @return Result
     */
    @Transactional
    Result sf0030602SendMail();

    @Transactional
    Result sf0030603UpdateRequestLot();

    @Transactional
    Result sf0030604ExportSpecificationPdf();

}
