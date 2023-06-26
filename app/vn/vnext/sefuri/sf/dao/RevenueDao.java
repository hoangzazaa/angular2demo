package vn.vnext.sefuri.sf.dao;

import java.util.List;

import org.joda.time.DateTime;

import com.google.inject.ImplementedBy;

import vn.vnext.sefuri.sf.dao.impl.RevenueDaoImpl;
import vn.vnext.sefuri.sf.dto.RevenueDto;

/**
 * Created by DungTQ on 1/3/2017.
 */
@ImplementedBy(RevenueDaoImpl.class)
public interface RevenueDao extends GenericDao<RevenueDto> {
    List<Object[]> getRevenues(String startDate, String endDate, Integer departmentId);

    /**
     * 指定期間の売上を照会する
     *
     * @param startDate 取得開始日時 (含む) 時刻は無視されます
     * @param endDate 取得終了日時 (含む) 時刻は無視されます
     * @param departmentId 部門 ID (sfr_sf_department.id)
     * @return 結果のリスト
     * <pre>
     * 各要素(Object[]) は
     * index    name            type            意味
     * -----------------------------------------------------------------------------
     * 0        year            Integer         請求年
     * 1        month           Integer         請求月(1-12)
     * 2        product_type    Integer         製品種別 (0: 段ボール, 1: 紙器, 2: 商事)
     * 3        customerId      Integer         得意先 ID (sfr_sf_customer.id)
     * 4        sales_amount    BigDecimal      売上金額
     * 5        sales_counts    Integer         注文件数
     * </pre>
     */
    List<Object[]> getRevenuesByPicAndDepartmentInTime(String startDate, String endDate, Integer departmentId);

    List<RevenueDto> getCustomerRevenues(int customerId, int limit, String keyword, DateTime startDay, DateTime endDay);
}
