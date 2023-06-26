package vn.vnext.sefuri.sf.controller.impl;

import org.joda.time.DateTime;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00502Ctrl;
import vn.vnext.sefuri.sf.dto.CustomerDto;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.PredictionDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.dto.dao.Procedure001Dto;
import vn.vnext.sefuri.sf.dto.dao.Procedure006Dto;
import vn.vnext.sefuri.sf.helper.type.PredictionType;
import vn.vnext.sefuri.sf.json.SF00502.model.*;
import vn.vnext.sefuri.sf.json.SF00502.request.SF0050202Req;
import vn.vnext.sefuri.sf.json.SF00502.request.SF0050203Req;
import vn.vnext.sefuri.sf.json.SF00502.request.SF0050204Req;
import vn.vnext.sefuri.sf.json.SF00502.request.SF0050205Req;
import vn.vnext.sefuri.sf.json.SF00502.response.*;
import vn.vnext.sefuri.sf.service.*;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 3/19/2017.
 */
public class SF00502CtrlImpl extends CommonCtrl implements SF00502Ctrl {

    @Inject
    private SV015DepartmentService departmentService;
    @Inject
    private SV002UserService userService;
    @Inject
    private SV005CustomerService customerService;
    @Inject
    private SV019ReportService reportService;
    @Inject
    private SV018PredictionService predictionService;

    @Override
    public Result sf0050201GetDepartmentList() {

        // 1. get data
        // get sales departments
        List<DepartmentDto> departmentDtos = departmentService.sv01510FindAllSaleDept();

        // get users of sales deparments
        List<Integer> departmentIds = departmentDtos.stream().map(departmentDto -> departmentDto.getId()).collect
                (Collectors.toList());
        List<UserDto> userDtos = userService.sv00208GetUsersByDepartmentIds(departmentIds);

        // get current time
        DateTime now = DateTime.now();

        // 2. create response
        SF0050201Res res = new SF0050201Res();
        // sales departments
        List<DepartmentJson> departmentJsons = departmentDtos.stream().map(departmentDto -> {
            DepartmentJson departmentJson = new DepartmentJson();
            departmentJson.setId(departmentDto.getId());
            departmentJson.setName(departmentDto.getDepartment());
            return departmentJson;
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
        res.setStaffs(userJsons);
        // now
        res.setNow(now);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050202GetDepartmentData() {
        // 1. request data
        SF0050202Req req = requestJson(SF0050202Req.class);
        int departmentId = req.getDepartmentId();
        DateTime currentMonth = req.getCurrentMonth();

        // 2. get data
        // 2.1 get customer by depeartment, include start year
        List<CustomerDto> customerList = customerService.sv00515getCustomersByDepartment01(departmentId);

        // 2.2 get revenue data
        int financialYear = DateUtil.getFinancialYear(currentMonth);
        // get revenue from previous of last year
        int revenueStartYear = financialYear - 2;
        List<Procedure001Dto> revenueData = reportService.sv01901CallProc001(revenueStartYear, Constants.MONTH_FINANCIAL_YEAR_START, departmentId);

        // 2.3 get note data
        // get note data from last year to next year
        DateTime noteStartDate = new DateTime(financialYear - 1, 4, 1, 0, 0);
        DateTime noteEndDate = new DateTime(financialYear + 2, 3, 31, 0, 0);
        List<PredictionDto> predictionDtos = predictionService.sv01801GetPredictions(departmentId, noteStartDate,
                noteEndDate);

        // 3. create response
        SF0050202Res res = new SF0050202Res();
        // 3.1 customers
        List<CustomerJson> customerJsons = customerList.stream().map(customerDto -> {
            CustomerJson customerJson = new CustomerJson();
            customerJson.setId(customerDto.getId());
            customerJson.setName(customerDto.getName());
            customerJson.setCode(customerDto.getCustomerCode());
            customerJson.setPicId(customerDto.getPicUser().getId());
            customerJson.setStartYear(customerDto.getStartYear());
            return customerJson;
        }).collect(Collectors.toList());
        res.setCustomers(customerJsons);
        // 3.2 revenues
        List<RevenueJson> revenueJsons = revenueData.stream().map(dto -> {
            RevenueJson revenueJson = new RevenueJson();
            revenueJson.setYear(dto.getYear());
            revenueJson.setMonth(dto.getMonth());
            revenueJson.setCustomerId(dto.getCustomerId());
            revenueJson.setAmount1(dto.getRevenue1());
            revenueJson.setAmount2(dto.getRevenue2());
            revenueJson.setAmount3(dto.getRevenue3());
            return revenueJson;
        }).collect(Collectors.toList());
        res.setRevenues(revenueJsons);
        // 3.3 predictions
        List<PredictionJson> predictionJsons = predictionDtos.stream().map(dto -> {
            PredictionJson predictionJson = new PredictionJson();
            predictionJson.setId(dto.getId());
            predictionJson.setYear(dto.getYear());
            predictionJson.setMonth(dto.getMonth());
            predictionJson.setAmount1(dto.getType1Goal());
            predictionJson.setAmount2(dto.getType2Goal());
            predictionJson.setAmount3(dto.getType3Goal());
            predictionJson.setCustomerId(dto.getCustomerId());
            predictionJson.setNote(dto.getNote());
            predictionJson.setHead(dto.getHeadFlag());
            return predictionJson;
        }).collect(Collectors.toList());
        res.setPredictions(predictionJsons);

        return responseUsingGzip(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050203SaveNote() {
        // 1. request data
        SF0050203Req req = requestJson(SF0050203Req.class);
        int year = req.getYear();
        int month = req.getMonth();
        List<PredictionJson> notes = req.getNotes();

        // 2. analyze data
        List<PredictionDto> predictionDtos = notes.stream().map(json -> {
            PredictionDto predictionDto = new PredictionDto();
            predictionDto.setYear(year);
            predictionDto.setMonth(month);
            predictionDto.setId(json.getId());
            predictionDto.setCustomerId(json.getCustomerId());
            predictionDto.setNote(json.getNote());
            return predictionDto;
        }).collect(Collectors.toList());

        // 3. do save
        List<PredictionDto> saveNotes = predictionService.sv01802SaveNotes(predictionDtos);

        // 4. create response
        SF0050203Res res = new SF0050203Res();
        List<PredictionJson> predictionJsons = saveNotes.stream().map(predictionDto -> {
            PredictionJson json = new PredictionJson();
            json.setId(predictionDto.getId());
            json.setCustomerId(predictionDto.getCustomerId());
            return json;
        }).collect(Collectors.toList());
        res.setNotes(predictionJsons);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050204SavePrediction() {
        // 1. request data
        SF0050204Req req = requestJson(SF0050204Req.class);
        int year = req.getYear();
        int month = req.getMonth();
        int picId = req.getPicId();
        List<PredictionJson> notes = req.getNotes();

        // 2. analyze data
        List<PredictionDto> updatePredictions = new ArrayList<>();
        List<PredictionJson> removePredictions = new ArrayList<>();
        List<Integer> removePredictionIds = new ArrayList<>();
        for (PredictionJson json : notes) {
            if (json.getDelete() == 1) {
                removePredictionIds.add(json.getId());

                PredictionJson predictionJson = new PredictionJson();
                predictionJson.setId(json.getId());
                predictionJson.setCustomerId(json.getCustomerId());
                removePredictions.add(predictionJson);
            } else {
                PredictionDto predictionDto = new PredictionDto();
                updatePredictions.add(predictionDto);

                predictionDto.setYear(year);
                predictionDto.setMonth(month);

                predictionDto.setId(json.getId());
                predictionDto.setCustomerId(json.getCustomerId());
                predictionDto.setType1Goal(json.getAmount1());
                predictionDto.setType2Goal(json.getAmount2());
                predictionDto.setType3Goal(json.getAmount3());
                predictionDto.setNote(json.getNote());

                // check if must save as head
                if (picId == 0) {
                    predictionDto.setHeadFlag(PredictionType.HeadFlagType.IS_HEAD);
                } else {
                    predictionDto.setHeadFlag(null);
                }
            }
        }

        // 3. do save
        List<PredictionDto> saveNotes = predictionService.sv01803SavePredictions(updatePredictions,
                removePredictionIds);

        // 4. create response
        SF0050204Res res = new SF0050204Res();
        // saved note
        List<PredictionJson> predictionJsons = saveNotes.stream().map(predictionDto -> {
            PredictionJson json = new PredictionJson();
            json.setId(predictionDto.getId());
            json.setCustomerId(predictionDto.getCustomerId());
            return json;
        }).collect(Collectors.toList());
        res.setNotes(predictionJsons);
        // removed note
        res.setRemoveNotes(removePredictions);

        return responseJson(res, MessageCode.INF001);
    }

    @Override
    public Result sf0050205GetCompanyData() {
        // 1. request data
        SF0050205Req req = requestJson(SF0050205Req.class);
        DateTime currentMonth = req.getCurrentMonth();
        int financialYear = DateUtil.getFinancialYear(currentMonth);
        int financialMonth = DateUtil.monthToFinancialMonth(currentMonth.getMonthOfYear());

        // 2. get data
        // 2.1 get top revenue/prediction diff for each month and summary
        Procedure006Dto procedure006Dto = reportService.sv01906CallProc006(financialYear, financialMonth, 10);

        // 2.2 get customer info for display list
        Set<Integer> customerIds = new HashSet<>();
        procedure006Dto.getProcedure00601DtoList().forEach(dto -> {
            customerIds.add(dto.getCustomerId());
        });
        List<CustomerDto> customers = customerService.getCustomerByIds(customerIds);

        // 3. create response
        SF0050205Res res = new SF0050205Res();
        // 3.1 customers
        List<CustomerJson> customerJsons = customers.stream().map(dto -> {
            CustomerJson json = new CustomerJson();
            json.setId(dto.getId());
            json.setCode(dto.getCustomerCode());
            json.setName(dto.getName());

            return json;
        }).collect(Collectors.toList());
        res.setCustomers(customerJsons);
        // 3.2 notes
        List<CompanyNoteJson> noteJsons = procedure006Dto.getProcedure00601DtoList().stream().map(dto -> {
            CompanyNoteJson json = new CompanyNoteJson();
            json.setYear(dto.getYear());
            json.setMonth(dto.getMonth());
            json.setCustomerId(dto.getCustomerId());
            json.setOldAmount1(dto.getOldAmount1());
            json.setOldAmount2(dto.getOldAmount2());
            json.setOldAmount3(dto.getOldAmount3());
            json.setNewAmount1(dto.getNewAmount1());
            json.setNewAmount2(dto.getNewAmount2());
            json.setNewAmount3(dto.getNewAmount3());
            json.setNote(dto.getNote());

            return json;
        }).collect(Collectors.toList());
        res.setNotes(noteJsons);
        // 3.3 summaryJsons
        List<CompanyNoteJson> summaryJsons = procedure006Dto.getProcedure00602DtoList().stream().map(dto -> {
            CompanyNoteJson json = new CompanyNoteJson();
            json.setYear(dto.getYear());
            json.setMonth(dto.getMonth());
            json.setOldAmount1(dto.getOldAmount1());
            json.setOldAmount2(dto.getOldAmount2());
            json.setOldAmount3(dto.getOldAmount3());
            json.setNewAmount1(dto.getNewAmount1());
            json.setNewAmount2(dto.getNewAmount2());
            json.setNewAmount3(dto.getNewAmount3());

            return json;
        }).collect(Collectors.toList());
        res.setSummaries(summaryJsons);

        return responseUsingGzip(res, MessageCode.INF001);
    }
}
