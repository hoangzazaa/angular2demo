package vn.vnext.sefuri.sf.controller.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import javax.inject.Inject;

import org.joda.time.DateTime;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.db.jpa.Transactional;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00302Ctrl;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.MstCartonDto;
import vn.vnext.sefuri.sf.dto.MstCartonShippingDto;
import vn.vnext.sefuri.sf.dto.MstColorDto;
import vn.vnext.sefuri.sf.dto.MstDecorativeDto;
import vn.vnext.sefuri.sf.dto.MstDieCuttingDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPackingDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstPasteDto;
import vn.vnext.sefuri.sf.dto.MstShapeDto;
import vn.vnext.sefuri.sf.dto.MstSheetSizeDto;
import vn.vnext.sefuri.sf.dto.MstShippingCompanyDto;
import vn.vnext.sefuri.sf.dto.MstShippingCostDto;
import vn.vnext.sefuri.sf.dto.MstStampingDto;
import vn.vnext.sefuri.sf.dto.MstSurfaceTreatmentDto;
import vn.vnext.sefuri.sf.dto.MstWindowDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.json.SF00302.model.DataModel;
import vn.vnext.sefuri.sf.json.SF00302.model.DealProductJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstLaminationJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperPrc;
import vn.vnext.sefuri.sf.json.SF00302.model.OfferJson;
import vn.vnext.sefuri.sf.json.SF00302.model.PaperModalJson;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductOutputJson;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030202Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030203Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030204Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030209Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030211Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030212Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030213Req;
import vn.vnext.sefuri.sf.json.SF00302.request.SF0030214Req;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030201Res;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030202Res;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030203Res;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030204Res;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030212Res;
import vn.vnext.sefuri.sf.json.SF00302.response.SF0030214Res;
import vn.vnext.sefuri.sf.json.core.MstCartonJson;
import vn.vnext.sefuri.sf.json.core.MstCartonShippingJson;
import vn.vnext.sefuri.sf.json.core.MstColorJson;
import vn.vnext.sefuri.sf.json.core.MstDecorativeJson;
import vn.vnext.sefuri.sf.json.core.MstDieCuttingJson;
import vn.vnext.sefuri.sf.json.core.MstPackingJson;
import vn.vnext.sefuri.sf.json.core.MstPasteJson;
import vn.vnext.sefuri.sf.json.core.MstShapeJson;
import vn.vnext.sefuri.sf.json.core.MstSheetSizeJson;
import vn.vnext.sefuri.sf.json.core.MstShippingCompanyJson;
import vn.vnext.sefuri.sf.json.core.MstShippingCostJson;
import vn.vnext.sefuri.sf.json.core.MstStampingJson;
import vn.vnext.sefuri.sf.json.core.MstSurfaceTreatmentJson;
import vn.vnext.sefuri.sf.json.core.MstWindowJson;
import vn.vnext.sefuri.sf.json.core.MstWoodenJson;
import vn.vnext.sefuri.sf.json.core.ProductCommonFeeJson;
import vn.vnext.sefuri.sf.json.core.ProductFileJson;
import vn.vnext.sefuri.sf.json.request.SF0030205Req;
import vn.vnext.sefuri.sf.json.request.SF0030206Req;
import vn.vnext.sefuri.sf.json.request.SF0030207Req;
import vn.vnext.sefuri.sf.json.request.SF0030208Req;
import vn.vnext.sefuri.sf.json.request.SF0030210Req;
import vn.vnext.sefuri.sf.json.response.SF0030206Res;
import vn.vnext.sefuri.sf.json.response.SF0030207Res;
import vn.vnext.sefuri.sf.json.response.SF0030210Res;
import vn.vnext.sefuri.sf.json.response.SF0030211Res;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV004QuotationService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV010OfferService;
import vn.vnext.sefuri.sf.service.SV011WoodenService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * Created by DungTQ on 10/25/2016.
 */
public class SF00302CtrlImpl extends CommonCtrl implements SF00302Ctrl {

    private static final Logger logger = LoggerFactory.getLogger(SF00302CtrlImpl.class);

    private static final Integer HIDDEN_FLAG = 1;
    private static final Integer PAPER_NAME_TMP = 100;
    private static final Integer TYPE_FRONT = 100;
    private static final Integer TYPE_B = 101;
    private static final Integer TYPE_MEDIUM = 102;
    private static final Integer TYPE_A = 103;
    private static final Integer TYPE_BACK = 104;
    private static final Integer CREATE_USER = 272;
    private static final Integer TAB_NUMBER1 = 1;
    private static final Integer TAB_NUMBER2 = 2;

    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV004QuotationService sv004QuotationService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV011WoodenService sv011WoodenService;

    @Inject
    private SV010OfferService sv010OfferService;

    @Inject
    private SV013MstDataService sv013MstDataService;

    @Inject
    private SV006FileService sv006FileService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV014DealProductService dealProductService;

    @Override
    public Result sf0030201GetDealProduct(String dealCode, String productCode) {
        SF0030201Res sf0030201Res = new SF0030201Res();

        // 1. Check dealCode and productCode
        if (dealCode != null && !productCode.equals("0")) {
            boolean isCorrect = sv003DealService.sv00314CheckDealAndProductRelationship(dealCode, productCode);
            if (!isCorrect) {
                // invalid url params
                return responseError(MessageCode.SF00302.ERR003);
            }
        } else {
            DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);
            if (dealDto == null) {
                // Deal not found
                return responseError(MessageCode.SF00302.ERR001);
            }
        }

        // 2. Get Deal Product
        DealProductDto dealProductDto = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(dealCode,
                productCode);
        DealProductJson dealProductJson = new DealProductJson();

        List<MstLaminationDto> mstLaminationDtos = sv013MstDataService.sv01332GetMasterLamination();
        List<MstLaminationJson> mstLaminationJsons = new ArrayList<>();
        List<MstLaminationJson> mstLaminationHeadJsons = new ArrayList<>();

        // get mst laminations and mst papers
        List<MstPaperJson> mstPaperJsons = new ArrayList<>();
        List<MstPaperJson> mstPaperHead = new ArrayList<>();

        if (dealProductDto != null) {
            dealProductJson.setData(dealProductDto);
            // 2.1 Get Product
            ProductDto productDto = sv008ProductService.sv00810GetProductById(dealProductDto.getProductId());
            ProductJson productJson = new ProductJson();
            if (productDto != null) {
                // バーコード
                // 製品情報にバーコードがない場合はチェックシートの入力欄を使用する
                if (!productDto.hasBarcode()) {
                    productDto.fillBarcodeFromChecksheet(sv003DealService.sv00326GetCheckSheetsByDealId(dealProductDto.getDealId()));
                }

                productJson.setData(productDto);
                //http://fridaynight.vnext.vn/issues/2952
                // check paper new by hiddenFlag !=1
                if (PAPER_NAME_TMP.equals(productDto.getPaperNameId()) && productDto.getPaperId() != null) {
                    MstPaperDto mstPaperDto = sv013MstDataService.sv01337GetMstPaperByIdAndSheetSizeId(productDto.getPaperId(), productDto.getSheetSizeId());
                    if (HIDDEN_FLAG.equals(mstPaperDto.getHiddenFlag()) || !mstPaperDto.getCreatedUser().equals(CREATE_USER) ) {
                        //saga
                        MstPaperJson mstPaperJson = parseMstPaperJson(mstPaperDto, "1", 1, mstPaperDto.getSagaNormValue());
                        MstPaperJson mstPaperJsonHead = parseMstPaperJson(mstPaperDto, "2", 1, mstPaperDto.getSagaHeadValue());

                        mstPaperJsons.add(mstPaperJson);
                        mstPaperHead.add(mstPaperJsonHead);
                        //Ono
                        mstPaperJson = parseMstPaperJson(mstPaperDto, "1", 2, mstPaperDto.getOnoNormValue());
                        mstPaperJsonHead = parseMstPaperJson(mstPaperDto, "2", 2, mstPaperDto.getOnoHeadValue());

                        mstPaperJsons.add(mstPaperJson);
                        mstPaperHead.add(mstPaperJsonHead);
                        //Taku
                        mstPaperJson = parseMstPaperJson(mstPaperDto, "1", 3, mstPaperDto.getTakuNormValue());
                        mstPaperJsonHead = parseMstPaperJson(mstPaperDto, "2", 3, mstPaperDto.getTakuHeadValue());

                        mstPaperJsons.add(mstPaperJson);
                        mstPaperHead.add(mstPaperJsonHead);
                    }
                }

                //1. add mst laminations
                if (TYPE_B.equals(productDto.getLaminationPaperTypeB()) && productDto.getLaminationBId() != null) {
                    MstLaminationDto mst = sv013MstDataService.sv01314GetMstLaminationById(productDto.getLaminationBId());
                    if (HIDDEN_FLAG.equals(mst.getHiddenFlag())) {
                        MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                        MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                        mstLaminationJsons.add(mstLaminationJson);
                        mstLaminationHeadJsons.add(mstLaminationJsonHead);
                    }
                }

                //2. add mst laminations
                if (TYPE_A.equals(productDto.getLaminationPaperTypeA()) && productDto.getLaminationAId() != null) {
                    MstLaminationDto mst = sv013MstDataService.sv01314GetMstLaminationById(productDto.getLaminationAId());
                    if (HIDDEN_FLAG.equals(mst.getHiddenFlag())) {
                        MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                        MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                        mstLaminationJsons.add(mstLaminationJson);
                        mstLaminationHeadJsons.add(mstLaminationJsonHead);
                    }
                }

                //3. add mst laminations
                if (TYPE_FRONT.equals(productDto.getLaminationPaperTypeFront()) && productDto.getLaminationFrontId() != null) {
                    MstLaminationDto mst = sv013MstDataService.sv01314GetMstLaminationById(productDto.getLaminationFrontId());
                    if (HIDDEN_FLAG.equals(mst.getHiddenFlag())) {
                        MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                        MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                        mstLaminationJsons.add(mstLaminationJson);
                        mstLaminationHeadJsons.add(mstLaminationJsonHead);
                    }
                }

                //4. add mst laminations
                if (TYPE_MEDIUM.equals(productDto.getLaminationPaperTypeMedium()) && productDto.getLaminationMediumId() != null) {
                    MstLaminationDto mst = sv013MstDataService.sv01314GetMstLaminationById(productDto.getLaminationMediumId());
                    if (HIDDEN_FLAG.equals(mst.getHiddenFlag())) {
                        MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                        MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                        mstLaminationJsons.add(mstLaminationJson);
                        mstLaminationHeadJsons.add(mstLaminationJsonHead);
                    }
                }

                //5. add mst laminations
                if (TYPE_BACK.equals(productDto.getLaminationPaperTypeBack()) && productDto.getLaminationBackId() != null) {
                    MstLaminationDto mst = sv013MstDataService.sv01314GetMstLaminationById(productDto.getLaminationBackId());
                    if (HIDDEN_FLAG.equals(mst.getHiddenFlag())) {
                        MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                        MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                        mstLaminationJsons.add(mstLaminationJson);
                        mstLaminationHeadJsons.add(mstLaminationJsonHead);
                    }
                }


                // 2.1.1 Get Wooden
                if (productDto.getWoodenCode() != null) {
                    MstWoodenDto mstWoodenDto = sv011WoodenService.sv01102GetMstWoodenByCode(productDto.getWoodenCode());
                    MstWoodenJson mstWoodenJson = getMstWoodenJson(mstWoodenDto);
                    productJson.setWooden(mstWoodenJson);
                }

                // 2.2.2 Get PRoductFiles
                List<ProductFileDto> productFileDtos = sv008ProductService.sv00811GetProductFileByProductId
                        (productDto.getId());
                List<ProductFileJson> productFileJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(productFileDtos)) {
                    for (ProductFileDto productFileDto : productFileDtos) {
                        ProductFileJson productFileJson = new ProductFileJson();
                        productFileJson.setData(productFileDto);

                        FileDto fileDto = fileService.sv00609GetFileInfo(productFileDto.getFileId());
                        productFileJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));

                        productFileJsons.add(productFileJson);
                    }
                }

                productJson.setProductFiles(productFileJsons);

                // 2.2.3 Get Product Output
                List<ProductOutputDto> productOutputDtos = sv008ProductService.sv00822GetProductOutputByDealProductId
                        (dealProductDto.getId());
                List<ProductOutputJson> productOutputJsons = getProductOutputJson(productOutputDtos);
                productJson.setProductOutputs(productOutputJsons);

                List<OfferDto> offerDtos = new ArrayList<>();
                productOutputDtos.forEach(productOutputDto -> {
                    offerDtos.add(sv010OfferService.sv01003GetOfferByProductOutputId(productOutputDto.getId()));
                });
                dealProductJson.setOffers(getOffersJson(offerDtos));
                // 2.2.4 Get product common fee
                ProductCommonFeeDto productCommonFeeDto = sv008ProductService.sv00813getProductCommonFreeByProductId
                        (productDto.getId());
                productJson.setProductCommon(getProductCommonFeeJson(productCommonFeeDto));
            }
            dealProductJson.setProduct(productJson);
        }

        // 3. mstColor
        List<MstColorDto> mstColorDtos = sv013MstDataService.sv01301GetMstColor();
        List<MstColorJson> mstColorJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstColorDtos)) {
            for (MstColorDto mst : mstColorDtos) {
                MstColorJson mstColorJson = new MstColorJson();
                mstColorJson.setData(mst);

                mstColorJsons.add(mstColorJson);
            }
        }
        sf0030201Res.setMstColor(mstColorJsons);

        // 4. mstDieCutting
        List<MstDieCuttingDto> mstDieCuttingDaos = sv013MstDataService.sv01302GetMstDieCutting();
        List<MstDieCuttingJson> mstDieCuttingJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstDieCuttingDaos)) {
            for (MstDieCuttingDto mst : mstDieCuttingDaos) {
                MstDieCuttingJson mstDieCuttingJson = new MstDieCuttingJson();
                mstDieCuttingJson.setData(mst);

                mstDieCuttingJsons.add(mstDieCuttingJson);
            }
        }
        sf0030201Res.setMstDieCutting(mstDieCuttingJsons);

        // 5. mstPacking
        List<MstPackingDto> mstPackingDtos = sv013MstDataService.sv01303GetMstPacking();
        List<MstPackingJson> mstPackingJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstPackingDtos)) {
            for (MstPackingDto mst : mstPackingDtos) {
                MstPackingJson mstPackingJson = new MstPackingJson();
                mstPackingJson.setData(mst);

                mstPackingJsons.add(mstPackingJson);
            }
        }
        sf0030201Res.setMstPacking(mstPackingJsons);

        // 7. mstPaper 2903
        List<MstPaperPrc> mstPaperDtosTab1 = sv013MstDataService.sv01337GetMstPaper2903Tab1();
        if (CollectionUtil.isNotEmpty(mstPaperDtosTab1)) {
            mstPaperDtosTab1.stream().forEach(mst -> {
                //saga
                MstPaperJson mstPaperJson = parseMstPaperJson2903(mst, "1", 1, mst.getSagaNormValue(),TAB_NUMBER1);
                MstPaperJson mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 1, mst.getSagaHeadValue(),TAB_NUMBER1);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);
                //Ono
                mstPaperJson = parseMstPaperJson2903(mst, "1", 2, mst.getOnoNormValue(),TAB_NUMBER1);
                mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 2, mst.getOnoHeadValue(),TAB_NUMBER1);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);

                //Taku
                mstPaperJson = parseMstPaperJson2903(mst, "1", 3, mst.getTakuNormValue(),TAB_NUMBER1);
                mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 3, mst.getTakuHeadValue(),TAB_NUMBER1);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);
            });
        }

        List<MstPaperPrc> mstPaperDtosTab2 = sv013MstDataService.sv01337GetMstPaper2903Tab2();
        if (CollectionUtil.isNotEmpty(mstPaperDtosTab2)) {
            mstPaperDtosTab2.stream().forEach(mst -> {
                //saga
                MstPaperJson mstPaperJson = parseMstPaperJson2903(mst, "1", 1, mst.getSagaNormValue(),TAB_NUMBER2);
                MstPaperJson mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 1, mst.getSagaHeadValue(),TAB_NUMBER2);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);
                //Ono
                mstPaperJson = parseMstPaperJson2903(mst, "1", 2, mst.getOnoNormValue(),TAB_NUMBER2);
                mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 2, mst.getOnoHeadValue(),TAB_NUMBER2);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);

                //Taku
                mstPaperJson = parseMstPaperJson2903(mst, "1", 3, mst.getTakuNormValue(),TAB_NUMBER2);
                mstPaperJsonHead = parseMstPaperJson2903(mst, "2", 3, mst.getTakuHeadValue(),TAB_NUMBER2);

                mstPaperJsons.add(mstPaperJson);
                mstPaperHead.add(mstPaperJsonHead);
            });
        }
        sf0030201Res.setMstPaper(mstPaperJsons);
        sf0030201Res.setMstPaperHead(mstPaperHead);

        // 7. mstPaste
        List<MstPasteDto> mstPasteDtos = sv013MstDataService.sv01305GetMstPaste();
        List<MstPasteJson> mstPasteJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstPasteDtos)) {
            for (MstPasteDto mst : mstPasteDtos) {
                MstPasteJson mstPasteJson = new MstPasteJson();
                mstPasteJson.setData(mst);

                mstPasteJsons.add(mstPasteJson);
            }
        }
        sf0030201Res.setMstPaste(mstPasteJsons);

        // 8. mstShippingCompany
        List<MstShippingCompanyDto> mstShippingCompanyDtos = sv013MstDataService.sv01309GetMstShippingCompany();
        List<MstShippingCompanyJson> mstShippingCompanyJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstShippingCompanyDtos)) {
            for (MstShippingCompanyDto mst : mstShippingCompanyDtos) {
                MstShippingCompanyJson mstShippingCompanyJson = new MstShippingCompanyJson();
                mstShippingCompanyJson.setData(mst);

                mstShippingCompanyJsons.add(mstShippingCompanyJson);
            }
        }
        sf0030201Res.setMstShippingCompany(mstShippingCompanyJsons);

        // 9. mstShippingCost
        List<MstShippingCostDto> mstShippingCostDtos = sv013MstDataService.sv01310GetMstShippingCost();
        List<MstShippingCostJson> mstShippingCostJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstShippingCostDtos)) {
            for (MstShippingCostDto mst : mstShippingCostDtos) {
                MstShippingCostJson mstShippingCostJson = new MstShippingCostJson();
                mstShippingCostJson.setData(mst);

                mstShippingCostJsons.add(mstShippingCostJson);
            }
        }
        sf0030201Res.setMstShippingCost(mstShippingCostJsons);

        // 10. mstStamping
        List<MstStampingDto> mstStampingDtos = sv013MstDataService.sv01306GetMstStamping();
        List<MstStampingJson> mstStampingJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstStampingDtos)) {
            for (MstStampingDto mst : mstStampingDtos) {
                MstStampingJson mstStampingJson = new MstStampingJson();
                mstStampingJson.setData(mst);

                mstStampingJsons.add(mstStampingJson);
            }
        }
        sf0030201Res.setMstStamping(mstStampingJsons);

        // 11. mstSurfaceTreatment
        List<MstSurfaceTreatmentDto> mstSurfaceTreatmentDtos = sv013MstDataService.sv01307GetMstSurfaceTreatment();
        List<MstSurfaceTreatmentJson> mstSurfaceTreatmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstSurfaceTreatmentDtos)) {
            for (MstSurfaceTreatmentDto mst : mstSurfaceTreatmentDtos) {
                MstSurfaceTreatmentJson mstSurfaceTreatmentJson = new MstSurfaceTreatmentJson();
                mstSurfaceTreatmentJson.setData(mst);

                mstSurfaceTreatmentJsons.add(mstSurfaceTreatmentJson);
            }
        }
        sf0030201Res.setMstSurfaceTreatment(mstSurfaceTreatmentJsons);

        // 12. mstWindow
        List<MstWindowDto> mstWindowDtos = sv013MstDataService.sv01308GetMstWindow();
        List<MstWindowJson> mstWindowJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstWindowDtos)) {
            for (MstWindowDto mst : mstWindowDtos) {
                MstWindowJson mstWindowJson = new MstWindowJson();
                mstWindowJson.setData(mst);

                mstWindowJsons.add(mstWindowJson);
            }
        }
        sf0030201Res.setMstWindow(mstWindowJsons);


        List<MstDecorativeDto> mstDecorativeDtos = sv013MstDataService.sv01318GetMasterDecorative();
        List<MstDecorativeJson> mstDecorativeJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(mstDecorativeDtos)) {
            for (MstDecorativeDto mst : mstDecorativeDtos) {
                MstDecorativeJson mstDecorativeJson = new MstDecorativeJson();
                mstDecorativeJson.setData(mst);

                mstDecorativeJsons.add(mstDecorativeJson);
            }
        }
        sf0030201Res.setMstDecorative(mstDecorativeJsons);

        // 13. Shapes
        List<MstShapeDto> mstShapeDtos = sv013MstDataService.sv01311GetMstShape();
        List<MstShapeJson> mstShapeJsons = new ArrayList<>();
        for (MstShapeDto mstShapeDto : mstShapeDtos) {
            MstShapeJson mstShapeJson = new MstShapeJson();
            mstShapeJson.setData(mstShapeDto);
            mstShapeJsons.add(mstShapeJson);
        }
        sf0030201Res.setShapes(mstShapeJsons);

        //14. Carton Flute
        List<MstCartonDto> mstCartonDtos = sv013MstDataService.sv01330GetMasterCarton();
        List<MstCartonJson> mstCartonJsons = new ArrayList<>();
        for (MstCartonDto mstCartonDto : mstCartonDtos) {
            MstCartonJson mstCartonJson = new MstCartonJson();
            mstCartonJson.setData(mstCartonDto);
            mstCartonJsons.add(mstCartonJson);
        }
        sf0030201Res.setMstCarton(mstCartonJsons);

        //15. MstSheetSize
        List<MstSheetSizeDto> mstSheetSizeDtos = sv013MstDataService.sv013136GetMstSheetSize();
        List<MstSheetSizeJson> mstSheetSizeJsons = new ArrayList<>();
        for (MstSheetSizeDto mstSheetSizeDto : mstSheetSizeDtos) {
            MstSheetSizeJson mstSheetSizeJson = new MstSheetSizeJson();
            mstSheetSizeJson.setData(mstSheetSizeDto);
            mstSheetSizeJsons.add(mstSheetSizeJson);
        }

        sf0030201Res.setMstSheetSizes(mstSheetSizeJsons);

        List<MstCartonShippingDto> mstCartonShippingDtos = sv013MstDataService.sv01331GetMasterCartonShipping();
        List<MstCartonShippingJson> mstCartonShippingJsons = new ArrayList<>();
        for (MstCartonShippingDto mstCartonShippingDto : mstCartonShippingDtos) {
            MstCartonShippingJson mstCartonShippingJson = new MstCartonShippingJson();
            mstCartonShippingJson.setData(mstCartonShippingDto);
            mstCartonShippingJsons.add(mstCartonShippingJson);
        }
        sf0030201Res.setMstCartonShipping(mstCartonShippingJsons);

        if (CollectionUtil.isNotEmpty(mstLaminationDtos)) {
            mstLaminationDtos.stream().filter(mst -> !HIDDEN_FLAG.equals(mst.getHiddenFlag())).forEach(mst -> {
                MstLaminationJson mstLaminationJson = parseMstLaminationJson(mst, "1");
                MstLaminationJson mstLaminationJsonHead = parseMstLaminationJson(mst, "2");

                mstLaminationJsons.add(mstLaminationJson);
                mstLaminationHeadJsons.add(mstLaminationJsonHead);
            });
        }

        sf0030201Res.setMstLaminationHead(mstLaminationHeadJsons);
        sf0030201Res.setMstLamination(mstLaminationJsons);

        sf0030201Res.setDealProduct(dealProductJson);

        return responseUsingGzip(sf0030201Res, MessageCode.SF00302.INF001);
    }

    @Override
    
    public Result sf0030202CreateDealProduct() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "create product all.");

        SF0030202Req sf0030202Req = requestJson(SF0030202Req.class);

        // 1.0 Get data from request
        ProductJson productJson = sf0030202Req.getProduct();
        Integer userId = sv001AuthService.getCurrentUser().getId();
        productJson.setUpdatedUser(userId);
        productJson.setCreatedUser(userId);

        String dealCode = sf0030202Req.getDealCode();
        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);
        if (dealDto == null) {
            // Deal not found
            return responseError(MessageCode.SF00302.ERR001);
        }

        // 2.0 Create new Deal Product
        DealProductDto dealProductDto = null;
        try {
            dealProductDto = sv003DealService.sv00303CreateDealProduct(dealDto.getId(), productJson, 0);
        } catch (SfrException e) {
            logger.debug(e.getMessage());
            // Deal not found
            return responseError(MessageCode.SF00302.ERR001);
        }

        // update deal status
        //#2223
        sv003DealService.sv00329UpdateDealStatus(dealDto.getId());

        // 3.0 Parse to Json
        DealProductJson dealProductJson = new DealProductJson();
        dealProductJson.setData(dealProductDto);

        // 3.1 Parse Product
        ProductDto prdDto = dealProductDto.getProduct();
        ProductJson productJs = new ProductJson();
        productJs.setData(prdDto);

        // 3.1.1 Parse Wooden
        MstWoodenDto mstWoodenDto = sv011WoodenService.sv01102GetMstWoodenByCode(prdDto.getWoodenCode());
        MstWoodenJson mstWoodenJson = getMstWoodenJson(mstWoodenDto);
        productJs.setWooden(mstWoodenJson);

        // 3.1.2 Parse ProductOutput
        Collection<ProductOutputDto> productOutputDtos = dealProductDto.getProductOutputs();
        List<ProductOutputJson> productOutputJsons = getProductOutputJson(productOutputDtos);
        productJs.setProductOutputs(productOutputJsons);

        // 3.1.3 Parse PRoductCommonFee
        ProductCommonFeeDto productCommonFeeDto = prdDto.getProductCommon();
        productJs.setProductCommon(getProductCommonFeeJson(productCommonFeeDto));

        // 3.1.4 Parse Offer
        Collection<OfferDto> offerDtos = new ArrayList<>();
        for (ProductOutputDto productOutputDto : productOutputDtos) {
            offerDtos.add(productOutputDto.getOffer());
        }
        List<OfferDto> offerDtoList = new ArrayList<>(offerDtos);
        dealProductJson.setOffers(getOffersJson(offerDtoList));
        dealProductJson.setProduct(productJs);

        SF0030202Res sf0030202Res = new SF0030202Res();
        sf0030202Res.setDealProduct(dealProductJson);

        return responseUsingGzip(sf0030202Res, MessageCode.SF00302.INF001);
    }

    private ProductCommonFeeJson getProductCommonFeeJson(ProductCommonFeeDto productCommonFeeDto) {
        ProductCommonFeeJson productCommonFeeJson = new ProductCommonFeeJson();
        if (productCommonFeeDto != null) {
            productCommonFeeJson.setData(productCommonFeeDto);
        }
        return productCommonFeeJson;
    }

    private MstWoodenJson getMstWoodenJson(MstWoodenDto mstWoodenDto) {
        MstWoodenJson mstWoodenJson = new MstWoodenJson();
        if (mstWoodenDto != null) {
            mstWoodenJson.setData(mstWoodenDto);
        }
        return mstWoodenJson;
    }

    private List<ProductOutputJson> getProductOutputJson(Collection<ProductOutputDto> productOutputDtos) {
        List<ProductOutputJson> productOutputJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(productOutputDtos)) {
            for (ProductOutputDto productOutputDto : productOutputDtos) {
                ProductOutputJson productOutputJson = new ProductOutputJson();
                productOutputJson.setData(productOutputDto);
                productOutputJsons.add(productOutputJson);
            }
        }
        return productOutputJsons;
    }

    private List<OfferJson> getOffersJson(List<OfferDto> offerDtos) {
        List<OfferJson> offerJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(offerDtos)) {
            for (OfferDto offerDto : offerDtos) {
                OfferJson offerJson = new OfferJson();
                offerJson.setData(offerDto);
                offerJsons.add(offerJson);
            }
        }
        return offerJsons;
    }

    @Override
    
    public Result sf0030203UpdateProduct() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update product, quotation and offer.");

        // 1.0 Get data from request
        SF0030203Req sf0030203Req = requestJson(SF0030203Req.class);

        ProductDto productDto = sf0030203Req.getProductJson().getData();

        List<ProductOutputDto> productOutputDtos = new ArrayList<>();

        for (ProductOutputJson productOutputJson : sf0030203Req.getProductJson().getProductOutputs()) {
            ProductOutputDto productOutputDto = productOutputJson.getData();
            productOutputDtos.add(productOutputDto);
            // get offer
            Collection<OfferJson> offerJsons = productOutputJson.getOffers();
            if (CollectionUtil.isNotEmpty(offerJsons)) {
                List<OfferDto> offers = offerJsons.stream().map(offerJson -> offerJson.getData()).collect(Collectors
                        .toList());
                productOutputDto.setOffer(offers.get(0));
            }
        }

//        productOutputDtos.forEach(productOutputDto -> {
//            sv008ProductService.sv00808UpdateProductOutput(productOutputDto);
//        });
        productDto.setProductCommon(sf0030203Req.getProductJson().getProductCommon().getData());
        // 2.0 Update product
        productDto = sv008ProductService.sv00823UpdateProductAll(productDto, productOutputDtos);

        // 3.0 Parse data to Json
        ProductJson productJson = new ProductJson();
        productJson.setData(productDto);

        // 3.1 Parse Wooden
        productJson.setWooden(this.getMstWoodenJson(sv011WoodenService.sv01102GetMstWoodenByCode(productDto
                .getWoodenCode())));

        // 3.2 Parse ProductOutput
        List<ProductOutputDto> productOutputDtoList = new ArrayList<>();
        productOutputDtos.forEach(productOutputDto -> {
            productOutputDtoList.add(sv008ProductService.sv00814GetProductOutputById(productOutputDto.getId()));
        });
        productJson.setProductOutputs(this.getProductOutputJson(productOutputDtoList));

        // 3.3 Parse ProductCommonFee
        productJson.setProductCommon(this.getProductCommonFeeJson(productDto.getProductCommon()));

        SF0030203Res sf0030203Res = new SF0030203Res();
        sf0030203Res.setProduct(productJson);

        return responseUsingGzip(sf0030203Res, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030204DuplicateProductForDeal(Integer copyType) {

        dbLoggingService.sv90106ButtonOperation("製品登録", "copy product.");

        SF0030204Req sf0030204Req = requestJson(SF0030204Req.class);
        DealProductJson dealPrdJson = sf0030204Req.getDealProduct();
        ProductJson productJson = dealPrdJson.getProduct();
        ProductDto productDtoTmp = productJson.getData();
        Integer dealId = dealPrdJson.getDealId();

        // 1.0 Copy And Save Product
        DealProductDto copyDealProductDto = null;
        DataModel dataModel = null;
        try {
            //#2223: turn-off highlightFlag of root item
            DealProductDto fromDealProductDto = dealProductService.sv01402GetDealProductById(dealPrdJson.getId());
            fromDealProductDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());
            dealProductService.sv01403UpdateDealProduct(fromDealProductDto);

            //Add offers to productJson
            if (copyType != 0) {
                for (int i = 0; i < 5; i++) {
                    List<OfferJson> offerJsons = new ArrayList<>();
                    offerJsons.add(dealPrdJson.getOffers().get(i));
                    productJson.getProductOutputs().get(i).setOffers(offerJsons);
                }
            }
            // create copy model
            dataModel = createPaperNew(sf0030204Req.getPaperNews(), productDtoTmp);
            productDtoTmp = dataModel.getProductDto();

            productJson.setData(productDtoTmp);
            copyDealProductDto = sv003DealService.sv00304CopyAndSaveDealProduct(dealId, productJson, copyType);
        } catch (SfrException e) {
            logger.debug(e.getMessage());
            // deal not found
            return responseError(MessageCode.SF00302.ERR001);
        }

        // update deal status
        //#2223
        sv003DealService.sv00329UpdateDealStatus(dealId);

        // 2.0 Parse data to Json
        DealProductJson dealProductJson = new DealProductJson();
        dealProductJson.setData(copyDealProductDto);

        // 2.1 Parse data to Json
        ProductDto productDto = copyDealProductDto.getProduct();
        ProductJson prdJson = new ProductJson();
        prdJson.setData(productDto);

        // 2.2 Parse Wooden
        prdJson.setWooden(this.getMstWoodenJson(sv011WoodenService.sv01102GetMstWoodenByCode(productDto.getWoodenCode
                ())));

        // 2.3 Parse ProductOutput
        prdJson.setProductOutputs(this.getProductOutputJson(copyDealProductDto.getProductOutputs()));

        // 2.4 Parse PRoductCommonFee
        prdJson.setProductCommon(this.getProductCommonFeeJson(productDto.getProductCommon()));

        // 3.1.4 Parse Offer
        Collection<OfferDto> offerDtos = new ArrayList<>();
        copyDealProductDto.getProductOutputs().forEach(productOutputDto -> {
            offerDtos.add(productOutputDto.getOffer());
        });
        List<OfferDto> offerDtoList = new ArrayList<>(offerDtos);
        dealProductJson.setOffers(getOffersJson(offerDtoList));

        dealProductJson.setProduct(prdJson);

        SF0030204Res sf0030204Res = new SF0030204Res();
        sf0030204Res.setDealProduct(dealProductJson);

        return responseUsingGzip(sf0030204Res, MessageCode.SF00302.INF001);
    }

    // Reviewed
    @Override
    public Result sf0030205DeleteDealProduct() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "delete product.");

        SF0030205Req sf0030205Req = requestJson(SF0030205Req.class);
        boolean isNotProductInUsed = sv003DealService.sv00305DeleteDealProductById(sf0030205Req.getDealProductId());

        if (isNotProductInUsed) {
            return responseJson(null, MessageCode.SF00302.INF001);
        }

        // update deal status
        DealProductDto dealProductDto = dealProductService.sv01402GetDealProductById(sf0030205Req.getDealProductId());

        //#2223
        sv003DealService.sv00329UpdateDealStatus(dealProductDto.getDealId());

        return responseError(MessageCode.SF00302.WRN001);
    }

    @Override
    public Result sf0030206CreateProductFile() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "create product file.");

        SF0030206Req sf0030206Req = requestJson(SF0030206Req.class);
        ProductFileJson productFileJson = sf0030206Req.getProductFileJson();
        String fileCode = sf0030206Req.getFileCode();

        ProductFileDto productFileDto = productFileJson.getData();
        ProductFileDto newProductFileDto = sv008ProductService.sv00805CreateProductFile(productFileDto, fileCode);
        ProductFileJson newProductFileJson = new ProductFileJson();
        newProductFileJson.setData(newProductFileDto);

        FileDto fileDto = fileService.sv00609GetFileInfo(newProductFileDto.getFileId());
        newProductFileJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));

        SF0030206Res sf0030206Res = new SF0030206Res();
        sf0030206Res.setProductFileJson(newProductFileJson);
        return responseJson(sf0030206Res, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030207UpdateProductFile() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update product file.");

        SF0030207Req sf0030207Req = requestJson(SF0030207Req.class);

        ProductFileJson productFileJson = sf0030207Req.getProductFileJson();
        String fileCode = sf0030207Req.getFileCode();
        // not update productName
        String productName = productFileJson.getProductName();

        //1. check edit file
        if (fileCode != null) {
            FileDto fileDto = sv006FileService.sv00604SaveTempFile(fileCode, Enums.ModuleType.PRODUCT_FILE);
            fileCode = sv006FileService.sv00618GetThumbnail(fileDto);
            productFileJson.setSrcImg(fileCode);
            productFileJson.setFileId(fileDto.getId());
        } else {
            fileCode = productFileJson.getSrcImg();
        }
        ProductFileDto productFileDto = productFileJson.getData();
        //2. update updatedDate
        productFileDto.setUpdatedDate(DateTime.now());
        //3. update data productFile
        productFileDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_ON.getStatus());
        ProductFileDto newProductFileDto = sv008ProductService.sv00806UpdateProductFile(productFileDto);

        ProductFileJson productFileRespone = new ProductFileJson();
        productFileRespone.setData(newProductFileDto);
        productFileRespone.setProductName(productName);
        //4. set srcImg
        productFileRespone.setSrcImg(fileCode);
        //4. response client
        SF0030207Res sf0030207Res = new SF0030207Res();
        sf0030207Res.setProductFileJson(productFileRespone);
        return responseJson(sf0030207Res, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030208DeleteProductFile() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "delete product file.");

        SF0030208Req sf0030208Req = requestJson(SF0030208Req.class);
        Integer productFileId = sf0030208Req.getProductFileId();

        if (sv008ProductService.sv00807DeleteProductFile(productFileId)) {
            return responseJson(null, MessageCode.SF00302.INF001);
        }

        return responseError(MessageCode.SF00302.ERR005);
    }

    @Override
    public Result sf0030209UpdateProductOutput() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update product quotation.");

        SF0030209Req sf0030209Req = requestJson(SF0030209Req.class);
        ProductOutputJson productOutputJson = sf0030209Req.getProductOutputJson();
        ProductOutputDto productOutputDto = productOutputJson.getData();

        //CalculationValidationHelper calculationValidation = new CalculationValidationHelper();
        List<ProductOutputDto> productDtoList = new ArrayList<>();
        productDtoList.add(productOutputDto);

        // boolean check = calculationValidation.checkOutput(productDtoList);
        if (productOutputDto.getLot() == 0 || productOutputDto.getLot() == null) {
            sv008ProductService.sv00808UpdateProductOutput(productOutputDto);
        }

        return responseJson(null, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030210UpdateProductCommonFee() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update product common fee.");

        SF0030210Req sf0030210Req = requestJson(SF0030210Req.class);
        ProductCommonFeeJson productCommonFeeJson = sf0030210Req.getProductCommonFeeJson();
        ProductCommonFeeDto productCommonFeeDto = productCommonFeeJson.getData();
        sv008ProductService.sv00809UpdateProductCommonFee(productCommonFeeDto);

        SF0030210Res sf0030210Res = new SF0030210Res();
        return responseJson(sf0030210Res, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030211UpdateOffer() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update offer.");

        SF0030211Req sf0030211Req = requestJson(SF0030211Req.class);

        OfferJson offerJson = sf0030211Req.getOfferJson();
        String dealCode = sf0030211Req.getDealCode();
        String productCode = sf0030211Req.getProductCode();
        // get deal by dealCode
        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);

        //check dealDto not null
        if (dealDto == null) {
            responseError(MessageCode.SF00302.ERR001);
        }

        // updatedDate dealProduct
        DealProductDto dealProductDto =
                sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(dealDto.getDealCode(), productCode);

        ProductOutputJson productOutputJson = sf0030211Req.getOfferJson().getProductOutput();
        OfferDto offerDto = offerJson.getData();
        offerDto.setProductOutput(productOutputJson.getData());
        // update offer and deal product
        sv010OfferService.sv01002UpdateOffer(dealProductDto, offerDto);

        SF0030211Res sf0030211Res = new SF0030211Res();
        return responseJson(sf0030211Res, MessageCode.SF00302.INF001);
    }

    @Override
    public Result sf0030212UpdateProductInput() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "update product and create new paper.");

        SF0030212Req req = requestJson(SF0030212Req.class);

        ProductJson productJson = req.getProductJson();
        ProductDto productDto = productJson.getData();

        //1.1 parse list paper news.
        List<PaperModalJson> paperModalJsons = req.getPaperNews();
        //1.2 insert to db call service mstData -> list result paperModal json

        DataModel dataModel = createPaperNew(paperModalJsons, productDto);

        sv008ProductService.sv00825UpdateProductInput(dataModel.getProductDto());

        SF0030212Res res = new SF0030212Res();
        res.setLaminations(dataModel.getMstLaminationJsons());
        res.setPapers(dataModel.getMstPaperJsons());

        ProductJson productTmp = new ProductJson();
        productTmp.setData(dataModel.getProductDto());
        res.setProduct(productTmp);

        return responseJson(res, MessageCode.SF00302.INF002);
    }

    @Override
    public Result sf0030213UpdateProductImposition() {

        dbLoggingService.sv90106ButtonOperation("製品登録", "create product imposition.(面付け試算情報保存)");

        // get data
        SF0030213Req req = requestJson(SF0030213Req.class);
        ProductJson productJson = req.getProductJson();
        ProductDto productDto = productJson.getData();
        // do update
        //1.1 parse list paper news.
        List<PaperModalJson> paperModalJsons = req.getPaperNews();
        //1.2 insert to db call service mstData -> list result paperModal json

        DataModel dataModel = createPaperNew(paperModalJsons, productDto);

        ProductDto product = sv008ProductService.sv00826UpdateProductImposition(dataModel.getProductDto());
        // check result
        if (product == null) {
            return responseJson(null, MessageCode.SF00302.ERR002);
        } else {
            return responseJson(null, MessageCode.SF00302.INF001);
        }
    }

    @Override
    public Result sf0030214Download() {
        SF0030214Req req = requestJson(SF0030214Req.class);
        ProductFileDto productFileDto = sv008ProductService.sv00841GetProductFile(req.getProductId(), req.getFileId());

        SF0030214Res res = new SF0030214Res();
        if (productFileDto != null) {
            FileDto fileDto = sv006FileService.sv00609GetFileInfo(req.getFileId());
            if (fileDto != null) {
                String fileName = productFileDto.getOriginalName();
                res.setFileName(fileName);
                res.setFilePath(sv006FileService.sv00619GetFileURI(fileDto.getFileCode(), fileName));
            }
        }
        return responseJson(res, MessageCode.COM.INF001);
    }

    private DataModel createPaperNew(List<PaperModalJson> paperNews, ProductDto productDto) {
        List<MstLaminationJson> mstLaminationJsons = new ArrayList<>();
        List<MstPaperJson> mstPaperJsons = new ArrayList<>();

        if (CollectionUtil.isNotEmpty(paperNews)) {
            //1.decorative
            if (productDto.getProductType() != null && productDto.getProductType().equals(0)
                    && productDto.getShapeId() != null && productDto.getShapeId().equals(98)) {
                mstLaminationJsons = sv013MstDataService.sv01334SaveNewLamination(paperNews);
                //1.3 set id mst lamination by optionInput
                for (int i = 0; i < paperNews.size(); i++) {
                    switch (paperNews.get(i).getOptionId()) {
                        //表ライナー（g/㎡）
                        case 1:
                            productDto.setLaminationFrontId(mstLaminationJsons.get(i).getId());
                            break;
                        //中芯（g/㎡）
                        case 2:
                            productDto.setLaminationMediumId(mstLaminationJsons.get(i).getId());
                            break;
                        //裏ライナー（g/㎡）
                        case 3:
                            productDto.setLaminationBackId(mstLaminationJsons.get(i).getId());
                            break;
                        default:
                            break;
                    }
                }
            }
            //2. carton
            else if (productDto.getProductType() != null && productDto.getProductType().equals(1)) {
                mstLaminationJsons = sv013MstDataService.sv01334SaveNewLamination(paperNews);
                //1.3 set id mst lamination by optionInput
                for (int i = 0; i < paperNews.size(); i++) {
                    switch (paperNews.get(i).getOptionId()) {
                        //表ライナー
                        case 1:
                            productDto.setLaminationFrontId(mstLaminationJsons.get(i).getId());
                            break;
                        //B中芯
                        case 2:
                            productDto.setLaminationBId(mstLaminationJsons.get(i).getId());
                            break;
                        //中芯
                        case 3:
                            productDto.setLaminationMediumId(mstLaminationJsons.get(i).getId());
                            break;
                        //A中芯
                        case 4:
                            productDto.setLaminationAId(mstLaminationJsons.get(i).getId());
                            break;
                        //裏ライナ
                        case 5:
                            productDto.setLaminationBackId(mstLaminationJsons.get(i).getId());
                            break;
                        default:
                            break;
                    }
                }
            }
            //3. product
            else {
                //原紙名/坪量
                List<PaperModalJson> paperModelsByPaper = paperNews.stream()
                        .filter(paperModalJson -> paperModalJson.getOptionId() == 1)
                        .collect(Collectors.toList());
                List<PaperModalJson> paperModelsByLamination = paperNews.stream()
                        .filter(paperModalJson -> paperModalJson.getOptionId() != 1)
                        .collect(Collectors.toList());

                mstPaperJsons = sv013MstDataService.sv01335SaveNewPaper(paperModelsByPaper);
                mstLaminationJsons = sv013MstDataService.sv01334SaveNewLamination(paperModelsByLamination);
                //1.3 set id mst lamination by optionInput
                for (int i = 0; i < paperModelsByPaper.size(); i++) {
                    if (paperModelsByPaper.get(i).getOptionId().equals(1)) {
                        Integer paperId = mstPaperJsons.get(i).getId();
                        //表ライナー
                        productDto.setPaperId(mstPaperJsons.get(i).getId());
                        // update sheetSizeId
                        productDto.setSheetSizeId(getSheetSizeId(productDto.getPaperSizeW(), productDto.getPaperSizeH(), paperId));
                        break;
                    }
                }
                for (int i = 0; i < paperModelsByLamination.size(); i++) {
                    switch (paperModelsByLamination.get(i).getOptionId()) {
                        //中芯
                        case 3:
                            productDto.setLaminationMediumId(mstLaminationJsons.get(i).getId());
                            break;
                        //裏ライナ
                        case 5:
                            productDto.setLaminationBackId(mstLaminationJsons.get(i).getId());
                            break;
                        default:
                            break;
                    }
                }
            }
        }

        DataModel dataModel = new DataModel();
        dataModel.setMstLaminationJsons(mstLaminationJsons);
        dataModel.setMstPaperJsons(mstPaperJsons);
        dataModel.setProductDto(productDto);

        return dataModel;
    }

    private Integer getSheetSizeId(BigDecimal paperSizeW, BigDecimal paperSizeH, Integer paperId) {
        List<MstSheetSizeDto> mstSheetSizeDtos = sv013MstDataService.sv01319GetSheetSizeByPaperId(paperId);
        Integer sheetSizeId = null;
        if (mstSheetSizeDtos != null) {
            // find mstSheetSize by paperSizeW and paperSizeH
            MstSheetSizeDto mstSheetSizeDto = mstSheetSizeDtos.stream().filter(mstSheetSize ->
                    mstSheetSize.getHeight().equals(paperSizeH) && mstSheetSize.getWidth().equals(paperSizeW)
            ).findFirst().orElse(null);
            // check sheetSize
            if(mstSheetSizeDto != null){
                sheetSizeId = mstSheetSizeDto.getId();
            }
        }

        return sheetSizeId;
    }

    private MstLaminationJson parseMstLaminationJson(MstLaminationDto mst, String role) {
        BigDecimal normValue = new BigDecimal(0);
        if (mst.getSagaNormValue() != null) {
            normValue = mst.getSagaNormValue();
        } else if (mst.getOnoNormValue() != null) {
            normValue = mst.getOnoNormValue();
        } else if (mst.getTakuNormValue() != null) {
            normValue = mst.getTakuNormValue();
        }

        MstLaminationJson mstLaminationJson = new MstLaminationJson();
        mstLaminationJson.setData(mst);
        mstLaminationJson.setUserRole(role);
        mstLaminationJson.setNormValue(normValue);

        return mstLaminationJson;
    }

    private MstPaperJson parseMstPaperJson(MstPaperDto mst, String role, Integer factoryId, BigDecimal normValue) {
        MstPaperJson mstPaperJson = new MstPaperJson();
        mstPaperJson.setData(mst);
        mstPaperJson.setUserRole(role);
        //Taku: 3
        mstPaperJson.setFactoryId(factoryId);
        if (normValue != null) {
            mstPaperJson.setNormValue(normValue);
        } else {
            mstPaperJson.setNormValue(BigDecimal.ZERO);
        }

        return mstPaperJson;
    }

    private MstPaperJson parseMstPaperJson2903(MstPaperPrc mst, String role, Integer factoryId, BigDecimal normValue,Integer tabNumber) {
        MstPaperJson mstPaperJson = new MstPaperJson();
        mstPaperJson.setData(mst);
        mstPaperJson.setUserRole(role);
        mstPaperJson.setFactoryId(factoryId);
        if (normValue != null) {
            mstPaperJson.setNormValue(normValue);
        } else {
            mstPaperJson.setNormValue(BigDecimal.ZERO);
        }

        mstPaperJson.setWidth(mst.getWidth());
        mstPaperJson.setHeight(mst.getHeight());
        mstPaperJson.setTabNumber(tabNumber);

        return mstPaperJson;
    }
}

