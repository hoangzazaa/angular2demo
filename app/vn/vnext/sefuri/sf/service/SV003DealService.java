package vn.vnext.sefuri.sf.service;

import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.ChecksheetDto;
import vn.vnext.sefuri.sf.dto.CommentDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.json.SF00100.model.DealInfoJson;
import vn.vnext.sefuri.sf.json.SF00205.request.SF00205Filter;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.service.impl.SV003DealServiceImpl;

/**
 * Created by TungNT on 11/17/2016.
 */
@ImplementedBy(SV003DealServiceImpl.class)
public interface SV003DealService {

    DealDto sv00301GetDealById(Integer dealId);

    /**
     * リピート案件を考慮した案件検索
     *
     * dealId がリピート案件の場合は元案件を取得します。
     *
     * @param dealId 案件 ID
     * @return 案件 (null: 見つからない)
     */
    DealDto getSourceDealById(int dealId);

    DealProductDto sv00302GetDealProductByDealCodeAndProductCode(String dealCode, String productCode);

    DealProductDto sv00303CreateDealProduct(Integer dealId, ProductJson productJson, Integer copyType);

    DealProductDto sv00304CopyAndSaveDealProduct(Integer dealId, ProductJson productJson, Integer copyType);

    boolean sv00305DeleteDealProductById(Integer dealProductId);

    DealDto sv00306GetDealByDealCode(String dealCode);

    DealDto sv00307SaveDeal(DealDto dealDto);

    CommentDto sv00308SaveComment(CommentDto commentDto);

    boolean sv00309DeleteDealByDealCode(String dealCode);

    DealFileDto sv00310SaveDealFile(DealFileDto dealFileDto);

    void sv00311DeleteDealFile(Integer dealFileId);

    void sv00311DeleteDealFile(DealFileDto dealFile);

    List<ProductFileDto> sv00312GetProductFileByProductId(Integer productId);

    List<DealFileDto> sv00313GetDealFileByDealId(Integer dealId);

    boolean sv00314CheckDealAndProductRelationship(String dealCode, String productCode);

    List<CommentDto> sv00315ShowMoreComment(Integer dealId, Integer index);

    DealFileDto sv00316CreateDealFile(DealFileDto dealFileDto, String fileCode);

    List<DealDto> sv00318GetDealByProductId(Integer productId);

    List<DealDto> sv00319ShowMoreTemplate(Integer limit, Integer offset);

    Long sv00320GetTotalTemplates();

    List<DealDto> sv00324GetAllBookmarkDeals(int userId, int startPosition, int maxResult);

    DealDto sv00325CopyAndSaveDeal(DealDto newDealInfo, String copyFrom);

    List<ChecksheetDto> sv00326GetCheckSheetsByDealId(Integer dealId);

    List<DealDto> sv00326FilterExistingDealById(List<Integer> ids);

    ChecksheetDto sv00327SaveCheckSheet(ChecksheetDto checksheetDto);

    DealDto sv00330CreateDeal(DealDto dealDto);

    Integer sv00328UpdateHighlightFlag(Integer itemId, Integer status, String itemType);

    DealDto sv00329GetDealByDealCode(String dealCode, Integer dealStatus);

    /**
     * Method use to update deal status when request design, create order...
     *
     * @param dealId current deal id
     * @return state updated deal's status
     */
    Integer sv00329UpdateDealStatus(Integer dealId);

    /**
     * Using product from deal
     *
     * @param dealId
     * @param productDto
     * @return
     */
    DealProductDto sv00330UsingProductFromDeal(DealProductDto dealProductDtoBefore, Integer dealId, ProductDto productDto);

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
     * @see vn.vnext.sefuri.sf.service.SV003DealService.sv00331CountDeals(Integer, Integer)
     */
    List<DealDto> sv00322GetAllDealLazy(Integer index, Integer limit, Integer userId, Integer departmentId);

    /**
     * {@link vn.vnext.sefuri.sf.service.SV003DealService.sv00322GetAllDealLazy(Integer, Integer, Integer, Integer)} で取得できる案件の全件数を取得する
     *
     * @param userId ユーザー ID
     * @param departmentId 部門 ID
     * @return 案件の全件数
     * @see vn.vnext.sefuri.sf.service.SV003DealService.sv00322GetAllDealLazy(Integer, Integer, Integer, Integer)
     */
    Long sv00331CountDeals(Integer userId, Integer departmentId);

    DealDto sv00332RepeatDeal(DealDto source);

    void sv003033RemoveDealById(int dealId);

    List<DealInfoJson> sv003035GetDeal(Integer departmentId, Integer picId, String startDate, String endDate);

    List<DealDto> sv00336GetDealInProcess(Integer userId, Integer departmentId, Integer offset, Integer limit);

    long sv00337CountDealInProcess(Integer userId, Integer departmentId);

    void sv0030307CloseDeal(Integer dealId);

    List<DealDto> sv0020501GetDeals(SF00205Filter filter, Integer offset, Integer limit);

    long sv0020502CountDeal(SF00205Filter filter);

    DealFileDto sv00338GetDealFile(Integer dealId, Integer fileId);
    Long sv003034GetTotalCommentsByDealId(Integer dealId);

    CommentDto sv003035GetLatestCommentByDealId(Integer dealId);

    Integer sv003036DealLock(Integer dealId);

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
     * @see vn.vnext.sefuri.sf.service.SV003DealService.sv0020202CountDealInProcessOfSales()
     */
    List<DealDto> sv0020201GetDealInProcessOfSales(Integer offset, Integer limit);

    /**
     * {@link vn.vnext.sefuri.sf.service.SV003DealService.sv0020201GetDealInProcessOfSales(Integer, Integer)} で取得できる案件の全件数を取得する
     *
     * @return 案件の全件数
     * @see vn.vnext.sefuri.sf.service.SV003DealService.sv0020201GetDealInProcessOfSales(Integer, Integer)
     */
    long sv0020202CountDealInProcessOfSales();

    /**
     * 指定案件の関連案件 (元案件、リピート案件) を取得する
     *
     * <p>案件に対応する注文(order)も設定される。
     *
     * @param deal 案件
     * @return 取得結果 (案件の更新日時降順。一番最後に元案件)  取得結果には自分自身(deal) も含む
     *  空の場合はデータ不整合
     */
    List<DealDto> findReleatedDeals(DealDto deal);

}
