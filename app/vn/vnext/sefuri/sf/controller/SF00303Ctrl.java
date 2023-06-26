package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00303CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Controller api SF00303
 *
 * @author hoangtd
 */
@ImplementedBy(SF00303CtrlImpl.class)
@RoleNeeded
public interface SF00303Ctrl {

    /**
     * Get data quotation info
     *
     * @param dealCode
     * @param quotationCode
     * @return
     */
    @Transactional
    Result sf0030300GetQuotationInfo(String dealCode, String quotationCode);

    /**
     * Save data quotatation
     *
     * @return quotation and quotationItem
     */
    @Transactional
    Result sf0030301SaveQuotation();

    /**
     * Duplicate quotation
     *
     * @return quotation and quotationItem
     */
    @Transactional
    Result sf0030302DuplicateQuotation();

    /**
     * Delete quotation
     *
     * @param quotationCode
     * @return messageCode
     */
    @Transactional
    Result sf0030303DeleteQuotation(String quotationCode);

}
