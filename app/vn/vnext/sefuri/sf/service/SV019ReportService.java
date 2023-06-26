package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.dao.*;
import vn.vnext.sefuri.sf.service.impl.SV019ReportServiceImpl;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 28/03/2017.
 */
@ImplementedBy(SV019ReportServiceImpl.class)
public interface SV019ReportService {
    List<Procedure001Dto> sv01901CallProc001(int startYear, int startMonth, int departmentId);

    List<Procedure002Dto> sv01902CallProc002(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType);

    List<Procedure003Dto> sv01903CallProc003(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType,
                                             int summaryType, int dateUnit);

    List<Procedure004Dto> sv01904CallProc004(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType);

    List<Integer> sv01905CallProc005(int year, int month, int userId, int customerType, int summaryType);

    Procedure006Dto sv01906CallProc006(int financialYear, int financialMonth, int listLimit);

    BigDecimal sv01907GetRevenueByPicID(Integer picId, String startTime, String endTime);

    BigDecimal sv01908GetNewCustomerReceipts(Integer picId, String startTime, String endTime);

    BigDecimal sv01909GetDepartmentReceipts(Integer departmentId, String startTime, String endTime);

    BigDecimal sv01910GetDepartmentReceiptsWithNewCustomer(Integer departmentId, String startTime, String endTime);

    BigDecimal sv01911GetDigitalDeal(Integer departmentID, Integer picID, String startTime, String endTime);
}
