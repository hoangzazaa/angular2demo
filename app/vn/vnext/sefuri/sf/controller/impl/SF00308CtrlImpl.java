package vn.vnext.sefuri.sf.controller.impl;

import com.google.inject.Inject;
import play.mvc.Result;
import vn.vnext.sefuri.sf.common.CommonCtrl;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.common.MessageCode;
import vn.vnext.sefuri.sf.controller.SF00308Ctrl;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.json.SF00308.model.AnswerJson;
import vn.vnext.sefuri.sf.json.SF00308.request.SF0030802Req;
import vn.vnext.sefuri.sf.json.SF00308.response.SF0030801Res;
import vn.vnext.sefuri.sf.json.SF00308.response.SF0030802Res;
import vn.vnext.sefuri.sf.service.SV002UserService;
import vn.vnext.sefuri.sf.service.SV003DealService;
import vn.vnext.sefuri.sf.service.SV005CustomerService;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;
import vn.vnext.sefuri.sf.util.CollectionUtil;
import vn.vnext.sefuri.sf.util.DateUtil;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by TungNT on 16/03/2017.
 */
public class SF00308CtrlImpl extends CommonCtrl implements SF00308Ctrl {
    @Inject
    private SV003DealService sv003DealService;

    @Inject
    private SV005CustomerService sv005CustomerService;

    @Inject
    private SV002UserService sv002UserService;

    @Inject
    private SV015DepartmentService sv015DepartmentService;

    @Override
    public Result sf0030801Init(String dealCode) {
        SF0030801Res sf0030801Res = new SF0030801Res();
        DealDto dealDto = sv003DealService.sv00306GetDealByDealCode(dealCode);
        if (dealDto == null) {
            return responseError(MessageCode.SF00308.ERR001);
        }
        sf0030801Res.setDealId(dealDto.getId());
        sf0030801Res.setDealCode(dealDto.getDealCode());
        sf0030801Res.setDealName(dealDto.getDealName());
        sf0030801Res.setDealType(dealDto.getDealType());
        sf0030801Res.setDeliveryDate(dealDto.getDeliveryDate());
        sf0030801Res.setEstTotalDeal(dealDto.getEstTotalDeal());
        sf0030801Res.setDealStatus(dealDto.getDealStatus());
        sf0030801Res.setTemplateFlag(dealDto.getTemplateFlag());
        sf0030801Res.setClosedFlag(dealDto.getClosedFlag());
        //set CustomerId+CustomerName
        if (dealDto.getCustomerId() != null) {
            CustomerDto customerDto = sv005CustomerService.sv00501GetCustomerByCustomerId(dealDto.getCustomerId());
            if (customerDto != null) {
                sf0030801Res.setCustomerId(customerDto.getCustomerCode());
                sf0030801Res.setCustomerName(customerDto.getName());
            }
        }else{
            sf0030801Res.setCustomerName(dealDto.getCustomerName());
        }
        //set saleName
        if (dealDto.getSalesId() != null) {
            UserDto sale = sv002UserService.sv00204GetUserById(dealDto.getSalesId());
            if (sale != null) {
                if (sale.getDepartmentId() != null) {
                    DepartmentDto departmentDto = sv015DepartmentService.sv01509GetDepartmentById(sale.getDepartmentId());
                    if (departmentDto != null) {
                        sf0030801Res.setSaleName(sale.getUsername() + Constants.SLASH_JP + departmentDto.getDepartment());
                    }
                }
            }
        }
        //set checksheetJson to dealJson
        List<ChecksheetDto> checksheetDtos = sv003DealService.sv00326GetCheckSheetsByDealId(dealDto.getId());
        List<AnswerJson> answerJsons = new ArrayList<>();
        if (CollectionUtil.isNotEmpty(checksheetDtos)) {
            for (ChecksheetDto checksheetDto : checksheetDtos) {
                AnswerJson answerJson = new AnswerJson();
                answerJson.setData(checksheetDto);
                answerJsons.add(answerJson);

            }
        }

        sf0030801Res.setAnswerJsons(answerJsons);
        return responseJson(sf0030801Res, MessageCode.SF00308.INF001);
    }

    @Override
    public Result sf0030802Save() {
        SF0030802Req sf0030802Req = requestJson(SF0030802Req.class);
        List<AnswerJson> checkSheetJsons = sf0030802Req.getCheckSheetJsons();
        if (CollectionUtil.isNotEmpty(checkSheetJsons)) {
            for (AnswerJson checkSheetJson : checkSheetJsons) {
                ChecksheetDto checksheetDto = checkSheetJson.getData();
                checksheetDto.setUpdatedUser(getUserId());
                checksheetDto.setUpdatedDate(DateUtil.getSysDate());
                sv003DealService.sv00327SaveCheckSheet(checksheetDto);

                checkSheetJson.setData(checksheetDto);
            }
        }

        SF0030802Res sf0030802Res = new SF0030802Res();
        sf0030802Res.setCheckSheetJsons(checkSheetJsons);
        return responseJson(sf0030802Res, MessageCode.SF00308.INF001);
    }
}
