package vn.vnext.sefuri.sf.controller.impl;

import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0505Ctrl;
import vn.vnext.sefuri.sf.dto.BaseDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SFN0505.model.*;
import vn.vnext.sefuri.sf.json.SFN0505.request.SFN050502Req;
import vn.vnext.sefuri.sf.json.SFN0505.response.SFN050501Res;
import vn.vnext.sefuri.sf.json.SFN0505.response.SFN050502Res;
import vn.vnext.sefuri.sf.procedure.dto.SFN050502Dto;
import vn.vnext.sefuri.sf.procedure.impl.SFN0505Procedure;
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
public class SFN0505CtrlImpl extends CommonCtrl implements SFN0505Ctrl {

    /* const */
    private static final int MAX_RESULT = 100000;

    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV009OrderService orderService;
    @Inject
    private SFN0505Procedure procedure;

    @Override
    public Result sfn050501BaseScreenData() {
        // 1. get data
        // get sales departments
        List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();

        // get users of sales departments
        List<Integer> departmentIds = departmentDtos.stream().map(BaseDto::getId).collect(Collectors.toList());
        List<UserDto> userDtos = userService.sv00208GetUsersByDepartmentIds(departmentIds);

        // 2. create response
        SFN050501Res res = new SFN050501Res();
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
    public Result sfn050502GetShippingData() {

        // A. get filter
        SFN050502Req req = requestJson(SFN050502Req.class);
        int departmentId = req.getDepartmentId();
        int userId = req.getUserId();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();

        // B. get data
        // 1. count shipping plans
        int hits = procedure.sfn050501CountShipping(departmentId, userId, startDate, endDate);
        if (hits > MAX_RESULT) {
            return responseError(MessageCode.ERR001);
        }
        // 2. get shiping data
        List<SFN050502Dto> sfn050502Dtos = new ArrayList<>();
        if (hits > 0) {
            sfn050502Dtos = procedure.sfn050502GetShippings(departmentId, userId, startDate, endDate);
        }

        // C. response data
        SFN050502Res res = new SFN050502Res();
        // 1. hits
        res.setHits(sfn050502Dtos.size());
        // 2. result list
        List<ShippingJson> shippingJsonList = new ArrayList<>();
        res.setShippings(shippingJsonList);
        for (SFN050502Dto sfn050502Dto : sfn050502Dtos) {
            ShippingJson shippingJson = new ShippingJson();
            shippingJsonList.add(shippingJson);

            shippingJson.setId(sfn050502Dto.getPlanId());
            shippingJson.setPlanQuantity(sfn050502Dto.getPlanQuantity());
            shippingJson.setActualQuantity(sfn050502Dto.getActualQuantity());
            shippingJson.setShippingDate(sfn050502Dto.getPlanDate());

            DealJson dealJson = new DealJson();
            shippingJson.setDeal(dealJson);
            dealJson.setCode(sfn050502Dto.getDealCode());
            dealJson.setRestriction(sfn050502Dto.getRestriction());

            CustomerJson customerJson = new CustomerJson();
            dealJson.setCustomer(customerJson);
            customerJson.setCode(sfn050502Dto.getCustomerCode());
            customerJson.setName(sfn050502Dto.getCustomerName());

            ProductJson productJson = new ProductJson();
            shippingJson.setProduct(productJson);
            productJson.setCode(sfn050502Dto.getProductCode());
            productJson.setName(sfn050502Dto.getProductName());
            productJson.setType(sfn050502Dto.getProductType());
            productJson.setShapeId(sfn050502Dto.getProductShapeId());
            productJson.setCartonShippingType(sfn050502Dto.getCartonShippingType());
        }

        return responseUsingGzip(res, MessageCode.INF001);
    }
}
