package vn.vnext.sefuri.sf.controller.impl;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safe;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.google.common.collect.Lists;
import com.google.inject.Inject;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00202Ctrl;
import vn.vnext.sefuri.sf.dto.CurrentStockDto;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.DealFileDto;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.FileDto;
import vn.vnext.sefuri.sf.dto.MstLaminationDto;
import vn.vnext.sefuri.sf.dto.MstPaperDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.MyboxItemDto;
import vn.vnext.sefuri.sf.dto.OrderDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SF00202.model.DealJson;
import vn.vnext.sefuri.sf.json.SF00202.model.OrderItemJson;
import vn.vnext.sefuri.sf.json.SF00202.model.SF00202_ProductJson;
import vn.vnext.sefuri.sf.json.SF00202.request.SF0020201Req;
import vn.vnext.sefuri.sf.json.SF00202.request.SF0020202Req;
import vn.vnext.sefuri.sf.json.SF00202.request.SF0020204Req;
import vn.vnext.sefuri.sf.json.SF00202.response.SF0020201Res;
import vn.vnext.sefuri.sf.json.SF00202.response.SF0020202Res;
import vn.vnext.sefuri.sf.json.SF00202.response.SF0020204Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.module.search.SearchApi;
import vn.vnext.sefuri.sf.module.search.SearchResult;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV006FileService;
import vn.vnext.sefuri.sf.service.SV007MyboxService;
import vn.vnext.sefuri.sf.service.SV008ProductService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV011WoodenService;
import vn.vnext.sefuri.sf.service.SV013MstDataService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.util.CollectionUtil;

/**
 * Created by TungNT on 11/17/2016.
 */
public class SF00202CtrlImpl extends CommonCtrl implements SF00202Ctrl {
    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV007MyboxService sv007MyboxService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV011WoodenService sv011WoodenService;

    @Inject
    private SearchApi searchApi;

    @Inject
    private SV009OrderService sv009OrderService;

    @Inject
    private SV005CustomerService sv005CustomerService;

    @Inject
    private SV002UserService sv002UserService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV013MstDataService mstDataService;

    @Inject
    private SV015DepartmentService sv015DepartmentService;

    /**
     * {@inheritDoc}
     */
    @Override
    public Result sf0020201Deal() {
        SF0020201Req req = requestJson(SF0020201Req.class);

        Integer indexFrom = req.getIndexFrom();
        if (indexFrom == null || indexFrom < 0) {
            indexFrom = 0;
        }

        Integer offset = req.getIndexTo();
        if (offset == null || offset < 0) {
            offset = Constants.PAGE_SIZE;
        }

        SF0020201Res sf0020201Res = new SF0020201Res();
        //List<DealDto> dealDtos = sv003DealService.sv00322GetAllDealLazy(indexFrom, offset);
        UserDto currentUser = sv002UserService.sv00204GetUserById(getUserId());
        //http://fridaynight.vnext.vn/issues/3240
        DepartmentDto departmentDto = sv015DepartmentService.sv01509GetDepartmentById(currentUser.getDepartmentId());
        List<DealDto> dealDtos = Lists.newArrayList();
        Long totalRecords;

        if (Enums.DepartType.SUPPORT.getType().equals(departmentDto.getType())) {
            // 支援部門用: 営業部門が担当する案件を照会
            dealDtos = sv003DealService.sv0020201GetDealInProcessOfSales(indexFrom, offset);
            totalRecords = sv003DealService.sv0020202CountDealInProcessOfSales();
        } else {
            // 営業部門・その他用: ログインユーザーが担当案件 or ログインユーザーが所属する部門の案件を照会
            dealDtos = sv003DealService.sv00322GetAllDealLazy(indexFrom, offset, currentUser.getId(), currentUser.getDepartmentId());
            totalRecords = sv003DealService.sv00331CountDeals(currentUser.getId(), currentUser.getDepartmentId());
        }
        // get result list deal filter
        //http://fridaynight.vnext.vn/issues/2200
        List<DealJson> dealJsons = this.getListDataDeal(dealDtos);

        sf0020201Res.setDealJsons(dealJsons);
        sf0020201Res.setTotalRecords(totalRecords.intValue());

        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            sf0020201Res.setMstLaminations(laminationJsons);
        }

        return responseJson(sf0020201Res, MessageCode.SF00202.INF001);
    }

    /**
     * {@inheritDoc}
     */
    // 使われない機能のため使用禁止 (trello: 1099)
    @Override
    public Result sf0020202BookmarkDeal() {
        SF0020202Req sf0020202Req = requestJson(SF0020202Req.class);
        Integer dealId = sf0020202Req.getDealId();
        DealDto dealDto = sv003DealService.sv00301GetDealById(dealId);
        if (dealDto != null) {

            MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(dealDto.getId(), getUserId());
            SF0020202Res sf0020202Res = new SF0020202Res();
            if (myboxItemDto == null) {

                myboxItemDto = sv007MyboxService.sv00701BookmarkDeal(dealId, getUserId());
                sf0020202Res.setMyboxId(myboxItemDto.getId());
            } else {

                sf0020202Res.setMyboxId(myboxItemDto.getId());
            }
            // return myboxJson
            return responseJson(sf0020202Res, MessageCode.SF00202.INF001);
        }
        return responseError(MessageCode.SF00202.ERR001);
    }


    @Override
    public Result sf0020204Search() {
        SF0020204Req req = requestJson(SF0020204Req.class);
        if (req == null) {
            return responseOk();
        }

        SearchResult searchResult = searchApi.searchDeal(req);

        SF0020204Res res = new SF0020204Res();
        List<DealDto> dealDtos;
        if (searchResult != null) {
            dealDtos = sv003DealService.sv00326FilterExistingDealById(searchResult.getIds())
                    .stream().collect(Collectors.toList());
            List<DealJson> dealJsons = this.getListDataDeal(dealDtos);
            res.setDeals(dealJsons);
            res.setTotalRecords(searchResult.getCount());
        } else {
            Integer pageIndex = req.getPageIndex();
            if (pageIndex == null || pageIndex < 0) {
                pageIndex = 1;
            }

            Integer offset = req.getPageSize();
            if (offset == null || offset < 0) {
                offset = Constants.PAGE_SIZE;
            }
            int index = offset * (pageIndex - 1);

            UserDto currentUser = sv002UserService.sv00204GetUserById(getUserId());
            dealDtos = sv003DealService.sv00322GetAllDealLazy(index, offset, currentUser.getId(), currentUser.getDepartmentId());
            List<DealJson> dealJsons = this.getListDataDeal(dealDtos);
            res.setDeals(dealJsons);

            Long totalRecords = sv003DealService.sv00331CountDeals(currentUser.getId(), currentUser.getDepartmentId());
            res.setTotalRecords(totalRecords.intValue());
        }

        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            res.setMstLaminations(laminationJsons);
        }

        return responseJson(res, MessageCode.SF00202.INF001);
    }

    /**
     * Parse list dealDto to dealJson
     * issues: http://fridaynight.vnext.vn/issues/2200
     *
     * @param dealDtos
     * @return
     */
    private List<DealJson> getListDataDeal(List<DealDto> dealDtos) {
        //issues: http://fridaynight.vnext.vn/issues/2200
        List<DealJson> dealJsons = Lists.newArrayList();

        boolean isHitSearchOn = false;
        boolean isCompletedDesign = false;
        boolean isSupporter = false;
        Integer loginUserDepartmentId = null;

        UserDto loginUser = sv001AuthService.getCurrentUser();
        DepartmentDto loginUserDepartment = sv015DepartmentService.sv01509GetDepartmentById(loginUser.getDepartmentId());
        if (loginUserDepartment != null) {
            loginUserDepartmentId = loginUserDepartment.getId();
            if (Enums.DepartType.SUPPORT.getType().equals(loginUserDepartment.getType())) {
                isSupporter = true;
            }
        }

        //1. parse data deal dto to deal json
        for (DealDto dealDto : dealDtos) {
            final Integer dealId = dealDto.getId();

            // check deal is hit search on or off
            isHitSearchOn = (dealDto.getDealLockFlag() != null && dealDto.getDealLockFlag() == Enums.Status
                    .DELETE_FLAG_ON.getStatus());

            // check deal is completed design or not
            isCompletedDesign = (Enums.DealStatus.DESIGN_COMPLETE.getStatus() == dealDto.getDealStatus());

            //1.1 get deal info
            DealJson dealJson = new DealJson();

            boolean isSameDepartment = false;
            UserDto owner = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
            if (owner != null && owner.getDepartmentId() != null) {
                DepartmentDto currentDepartment = sv015DepartmentService.sv01509GetDepartmentById(owner.getDepartmentId());
                if (currentDepartment != null && currentDepartment.getId().equals(loginUserDepartmentId)) {
                    isSameDepartment = true;
                }
            }
            //http://fridaynight.vnext.vn/issues/3150
            //http://fridaynight.vnext.vn/issues/3240
            boolean canViewToEdit = false; // identify deal can display or not
            boolean canEdit = false; // identify deal can view detail to edit or not
            if (isSameDepartment || isSupporter) { // cung phong ban hoac la phong support
                canViewToEdit = true;
                canEdit = true;
            } else {
                if (isHitSearchOn) { // hit search is on
                    if (isCompletedDesign) {
                        continue;
                    }
                } else { // hit search is off
                    canViewToEdit = true;
                    canEdit = false;
                }
            }

            if (!canViewToEdit)
                continue;

            // add to current list
            dealJson.setData(dealDto);
            dealJson.setEdit(canEdit);

            //1.2 get product
            ProductDto product = sv008ProductService.sv00831GetDefaultProduct(dealDto.getId());
            if (product != null) {
                dealJson.setSelectedProductId(product.getId());
            }

            //1.3 set CustomerName to Deal
            if (dealDto.getCustomerId() != null) {
                CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
                dealJson.setCustomerName(customerDto.getName());
            }
            //1.4 set SaleName to Deal
            if (dealDto.getSalesId() != null) {
                UserDto sale = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
                dealJson.setSaleName(sale.getUsername());
            }
            //1.5 set images
            List<DealFileDto> dealFileDtos = sv003DealService.sv00313GetDealFileByDealId(dealId);
            List<String> filepath = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(dealFileDtos)) {
                for (DealFileDto dealFileDto : dealFileDtos) {
                    filepath.add(dealFileDto.getDealFileName());
                }
            }
            //1.6 set file image deal
            dealJson.setFilePath(filepath);

            // add deal's products information if exist
            List<ProductDto> orderList = sv008ProductService.sv00832GetProductsOrderByUpdatedDate(dealId, false,
                                                                                                  Enums.Status.HIGHLIGHT_FLAG_OFF.getStatus());

            //1.7 get list product
            List<SF00202_ProductJson> productJsons = Lists.newArrayList();
            for (ProductDto productDto : safe(orderList)) {
                //set SF00202_ProductJson
                SF00202_ProductJson productJson = new SF00202_ProductJson();

                productJson.setData(productDto);

                MstPaperJson mstPaperJson = new MstPaperJson();
                if (productDto.getPaperId() != null) {
                    MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(productDto.getPaperId(), productDto.getSheetSizeId());
                    // parse mst paper
                    if (mstPaperDto != null)
                        mstPaperJson.setData(mstPaperDto);

                    productJson.setPaper(mstPaperJson);
                }

                ProductFileDto productFileDto = sv008ProductService
                        .sv00829GetPrimaryProductFile(productDto.getId());

                if (productFileDto != null) {
                    FileDto fileDto = fileService.sv00609GetFileInfo(productFileDto.getFileId());
                    productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
                    productJson.setOriginalName(productFileDto.getOriginalName());
                }

                // get wooden data
                if (productDto.getWoodenCode() != null) {
                    MstWoodenDto woodenDto = sv011WoodenService.sv01102GetMstWoodenByCode(productDto.getWoodenCode());

                    if (woodenDto != null) {
                        productJson.setWoodenExpiredDate(woodenDto.getWoodenExpiredDate());
                        productJson.setWoodenTotalNumber(woodenDto.getWoodenTotalNumber());
                    }
                }

                //set Lot+Estimated Unit Price
                DealProductDto dealProductDto = sv003DealService.sv00302GetDealProductByDealCodeAndProductCode(
                        dealDto.getDealCode(), productDto.getProductCode());
                if (dealProductDto != null) {
                    ProductOutputDto productOutputDto = sv008ProductService.sv00827GetProductOutPutSelected(
                            dealProductDto.getId());
                    if (productOutputDto != null) {
                        productJson.setLot(productOutputDto.getLot());
                        productJson.setEstimatedUnitPrice(productOutputDto.getEstimatedUnitPrice());
                    }
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
            //1.8.set ProductJsons
            dealJson.setProducts(productJsons);

            List<OrderItemDto> orderItemDtos = sv009OrderService.sv00901GetOrderItemByDealId(dealId);
            List<OrderItemJson> orderItemJsons = new ArrayList<>();
            if (CollectionUtil.isNotEmpty(orderItemDtos)) {

                for (OrderItemDto orderItemDto : orderItemDtos) {
                    OrderItemJson orderItemJson = new OrderItemJson();
                    orderItemJson.setData(orderItemDto);

                    //set orderItem
                    if (orderItemDto.getOrderId() != null) {
                        OrderDto orderDto = sv009OrderService.sv00902GetOrderById(orderItemDto.getOrderId());
                        orderItemJson.setUpdatedDate(orderDto.getUpdatedDate());
                    }

                    orderItemJsons.add(orderItemJson);
                }
            }

            //set orderItemJson
            dealJson.setOrderItems(orderItemJsons);
            //set inMyBox
            MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(dealId, getUserId());

            if (myboxItemDto != null) {
                dealJson.setIsInMybox(true);
            } else dealJson.setIsInMybox(false);

            //add deal to response
            dealJsons.add(dealJson);
        }


        //2. result list deal json
        return dealJsons;
    }

}

