package vn.vnext.sefuri.sf.module.export;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.SF00309.model.SF003090_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_DealJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00310.model.SF00310_RequestModel;
import vn.vnext.sefuri.sf.module.export.impl.ReportBuilderImpl;
import vn.vnext.sefuri.sf.module.export.model.ProductModel;
import vn.vnext.sefuri.sf.module.export.model.QuotationModel;
import vn.vnext.sefuri.sf.module.export.model.R003Model;
import vn.vnext.sefuri.sf.module.export.model.R004Model;
import vn.vnext.sefuri.sf.module.export.model.R005Model;
import vn.vnext.sefuri.sf.module.export.model.r007.R007ProductModelC;
import vn.vnext.sefuri.sf.module.export.model.r009.R009Model;
import vn.vnext.sefuri.sf.module.export.model.r010.R010Model;

/**
 * Created by DungTQ on 5/19/2017.
 */
@ImplementedBy(ReportBuilderImpl.class)
public interface ReportBuilder {

    /**
     * Jasper report 用 見積書モデルを生成する
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
     * @return Jasper report 用 見積書モデル
     * @throws IOException
     */
    QuotationModel createQuotationModel(String quotationCode, int option) throws IOException;

    R003Model createR003Model(SF00309_RequestModelJson requestModel, SF003090_ParsedProductInfoJson product, DealDto deal);

    R004Model createR004Model(SF00309_RequestModelJson requestModel, SF003090_ParsedProductInfoJson product, DealDto deal);

    ProductModel createProductModel(final DealDto deal, final ProductDto product) throws FileNotFoundException;

    R005Model createR005Model(SF00310_RequestModel requestModel, SF00310_ParsedProductInfoJson product, final SF00310_DealJson deal);

    R007ProductModelC createR007ProductCartonModel(final DealDto dealDto, final ProductDto productDto);

    R009Model createR009Model(final List<InventoryDto> inventoryDtos, final CustomerDto customerDto) throws IOException;

    R010Model createR010Model(final List<OrderItemDto> orderItemDtos, final CustomerDto customerDto) throws IOException;
}
