package vn.vnext.sefuri.sf.controller;

import com.google.inject.ImplementedBy;

import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.controller.impl.SF00304CtrlImpl;
import vn.vnext.sefuri.sf.helper.RoleNeeded;

/**
 * Created by haipt on 11/8/2016.
 */
@ImplementedBy(SF00304CtrlImpl.class)
public interface SF00304Ctrl {
    @Transactional
    Result sf0030401GetQuotationTemplates();

    /**
     * GET /SF0030402/:quotationCode/:option/:fileName 見積書pdf 生成
     *
     * <pre>
     * option について
     * 値 書式名                   Jasper report テンプレート
     * ------------------------------------------------------------------------------
     * 3 サガシキ標準：横（角印あり） conf/jasper/EstimateJasper_6.jasper
     * 4 サガシキ標準：横（角印なし） conf/jasper/EstimateJasper_2.jasper
     * 7 アクトン標準：横（角印あり） conf/jasper/EstimateJasper_8.jasper
     * 8 アクトン標準：横（角印なし） conf/jasper/EstimateJasper_4.jasper
     * ＜/pre>
     *
     * @param quotationCode 見積もりコード
     * @param option 見積書フォーマット
     * @param fileName ファイル名
     * @return
     */
    @Transactional
    @RoleNeeded
    Result sf0030402ExportFiles(String quotationCode, int option, String fileName);
}
