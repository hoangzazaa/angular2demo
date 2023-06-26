package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00201CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by TungNT on 2/23/2017.
 */
@ImplementedBy(SF00201CtrlImpl.class)
@RoleNeeded
public interface SF00201Ctrl {
    /**
     * Get list of template base on provider range.
     *
     * @return list templates
     */
    @Transactional
    Result sf0020101GetTemplates(Integer offset, Integer limit);

    /**
     * Add template to mybox.
     *
     * @param dealId
     * @return bookmark template
     */
    @Transactional
    Result sf0020102AddTemplateToMyBox(Integer dealId);

}
