package vn.vnext.sefuri.sf.dao.impl;


import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.joda.time.DateTime;
import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.OrderItemDao;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.dao.ProductInfoDto1;
import vn.vnext.sefuri.sf.util.StringUtil;

import javax.persistence.ParameterMode;
import javax.persistence.Query;
import javax.persistence.StoredProcedureQuery;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by TungNT on 3/6/2017.
 */
public class OrderItemDaoImpl extends GenericDaoImpl<OrderItemDto> implements OrderItemDao {
    public OrderItemDaoImpl() {
        super(OrderItemDto.class);
    }


    /**
     * {@inheritDoc}
     */
    @Override
    public List<OrderItemDto> getOrderItemsByDealId(Integer dealId) {
        return JPA.em().createQuery("select oi from OrderItemDto oi " +
                "INNER JOIN OrderDto o ON o.id=oi.orderId " +
                "INNER JOIN DealDto deal ON deal.id=o.dealId" +
                " WHERE deal.id=:dealId", OrderItemDto.class)
                .setParameter("dealId", dealId)
                .getResultList();
    }

    @Override
    public BigDecimal getNumberOfNewCustomerUsingPicId(Integer picId, String startTime, String endTime) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010006");
        query.registerStoredProcedureParameter("picId", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("picId", picId);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal re = new BigDecimal(String.valueOf(result));
        return re.setScale(0, RoundingMode.HALF_UP);
    }

    @Override
    public BigDecimal getNumberOfNewCustomerUsingDepartmentId(Integer departmentId, String startTime, String endTime) {
        StoredProcedureQuery query = JPA.em()
                .createStoredProcedureQuery("PROC_SF0010005");
        query.registerStoredProcedureParameter("department", int.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("startDate", String.class, ParameterMode.IN);
        query.registerStoredProcedureParameter("endDate", String.class, ParameterMode.IN);
        query.setParameter("department", departmentId);
        query.setParameter("startDate", startTime);
        query.setParameter("endDate", endTime);
        query.execute();

        Object result = query.getSingleResult();
        if (result == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal re = new BigDecimal(String.valueOf(result));
        return re.setScale(0, RoundingMode.HALF_UP);
    }

    @Override
    public List<ProductInfoDto1> getOrderItemProductForDashboard(Integer picId, Integer dealId) {
        List<Object[]> resultList = JPA.em().createQuery("select re.productType, re.salesNumber, re.salesUnitPrice, re.salesAmount" +
                " from RevenueDto re " +
                " INNER JOIN OrderItemDto OI ON re.orderCode = OI.orderCode" +
                " INNER JOIN OrderDto o ON OI.orderId = o.id " +
                " INNER JOIN DealDto d ON o.dealId = d.id " +
                " INNER JOIN UserDto u ON d.salesId = u.id" +
                " WHERE d.id=:dealId" +
                " AND u.id=:picId")
                .setParameter("dealId", dealId)
                .setParameter("picId", picId)
                .getResultList();
        return mapObjectToDealProduct(resultList);
    }

    @Override
    public OrderItemDto getOrderItemByOrderIdAndProductId(Integer orderId, Integer productId) {
        return JPA.em().createQuery("SELECT orderItem " +
                "FROM OrderItemDto orderItem " +
                "WHERE orderItem.orderId =:orderId AND orderItem.productId =:productId", OrderItemDto.class)
                .setParameter("orderId", orderId)
                .setParameter("productId", productId)
                .getSingleResult();
    }

    @Override
    public List<OrderItemDto> getOrderItemsByProductId(Integer productId) {
        return JPA.em().createQuery("SELECT orderItem " +
                "FROM OrderItemDto orderItem " +
                "WHERE orderItem.productId =:productId " +
                "order by orderItem.createdDate asc"
                , OrderItemDto.class)
                .setParameter("productId", productId).getResultList();
    }

    @Override
    public List<OrderItemDto> getCustomerOrderItems(int customerId, int limit, String keyword, DateTime startDay, DateTime endDay) {
        // prepare query
        String queryStr = "SELECT oi.submittedPrice, oi.quantity, COUNT(oi.id), p, mw1, mw2 FROM OrderItemDto oi" +
                " JOIN ProductDto p ON p.id = oi.productId" +
                " JOIN OrderDto o ON o.id = oi.orderId" +
                " JOIN DealDto d ON d.id = o.dealId" +
                " LEFT JOIN MstWoodenDto mw1 ON NULLIF(mw1.woodenCode, '') IS NOT NULL AND mw1.woodenCode = p.woodenCode" +
                " LEFT JOIN MstWoodenDto mw2 ON NULLIF(mw2.woodenCode, '') IS NOT NULL AND mw2.woodenCode = p.woodenCode2" +
                " WHERE d.customerId = :customerId";

        // filter keyword
        if (!StringUtils.isEmpty(keyword)) {
            // 製品名、受注コード、品目C
            queryStr += "   AND (p.productName LIKE :keyword OR oi.orderCode lIKE :keyword OR p.itemCode LIKE :keyword)";
        }
        // filter start day
        if (startDay != null) {
            queryStr += "   AND d.deliveryDate >= :startDay";
        }
        // filter end day
        if (endDay != null) {
            queryStr += "   AND d.deliveryDate < :endDay";
        }

        queryStr += " GROUP BY oi.productId, oi.quantity, oi.submittedPrice" +
                " ORDER BY mw1.lastUse ASC, mw2.lastUse ASC,(oi.quantity * COUNT(oi.id)) DESC";
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

        // deal query str
        String dealQueryStr = "SELECT d FROM OrderItemDto oi" +
                " JOIN OrderDto o ON o.id = oi.orderId" +
                " JOIN DealDto d ON d.id = o.dealId" +
                " WHERE oi.productId = :productId" +
                "   AND oi.quantity = :quantity" +
                "   AND oi.submittedPrice = :price" +
                " ORDER BY oi.createdDate DESC";

        List<OrderItemDto> orderItemDtoList = new ArrayList<>();
        for (Object[] objects : resultList) {
            OrderItemDto orderItemDto = new OrderItemDto();
            orderItemDtoList.add(orderItemDto);

            BigDecimal price = (BigDecimal) objects[0];
            orderItemDto.setSubmittedPrice(price);

            int quantity = NumberUtils.toInt(String.valueOf(objects[1]));
            int repeat = NumberUtils.toInt(String.valueOf(objects[2]));
            int totalQuantity = quantity * repeat;
            orderItemDto.setQuantity(totalQuantity);

            BigDecimal total = price.multiply(BigDecimal.valueOf(totalQuantity));
            orderItemDto.setTotal(total);

            ProductDto productDto = (ProductDto) objects[3];
            orderItemDto.setProductDto(productDto);

            MstWoodenDto woodenDto = (MstWoodenDto) objects[4];
            productDto.setMstWoodenDto(woodenDto);

            MstWoodenDto woodenDto2 = (MstWoodenDto) objects[5];
            productDto.setMstWoodenDto2(woodenDto2);

            // get last deal for order
            TypedQuery<DealDto> dealQuery = JPA.em().createQuery(dealQueryStr, DealDto.class)
                    .setParameter("productId", productDto.getId())
                    .setParameter("quantity", quantity)
                    .setParameter("price", price)
                    .setMaxResults(1);
            List<DealDto> dealResults = dealQuery.getResultList();
            if (!dealResults.isEmpty()) {
                orderItemDto.setDealDto(dealResults.get(0));
            }
        }

        return orderItemDtoList;
    }

    private List<ProductInfoDto1> mapObjectToDealProduct(List<Object[]> resultList) {
        List<ProductInfoDto1> infoDtoList = resultList.stream().map(objects -> {
            ProductInfoDto1 infoDto1 = new ProductInfoDto1();
            infoDto1.setProductType((Integer) objects[0]);
            infoDto1.setNumberOfOrder((Integer) objects[1]);
            infoDto1.setUnitPrice((Integer) objects[2]);
            infoDto1.setAmountOfMoney((BigDecimal) objects[3]);
            return infoDto1;
        }).collect(Collectors.toList());
        return infoDtoList;
    }
}
