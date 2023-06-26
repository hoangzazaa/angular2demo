package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ProcedureDaoImpl;
import vn.vnext.sefuri.sf.dto.dao.*;

import java.math.BigDecimal;
import java.util.List;

/**
 * Dao to use sql procedures
 */
@ImplementedBy(ProcedureDaoImpl.class)
public interface ProcedureDao {

    /**
     * call proc_001: get revenue by year, month and departmentId
     *
     * @param startYear
     * @param startMonth
     * @param departmentId
     * @return
     */
    List<Procedure001Dto> callProc001(int startYear, int startMonth, int departmentId);

    /**
     * call proc_002: get revenue by financial year, start-end financial month of department, user with customer type
     *
     * @param financialYear
     * @param startFinancialMonth
     * @param endFinancialMonth
     * @param departmentId
     * @param userId
     * @param customerType
     * @return
     */
    List<Procedure002Dto> callProc002(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType);

    /**
     * call proc_003: get deal by financialYear, start-end financial month of department, user with customer type and summary type
     *
     * @param financialYear
     * @param startFinancialMonth
     * @param endFinancialMonth
     * @param departmentId
     * @param userId
     * @param customerType        1,2,3
     * @param summaryType         1,2
     * @param dateUnit            0,1
     * @return
     */
    List<Procedure003Dto> callProc003(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType, int summaryType, int dateUnit);

    /**
     * call proc_004: get goal by financialYear, start-end financial month of department, user with customer type
     *
     * @param financialYear
     * @param startFinancialMonth
     * @param endFinancialMonth
     * @param departmentId
     * @param userId
     * @param customerType
     * @return
     */
    List<Procedure004Dto> callProc004(int financialYear, int startFinancialMonth, int endFinancialMonth, int departmentId, int userId, int customerType);

    /**
     * call proc_005: get deal ids by year, start-end month of user with customer type and summary type
     *
     * @param year
     * @param month
     * @param userId
     * @param customerType
     * @param summaryType
     * @return
     */
    List<Integer> callProc005(int year, int month, int userId, int customerType, int summaryType);

    /**
     * call proc_006: get top difference revenue/prediction for 3 years of company
     *
     * @param financialYear
     * @param financialMonth
     * @return
     */
    Procedure006Dto callProc006(int financialYear, int financialMonth, int listLimit);

    BigDecimal getRevenueByPicID(Integer picId, String startDate, String endDate);

    BigDecimal getNewCustomerReceipts(Integer picId, String startDate, String endDate);

    BigDecimal getDepartmentAllReceipts(String startTime, String endTime);

    BigDecimal getDepartmentReceipts(Integer departmentId, String startTime, String endTime);

    BigDecimal getDepartmentReceiptsWithNewCustomer(Integer departmentId, String startTime, String endTime);

    BigDecimal findDigitalDeal(Integer departmentId, Integer picId, String startTime, String endTime);
}
