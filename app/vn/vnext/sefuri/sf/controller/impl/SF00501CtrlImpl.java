package vn.vnext.sefuri.sf.controller.impl;

import com.google.common.base.Strings;
import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00501Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.dto.dao.Procedure002Dto;
import vn.vnext.sefuri.sf.dto.dao.Procedure003Dto;
import vn.vnext.sefuri.sf.dto.dao.Procedure004Dto;
import vn.vnext.sefuri.sf.json.SF00501.model.*;
import vn.vnext.sefuri.sf.json.SF00501.request.SF0050102Req;
import vn.vnext.sefuri.sf.json.SF00501.request.SF0050103Req;
import vn.vnext.sefuri.sf.json.SF00501.response.SF0050101Res;
import vn.vnext.sefuri.sf.json.SF00501.response.SF0050102Res;
import vn.vnext.sefuri.sf.json.SF00501.response.SF0050103Res;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;
import vn.vnext.sefuri.sf.json.core.MstPaperJson;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.util.*;
import java.util.stream.Collectors;

import static vn.vnext.sefuri.sf.util.CollectionUtil.safe;

/**
 * Created by haipt on 3/21/2017.
 */
public class SF00501CtrlImpl extends CommonCtrl implements SF00501Ctrl {

    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV002UserService userService;

    @Inject
    private SV003DealService dealService;

    @Inject
    private SV014DealProductService dealProductService;

    @Inject
    private SV008ProductService productService;

    @Inject
    private SV011WoodenService woodenService;

    @Inject
    private SV009OrderService orderService;

    @Inject
    private SV005CustomerService customerService;

    @Inject
    private SV006FileService fileService;

    @Inject
    private SV019ReportService reportService;

    @Inject
    private SV008ProductService sv008ProductService;

    @Inject
    private SV013MstDataService mstDataService;

    @Override
    public Result sf0050101GetDepartmentList() {

        // 1. get data
        // get sales departments
        List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();

        // get users of sales departments
        List<Integer> departmentIds = departmentDtos.stream().map(BaseDto::getId).collect(Collectors.toList());
        List<UserDto> userDtos = userService.sv00208GetUsersByDepartmentIds(departmentIds);

        // get current time
        DateTime now = DateTime.now();

        // 2. create response
        SF0050101Res res = new SF0050101Res();
        // sales departments
        List<AgentJson> agentJsons = departmentDtos.stream().map(departmentDto -> {
            AgentJson agentJson = new AgentJson();
            agentJson.setId(departmentDto.getId());
            agentJson.setName(departmentDto.getDepartment());
            return agentJson;
        }).collect(Collectors.toList());
        res.setDepartments(agentJsons);
        // users
        List<UserJson> userJsons = userDtos.stream().map(userDto -> {
            UserJson userJson = new UserJson();
            userJson.setId(userDto.getId());
            userJson.setName(userDto.getUsername());
            userJson.setDepartmentId(userDto.getDepartmentId());
            return userJson;
        }).collect(Collectors.toList());
        res.setStaffs(userJsons);
        // now
        res.setNow(now);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050102GetPerformanceData() {
        // A get request data
        // 1. request data
        SF0050102Req req = requestJson(SF0050102Req.class);
        int departmentId = req.getDepartmentId();
        int staffId = req.getStaffId();
        int startYear = req.getStartYear();
        int startMonth = req.getStartMonth();
        int endYear = req.getEndYear();
        int endMonth = req.getEndMonth();
        int customerType = req.getCustomerType();
        int summaryType = req.getSummaryType();
        // 2. calculate financial year/month
        int financialYear;
        if (startMonth < 4) {
            financialYear = startYear - 1;
        } else {
            financialYear = startYear;
        }
        int startFinancialMonth = DateUtil.monthToFinancialMonth(startMonth);
        int endFinancialMonth = DateUtil.monthToFinancialMonth(endMonth);


        // B query data
        // 1. get agents
        List<AgentJson> agentJsons = null;
        if (departmentId == 0) {
            // 1A.1 get all sales department in company
            List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();
            // 1A.2 check if no sales department found
            if (departmentDtos.size() == 0) {
                return responseJson(null, MessageCode.ERR001);
            }
            // 1A.3 convert to json
            agentJsons = departmentDtos.stream().map(dto -> {
                AgentJson json = new AgentJson();
                json.setId(dto.getId());
                json.setName(dto.getDepartment());

                return json;
            }).collect(Collectors.toList());
        } else if (staffId == 0) {
            // 1B.1 get all sales inside department
            List<UserDto> userDtos = userService.sv00205GetUsersByDepartmentId(departmentId);
            // 1B.2 check if no staff found
            if (userDtos.size() == 0) {
                return responseJson(null, MessageCode.ERR001);
            }
            // 1B.3 convert to json
            agentJsons = userDtos.stream().map(dto -> {
                AgentJson json = new AgentJson();
                json.setId(dto.getId());
                json.setName(dto.getUsername());

                return json;
            }).collect(Collectors.toList());
        }

        // 2. get revenue of previous year
        // 2.1 call proc_002
        List<Procedure002Dto> procedure002Dtos = reportService.sv01902CallProc002(financialYear - 1, startFinancialMonth, endFinancialMonth, departmentId, staffId,
                customerType);
        // 2.2 mapping data to json
        Map<Integer, DetailJson> revenueDetails = new HashMap<>();
        procedure002Dtos.forEach(dto -> {
            // 2.2.1 create amount note
            AmountJson amountJson = new AmountJson();
            amountJson.setDate(dto.getMonth());
            amountJson.setProductType(dto.getProductType());
            amountJson.setValue(dto.getRevenue());

            // 2.2.2 add amount to detail
            DetailJson detailJson = revenueDetails.get(dto.getAgentId());
            if (detailJson == null) {
                // create new details
                detailJson = new DetailJson();
                revenueDetails.put(dto.getAgentId(), detailJson);

                detailJson.setId(dto.getAgentId());
                detailJson.setAmounts(new ArrayList<>());
            }
            detailJson.getAmounts().add(amountJson);
        });
        // 2.3 collect revenueJsons
        List<DetailJson> revenueJsons = new ArrayList<>(revenueDetails.values());

        // 3. get orderJsons
        // calc date unit
        int dateUnit = 1;
        if (startMonth == endMonth) {
            dateUnit = 2;
        }
        // 3.1 call proc_003
        List<Procedure003Dto> procedure003Dtos = new ArrayList<>();
        if (summaryType == 1) {
            // 3.1A get shipped deals
            procedure003Dtos = reportService.sv01903CallProc003(financialYear, startFinancialMonth, endFinancialMonth, departmentId, staffId,
                    customerType, summaryType, dateUnit);
        } else {
            // 3.1B get in-progress deals
            DateTime now = DateTime.now();
            int curFYear = DateUtil.getFinancialYear(now);
            int curFMonth = DateUtil.monthToFinancialMonth(now.getMonthOfYear());
            // 3.1B.1 get split month, which start to get in-progress deals
            int splitMonth;
            if (curFYear < financialYear) {
                // get in-progress month from 1st
                splitMonth = 0;
            } else if (curFYear == financialYear) {
                // get progress month from cur month
                splitMonth = curFMonth;
            } else {
                splitMonth = 13;
            }
            // 3.1B.2 get shipped deals for the past
            if (splitMonth > startFinancialMonth) {
                int tmpEFMonth = splitMonth;
                if (tmpEFMonth > endFinancialMonth) {
                    tmpEFMonth = endFinancialMonth;
                }
                List<Procedure003Dto> pastDeals = reportService.sv01903CallProc003(financialYear, startFinancialMonth, tmpEFMonth, departmentId, staffId,
                        customerType, 1, dateUnit);
                procedure003Dtos.addAll(pastDeals);
            }
            // 3.1B.3 get in-progress deals from now
            if (splitMonth <= endFinancialMonth) {
                int tmpSFMonth = splitMonth;
                if (tmpSFMonth < startFinancialMonth) {
                    tmpSFMonth = startFinancialMonth;
                }
                List<Procedure003Dto> futureDeals = reportService.sv01903CallProc003(financialYear, tmpSFMonth, endFinancialMonth, departmentId, staffId,
                        customerType, 2, dateUnit);
                procedure003Dtos.addAll(futureDeals);
            }
        }
        // 3.2 mapping data to json
        Map<Integer, DetailJson> orderDetails = new HashMap<>();
        procedure003Dtos.forEach(dto -> {
            // 3.2.1 create amount note
            AmountJson amountJson = new AmountJson();
            amountJson.setDate(dto.getDate());
            amountJson.setProductType(dto.getProductType());
            amountJson.setValue(dto.getTotal());

            // 3.2.2 add amount to detail
            DetailJson detailJson = orderDetails.get(dto.getAgentId());
            if (detailJson == null) {
                // create new details
                detailJson = new DetailJson();
                orderDetails.put(dto.getAgentId(), detailJson);

                detailJson.setId(dto.getAgentId());
                detailJson.setAmounts(new ArrayList<>());
            }
            detailJson.getAmounts().add(amountJson);
        });
        // 3.3 collect orderJsons
        List<DetailJson> orderJsons = new ArrayList<>(orderDetails.values());

        // 4. get goal
        // 4.1 call proc_004
        List<Procedure004Dto> procedure004Dtos = reportService.sv01904CallProc004(financialYear, startFinancialMonth, endFinancialMonth, departmentId, staffId, customerType);
        // 4.2 convert to json
        List<AmountJson> goalAmounts = procedure004Dtos.stream().map(dto -> {
            AmountJson amountJson = new AmountJson();
            amountJson.setDate(dto.getMonth());
            amountJson.setValue(dto.getGoal());

            return amountJson;
        }).collect(Collectors.toList());
        DetailJson goalJson = new DetailJson();
        goalJson.setAmounts(goalAmounts);

        // C create response data
        SF0050102Res res = new SF0050102Res();
        // 1. agents
        res.setAgents(agentJsons);
        // 2. revenue
        res.setRevenues(revenueJsons);
        // 3. order
        res.setOrders(orderJsons);
        // 4. goal
        res.setGoal(goalJson);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050103GetMonthDeals() {
        // A get request data
        SF0050103Req req = requestJson(SF0050103Req.class);
        int staffId = req.getStaffId();
        int year = req.getYear();
        int month = req.getMonth();
        int customerType = req.getCustomerType();
        int summaryType = req.getSummaryType();

        // B query deal Id
        List<Integer> dealIds = reportService.sv01905CallProc005(year, month, staffId, customerType, summaryType);
        List<DealJson> dealJsons = new ArrayList<>();
        List<SF00501_ProductJson> productJsons = new ArrayList<>();

        // C get deal data
        if (CollectionUtil.isNotEmpty(dealIds)) {
            List<DealDto> dealDtos = dealService.sv00326FilterExistingDealById(dealIds);
            for (DealDto dealDto : safe(dealDtos)) {
                DealJson dealJson = new DealJson();
                dealJson.setData(dealDto);

                ProductDto product = sv008ProductService.sv00831GetDefaultProduct(dealDto.getId());
                if (product != null) {
                    dealJson.setSelectedProductId(product.getId());
                }

                // 1.set CustomerName to Deal
                if (dealDto.getCustomerId() != null) {
                    CustomerDto customerDto = customerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
                    dealJson.setCustomerName(customerDto.getName());
                } else if (!Strings.isNullOrEmpty(dealDto.getCustomerName())) {
                    dealJson.setCustomerName(dealDto.getCustomerName());
                }
                //2.set SaleName to Deal
                if (dealDto.getSalesId() != null) {

                    UserDto sale = userService.sv00204GetUserById(dealDto.getSalesId());

                    if (sale != null && sale.getDepartmentId() != null) {
                        DepartmentDto departmentDto = departmentService.sv01509GetDepartmentById(sale.getDepartmentId());
                        if (departmentDto != null) {
                            dealJson.setSaleName(sale.getUsername() + "/" + departmentDto.getDepartment());
                        }
                    }
                }

                //3.set productIds to Deal
                List<ProductDto> productDtos = productService.sv00828GetProductsByDealIds(Collections.singletonList(dealDto.getId()));
                List<Integer> productIds = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(productDtos)) {
                    for (ProductDto productDto : productDtos) {
                        productIds.add(productDto.getId());
                    }
                }
                dealJson.setProductIds(productIds);

                //4.set OrderItems to Deal
                final Integer dealId = dealDto.getId();
                List<OrderItemDto> orderItemDtos = orderService.sv00901GetOrderItemByDealId(dealId);
                List<OrderItemJson> orderItemJsons = new ArrayList<>();
                if (CollectionUtil.isNotEmpty(orderItemDtos)) {
                    for (OrderItemDto orderItemDto : orderItemDtos) {
                        OrderItemJson orderItemJson = new OrderItemJson();
                        orderItemJson.setData(orderItemDto);
                        //set orderJson
                        if (orderItemDto.getOrderId() != null) {
                            OrderDto orderDto = orderService.sv00902GetOrderById(orderItemDto.getOrderId());
                            orderItemJson.setUpdatedDate(orderDto.getUpdatedDate());
                        }
                        orderItemJsons.add(orderItemJson);
                    }
                }
                //set orderItemJson
                dealJson.setOrderItems(orderItemJsons);

                // set deal to response
                dealJsons.add(dealJson);

            }
            List<ProductDto> productDtos = productService.sv00828GetProductsByDealIds(dealIds);
            if (CollectionUtil.isNotEmpty(productDtos)) {
                for (ProductDto productDto : productDtos) {
                    SF00501_ProductJson productJson = new SF00501_ProductJson();
                    productJson.setData(productDto);

                    // 0. parse mst paper
                    MstPaperJson mstPaperJson = new MstPaperJson();
                    if (productDto.getPaperId() != null && productDto.getPaperId() != 0) {
                        MstPaperDto mstPaperDto = mstDataService.sv01337GetMstPaperByIdAndSheetSizeId(productDto.getPaperId(), productDto.getSheetSizeId());
                        if (mstPaperDto != null)
                            mstPaperJson.setData(mstPaperDto);

                        productJson.setPaper(mstPaperJson);
                    }

                    ProductFileDto productFileDto = sv008ProductService
                            .sv00829GetPrimaryProductFile(productDto.getId());

                    if (productFileDto != null) {
                        FileDto fileDto = fileService.sv00609GetFileInfo(productFileDto.getFileId());
                        if (fileDto != null) {
                            productJson.setSrcImg(fileService.sv00618GetThumbnail(fileDto));
                            productJson.setOriginalName(productFileDto.getOriginalName());
                        }
                    }

                    // get woorden data
                    if (productDto.getWoodenCode() != null) {
                        MstWoodenDto woodenDto = woodenService.sv01102GetMstWoodenByCode(productDto
                                .getWoodenCode());

                        if (woodenDto != null) {
                            productJson.setWoodenExpiredDate(woodenDto.getWoodenExpiredDate());
                            productJson.setWoodenTotalNumber(woodenDto.getWoodenTotalNumber());
                        }
                    }
                    //set Lot+Estimated Unit Price
                    List<DealProductDto> dealProductDtos = dealProductService.sv01404GetDealProductsByProductId(productDto.getId());
                    if (CollectionUtil.isNotEmpty(dealProductDtos)) {
                        ProductOutputDto productOutputDto = productService.sv00827GetProductOutPutSelected
                                (dealProductDtos.get(0).getId());
                        if (productOutputDto != null) {
                            productJson.setLot(productOutputDto.getLot());
                            productJson.setEstimatedUnitPrice(productOutputDto.getEstimatedUnitPrice());
                        }

                        //set quantity Stock
                        //26-Apr-17: replace check 'dennoProductCode' by 'itemCode'
                        if (productDto.getItemCode() != null) {
                            CurrentStockDto currentStockDto = orderService.sv00904GetCurrentStock(productDto.getItemCode());
                            if (currentStockDto != null) {
                                productJson.setQuantityStock(currentStockDto.getTotal());
                            }
                        }
                    }
                    productJsons.add(productJson);
                }
            }
        }
        // D create response
        SF0050103Res res = new SF0050103Res();
        res.setDeals(dealJsons);
        res.setProductJsons(productJsons);

        //12 get mst lamination
        List<MstLaminationDto> laminationDtos = mstDataService.sv01332GetMasterLamination();
        if (CollectionUtil.isNotEmpty(laminationDtos)) {
            List<MstLaminationJson> laminationJsons = laminationDtos.stream().map(lamination -> {
                MstLaminationJson mstJson = new MstLaminationJson();

                mstJson.setData(lamination);

                return mstJson;
            }).collect(Collectors.toList());

            res.setLaminations(laminationJsons);
        }

        return responseJson(res, MessageCode.SF00501.INF001);
    }
}
