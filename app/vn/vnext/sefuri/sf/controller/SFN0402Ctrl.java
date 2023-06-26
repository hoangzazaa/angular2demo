package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;

import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SFN0402CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * TOP &gt; 取引先検索 &gt; 取引先照会用 API
 *
 * Created by hoangtd on 4/12/2017.
 */
@ImplementedBy(SFN0402CtrlImpl.class)
@RoleNeeded
public interface SFN0402Ctrl {

    int TYPE_CUSTOMER = 1;
    int TYPE_SUPPLIER = 2;

    @Transactional
    Result sfn040201GetBasicInfo();

    @Transactional
    Result sfn040202GetSalesPerformance();

    @Transactional
    Result sfn040203GetCustomerRevenueList();

    @Transactional
    Result sfn040204GetStockList();

    @Transactional
    Result sfn040205GetProductList();

    @Transactional
    Result sfn040206SaveNote();

    @Transactional
    Result sfn040207ProductDisposal();

    @Transactional
    Result sfn040208ExportStockList();

    @Transactional
    Result sfn040209WoodenReturning();

    @Transactional
    Result sfn040210WoodenPending();

    @Transactional
    Result sfn040211ExportProductList();

    @Transactional
    Result sfn040212GetSupplierRevenueList();

    /**
     * 得意先の届け先一覧を取得する
     *
     * @param customerCode 得意先コード
     * @return 応答
     */
    @Transactional
    Result sfn040213GetShippingDestinationList(String customerCode);

    /**
     * 得意先の届け先詳細を取得する
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @return 応答
     */
    @Transactional
    Result sfn040214GetShippingDestinationDetail(String customerCode, int shippingDestinationId);

    /**
     * 得意先の届け先詳細を保存する
     *
     * <p>保存できるのは SF 管理項目のみです。 (電脳管理項目は単純に無視されます。)
     * <p>保存できる項目リスト
     * <ul>
     * <li>路線会社指定
     * <li>配送車両指定
     * <li>配送車両指定(その他)
     * <li>納品時間
     * <li>納品前TEL
     * <li>エボ添付
     * <li>天候不良時納品
     * <li>ストレッチフィルム巻き
     * <li>2F上げ
     * <li>2F上げ (有の内容)
     * <li>2F上げその他
     * <li>パレット納品
     * <li>パレット引取
     * <li>数量制限
     * <li>降ろし場所指定
     * <li>車両停車位置
     * <li>荷降ろし時のリフト使用者
     * <li>荷降ろし形態
     * <li>その他注意事項
     * <li>備考
     * <li>画像情報
     * </ul>
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @return 応答
     */
    @Transactional
    Result sfn040215SaveShippingDestinationDetail(String customerCode, int shippingDestinationId);

    /**
     * 届け先カルテ pdf のファイル名と取得パスを取得する。
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @return 応答
     */
    @Transactional
    Result sfn040217ExportShippingDestinationKartePdf(String customerCode, int shippingDestinationId);

}
