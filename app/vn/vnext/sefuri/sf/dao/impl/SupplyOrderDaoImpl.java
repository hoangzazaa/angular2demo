package vn.vnext.sefuri.sf.dao.impl;

import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.SupplyOrderDao;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;
import vn.vnext.sefuri.sf.util.StringUtil;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Teddy on 8/25/2017.
 */
public class SupplyOrderDaoImpl extends GenericDaoImpl<SupplyOrderDto> implements SupplyOrderDao {

    public SupplyOrderDaoImpl() {
        super(SupplyOrderDto.class);
    }

    @Override
    public List<SupplyOrderDto> getSupplyOrders(int supplierId, int limit, String keyword, DateTime startDay, DateTime endDay) {
        // prepare query
        String queryStr = "SELECT s, p, d FROM SupplyOrderDto s" +
                " JOIN OrderItemDto oi ON oi.id = s.orderItemId" +
                " JOIN ProductDto p ON p.id = oi.productId" +
                " JOIN OrderDto o ON o.id = oi.orderId" +
                " JOIN DealDto d ON d.id = o.dealId" +
                " WHERE p.supplierId = :supplierId";
        // filter keyword
        if (!StringUtils.isEmpty(keyword)) {
            // 製品名、案件名、受注コード、品目C、製品番号
            queryStr += "   AND (p.productName LIKE :keyword OR d.dealName LIKE :keyword OR oi.orderCode lIKE :keyword OR p.itemCode LIKE :keyword OR p.productCode LIKE :keyword)";
        }
        // filter start day
        if (startDay != null) {
            queryStr += "   AND s.createdDate >= :startDay";
        }
        // filter end day
        if (endDay != null) {
            queryStr += "   AND s.createdDate < :endDay";
        }
        queryStr += " ORDER BY s.createdDate DESC";

        Query query = JPA.em().createQuery(queryStr).setParameter("supplierId", supplierId);
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

        List<SupplyOrderDto> supplyDtoList = new ArrayList<>();
        for (Object[] objects : resultList) {
            SupplyOrderDto supplyDto = (SupplyOrderDto) objects[0];
            supplyDtoList.add(supplyDto);

            OrderItemDto orderItemDto = new OrderItemDto();
            supplyDto.setOrderItemDto(orderItemDto);

            ProductDto productDto = (ProductDto) objects[1];
            orderItemDto.setProductDto(productDto);

            DealDto dealDto = (DealDto) objects[2];
            orderItemDto.setDealDto(dealDto);
        }

        return supplyDtoList;
    }
}
