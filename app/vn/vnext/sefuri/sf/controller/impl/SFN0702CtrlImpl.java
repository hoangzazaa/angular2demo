package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0702Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SFN0702.DealProductJson;
import vn.vnext.sefuri.sf.json.SFN0702.OfferJson;
import vn.vnext.sefuri.sf.json.SFN0702.ProductJson;
import vn.vnext.sefuri.sf.json.SFN0702.ProductOutputJson;
import vn.vnext.sefuri.sf.json.core.ProductFileJson;
import vn.vnext.sefuri.sf.json.response.SFN070201Res;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV010OfferService;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class SFN0702CtrlImpl extends CommonCtrl implements SFN0702Ctrl {

    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV010OfferService sv010OfferService;

    @Inject
    private SV006FileService sv006FileService;

    /**
     * @param dealCode
     * @param productCode
     * @return Deal Product if request is valid
     */
    @Override
    public Result sfn070201GetDealProduct(String dealCode, String productCode) {
        // 1. Check Valid Param URL
        if (dealCode != null && !productCode.equals("0")) {
            // Existed Product
            boolean isCorrect = sv003DealService.sv00314CheckDealAndProductRelationship(dealCode, productCode);
            if (!isCorrect) {
                // invalid url params
                return responseError(MessageCode.SF00302.ERR003);
            }
        } else {
            // Existed Deal
            DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);
            if (dealDto == null) {
                // Deal not found
                return responseError(MessageCode.SF00302.ERR001);
            }
        }

        // 2. Get Deal Product
        DealProductDto dealProductDto = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(dealCode,
                productCode);

        // 3. Set Deal Product Data to Json Response
        // 3.1 Create Json Response
        SFN070201Res res = new SFN070201Res();
        DealProductJson dealProductJson = new DealProductJson();
        if (dealProductDto != null) {
            // If valid data
            dealProductJson.setData(dealProductDto);

            // Get product data
            // 2.1 Get Product
            ProductDto productDto = sv008ProductService.sv00810GetProductById(dealProductDto.getProductId());
            ProductJson productJson = new ProductJson();
            if(productDto!=null){
                productJson.setData(productDto);
            }

            //2.2 Get Product Output
            // In screen model, product output is linked to product
            List<ProductOutputDto> productOutputDtos = sv008ProductService.sv00822GetProductOutputByDealProductId
                    (dealProductDto.getId());
            List<ProductOutputJson> productOutputJsons = getProductOutputJson(productOutputDtos);
            productJson.setProductOutputs(productOutputJsons);

            //2.3 Get Offer
            // In screen model, offer is linked to deal product
            List<OfferDto> offerDtos = new ArrayList<>();
            productOutputDtos.forEach(productOutputDto -> {
                offerDtos.add(sv010OfferService.sv01003GetOfferByProductOutputId(productOutputDto.getId()));
            });
            dealProductJson.setOffers(getOffersJson(offerDtos));

            //2.4 Get Product File
            // 2.2.2 Get PRoductFiles
            List<ProductFileDto> productFileDtos = sv008ProductService.sv00811GetProductFileByProductId
                    (productDto.getId());
            List<ProductFileJson> productFileJsons = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(productFileDtos)) {
                for (ProductFileDto productFileDto : productFileDtos) {
                    ProductFileJson productFileJson = new ProductFileJson();
                    productFileJson.setData(productFileDto);

                    FileDto fileDto = sv006FileService.sv00609GetFileInfo(productFileDto.getFileId());
                    productFileJson.setSrcImg(sv006FileService.sv00618GetThumbnail(fileDto));

                    productFileJsons.add(productFileJson);
                }
            }
            productJson.setProductFiles(productFileJsons);

            dealProductJson.setProduct(productJson);

        }

        res.setDealProduct(dealProductJson);
        return responseUsingGzip(res, MessageCode.SF00302.INF001);
    }

    /**
     * @param productOutputDtos
     * @return Product Output Json
     */
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
}
