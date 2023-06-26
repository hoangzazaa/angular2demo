package vn.vnext.sefuri.sf.dao.impl;

import org.joda.time.DateTime;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.InventoryDao;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;

import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Teddy on 7/20/2017.
 */
public class InventoryDaoImpl extends GenericDaoImpl<InventoryDto> implements InventoryDao {
    public InventoryDaoImpl() {
        super(InventoryDto.class);
    }

    @Override
    public List<InventoryDto> getCustomerInventory(int customerId, int limit, Integer deposit, DateTime limitDate) {
        // prepare query
        String queryStr = "SELECT i, oi, p, d FROM InventoryDto i" +
                " JOIN OrderItemDto oi ON oi.id = i.orderItemId" +
                " JOIN ProductDto p ON p.id = oi.productId" +
                " JOIN OrderDto o ON o.id = oi.orderId" +
                " JOIN DealDto d ON d.id = o.dealId" +
                " WHERE i.inoutFlag = 0 AND i.completeFlag = 0" +
                "   AND d.customerId = :customerId";
        if (deposit != null) {
            if (deposit == 0) {
                queryStr += "   AND oi.deposit IS NULL";
            } else if (deposit == 1) {
                queryStr += "   AND oi.deposit = 1";
            }
        }
        if (limitDate != null) {
            queryStr += "   AND i.registrationDate < :limitDate";
        }
        queryStr += " ORDER BY i.registrationDate ASC";
        Query query = JPA.em().createQuery(queryStr).setParameter("customerId", customerId);
        if (limitDate != null) {
            query.setParameter("limitDate", limitDate);
        }
        if (limit > 0) {
            query.setMaxResults(limit);
        }
        // execute
        List<Object[]> resultList = query.getResultList();

        List<InventoryDto> inventoryDtoList = new ArrayList<>();
        for (Object[] objects : resultList) {
            InventoryDto inventoryDto = (InventoryDto) objects[0];
            inventoryDtoList.add(inventoryDto);

            OrderItemDto orderItemDto = (OrderItemDto) objects[1];
            inventoryDto.setOrderItemDto(orderItemDto);

            ProductDto productDto = (ProductDto) objects[2];
            orderItemDto.setProductDto(productDto);

            DealDto dealDto = (DealDto) objects[3];
            orderItemDto.setDealDto(dealDto);
        }

        return inventoryDtoList;
    }
}
