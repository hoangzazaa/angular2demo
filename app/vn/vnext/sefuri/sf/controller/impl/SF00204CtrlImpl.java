package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.collect.Lists;
import com.google.inject.Inject;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00204Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.helper.SfrException;
import vn.vnext.sefuri.sf.json.SF00204.model.SF00204_InventoryJson;
import vn.vnext.sefuri.sf.json.SF00204.model.SF00204_ProductBoxJson;
import vn.vnext.sefuri.sf.json.SF00204.model.SF00204_ProductJson;
import vn.vnext.sefuri.sf.json.SF00204.model.SF00204_TransHistoryJson;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020401Req;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020402Req;
import vn.vnext.sefuri.sf.json.SF00204.request.SF0020403Req;
import vn.vnext.sefuri.sf.json.SF00204.response.SF0020401Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.module.search.SearchApi;
import vn.vnext.sefuri.sf.module.search.SearchResult;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class SF00204CtrlImpl extends CommonCtrl implements SF00204Ctrl {

    private static final Logger logger = LoggerFactory.getLogger(SF00204CtrlImpl.class);

    @Inject
    private SV003DealService dealService;

    @Inject
    private SV008ProductService productService;

    @Inject
    private SV014DealProductService dealProductService;

    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV004QuotationService sv004QuotationService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV009OrderService orderService;

    @Inject
    private SearchApi searchApi;

    @Inject
    private SV013MstDataService sv013MstDataService;

    @Inject
    private SV013MstDataService mstDataService;

    @Override
    public Result sf0020401InitData() {
        SF0020401Req sf0020401Req = requestJson(SF0020401Req.class);
        SF0020401Res sf0020401Res = new SF0020401Res();

        Integer indexTo = sf0020401Req.getIndexTo();
        if (indexTo == null || indexTo < 0) {
            indexTo = Constants.PAGE_SIZE;
        }
        Integer indexFrom = sf0020401Req.getIndexFrom();
        if (indexFrom == null || indexFrom < 0) {
            indexFrom = 0;
        }
        List<DealProductDto> dealProductDtoList = Lists.newArrayList();

        // get 10 product have request_design_flag = 1 and exist in DealProduct
        List<ProductDto> productDtoList = productService.sv00838GetProductsInDealProduct(indexFrom, indexTo);
        List<Integer> listProduct = productDtoList.stream().map(p -> p.getId()).collect(Collectors.toList());

        for (Integer idP : listProduct) {
            // with each idP  --> get list DealProduct  -->  get(index = 0)
            List<DealProductDto> listDP = dealProductService.sv01407GetOnlyDealProductByProductId(idP);
            dealProductDtoList.add(listDP.get(0));
        }

        List<SF00204_ProductBoxJson> productBoxJsonList = Lists.newArrayList();
        //2. get info product
        if (dealProductDtoList.size() > 0)
            productBoxJsonList = getProductBoxJsons(dealProductDtoList);

        Long totalRecords = productService.getTotalRecords();
        sf0020401Res.setProductBoxes(productBoxJsonList);
        sf0020401Res.setTotalRecords(totalRecords);

        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);
                return mstJson;
            }).collect(Collectors.toList());
            sf0020401Res.setLaminationJsons(laminationJsons);
        }
        return responseJson(sf0020401Res, MessageCode.SF00204.INF001);
    }

    @Override
    public Result sf0020402SearchProducts() {
        // data request search
        SF0020402Req sf0020401Req = requestJson(SF0020402Req.class);
        List<SF00204_ProductBoxJson> productBoxJsonList = Lists.newArrayList();
        List<DealProductDto> dealProductDtoList = Lists.newArrayList();
        if (sf0020401Req == null) {
            return responseOk();
        }

        SearchResult searchResult = searchApi.searchProduct(sf0020401Req);
        // data response result
        SF0020401Res sf0020401Res = new SF0020401Res();
        //1.search -> list dealProductIds
        Long totalRecords = null;
        //2.get DealProductDto indexFrom to indexTo
        if (searchResult == null) {
            int indexTo = Constants.PAGE_SIZE;
            int indexFrom = 0;
            //Get 10 product have request_design_flag = 1 and exist in DealProduct
            List<ProductDto> productDtoList = productService.sv00838GetProductsInDealProduct(indexFrom, indexTo);
            List<Integer> productIds = productDtoList.stream().map(p -> p.getId()).collect(Collectors.toList());
            for (Integer productId : productIds) {
                // with each productId  --> get list DealProduct  -->  get(index = 0)
                List<DealProductDto> dealProductDtos = dealProductService.sv01407GetOnlyDealProductByProductId(productId);
                dealProductDtoList.add(dealProductDtos.get(0));
            }
            totalRecords = productService.getTotalRecords();
        } else if (searchResult.getIds().size() > 0) {
            List<Integer> productIds = searchResult.getIds();
            for (Integer productId : productIds) {
                // with each productId  --> get list DealProduct  -->  get(index = 0)
                List<DealProductDto> dealProductDtos = dealProductService.sv01407GetOnlyDealProductByProductId(productId);
                dealProductDtoList.add(dealProductDtos.get(0));
            }
            totalRecords = Long.valueOf(searchResult.getCount());
        }
        // get info product
        if (dealProductDtoList.size() > 0) {
            productBoxJsonList = getProductBoxJsons(dealProductDtoList);
        }

        sf0020401Res.setProductBoxes(productBoxJsonList);
        sf0020401Res.setTotalRecords(totalRecords);

        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);
                return mstJson;
            }).collect(Collectors.toList());
            sf0020401Res.setLaminationJsons(laminationJsons);
        }

        return responseJson(sf0020401Res, MessageCode.SF00204.INF001);
    }

    @Override
    public Result sf0020403AddProductToDeal() {
        SF0020403Req req = requestJson(SF0020403Req.class);
        String dealCodeAfter = req.getDealCodeAfter();
        String dealCodeBefore = req.getDealCodeBefore();

        Integer productId = req.getProductId();

        //1. Get deal
        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCodeAfter);
        if (dealDto == null) {
            // Deal not found
            return responseError(MessageCode.SF00302.ERR001);
        }

        ProductDto productDto = sv008ProductService.sv00810GetProductById(productId);
        // check dealProduct in deal
        DealProductDto dealProductDtoAfter = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(dealCodeAfter, productDto.getProductCode());
        // dealProduct copy data before to after
        DealProductDto dealProductDtoBefore = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(dealCodeBefore, productDto.getProductCode());
        // check deal after using product
        if (dealProductDtoAfter != null) {
            return responseError(MessageCode.SF00302.ERR002);
        }

        // 2.0 Create new Deal Product
        try {
            //2.1 productJson
            sv003DealService.sv00330UsingProductFromDeal(dealProductDtoBefore, dealDto.getId(), productDto);
            //2.2 Always set deal's status to design complete because SF002-04 only all show product already
            // 'request_design_flag = 1' means that product have status is EnumsPDF.ProductStatus.DESIGN_COMPLETE
            dealDto.setDealStatus(Enums.DealStatus.DESIGN_COMPLETE.getStatus());
            sv003DealService.sv00307SaveDeal(dealDto);

            return responseOk();
        } catch (SfrException e) {
            logger.debug(e.getMessage());
            // Deal not found
            return responseError(MessageCode.SF00302.ERR001);
        }
    }

    private List<SF00204_ProductBoxJson> getProductBoxJsons(List<DealProductDto> dealProductDtos) {
        List<SF00204_ProductBoxJson> productBoxJsonList = Lists.newArrayList();
        for (DealProductDto dealProductDto : dealProductDtos) {
            SF00204_ProductBoxJson productBoxJson = new SF00204_ProductBoxJson();
            SF00204_ProductJson productJson = new SF00204_ProductJson();
            Integer dealId = dealProductDto.getDealId();
            Integer productId = dealProductDto.getProductId();
            //get list product follow dealId
            List<ProductDto> productDtoList = productService.sv00832GetProductsOrderByUpdatedDate(dealId, false,
                                                                                                  Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());

            List<Integer> productIds = productDtoList.stream().map(p -> p.getId()).collect(Collectors.toList());
            //get product by Id
            ProductDto productDto = productService.sv00810GetProductById(productId);
            DealDto deal = dealService.sv00301GetDealById(dealId);
            //Parse basic product info
            if (productIds.size() > 0)
                productJson = getProductJson(deal, productDto, productIds, dealProductDto);
            productBoxJson.setProduct(productJson);
            //Parse transaction history
            List<SF00204_TransHistoryJson> transHistoryJsons = getStocks(deal, productJson.getId());
            productBoxJson.setTransactions(transHistoryJsons);
            //Parse inventory item
            SF00204_InventoryJson inventoryJson = getInventoryJson(productDto, dealProductDto, transHistoryJsons);
            productBoxJson.setInventory(inventoryJson);

            // set dealCode
            productBoxJson.setDealCode(deal.getDealCode());

            productBoxJsonList.add(productBoxJson);
        }

        return productBoxJsonList;
    }

    private SF00204_ProductJson getProductJson(final DealDto deal, final ProductDto product,
                                               final List<Integer> productIds, final DealProductDto dealProduct) {
        SF00204_ProductJson productJson = new SF00204_ProductJson();
        productJson.setData(product);
        // get memo product
        productJson.setMemo(productService.sv00836GetMemoProduct(product));
        // get paperName
        productJson.setPaperName(sv013MstDataService.sv01329GetPaperNameHaveId100(product));
        // 0. parse mst paper
        MstPaperJson mstPaperJson = new MstPaperJson();
        if (product.getPaperId() != null && product.getPaperId() != 0) {
            MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(product.getPaperId(), product.getSheetSizeId());
            if (mstPaperDto != null)
                mstPaperJson.setData(mstPaperDto);

            productJson.setPaper(mstPaperJson);
        }

        //1. set product file
        ProductFileDto productFile = productService.sv00829GetPrimaryProductFile(product.getId());
        if (productFile != null) {
            FileDto fileDto = fileService.sv00609GetFileInfo(productFile.getFileId());
            productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
        }

        //2. set Lot+Estimated Unit Price
        //2.1. find list item based on selected product.
        //Get list QuotationItem by dealId
        List<QuotationItemDto> quotationItems = sv004QuotationService.sv00409GetQuotationItemsByDealIdAndProductId(deal.getId(), productIds);
        if (CollectionUtil.isNotEmpty(quotationItems)) {
            //2.2. get item has maximum quantity value
            QuotationItemDto quotationItem = sv004QuotationService.sv00410GetDefaultQuotationItem(quotationItems, false, deal.getId(), dealProduct);
            if (quotationItem != null) {
                //2.3. parse data to current product json
                productJson.setLot(quotationItem.getQuantity().intValue());
                productJson.setUnitPrice(quotationItem.getSubmittedPrice());
                productJson.setTotalCost(quotationItem.getTotal());
            }
        }
        return productJson;
    }

    private List<SF00204_TransHistoryJson> getStocks(final DealDto deal, final Integer productId) {
        List<OrderItemDto> orderItems = orderService.sv00901GetOrderItemByDealId(deal.getId());
        if (CollectionUtil.isEmpty(orderItems))
            return Collections.emptyList();
        List<SF00204_TransHistoryJson> transHistoryJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(orderItems)) {
            for (OrderItemDto orderItemDto : orderItems) {
                if (orderItemDto.getProductId().equals(productId)) {
                    SF00204_TransHistoryJson transHistoryJson = new SF00204_TransHistoryJson();
                    transHistoryJson.setDealName(deal.getDealName());
                    transHistoryJson.setProductId(orderItemDto.getProductId());
                    transHistoryJson.setSubmittedPrice(orderItemDto.getSubmittedPrice());
                    transHistoryJson.setTotal(orderItemDto.getTotal());
                    transHistoryJson.setQuantity(orderItemDto.getQuantity());

                    //set orderJson
                    if (orderItemDto.getOrderId() != null) {
                        OrderDto orderDto = orderService.sv00902GetOrderById(orderItemDto.getOrderId());
                        transHistoryJson.setUpdatedDate(orderDto.getUpdatedDate());
                    }
                    transHistoryJsons.add(transHistoryJson);
                }
            }
        }
        return transHistoryJsons;
    }

    private SF00204_InventoryJson getInventoryJson(final ProductDto product, final DealProductDto dealProduct, final List<SF00204_TransHistoryJson> transHistoryJsons) {
        SF00204_InventoryJson inventoryJson = new SF00204_InventoryJson();
        if (CollectionUtil.isEmpty(transHistoryJsons))
            return inventoryJson;

        inventoryJson.setProductName(product.getProductName());
        //set Lot+Estimated Unit Price
        ProductOutputDto productOutPutSelected = productService.sv00827GetProductOutPutSelected(dealProduct.getId());
        if (productOutPutSelected != null) {
//            inventoryJson.setQuantity(productOutPutSelected.getLot());
            inventoryJson.setUnitPrice(productOutPutSelected.getEstimatedUnitPrice());
        }

        //set quantity Stock
        //26-Apr-17: replace check 'dennoProductCode' by 'itemCode'
        if (product.getItemCode() != null) {
            CurrentStockDto currentStock = orderService.sv00904GetCurrentStock(product.getItemCode());
            if (currentStock != null)
                inventoryJson.setQuantity(currentStock.getTotal());
        }

        DateTime updatedDate = transHistoryJsons.get(0).getUpdatedDate();
        inventoryJson.setDays(calculateNoOfDays(updatedDate));
        return inventoryJson;
    }

    private Integer calculateNoOfDays(final DateTime updatedDate) {
        if (updatedDate != null) {
            long millisecondsPerDay = 24 * 60 * 60 * 1000;
            return Math.round(Math.abs((DateUtil.getSysDate().getMillis() - updatedDate.getMillis()) / (millisecondsPerDay)));
        }
        return null;
    }

}
