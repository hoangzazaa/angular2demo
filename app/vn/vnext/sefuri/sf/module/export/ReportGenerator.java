package vn.vnext.sefuri.sf.module.export;

import java.io.IOException;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.json.SF00309.model.SF003090_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_DealJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_RequestModel;
import vn.vnext.sefuri.sf.module.export.impl.ReportGeneratorImpl;

/**
 * 帳票出力
 *
 * Created by DungTQ on 5/19/2017.
 */
@ImplementedBy(ReportGeneratorImpl.class)
public interface ReportGenerator {
    /**
     * 見積書 PDF 出力
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
     * @return 出力フォルダ名 (ランダム部分のみ)
     * @throws IOException
     */
    String exportQuotationFile(String quotationCode, int option, String fileName) throws IOException;

    String exportProductFile(Integer productId, String dealCode);

    String exportRequestCreateSamplePdf(final DealDto deal, final SF003090_ParsedProductInfoJson product,
                                        final SF00309_RequestModelJson requestModel);

    String sv01208ExportRequestCreateR005Pdf(SF00310_RequestModel requestModel, SF00310_ParsedProductInfoJson product, final SF00310_DealJson deal);

    String r009(final List<InventoryDto> inventoryDtos, final CustomerDto customerDto);

    String r010(final List<OrderItemDto> orderItemDtos, final CustomerDto customerDto);

    /**
     * 届け先カルテ
     *
     * @param customerCode 得意先コード
     * @param shippingDestinationId 届け先 ID
     * @param fileName ファイル名
     * @return 出力ファイル名 (null: エラー)
     * @throws SfrException エラー
     *   <ul>
     *     <li>code=ERR_CUSTOMER_NOT_FOUND 得意先が見つからない
     *     <li>code=ERR_SHIPPING_DESTINATION_NOT_FOUND 届け先が見つからない
     *   </ul>
     */
    OutputFile exportShippingDestinationKarte(String customerCode, int shippingDestinationId, String fileName) throws SfrException;


    /**
     * PDF 出力ファイル名のインターフェース
     */
    static interface OutputFile {
        /**
         * @return フォルダー名
         */
        String getFolderName();

        /**
         * @return ファイル名
         */
        String getFileName();
    }
}
