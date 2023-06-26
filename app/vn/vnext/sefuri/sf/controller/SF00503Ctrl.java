package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;

import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00503CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * 営業目標登録
 *
 * @author Created by NgocNM on 2/9/2017.
 */
@ImplementedBy(SF00503CtrlImpl.class)
@RoleNeeded
public interface SF00503Ctrl {
    /**
     * GET /SF0050300 部門一覧を取得
     *
     * @return 応答
     */
    @Transactional
    Result sf0050300GetDepartment();

    /**
     * POST /SF0050301 部門目標と前年度の売上実績を取得
     *
     * @return 応答
     */
    @Transactional
    Result sf0050301Init01();

    /**
     * POST /SF0050302 部門目標、活動方針の保存
     *
     * @return 応答
     */
    @Transactional
    Result sf0050302Save01();

    /**
     * POST /SF0050303 目標値、次年度担当の保存 (新規顧客, 既存顧客(その他) の追加も含む)
     *
     * @return 応答
     */
    @Transactional
    Result sf0050303Save02();

    /**
     * POST /SF0050304 新規顧客, 既存顧客(その他) の削除
     *
     * @return 応答
     */
    @Transactional
    Result sf0050304Delete02();

    /**
     * POST /SF0050305 得意先別目標と前年度の売上実績を取得
     *
     * @return 応答
     */
    @Transactional
    Result sf0050305Init02();

    /**
     * POST /SF0050306 年度リストの取得
     *
     * @return 応答
     */
    @Transactional
    Result sf0050306GetFinanceYear();

    /**
     * POST /SF0050307
     *
     * @return 応答
     */
    @Transactional
    Result sf0050307CreateCustomerGoalAutomatically();
}
