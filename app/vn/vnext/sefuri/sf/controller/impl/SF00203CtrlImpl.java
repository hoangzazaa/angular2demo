package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.collect.Lists;
import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00203Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00203.model.DealJson;
import vn.vnext.sefuri.sf.json.SF00203.model.OrderItemJson;
import vn.vnext.sefuri.sf.json.SF00203.model.ProductJson;
import vn.vnext.sefuri.sf.json.SF00203.request.SF0020301Req;
import vn.vnext.sefuri.sf.json.SF00203.response.SF0020301Res;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.ArrayList;
import java.util.List;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safe;

/**
 * Created by DungTQ on 3/8/2017.
 */

public class SF00203CtrlImpl extends CommonCtrl implements SF00203Ctrl {

    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV007MyboxService sv007MyboxService;

    @Inject
    private SV014DealProductService sv014DealProductService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV011WoodenService sv011WoodenService;

    @Inject
    private SV009OrderService sv009OrderService;
    @Inject
    private SV005CustomerService sv005CustomerService;
    @Inject
    private SV002UserService sv002UserService;

    @Inject
    private SV013MstDataService sv013MstDataService;

    @Inject
    private SV006FileService fileService;

    @Override
    public Result sf0020301Init() {
        SF0020301Req sf0020301Req = requestJson(SF0020301Req.class);
        Integer indexTo = sf0020301Req.getIndexTo();
        if (indexTo == null || indexTo < 0) {
            indexTo = Constants.PAGE_SIZE;
        }

        Integer indexFrom = sf0020301Req.getIndexFrom();
        if (indexFrom == null || indexFrom < 0) {
            indexFrom = 0;
        }

        List<DealDto> dealDtos = sv003DealService.sv00324GetAllBookmarkDeals(getUserId(), indexFrom, indexTo);
        List<DealJson> dealJsons = Lists.newArrayList();
        for (DealDto dealDto : safe(dealDtos)) {
            DealJson dealJson = new DealJson();
            dealJson.setData(dealDto);

            // 1.set CustomerName to Deal
            if (dealDto.getCustomerId() != null) {
                CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
                dealJson.setCustomerName(customerDto.getName());
            }
            //2.set SaleName to Deal
            if (dealDto.getSalesId() != null) {
                UserDto sale = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
                dealJson.setSaleName(sale.getUsername());
            }
            //3.set images
            List<DealFileDto> dealFileDtos = sv003DealService.sv00313GetDealFileByDealId(dealDto.getId());
            List<String> filepath = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(dealFileDtos)) {
                for (DealFileDto dealFileDto : dealFileDtos) {
                    filepath.add(dealFileDto.getDealFileName());
                }
            }
            dealJson.setFilePath(filepath);

            // add deal's products informations if exist
            List<DealProductDto> dealProductDtos = sv014DealProductService.sv01401GetDealProductByDealId(dealDto.getId());
            List<ProductJson> productJsons = Lists.newArrayList();
            for (DealProductDto dealProductDto : safe(dealProductDtos)) {
                //set SF00202_ProductJson
                ProductDto productDto = sv008ProductService.sv00810GetProductById(dealProductDto.getProductId());
                if (productDto != null) {
                    ProductJson productJson = new ProductJson();
                    productJson.setData(productDto);
                    //TODO common here
                    String paperName;
                    paperName = sv013MstDataService.sv01329GetPaperNameHaveId100(productDto);
                    productJson.setPaperName(paperName);

                    ProductFileDto productFileDto = sv008ProductService.sv00829GetPrimaryProductFile(productDto.getId());
                    if (productFileDto != null) {
                        FileDto fileDto = fileService.sv00609GetFileInfo(productFileDto.getFileId());
                        productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
                    }

                    // get woorden data
                    if (productDto.getWoodenCode() != null) {
                        MstWoodenDto woodenDto = sv011WoodenService.sv01102GetMstWoodenByCode(productDto.getWoodenCode());

                        if (woodenDto != null) {
                            productJson.setWoodenExpiredDate(woodenDto.getWoodenExpiredDate());
                            productJson.setWoodenTotalNumber(woodenDto.getWoodenTotalNumber());
                        }
                    }
                    //set varnish -type
                    if (productDto.getSurfaceTreatmentIdF() != null) {
                        MstSurfaceTreatmentDto mstSurfaceTreatmentDto = sv013MstDataService.sv01315GetSurfaceById
                                (productDto.getSurfaceTreatmentIdF());
                        if (mstSurfaceTreatmentDto != null) {
                            productJson.setVarnishType(mstSurfaceTreatmentDto.getVarnishType());
                        }
                    }
                    //set Lot+Estimated Unit Price
                    ProductOutputDto productOutputDto = sv008ProductService.sv00827GetProductOutPutSelected(dealProductDto.getId());
                    if (productOutputDto != null) {
                        productJson.setLot(productOutputDto.getLot());
                        productJson.setEstimatedUnitPrice(productOutputDto.getEstimatedUnitPrice());
                    }

                    //set quantity Stock
                    //26-Apr-17: replace check 'dennoProductCode' by 'itemCode'
                    if (productDto.getItemCode() != null) {
                        CurrentStockDto currentStockDto = sv009OrderService.sv00904GetCurrentStock(productDto.getItemCode());
                        if (currentStockDto != null) {
                            productJson.setQuantityStock(currentStockDto.getTotal());
                        }
                    }
                    productJsons.add(productJson);
                }
            }
            //4.set ProductJsons
            dealJson.setProducts(productJsons);

            final Integer dealId = dealDto.getId();
            List<OrderItemDto> orderItemDtos = sv009OrderService.sv00901GetOrderItemByDealId(dealId);
            List<OrderItemJson> orderItemJsons = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(orderItemDtos)) {
                for (OrderItemDto orderItemDto : orderItemDtos) {
                    OrderItemJson orderItemJson = new OrderItemJson();
                    orderItemJson.setDataJson(orderItemDto);
                    //set orderJson
                    if (orderItemDto.getOrderId() != null) {
                        OrderDto orderDto = sv009OrderService.sv00902GetOrderById(orderItemDto.getOrderId());
                        orderItemJson.setUpdatedDate(orderDto.getUpdatedDate());
                    }
                    orderItemJsons.add(orderItemJson);
                }
            }
            //5.set orderItemJson
            dealJson.setOrderItems(orderItemJsons);
            // set deal to response
            dealJsons.add(dealJson);

        }
        SF0020301Res sf0020301Res = new SF0020301Res();
        sf0020301Res.setDealJsons(dealJsons);
        //set count Mybox
        Long totalRecords = sv007MyboxService.sv00705GetCountMyBox(getUserId());
        sf0020301Res.setTotalRecords(totalRecords.intValue());
        return responseJson(sf0020301Res, MessageCode.SF00203.INF001);

    }
}
