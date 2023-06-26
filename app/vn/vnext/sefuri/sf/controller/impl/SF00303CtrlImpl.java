package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.collect.Lists;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00303Ctrl;
import vn.vnext.sefuri.sf.dao.MstPaperDao;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.core.*;
import vn.vnext.sefuri.sf.json.request.SF0030301Req;
import vn.vnext.sefuri.sf.json.response.SF0030300Res;
import vn.vnext.sefuri.sf.json.response.SF0030301Res;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by hoangtd on 1/6/2017.
 */
public class SF00303CtrlImpl extends CommonCtrl implements SF00303Ctrl {
    /*service quotation*/
    @Inject
    private SV004QuotationService sv004QuotationService;

    /*service deal*/
    @Inject
    private SV003DealService sv003DealService;

    /*service deal product*/
    @Inject
    private SV014DealProductService sv0014DealProductService;

    /*service product*/
    @Inject
    private SV008ProductService sv008ProductService;

    /*service customer*/
    @Inject
    private SV005CustomerService sv005CustomerService;

    /*service authen*/
    @Inject
    private SV001AuthService sv001AuthService;

    @Inject
    private SV002UserService sv002UserService;

    @Inject
    private SV015DepartmentService sv015DepartmentService;

    @Inject
    private SV010OfferService sv010OfferService;

    @Inject
    private MstPaperDao mstPaperDao;

    @Inject
    private SV013MstDataService mstDataService;

    /**
     * {@inheritDoc}
     */
    public Result sf0030300GetQuotationInfo(final String dealCode, String quotationCode) {
        // quotation has null value in the case of insert a new quotation
        SF0030300Res sf0030300Res = new SF0030300Res();

        // 1. set Quotation
        QuotationDto quotationDto = sv004QuotationService.sv00403GetQuotationByQuotationCode(quotationCode);
        // 2. set Deal
        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);
        // check quotation in deal
        if (quotationDto != null && dealDto != null) {
            if (quotationDto.getDealId() == dealDto.getId()) {
                QuotationJson quotationJson = new QuotationJson();
                quotationJson.setData(quotationDto);

                // set deal to quotation
                DealJson dealJson = new DealJson();
                dealJson.setData(quotationDto.getDeal());
                quotationJson.setDeal(dealJson);

                sf0030300Res.setQuotation(quotationJson);
            } else {
                return responseError(MessageCode.SF00303.ERR001);
            }
        }

        if (dealDto != null) {
            DealJson dealJson = new DealJson();
            dealJson.setData(dealDto);

            // 2.1 set Customer to Deal and // 2.3 set user pic
            CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
            if (customerDto != null) {
                CustomerJson customerJson = new CustomerJson();
                customerJson.setData(customerDto);
                dealJson.setCustomer(customerJson);

                // 2.3 set sale by customer
                UserJson salemanJson = new UserJson();
                salemanJson.setUsername(customerDto.getCustomerContact());

                sf0030300Res.setSaleByCustomer(salemanJson);
                //2.4 set department by pic sale
                DepartmentDto dpm = new DepartmentDto();
                if (dpm != null) {
                    DepartmentJson departmentJson = new DepartmentJson();
                    departmentJson.setData(dpm);

                    sf0030300Res.setDepartmentByCustomer(departmentJson);
                }
            }

            // 2.2 set salesman info
            UserDto salesman = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
            if (salesman != null) {
                UserJson salemanJson = new UserJson();
                salemanJson.setData(salesman);

                // set salesman department
                DepartmentDto departmentDto = sv015DepartmentService.sv01509GetDepartmentById(salesman
                        .getDepartmentId());
                DepartmentJson departmentJson = new DepartmentJson();
                departmentJson.setData(departmentDto);
                salemanJson.setDepartment(departmentJson);

                dealJson.setSales(salemanJson);
            }

            sf0030300Res.setDeal(dealJson);
        } else {
            return responseError(MessageCode.SF00303.ERR001);
        }

        // 3. set QuotationItems to Json
        if (quotationDto != null) {
            List<QuotationItemDto> quotationItemDtos = sv004QuotationService.sv00401GetQuotationItemsByQuotationId
                    (quotationDto.getId());
            List<QuotationItemJson> quotationItemJsons = Lists.newArrayList();

            if (CollectionUtil.isNotEmpty(quotationItemDtos)) {
                for (QuotationItemDto quotationItm : quotationItemDtos) {
                    QuotationItemJson quotationItemJson = new QuotationItemJson();
                    quotationItemJson.setData(quotationItm);

                    // get deal product
                    DealProductDto dealProductDto = quotationItm.getDealProduct();
                    if (dealProductDto != null) {
                        DealProductJson dealProductJson = parseDealProductJson(dealProductDto);
                        // set quotation json
                        quotationItemJson.setDealProduct(dealProductJson);
                    }

                    quotationItemJsons.add(quotationItemJson);
                }
                sf0030300Res.setQuotationItems(quotationItemJsons);
            }
        }

        // 4. set Deal Product
        List<DealProductDto> dealProductDtos = sv0014DealProductService.sv01401GetDealProductByDealId(dealDto.getId());

        List<DealProductJson> dealProductJsons = Lists.newArrayList();

        if (CollectionUtil.isNotEmpty(dealProductDtos)) {
            for (DealProductDto dealProductDto : dealProductDtos) {
                DealProductJson dealProductJson = parseDealProductJson(dealProductDto);

                dealProductJsons.add(dealProductJson);
            }
            sf0030300Res.setDealProducts(dealProductJsons);
        }

        //5 get mst lamination
        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            sf0030300Res.setLaminationJsons(laminationJsons);
        }

        return responseJson(sf0030300Res, MessageCode.SF00303.INF001);
    }

    /*parse deal product dto to json*/
    private DealProductJson parseDealProductJson(DealProductDto dealProductDto) {
        DealProductJson dealProductJson = new DealProductJson();
        dealProductJson.setData(dealProductDto);
        // set list offer - productOutput to dealProduct
        List<ProductOutputDto> productOutputDtos = sv008ProductService.sv00812GetProductOutputByDealProductId
                (dealProductDto.getId());
        if (CollectionUtil.isNotEmpty(productOutputDtos)) {
            List<OfferJson> offerJsons = new ArrayList<>();
            productOutputDtos.forEach(productOutputDto -> {
                OfferDto offerDto = sv010OfferService.sv01003GetOfferByProductOutputId(productOutputDto.getId());
                offerDto.setProductOutput(productOutputDto);
                ProductOutputJson productOutputJson = new ProductOutputJson();
                productOutputJson.setData(productOutputDto);

                OfferJson offerJson = new OfferJson();
                offerJson.setData(offerDto);
                offerJson.setProductOutput(productOutputJson);

                offerJsons.add(offerJson);
            });
            dealProductJson.setOffers(offerJsons);
        }

        // get product
        ProductDto productDto = dealProductDto.getProduct();
        if (productDto != null) {
            ProductJson productJson = new ProductJson();
            productJson.setData(productDto);
            // paperId
            MstPaperJson mstPaperJson = new MstPaperJson();
            if (productDto.getPaperId() != null) {
                MstPaperDto mstPaperDto = mstPaperDao.find(productDto.getPaperId());
                // parse mst paper
                mstPaperJson.setData(mstPaperDto);
                productJson.setPaper(mstPaperJson);
            }

            // get ProductCommonFree
            ProductCommonFeeDto productCommon = productDto.getProductCommon();
            if (productCommon != null) {
                ProductCommonFeeJson productCommonFeeJson = new ProductCommonFeeJson();
                productCommonFeeJson.setData(productCommon);
                productJson.setProductCommon(productCommonFeeJson);
            }
            dealProductJson.setProduct(productJson);
        }

        return dealProductJson;
    }

    /**
     * {@inheritDoc}
     */
    public Result sf0030301SaveQuotation() {
        SF0030301Req sf0030301Req = requestJson(SF0030301Req.class);

        // 1. get Quotation
        QuotationJson quotationJson = sf0030301Req.getQuotation();
        QuotationDto quotationDto = quotationJson.getData();

        // 2. get QuotationJson
        List<QuotationItemJson> quotationItemsJson = sf0030301Req.getQuotationItems();
        List<QuotationItemDto> quotationItemDtos = Lists.newArrayList();
        if (CollectionUtil.isNotEmpty(quotationItemsJson)) {
            for (QuotationItemJson quotationItm : quotationItemsJson) {
                QuotationItemDto quotationItemDto = quotationItm.getData();
                quotationItemDtos.add(quotationItemDto);
            }
        }
        quotationDto.setQuotationItems(quotationItemDtos);
        // 2.1 set user create or user update
        Integer userId = sv001AuthService.getCurrentUser().getId();
        quotationDto.setCreatedUser(userId);
        quotationDto.setUpdatedUser(userId);

        // 3. create/update Quotation
        quotationDto = sv004QuotationService.sv00405SaveQuotation(quotationDto);

        // 4. response to client
        SF0030301Res sf0030301Res = setDataToResponse(quotationDto);
        return responseJson(sf0030301Res, MessageCode.SF00303.INF001);
    }

    /**
     * {@inheritDoc}
     */
    public Result sf0030302DuplicateQuotation() {
        SF0030301Req sf0030301Req = requestJson(SF0030301Req.class);
        // convert data quotation
        QuotationJson quoJson = sf0030301Req.getQuotation();
        QuotationDto quotationDto = quoJson.getData();
        // set usert create and user update
        Integer userId = sv001AuthService.getCurrentUser().getId();
        quotationDto.setCreatedUser(userId);
        quotationDto.setUpdatedUser(userId);
        quotationDto.setHighlightFlag(Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());

        // convert data quotation item
        List<QuotationItemJson> quotationItemJsons = sf0030301Req.getQuotationItems();
        List<QuotationItemDto> quotationItemDtos = Lists.newArrayList();

        if (CollectionUtil.isNotEmpty(quotationItemJsons)) {
            for (QuotationItemJson quoItemJson : quotationItemJsons) {
                QuotationItemDto quoItemDto = quoItemJson.getData();
                quotationItemDtos.add(quoItemDto);
            }
        }

        quotationDto.setQuotationItems(quotationItemDtos);
        QuotationDto quotationAfter = this.sv004QuotationService.sv00406CopyAndSaveQuotation(quotationDto);
        // response to client
        SF0030301Res sf0030301Res = setDataToResponse(quotationAfter);
        return responseJson(sf0030301Res, MessageCode.SF00303.INF001);
    }

    /**
     * {@inheritDoc}
     */
    public Result sf0030303DeleteQuotation(String quotationCode) {
        QuotationDto quotationDto = sv004QuotationService.sv00403GetQuotationByQuotationCode(quotationCode);

        boolean check = sv004QuotationService.sv00404DeleteQuotation(quotationDto.getId());
        if (check)
            return responseOk();
        else
            return responseError(MessageCode.SF00303.ERR004);
    }

    /**
     * convert data response to dto
     *
     * @param quotationDto
     * @return SF0030301Res
     */
    private SF0030301Res setDataToResponse(QuotationDto quotationDto) {
        // 1. response to client
        SF0030301Res sf0030301Res = new SF0030301Res();

        // 1.1 set Quotation Json
        QuotationJson quotationJson = new QuotationJson();
        quotationJson.setData(quotationDto);
        sf0030301Res.setQuotation(quotationJson);

        // 1.2 set QuotationItems Json
        List<QuotationItemJson> quotationItemsJson = Lists.newArrayList();

        for (QuotationItemDto quotationItemDto : quotationDto.getQuotationItems()) {
            QuotationItemJson quotationItemJson = new QuotationItemJson();
            quotationItemJson.setData(quotationItemDto);
            quotationItemsJson.add(quotationItemJson);
        }
        sf0030301Res.setQuotationItems(quotationItemsJson);

        // 2. Return Normal message code
        sf0030301Res.setMessageCode(MessageCode.SF00303.INF001);
        return sf0030301Res;
    }

}
