package vn.vnext.sefuri.sf.controller.impl;

import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SFN0506Ctrl;
import vn.vnext.sefuri.sf.dto.BaseDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.json.SFN0506.model.CustomerJson;
import vn.vnext.sefuri.sf.json.SFN0506.model.DepartmentJson;
import vn.vnext.sefuri.sf.json.SFN0506.model.InvoiceJson;
import vn.vnext.sefuri.sf.json.SFN0506.model.UserJson;
import vn.vnext.sefuri.sf.json.SFN0506.request.SFN050602Req;
import vn.vnext.sefuri.sf.json.SFN0506.response.SFN050601Res;
import vn.vnext.sefuri.sf.json.SFN0506.response.SFN050602Res;
import vn.vnext.sefuri.sf.procedure.dto.SFN050602Dto;
import vn.vnext.sefuri.sf.procedure.impl.SFN0506Procedure;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV009OrderService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 7/20/2017.
 */
public class SFN0506CtrlImpl extends CommonCtrl implements SFN0506Ctrl {

    /* const */
    private static final int MAX_RESULT = 100000;

    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV009OrderService orderService;
    @Inject
    private SFN0506Procedure procedure;

    @Override
    public Result sfn050601BaseScreenData() {
        // 1. get data
        // get sales departments
        List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();

        // get users of sales departments
        List<Integer> departmentIds = departmentDtos.stream().map(BaseDto::getId).collect(Collectors.toList());
        List<UserDto> userDtos = userService.sv00208GetUsersByDepartmentIds(departmentIds);

        // 2. create response
        SFN050601Res res = new SFN050601Res();
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
        // now
        res.setNow(DateUtil.getSysDate());

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sfn050602GetPaymentData() {

        // A. get filter
        SFN050602Req req = requestJson(SFN050602Req.class);
        int departmentId = req.getDepartmentId();
        int userId = req.getUserId();
        DateTime startDate = req.getStartDate();
        DateTime endDate = req.getEndDate();
        int dateType = req.getDateType();
        int method = req.getMethod();

        // B. get data
        // 1. count payments
        int hits = procedure.sfn050601CountInvoice(departmentId, userId, startDate, endDate, dateType, method);
        if (hits > MAX_RESULT) {
            return responseError(MessageCode.ERR001);
        }
        // 2. get payment data
        List<SFN050602Dto> sfn050602Dtos = new ArrayList<>();
        if (hits > 0) {
            sfn050602Dtos = procedure.sfn050602GetInvoices(departmentId, userId, startDate, endDate, dateType, method);
        }

        // C. response data
        SFN050602Res res = new SFN050602Res();
        // 1. hits
        res.setHits(sfn050602Dtos.size());
        // 2. result list
        List<InvoiceJson> invoiceJsonList = new ArrayList<>();
        res.setPayments(invoiceJsonList);
        for (SFN050602Dto sfn050602Dto : sfn050602Dtos) {
            InvoiceJson invoiceJson = new InvoiceJson();
            invoiceJsonList.add(invoiceJson);

            invoiceJson.setCode(sfn050602Dto.getCode());
            invoiceJson.setAmount(sfn050602Dto.getAmount());
            invoiceJson.setClosingDate(sfn050602Dto.getBillingDate());
            invoiceJson.setDueDate(sfn050602Dto.getDueDate());
            invoiceJson.setPayDate(sfn050602Dto.getPaymentDate());
            invoiceJson.setMethod(sfn050602Dto.getMethod());

            CustomerJson customerJson = new CustomerJson();
            invoiceJson.setCustomer(customerJson);
            customerJson.setCode(sfn050602Dto.getCustomerCode());
            customerJson.setName(sfn050602Dto.getCustomerName());
        }

        return responseJson(res, MessageCode.INF001);
    }
}
