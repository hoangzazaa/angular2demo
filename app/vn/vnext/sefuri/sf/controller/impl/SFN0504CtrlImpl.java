package vn.vnext.sefuri.sf.controller.impl;

import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0504Ctrl;
import vn.vnext.sefuri.sf.dto.BaseDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SFN0504.model.DepartmentJson;
import vn.vnext.sefuri.sf.json.SFN0504.model.StockJson;
import vn.vnext.sefuri.sf.json.SFN0504.model.UserJson;
import vn.vnext.sefuri.sf.json.SFN0504.request.SFN050402Req;
import vn.vnext.sefuri.sf.json.SFN0504.response.SFN050401Res;
import vn.vnext.sefuri.sf.json.SFN0504.response.SFN050402Res;
import vn.vnext.sefuri.sf.procedure.dto.SFN050402Dto;
import vn.vnext.sefuri.sf.procedure.impl.SFN0504Procedure;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 7/20/2017.
 */
public class SFN0504CtrlImpl extends CommonCtrl implements SFN0504Ctrl {

    /* const */
    private static final int MAX_RESULT = 100000;

    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV009OrderService orderService;
    @Inject
    private SFN0504Procedure procedure;

    @Override
    public Result sfn050401BaseScreenData() {
        // 1. get data
        // get sales departments
        List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();

        // get users of sales departments
        List<Integer> departmentIds = departmentDtos.stream().map(BaseDto::getId).collect(Collectors.toList());
        List<UserDto> userDtos = userService.sv00208GetUsersByDepartmentIds(departmentIds);

        // 2. create response
        SFN050401Res res = new SFN050401Res();
        // sales departments
        List<DepartmentJson> departmentJsons = departmentDtos.stream().map(departmentDto -> {
            DepartmentJson depatmentJson = new DepartmentJson();
            depatmentJson.setId(departmentDto.getId());
            depatmentJson.setName(departmentDto.getDepartment());
            return depatmentJson;
        }).collect(Collectors.toList());
        res.setDepartments(departmentJsons);
        // users
        List<UserJson> userJsons = userDtos.stream().map(userDto -> {
            UserJson userJson = new UserJson();
            userJson.setId(userDto.getId());
            userJson.setName(userDto.getUsername());
            userJson.setDepartmentId(userDto.getDepartmentId());
            return userJson;
        }).collect(Collectors.toList());
        res.setUsers(userJsons);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn050402GetStockData() {

        // A. get filter
        SFN050402Req req = requestJson(SFN050402Req.class);
        // department
        int departmentId = req.getDepartmentId();
        // user
        int userId = req.getUserId();
        // stock day
        int stockDays = req.getStockDays();
        int dayLimit = 0;
        if (stockDays == 1) {
            dayLimit = 30;
        } else if (stockDays == 2) {
            dayLimit = 90;
        } else if (stockDays == 3) {
            dayLimit = 120;
        }
        // stock type
        int stockType = req.getStockType();

        // B. query data
        // 1. count data
        int hits = procedure.sfn050401CountStock(departmentId, userId, dayLimit, stockType);
        if (hits > MAX_RESULT) {
            return responseJson(null, MessageCode.ERR001);
        }
        // 2. get data
        List<SFN050402Dto> sfn050402Dtos = procedure.sfn050402GetStocks(departmentId, userId, dayLimit, stockType);

        // C. response data
        SFN050402Res res = new SFN050402Res();
        // 1. hits
        res.setHits(sfn050402Dtos.size());
        // 2. result list
        List<StockJson> stockJsonList = new ArrayList<>();
        res.setStocks(stockJsonList);
        for (SFN050402Dto sfn050402Dto : sfn050402Dtos) {
            StockJson stockJson = new StockJson();
            stockJsonList.add(stockJson);

            // stock id
            stockJson.setId(sfn050402Dto.getId());
            // stock type
            if (sfn050402Dto.getType() == 0) {
                stockJson.setType(1);
            } else {
                stockJson.setType(2);
            }
            // customer
            stockJson.setCustomerName(sfn050402Dto.getCustomerName());
            stockJson.setCustomerCode(sfn050402Dto.getCustomerCode());
            // deal
            stockJson.setDealCode(sfn050402Dto.getDealCode());
            // product
            stockJson.setProductCode(sfn050402Dto.getProductCode());
            stockJson.setProductName(sfn050402Dto.getProductName());
            stockJson.setProductType(sfn050402Dto.getProductType());
            stockJson.setProductShapeId(sfn050402Dto.getProductShapeId());
            stockJson.setCartonShippingType(sfn050402Dto.getCartonShippingType());
            // quantity
            stockJson.setQuantity(sfn050402Dto.getQuantity());
            // unitPrice
            stockJson.setUnitPrice(sfn050402Dto.getUnitPrice());
            // total
            stockJson.setTotal(sfn050402Dto.getTotal());
            // storage
            stockJson.setManufactureDate(sfn050402Dto.getManufactureDate());
            stockJson.setStorageDays(sfn050402Dto.getStorageDays());
        }

        return responseUsingGzip(res, MessageCode.INF001);
    }
}