package vn.vnext.sefuri.sf.service.impl;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.joda.time.DateTime;

import com.google.inject.Inject;

import vn.vnext.sefuri.sf.dao.ProcedureDao;
import vn.vnext.sefuri.sf.dao.RevenueDao;
import vn.vnext.sefuri.sf.dto.CustomerDataDto;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import vn.vnext.sefuri.sf.dto.SalerDataDto;
import vn.vnext.sefuri.sf.service.SV016RevenueService;
import vn.vnext.sefuri.sf.util.DateUtil;

/**
 * Created by DungTQ on 2/14/2017.
 */
public class SV016RevenueServiceImpl implements SV016RevenueService {
    @Inject
    private RevenueDao revenueDao;
    @Inject
    private ProcedureDao procedureDao;

    @Override
    public List<SalerDataDto> sv001601GetSalerData(String startDate, String endDate, Integer departmentId, Integer
            year) {
        List<Object[]> objects = revenueDao.getRevenues(startDate, endDate, departmentId);

        List<SalerDataDto> salerDataDtos = new ArrayList<>();
        for (Object[] obj : objects) {
            SalerDataDto salerDataDto = new SalerDataDto();
            salerDataDto.setYear(year);
            salerDataDto.setMonth(Integer.valueOf(obj[1].toString()));
            salerDataDto.setProductType((Integer) obj[2]);
            salerDataDto.setTotalMoney(new BigDecimal(obj[3].toString()));
            salerDataDtos.add(salerDataDto);
        }
        return salerDataDtos;
    }

    @Override
    public List<CustomerDataDto> sv001602GetCustomerData(Integer departmentId, Integer finalcialYear) {

        DateTime firstDate = new DateTime(finalcialYear, 4, 1, 0, 0, 0);
        DateTime lastFebruaryDate = DateUtil.getLastDayOfMonth(new DateTime(finalcialYear + 1, 2, 1, 0, 0, 0));

        // 検索する三月の年度情報を設定
        DateTime now = DateTime.now();
        Integer currentFinancialYear = now.getMonthOfYear() < 4 ? now.minusYears(1).getYear() : now.getYear();
        Integer searchMarchYear = currentFinancialYear.equals(finalcialYear) ? finalcialYear : finalcialYear + 1;

        // 三月の情報を取得
        DateTime startMarchDate = new DateTime(searchMarchYear, 3, 1, 0, 0, 0);
        DateTime endMarchDate = DateUtil.getLastDayOfMonth(startMarchDate);

        // Get data
        List<CustomerDataDto> customerDataDtos = new ArrayList<>();
        customerDataDtos.addAll(this.getCustomerData(departmentId, finalcialYear, firstDate, lastFebruaryDate));
        customerDataDtos.addAll(this.getCustomerData(departmentId, finalcialYear, startMarchDate, endMarchDate));
        return customerDataDtos;
    }

    /**
     * ある部門のある年度の売上実績を照会する。
     *
     * @param departmentId 部門 ID
     * @param finalcialYear 年度
     * @param firstDay 開始日時(含む)
     * @param lastDay 終了日時(含む)
     * @return 売上実績のリスト
     */
    private List<CustomerDataDto> getCustomerData(Integer departmentId, Integer finalcialYear, DateTime firstDay, DateTime lastDay) {

        String format = "yyyy-MM-dd HH:mm:SS";

        // Get data
        String startDate = DateUtil.formatDate(firstDay, format);
        String endDate = DateUtil.formatDate(lastDay, format);
        List<Object[]> objects = revenueDao
                .getRevenuesByPicAndDepartmentInTime(startDate, endDate, departmentId);
        List<CustomerDataDto> customerDataDtos = new ArrayList<>();
        for (Object[] object : objects) {
            CustomerDataDto customerDataDto = new CustomerDataDto();
            customerDataDto.setMonth(Integer.valueOf(object[1].toString()));
            customerDataDto.setYear(finalcialYear);
            customerDataDto.setProductType(Integer.valueOf(object[2].toString()));
            customerDataDto.setCustomerId(Integer.valueOf(object[3].toString()));
            customerDataDto.setTotalMoney(new BigDecimal(object[4].toString()));
            customerDataDto.setNumberOfOrder(Integer.valueOf(object[5].toString()));

            customerDataDtos.add(customerDataDto);
        }

        return customerDataDtos;
    }


    @Override
    public List<RevenueDto> sv001603GetRevenuesByCustomer(int customerId, int limit) {
        List<RevenueDto> revenues = revenueDao.getCustomerRevenues(customerId, limit, null, null, null);
        return revenues;
    }

    @Override
    public List<RevenueDto> sv001604GetRevenuesByCustomer(int customerId, String keyword, DateTime startDate, DateTime endDate) {
        // analyze date
        DateTime startDay = null;
        if (startDate != null) {
            startDay = startDate.withTimeAtStartOfDay();
        }
        DateTime endDay = null;
        if (endDate != null) {
            endDay = endDate.withTimeAtStartOfDay().plusDays(1);
        }

        List<RevenueDto> revenues = revenueDao.getCustomerRevenues(customerId, 0, keyword, startDay, endDay);
        return revenues;
    }
}
