package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.ProcedureDao;
import vn.vnext.sefuri.sf.dto.dao.*;
import vn.vnext.sefuri.sf.service.SV019ReportService;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 28/03/2017.
 */
public class SV019ReportServiceImpl implements SV019ReportService {
    @Inject
    private ProcedureDao procedureDao;

    @Override
    public List<Procedure001Dto> sv01901CallProc001(int startYear, int startMonth, int departmentId) {
        return procedureDao.callProc001(startYear, startMonth, departmentId);
    }

    @Override
    public List<Procedure002Dto> sv01902CallProc002(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType) {
        return procedureDao.callProc002(financialYear, startFinancialMonth, endFinancialMonth, departmentId, userId, customerType);
    }

    @Override
    public List<Procedure003Dto> sv01903CallProc003(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType,
                                                    int summaryType, int dateUnit) {
        return procedureDao.callProc003(financialYear, startFinancialMonth, endFinancialMonth, departmentId, userId, customerType, summaryType, dateUnit);
    }

    @Override
    public List<Procedure004Dto> sv01904CallProc004(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType) {
        return procedureDao.callProc004(financialYear, startFinancialMonth, endFinancialMonth, departmentId, userId, customerType);
    }

    @Override
    public List<Integer> sv01905CallProc005(int year, int month, int userId, int customerType, int summaryType) {
        return procedureDao.callProc005(year, month, userId, customerType, summaryType);
    }

    @Override
    public Procedure006Dto sv01906CallProc006(int financialYear, int financialMonth, int listLimit) {
        return procedureDao.callProc006(financialYear, financialMonth, listLimit);
    }

    @Override
    public BigDecimal sv01907GetRevenueByPicID(Integer picId, String startTime, String endTime) {
        return procedureDao.getRevenueByPicID(picId, startTime, endTime);
    }

    @Override
    public BigDecimal sv01908GetNewCustomerReceipts(Integer picId, String startTime, String endTime) {
        return procedureDao.getNewCustomerReceipts(picId, startTime, endTime);
    }

    @Override
    public BigDecimal sv01909GetDepartmentReceipts(Integer departmentId, String startTime, String endTime) {
        if (departmentId == 0) {
            return procedureDao.getDepartmentAllReceipts(startTime, endTime);
        } else  {
            return procedureDao.getDepartmentReceipts(departmentId, startTime, endTime);
        }
    }

    @Override
    public BigDecimal sv01910GetDepartmentReceiptsWithNewCustomer(Integer departmentId, String startTime, String endTime) {
        return procedureDao.getDepartmentReceiptsWithNewCustomer(departmentId, startTime, endTime);
    }

    @Override
    public BigDecimal sv01911GetDigitalDeal(Integer departmentID, Integer picID, String startTime, String endTime) {
        return procedureDao.findDigitalDeal(departmentID, picID, startTime, endTime);
    }
}
