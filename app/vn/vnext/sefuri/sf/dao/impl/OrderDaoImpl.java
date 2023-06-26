package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.OrderDao;
import vn.vnext.sefuri.sf.dto.OrderDto;

import javax.persistence.TypedQuery;

/**
 * Created by TungNT on 3/6/2017.
 */
public class OrderDaoImpl extends GenericDaoImpl<OrderDto> implements OrderDao {
    public OrderDaoImpl() {
        super(OrderDto.class);
    }

    @Override
    public OrderDto getOrderByDealId(int dealId) {
        String queryStr = "SELECT o FROM OrderDto o WHERE o.dealId = :id";
        TypedQuery<OrderDto> query = (TypedQuery<OrderDto>) JPA.em().createQuery(queryStr, OrderDto.class)
                .setParameter("id", dealId);

        return getSingleResultOrNull(query);
    }
}
