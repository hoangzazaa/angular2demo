package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00800CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by DungTQ on 2/2/2017.
 */
@ImplementedBy(SF00800CtrlImpl.class)
@RoleNeeded
public interface SF00800Ctrl {

    /**
     * Retrieve the basic information of the screen
     *
     * @param productId
     * @return Result
     */
    @Transactional
    Result sf0080101Init(Integer productId);

    /**
     * Save
     *
     * @return Result
     */
    @Transactional
    Result sf0080102Save();

    /**
     * Save SF008 screen drawing
     *
     * @return Result
     */
    @Transactional
    Result sf0080103SaveDrawings();

    /**
     * Get real image file
     *
     * @return Result
     */
    @Transactional
    Result sf0080104GetTrimmingSizeList();
}
