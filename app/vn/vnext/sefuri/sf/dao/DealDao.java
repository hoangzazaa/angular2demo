package vn.vnext.sefuri.sf.dao;

import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dao.impl.DealDaoImpl;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.SF00205.request.SF00205Filter;

/**
 * Deal dao action with database table sfr_deal
 *
 * @author hoangtd
 */
@ImplementedBy(DealDaoImpl.class)
public interface DealDao extends GenericDao<DealDto> {

    /**
     * Get deal by dealCode
     *
     * 削除された案件は取得できない。
     *
     * @param dealCode deal code
     * @return Deal dto
     */
    DealDto findDealInfoByDealCode(String dealCode);

    /**
     * Find deal by deal code and product code
     *
     * @param dealCode
     * @param productCode
     * @return
     */
    DealDto findDealByDealCodeAndProductCode(String dealCode, String productCode);

    /**
     * 案件 ID から案件を取得する。削除された案件は取得できない。
     *
     * <p>order に対応する注文が記入されている
     *
     * @param dealId 案件 ID
     * @return 案件情報 (null: 見つからない)
     */
    DealDto findDealAndOrderByDealId(int dealId);

    /**
     * Delete deal info by deal id
     *
     * @param dealCode
     */
    void deleteDealInfo(String dealCode);

    List<DealDto> findDealByProductId(Integer productId);

    List<DealDto> getAllBookmarkDeals(int userId, int startPosition, int maxResult);

    List<DealDto> getDeals(Integer start, Integer offset);

    List<DealDto> filterExistingDealsInList(List<Integer> dealIds);


    DealDto findDealInfoByDealCodeAndStatus(String dealCode, Integer dealStatus);

    /**
     * 指定ユーザーもしくは指定部門が担当する案件の全件取得
     *
     * <p>以下の条件に合致する案件を取得する
     * <ul>
     * <li>テンプレートではない (sfr_sf_template_flag=0)
     * <li>削除されていない (sfr_sf_deal.delete_flag=0)
     * <li>案件ステータス(deal_status)が以下のどれか
     * <ul>
     * <li>受注確定 (sfr_sf_deal.deal_status=4)
     * <li>出荷待ち (sfr_sf_deal.deal_status=5)
     * <li>一部出荷待ち (sfr_sf_deal.deal_status=6)
     * <li>出荷済 (sfr_sf_deal.deal_status=7)
     * <li>CLOSE  (sfr_sf_deal.closed_flag=1)
     * </ul>
     * <li>リピート案件ではない (sfr_sf_deal.source_deal_id=NULL)
     * <li>担当が指定ユーザー自身もしくは指定部門に所属するユーザーが担当
     * </ul>
     *
     * @param index 取得開始位置(0-)
     * @param limit 取得件数
     * @param userId ユーザー ID
     * @param departmentId 部門 ID
     * @return 取得結果 (案件の更新日時降順)
     * @see vn.vnext.sefuri.sf.dao.DealDao.countDeals(Integer, Integer)
     */
    List<DealDto> getAllDealLazy(Integer index, Integer limit, Integer userId, Integer departmentId);

    /**
     * {@link vn.vnext.sefuri.sf.dao.DealDao.getAllDealLazy(Integer, Integer, Integer, Integer)} で取得できる案件の全件数を取得する
     *
     * @param userId ユーザー ID
     * @param departmentId 部門 ID
     * @return 案件の全件数
     * @see vn.vnext.sefuri.sf.dao.DealDao.getAllDealLazy(Integer, Integer, Integer, Integer)
     */
    Long countDeals(Integer userId, Integer departmentId);

    List<Object[]> getDeal(Integer departmentId, Integer picId, String endDate, String startDate);

    List<DealDto> getAllDealsInProcess(Integer userId, Integer departmentId, Integer offset, Integer limit);

    long countDealInProcess(Integer userId, Integer departmentId);

    List<DealDto> getDealFromTo(SF00205Filter filter, Integer offset, Integer limit);

    long countDealByFilter(SF00205Filter filter);

    DealDto getDealDtoByOrderId(Integer orderId);

    /**
     * 営業部門が担当する案件の全件取得
     *
     * <p>以下の条件に合致する案件を取得する
     * <ul>
     * <li>テンプレートではない (sfr_sf_template_flag=0)
     * <li>削除されていない (sfr_sf_deal.delete_flag=0)
     * <li>案件ステータス(deal_status)が以下のどれか
     * <ul>
     * <li>受注確定 (sfr_sf_deal.deal_status=4)
     * <li>出荷待ち (sfr_sf_deal.deal_status=5)
     * <li>一部出荷待ち (sfr_sf_deal.deal_status=6)
     * <li>出荷済 (sfr_sf_deal.deal_status=7)
     * <li>CLOSE  (sfr_sf_deal.closed_flag=1)
     * </ul>
     * <li>リピート案件ではない (sfr_sf_deal.source_deal_id=NULL)
     * <li>案件の担当営業が営業部門に所属(stf_sf_department.type=1)
     * </ul>
     *
     * @param index 取得開始位置(0-)
     * @param limit 取得件数
     * @return 取得結果 (案件の更新日時降順)
     * @see vn.vnext.sefuri.sf.dao.DealDao.countDealsSales()
     */
    List<DealDto> getAllDealSales(final Integer index, final Integer limit);

    /**
     * {@link vn.vnext.sefuri.sf.dao.DealDao.getAllDealSales(Integer, Integer)} で取得できる案件の全件数を取得する
     *
     * @return 案件の全件数
     * @see vn.vnext.sefuri.sf.dao.DealDao.getAllDealSales(Integer, Integer)
     */
    Long countDealsSales();

    /**
     * 指定された案件からリピート注文された案件を取得する
     *
     * <p>order に対応する注文が記入されている
     *
     * @param dealId 元案件 ID
     * @return 取得結果  (案件の更新日時降順)
     */
    List<DealDto> getRepeatDealsAndOrders(int dealId);

}
