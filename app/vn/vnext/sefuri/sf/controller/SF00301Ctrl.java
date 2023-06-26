package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00301CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by TungNT on 1/10/2017.
 */
@ImplementedBy(SF00301CtrlImpl.class)
@RoleNeeded
public interface SF00301Ctrl {

    /**
     * Get data deal info
     *
     * @param dealCode: String
     * @return Result
     */
    @Transactional
    Result sf0030101Init(String dealCode);

    /**
     * Save deal
     *
     * @return Result
     */
    @Transactional
    Result sf0030102SaveDeal();

    /**
     * Save deal file
     *
     * @return Result
     */
    @Transactional
    Result sf0030103SaveDealFile();

    /**
     * Upload deal file
     *
     * @return Result
     */
    @Transactional
    Result sf0030104UpdateDealFile();

    /**
     * Remove deal file
     *
     * @return Result
     */
    @Transactional
    Result sf0030105RemoveDealFile();

    /**
     * Remove quotation
     *
     * @return Result
     */
    @Transactional
    Result sf0030106RemoveQuotation();

    /**
     * Remove deal product
     *
     * @return Result
     */
    @Transactional
    Result sf0030107RemoveDealProduct();

    /**
     * Remove product file
     *
     * @return Result
     */
    @Transactional
    Result sf0030108RemoveProductFile();

    /**
     * Add comment
     *
     * @return Result
     */
    @Transactional
    Result sf0030109AddComment();

    /**
     * Show more comment
     *
     * @return Result
     */
    @Transactional
    Result sf0030110ShowMoreComment();

    /**
     * Remove deal
     *
     * @return Result
     */
    @Transactional
    Result sf0030112DeleteDeal();

    /**
     * Bookmark deal info
     *
     * @return
     */
    @Transactional
    Result sf0030113BookmarkDealInfo();

    /**
     * Unbookmark deal info
     *
     * @return
     */
    @Transactional
    Result sf0030114UnBookmarkDealInfo();

    /**
     * Get deal my box
     *
     * @return
     */
    @Transactional
    Result sf0030115GetDealMybox();

    /**
     * Duplicate deal
     *
     * @return
     */
    @Transactional
    Result sf0030116CreateDeal();

    /**
     * Update highlightFlag
     *
     * @return
     */
    @Transactional
    Result sf0030117UpdateHighlightFlag();

    @Transactional
    Result sf0030118GetCustomers();

    /**
     * Update deal status.
     *
     * @return
     */
    @Transactional
    Result sf0030119UpdateDealStatus();

    /**
     * Close deal
     *
     * @return Result
     */
    @Transactional
    Result sf0030120CloseDeal();

    @Transactional
    Result sf0030121Download();

    @Transactional
    Result sf0030122LockDeal();
}
