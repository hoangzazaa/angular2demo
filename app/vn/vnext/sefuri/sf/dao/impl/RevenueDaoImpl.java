package vn.vnext.sefuri.sf.dao.impl;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.RevenueDao;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.RevenueDto;
import vn.vnext.sefuri.sf.util.StringUtil;

import javax.persistence.ParameterMode;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by DungTQ on 1/3/2017.
 */
public class RevenueDaoImpl extends GenericDaoImpl<RevenueDto> implements RevenueDao {
    public RevenueDaoImpl() {
        super(RevenueDto.class);
    }

    @Override
    public List<Object[]> getRevenues(String startDate, String endDate, Integer departmentId) {
        StoredProcedureQuery query = JPA.em().createStoredProcedureQuery("PROC_SF0050301");
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("departmentId", Integer.class, ParameterMode.IN);
        query.setParameter("startDate", startDate);
        query.setParameter("endDate", endDate);
        query.setParameter("departmentId", departmentId);
        query.execute();
        return query.getResultList();

        /*
DELIMITER ;;
CREATE PROCEDURE `PROC_SF0050301`(IN startDate VARCHAR(20), IN endDate VARCHAR(20), IN agentId INT)
BEGIN
    SELECT
      year,
      month,
      product_type,
      SUM(sales_amount)
    FROM (
           SELECT
             YEAR(r.invoice_sales_date)        year,
             MONTH(r.invoice_sales_date)       month,
             r.denno_customer_code             customer_code,
             r.product_type                    product_type,
             SUM(r.sales_amount) sales_amount
           FROM `sfr_sf_revenue` r
             INNER JOIN `sfr_sf_customer` c ON c.customer_code = r.denno_customer_code
             INNER JOIN `sfr_sf_user` u ON u.user_code = c.pic_code
           WHERE (DATE(r.invoice_sales_date) BETWEEN DATE(startDate) AND DATE(endDate))
                 AND u.department_id = agentId
                 AND r.product_type IS NOT NULL
           GROUP BY year, month, r.product_type, r.denno_customer_code
         ) tmp
    GROUP BY year, month, product_type;
  END;;
DELIMITER ;
         */
    }

    @Override
    public List<Object[]> getRevenuesByPicAndDepartmentInTime(String startDate, String endDate, Integer departmentId) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0050302")
                .registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN)
                .registerStoredProcedureParameter("departmentId", Integer.class, ParameterMode.IN)
                .setParameter("startDate", startDate)
                .setParameter("endDate", endDate)
                .setParameter("departmentId", departmentId);
        query.execute();
        return query.getResultList();
    }

    @Override
    public List<RevenueDto> getCustomerRevenues(int customerId, int limit, String keyword, DateTime startDay, DateTime endDay) {
        // prepare query
        String queryStr = "SELECT r, p, d FROM RevenueDto r" +
                " JOIN OrderItemDto oi ON oi.orderCode = r.orderCode" +
                " JOIN ProductDto p ON p.id = oi.productId" +
                " JOIN OrderDto o ON o.id = oi.orderId" +
                " JOIN DealDto d ON d.id = o.dealId" +
                " WHERE NULLIF(r.orderCode, '') IS NOT NULL" +
                "   AND d.customerId = :customerId";
        // filter keyword
        if (!StringUtils.isEmpty(keyword)) {
            // 製品名、案件名、受注コード、品目C
            queryStr += "   AND (p.productName LIKE :keyword OR d.dealName LIKE :keyword OR oi.orderCode lIKE :keyword OR p.itemCode LIKE :keyword)";
        }
        // filter start day
        if (startDay != null) {
            queryStr += "   AND r.invoiceSalesDate >= :startDay";
        }
        // filter end day
        if (endDay != null) {
            queryStr += "   AND r.invoiceSalesDate < :endDay";
        }
        queryStr += " ORDER BY r.invoiceSalesDate DESC";

        Query query = JPA.em().createQuery(queryStr).setParameter("customerId", customerId);
        // param keyword
        if (!StringUtils.isEmpty(keyword)) {
            String kw = "%" + StringUtil.escapeMysqlLikeQuery(keyword) + "%";
            query.setParameter("keyword", kw);
        }
        // param start day
        if (startDay != null) {
            query.setParameter("startDay", startDay);
        }
        // param end day
        if (endDay != null) {
            query.setParameter("endDay", endDay);
        }
        // limit
        if (limit > 0) {
            query.setMaxResults(limit);
        }

        // execute
        List<Object[]> resultList = query.getResultList();

        List<RevenueDto> revenueDtoList = new ArrayList<>();
        for (Object[] objects : resultList) {
            RevenueDto revenueDto = (RevenueDto) objects[0];
            revenueDtoList.add(revenueDto);

            OrderItemDto orderItemDto = new OrderItemDto();
            revenueDto.setOrderItemDto(orderItemDto);

            ProductDto productDto = (ProductDto) objects[1];
            orderItemDto.setProductDto(productDto);

            DealDto dealDto = (DealDto) objects[2];
            orderItemDto.setDealDto(dealDto);
        }

        return revenueDtoList;
    }
}
