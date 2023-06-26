package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.collect.Lists;
import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.*;
import vn.vnext.sefuri.sf.controller.SF00100Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00100.model.*;
import vn.vnext.sefuri.sf.json.SF00100.request.SF0010002Req;
import vn.vnext.sefuri.sf.json.SF00100.request.SF0010003Req;
import vn.vnext.sefuri.sf.json.SF00100.request.SF0010004Req;
import vn.vnext.sefuri.sf.json.SF00100.response.SF0010001Res;
import vn.vnext.sefuri.sf.json.SF00100.response.SF0010002Res;
import vn.vnext.sefuri.sf.json.SF00100.response.SF0010003Res;
import vn.vnext.sefuri.sf.json.common.ActivityJson;
import vn.vnext.sefuri.sf.json.core.DepartmentJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.json.core.UserJson;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safe;

/**
 * Created by DungTQ on 6/5/2017.
 */

public class SF00100CtrlImpl extends CommonCtrl implements SF00100Ctrl {
    private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    @Inject
    private SV015DepartmentService sv015DepartmentService;
    @Inject
    private SV002UserService sv002UserService;
    @Inject
    private SV005CustomerService sv005CustomerService;
    @Inject
    private SV019ReportService sv019ReportService;
    @Inject
    private SV009OrderService sv009OrderService;
    @Inject
    private SV020UserGoalService sv020UserGoalService;
    @Inject
    private SV003DealService sv003DealService;
    @Inject
    private SV008ProductService sv008ProductService;
    @Inject
    private SV013MstDataService sv013MstDataService;
    @Inject
    private SV006FileService fileService;
    @Inject
    private SV011WoodenService sv011WoodenService;
    @Inject
    private SV007MyboxService sv007MyboxService;
    @Inject
    private SV013MstDataService mstDataService;

    @Override
    public Result sf0010001GetDepartment() {
        // 1.0 Get all department
        List<DepartmentDto> departmentDtos = sv015DepartmentService.sv01510FindAllSaleDept();
        List<DepartmentJson> departmentJsons = getDepartmentJsonList(departmentDtos);

        // 2.0 Response to client
        SF0010001Res sf0010001Res = new SF0010001Res();
        sf0010001Res.setDepartments(departmentJsons);

        List<DealJson> dealJsons = Lists.newArrayList();
        UserDto currentUser = sv002UserService.sv00204GetUserById(getUserId());
        List<DealDto> dealDtos = sv003DealService.sv00336GetDealInProcess(currentUser.getId(), currentUser
                .getDepartmentId(), Constants.ZERO, Constants.PAGE_SIZE);
        if (CollectionUtil.isNotEmpty(dealDtos)) {
            dealJsons = this.getDealJsons(dealDtos);
        }
        sf0010001Res.setInprogressDeals(dealJsons);
        long totalRecord = sv003DealService.sv00337CountDealInProcess(currentUser.getId(), currentUser.getDepartmentId());
        sf0010001Res.setTotalRecords(totalRecord);

        //3 get mst lamination
        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();
                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());
            sf0010001Res.setLaminationJsons(laminationJsons);
        }

        //4 get date system
        DateTime now = DateTime.now();
        sf0010001Res.setSystemDate(now.toString());

        return responseJson(sf0010001Res, MessageCode.SF00100.INF001);
    }

    @Override
    public Result sf0010002GetTab1Data() {
        SF0010002Req sf0010002Req = requestJson(SF0010002Req.class);
        // 1.0 Get request data
        Integer depId = sf0010002Req.getDepartmentID();
        Integer picId = sf0010002Req.getPicId();
        Integer timeFilter = sf0010002Req.getTimeFilter();

        SF0010002Res sf0010002Res = new SF0010002Res();

        // 2.0 All company with depId code == 99
        ChartDataJson data;
        DateTime now = DateTime.now();
        Integer financialYear = DateUtil.getFinancialYear(now);

        String startTime;
        String endTime;
        Integer currentYear = now.getYear();
        if (financialYear.equals(currentYear)) {
            startTime = currentYear + "-4-1 00:00:00";
            endTime = (currentYear + 1) + "-3-31 23:59:59";
        } else {
            startTime = financialYear + "-4-1 00:00:00";
            endTime = currentYear + "-3-31 23:59:59";
        }

        if (picId != 0) {
            // dont care about department -> check time filter
            if (timeFilter == 1) {
                // 2.1 receipts (Doanh thu theo thang lua chon)
                data = buildDataForPicId(now, picId);
                sf0010002Res.setReceipts(data);

            } else if (timeFilter == 2) {
                // previous month
                // 2.1 receipts
                DateTime previousMonth = now.plusMonths(-1);
                data = buildDataForPicId(previousMonth, picId);
                sf0010002Res.setReceipts(data);

            } else {
                // current year
                // 2.1 receipts
                BigDecimal goal = sv005CustomerService
                        .sv00513GetCustomerGoalByPicIDAndYear(DateUtil.getFinancialYear(DateTime.now()), picId);
                data = new ChartDataJson();
                data.setGoal(goal);

                BigDecimal current = sv019ReportService.sv01907GetRevenueByPicID(picId, startTime, endTime);
                data.setCurrent(current);
                sf0010002Res.setReceipts(data);
            }
            // 2.2 newReceipts -- for a year (Doanh thu moi cho 1 nam)
            data = new ChartDataJson();
            BigDecimal goal = sv005CustomerService.sv00516GetNewCustomerGoal(picId, financialYear);
            data.setGoal(goal);

            BigDecimal current = sv019ReportService.sv01908GetNewCustomerReceipts(picId, startTime, endTime);
            data.setCurrent(current);
            sf0010002Res.setNewReceipts(data);

            // 2.3 recordNew (So new Customer tren Deno - nam tai chinh)
            data = new ChartDataJson();
            current = sv009OrderService.sv00905GetNumberOfNewCustomerUsingPicId(picId, startTime, endTime);
            data.setCurrent(current);

            UserGoalDto userGoal = sv020UserGoalService.sv0201FindByPicId(picId, financialYear);
            if (userGoal != null) {
                data.setGoal((userGoal.getNewRecord() == null) ? BigDecimal.ZERO : new BigDecimal(userGoal.getNewRecord()));
            }
            sf0010002Res.setRecordNew(data);

            // 2.4 digitalSale (Nam tai chinh)
            data = new ChartDataJson();
            if (userGoal != null) {
                data.setGoal((userGoal.getDigitalSales() == null) ? BigDecimal.ZERO : new BigDecimal(userGoal.getDigitalSales()));

            }
            current = sv019ReportService.sv01911GetDigitalDeal(null, picId, startTime, endTime);
            data.setCurrent(current);
            sf0010002Res.setDigitalSale(data);

        } else {
            // 3.0 Check department and time filter
            if (timeFilter == 1) {
                // 3.1 current month
                // receipts - Doanh thu
                data = buildDataForDepartment(now, depId);
                sf0010002Res.setReceipts(data);
            } else if (timeFilter == 2) {
                // 3.2 previous month
                // receipts - Doanh thu
                DateTime previousMonth = now.plusMonths(-1);
                data = buildDataForDepartment(previousMonth, depId);
                sf0010002Res.setReceipts(data);

            } else {
                // 3.3 year
                // receipts - Doanh thu
                data = new ChartDataJson();
                BigDecimal goal = sv015DepartmentService.sv01517GetDepartmentGoalByYear(depId, financialYear);
                data.setGoal(goal);

                BigDecimal current = sv019ReportService.sv01909GetDepartmentReceipts(depId, startTime, endTime);
                data.setCurrent(current);
                sf0010002Res.setReceipts(data);
            }

            // 4.0 newReceipts -- for a year (Doanh thu moi cho 1 nam)
            data = new ChartDataJson();
            BigDecimal goal = sv015DepartmentService.sv01519GetDepartmentGoalWithNewCustomer(depId, financialYear);
            data.setGoal(goal);

            BigDecimal current = sv019ReportService.sv01910GetDepartmentReceiptsWithNewCustomer(depId, startTime, endTime);
            data.setCurrent(current);
            sf0010002Res.setNewReceipts(data);

            // 5.0 recordNew (So new Customer tren Deno - nam tai chinh)
            data = new ChartDataJson();
            current = sv009OrderService.sv00906GetNumberOfNewCustomerUsingDepartmentId(depId, startTime, endTime);
            data.setCurrent(current);

            UserGoalDto userGoal = sv020UserGoalService.sv0202FindByDepartmentId(depId, financialYear);
            if (userGoal != null) {
                data.setGoal((userGoal.getNewRecord() == null) ? BigDecimal.ZERO : new BigDecimal(userGoal.getNewRecord()));
            }
            sf0010002Res.setRecordNew(data);

            // 6.0 digitalSale (Nam tai chinh)
            data = new ChartDataJson();
            if (userGoal != null) {
                data.setGoal((userGoal.getDigitalSales() == null) ? BigDecimal.ZERO : new BigDecimal(userGoal.getDigitalSales()));
            }
            current = sv019ReportService.sv01911GetDigitalDeal(depId, null, startTime, endTime);
            data.setCurrent(current);
            sf0010002Res.setDigitalSale(data);
        }

        return responseJson(sf0010002Res, MessageCode.SF00100.INF001);
    }

    @Override
    public Result sf0010003GetTab2Data() {
        SF0010002Req sf0010002Req = requestJson(SF0010002Req.class);
        Integer depId = sf0010002Req.getDepartmentID();
        Integer picId = sf0010002Req.getPicId();
        Integer timeFilter = sf0010002Req.getTimeFilter();

        SF0010003Res sf0010003Res = new SF0010003Res();
        DateTime now = DateTime.now();
        DateTime firstDayOfMonth;
        DateTime lastDayOfMonth;

        if (timeFilter == 1) {
            // current month
            firstDayOfMonth = DateUtil.getFirstDayOfMonth(now);
            lastDayOfMonth = DateUtil.getLastDayOfMonth(now);
        } else if (timeFilter == 2) {
            // previous month
            DateTime previousMonth = now.plusMonths(-1);
            firstDayOfMonth = DateUtil.getFirstDayOfMonth(previousMonth);
            lastDayOfMonth = DateUtil.getLastDayOfMonth(previousMonth);
        } else {
            // this month in previous year
            DateTime previousYear = now.plusMonths(-12);
            firstDayOfMonth = DateUtil.getFirstDayOfMonth(previousYear);
            lastDayOfMonth = DateUtil.getLastDayOfMonth(previousYear);
        }

        List<DealInfoJson> result = sv003DealService.sv003035GetDeal(depId, picId,
                DateUtil.formatDateTime(firstDayOfMonth, DATE_TIME_FORMAT),
                DateUtil.formatDateTime(lastDayOfMonth, DATE_TIME_FORMAT));

        sf0010003Res.setDeals(result);

        return responseJson(sf0010003Res, MessageCode.SF00100.INF001);
    }

    @Override
    public Result sf0010004Save() {
        SF0010004Req sf0010004Req = requestJson(SF0010004Req.class);
        Integer picId = sf0010004Req.getPicId();
        DateTime now = DateTime.now();
        Integer financialYear = DateUtil.getFinancialYear(now);
        if (picId != null && picId != 0) {
            // 1.0 try to find old data
            UserGoalDto userGoalDto = sv020UserGoalService.sv00203FindByPicIdAndYear(picId, financialYear);
            save(userGoalDto, sf0010004Req);
        } else {
            // invalid user
            return responseError(MessageCode.SF00100.ERR001);
        }
        return responseJson(null, MessageCode.SF00100.INF001);
    }

    @Override
    public Result sf0010005GetDeals() {
        SF0010003Req req = requestJson(SF0010003Req.class);

        List<DealJson> dealJsons = Lists.newArrayList();
        List<DealDto> dealDtos = sv003DealService.sv00336GetDealInProcess(
                req.getPicId(), req.getDepartmentId(), req.getIndexFrom(), req.getIndexTo());

        if (CollectionUtil.isNotEmpty(dealDtos)) {
            dealJsons = this.getDealJsons(dealDtos);
        }
        long totalRecord = sv003DealService.sv00337CountDealInProcess(req.getPicId(), req.getDepartmentId());

        SF0010001Res res = new SF0010001Res();
        res.setInprogressDeals(dealJsons);
        res.setTotalRecords(totalRecord);

        return responseJson(res, MessageCode.COM.INF001);
    }

    private void save(UserGoalDto userGoalDto, SF0010004Req sf0010004Req) {
        DateTime now = DateTime.now();
        if (userGoalDto != null) {
            userGoalDto.setUpdatedUser(getUserId());
            userGoalDto.setUpdatedDate(now);
            userGoalDto.setNewRecord(sf0010004Req.getRecordNew());
            userGoalDto.setDigitalSales(sf0010004Req.getDigitalSales());
            userGoalDto.setDepartmentId(sf0010004Req.getDepartmentID());
        } else {
            userGoalDto = new UserGoalDto();
            userGoalDto.setCreatedDate(now);
            userGoalDto.setUpdatedDate(now);
            userGoalDto.setCreatedUser(getUserId());
            userGoalDto.setUpdatedUser(getUserId());
            userGoalDto.setDepartmentId(sf0010004Req.getDepartmentID());
            userGoalDto.setPicId(sf0010004Req.getPicId());
            userGoalDto.setNewRecord(sf0010004Req.getRecordNew());
            userGoalDto.setDigitalSales(sf0010004Req.getDigitalSales());
            userGoalDto.setYear(DateUtil.getFinancialYear(now));
        }
        sv020UserGoalService.sv00204Save(userGoalDto);
    }

    private ChartDataJson buildDataForDepartment(DateTime dateTime, Integer departmentId) {
        ChartDataJson chartDataJson = new ChartDataJson();

        Integer financialYear = DateUtil.getFinancialYear(dateTime);
        BigDecimal goal = sv015DepartmentService
                .sv01518GetDepartmentGoalByYearAndMonth(departmentId, financialYear, dateTime.getMonthOfYear());
        chartDataJson.setGoal(goal);

        DateTime firstDayOfMonth = DateUtil.getFirstDayOfMonth(dateTime);
        DateTime lastDayOfMonth = DateUtil.getLastDayOfMonth(dateTime);
        BigDecimal current = sv019ReportService.sv01909GetDepartmentReceipts(departmentId,
                DateUtil.formatDateTime(firstDayOfMonth, DATE_TIME_FORMAT),
                DateUtil.formatDate(lastDayOfMonth, DATE_TIME_FORMAT));
        chartDataJson.setCurrent(current);
        return chartDataJson;
    }

    private ChartDataJson buildDataForPicId(DateTime dateTime, Integer picId) {

        Integer financialYear = DateUtil.getFinancialYear(dateTime);

        ChartDataJson data = new ChartDataJson();
        // Get customerGoal by picId, year, month
        BigDecimal goal = sv005CustomerService
                .sv00512GetCustomerGoalByPicIDAndYearAndMonth(financialYear, dateTime.getMonthOfYear(), picId);
        data.setGoal(goal);

        // Get current receipts
        DateTime firstDayOfMonth = DateUtil.getFirstDayOfMonth(dateTime);
        DateTime lastDayOfMonth = DateUtil.getLastDayOfMonth(dateTime);
        BigDecimal current = sv019ReportService
                .sv01907GetRevenueByPicID(picId, DateUtil.formatDateTime(firstDayOfMonth, DATE_TIME_FORMAT),
                        DateUtil.formatDateTime(lastDayOfMonth, DATE_TIME_FORMAT));
        data.setCurrent(current);
        return data;
    }

    private List<DepartmentJson> getDepartmentJsonList(List<DepartmentDto> departmentDtos) {
        List<DepartmentJson> departmentJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(departmentDtos)) {
            for (DepartmentDto departmentDto : departmentDtos) {
                DepartmentJson departmentJson = new DepartmentJson();
                departmentJson.setData(departmentDto);
                List<UserDto> userDtos = sv002UserService.sv00205GetUsersByDepartmentId(departmentDto.getId());
                List<UserJson> userJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(userDtos)) {
                    for (UserDto userDto : userDtos) {
                        UserJson userJson = new UserJson();
                        userJson.setData(userDto);
                        userJsons.add(userJson);
                    }
                }
                departmentJson.setUsers(userJsons);
                departmentJsons.add(departmentJson);
            }
        }
        return departmentJsons;
    }

    private List<DealJson> getDealJsons(List<DealDto> dealDtos) {
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
            ProductDto product = sv008ProductService.sv00831GetDefaultProduct(dealId);
            if (product != null) {
                dealJson.setSelectedProductId(product.getId());
            }

            //1.3 set CustomerName to Deal
            if (dealDto.getCustomerId() != null) { // for existing customer selected from system
                CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
                dealJson.setCustomerName(customerDto.getName());
            } else { // for new customer not exist in system
                dealJson.setCustomerName(dealDto.getCustomerName());
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
            List<SF00100_ProductJson> productJsons = Lists.newArrayList();
            for (ProductDto productDto : safe(orderList)) {
                //set SF00100_ProductJson
                SF00100_ProductJson productJson = new SF00100_ProductJson();

                // check paperId other= 100
                productJson.setData(productDto);
                MstPaperJson mstPaperJson = new MstPaperJson();
                if (productDto.getPaperId() != null && productDto.getPaperId() != 0) {
                    MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(productDto.getPaperId(), productDto.getSheetSizeId());
                    // parse mst paper
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
            MyboxItemDto myboxItemDto = sv007MyboxService.sv00703GetMyboxItemByDealId(dealDto.getSalesId(), getUserId());

            if (myboxItemDto != null) {
                dealJson.setIsInMybox(true);
            } else dealJson.setIsInMybox(false);

            //add deal to response
            dealJsons.add(dealJson);

            // fill activities to current deal
            dealJson.setActivity(createActivity(dealId));
        }

        return dealJsons;
    }

    private ActivityJson createActivity(final Integer dealId) {
        CommentDto commentDto = sv003DealService.sv003035GetLatestCommentByDealId(dealId);
        if (commentDto != null) {
            UserDto user = sv002UserService.sv00204GetUserById(commentDto.getUserId());
            DepartmentDto department = sv015DepartmentService.sv01509GetDepartmentById(user.getDepartmentId());
            return CommonService.createActivity(commentDto, user, department);
        }

        return null;
    }

}
