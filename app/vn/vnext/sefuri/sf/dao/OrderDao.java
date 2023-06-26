package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.OrderDaoImpl;
import vn.vnext.sefuri.sf.dto.OrderDto;

/**
 * Created by TungNT on 3/6/2017.
 */
@ImplementedBy(OrderDaoImpl.class)
public interface OrderDao extends GenericDao<OrderDto> {
    OrderDto getOrderByDealId(int dealId);
}
