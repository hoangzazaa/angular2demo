package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00202CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by TungNT on 3/3/2017.
 */
@ImplementedBy(SF00202CtrlImpl.class)
@RoleNeeded
public interface SF00202Ctrl {

    /**
     * search Deals by given conditions and pagination (all stored in `SF0020201Req` object)
     * @return deals' infomations stored in`CustomDealQuotationItems` object
     */
    @Transactional
    Result sf0020201Deal();

    /**
     * book mark deal
     * @return bookmark
     */
    @Transactional
    Result sf0020202BookmarkDeal();

    @Transactional
    Result sf0020204Search();

}

