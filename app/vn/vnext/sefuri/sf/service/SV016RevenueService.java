package vn.vnext.sefuri.sf.service;

import java.util.List;

import org.joda.time.DateTime;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dto.CustomerDataDto;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import vn.vnext.sefuri.sf.dto.SalerDataDto;
import vn.vnext.sefuri.sf.service.impl.SV016RevenueServiceImpl;

/**
 * Created by DungTQ on 2/14/2017.
 */
@ImplementedBy(SV016RevenueServiceImpl.class)
public interface SV016RevenueService {

    List<SalerDataDto> sv001601GetSalerData(String startDate, String endDate, Integer departmentId, Integer year);

    /**
     * 指定年度の売上実績を取得する。
     *
     * finalcialYear年3月1日 〜 finalcialYear+1年2月末日 までの売上を取得します。
     *
     * 注: CustomerDataDto.year は常に finalcialYear が設定されます。(実際の日付に一致しないことに注意)
     * <pre>
     * 例: finalcialYear=2017 で取得すると、
     *   照会期間: 2017/3/1 〜 2018/2/28
     *   以下のようなデータが返却される。(順序不定)
     *
     *   year   month   実際の集計期間
     *   -------------------------------------------------------------
     *   2017   4       2017/4/1 〜 2017/4/30    2017年度 4月の売上実績
     *   2017   5       2017/5/1 〜 2017/5/31    2017年度 5月の売上実績
     *   ...
     *   2017   12      2017/12/1 〜 2017/12/31  2017年度 12月の売上実績
     *   2017   1       2018/1/1 〜 2018/1/31    2017年度 1月の売上実績
     *   2017   2       2018/2/1 〜 2018/2/28    2017年度 2月の売上実績
     *   2017   3       2017/3/1 〜 2017/3/31    2016年度 3月の売上実績  ← 注意
     * </pre>
     *
     * @param departmentId 部門 ID
     * @param finalcialYear 年度
     * @return 売上実績のリスト (順序不定)
     */
    List<CustomerDataDto> sv001602GetCustomerData(Integer departmentId, Integer finalcialYear);

    List<RevenueDto> sv001603GetRevenuesByCustomer(int customerId, int limit);

    List<RevenueDto> sv001604GetRevenuesByCustomer(int customerId, String keyword, DateTime startDate, DateTime endDate);
}
