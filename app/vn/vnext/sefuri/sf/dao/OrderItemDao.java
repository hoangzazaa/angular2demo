package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.impl.OrderItemDaoImpl;
import vn.vnext.sefuri.sf.dto.OrderItemDto;
import vn.vnext.sefuri.sf.dto.dao.ProductInfoDto1;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 3/6/2017.
 */
@ImplementedBy(OrderItemDaoImpl.class)
public interface OrderItemDao extends GenericDao<OrderItemDto> {
    /**
     * get List OrderItem by dealId
     * @param dealId
     * @return list {@link OrderItemDto}
     */
    List<OrderItemDto> getOrderItemsByDealId(Integer dealId);

    BigDecimal getNumberOfNewCustomerUsingPicId(Integer picId, String startTime, String endTime);

    BigDecimal getNumberOfNewCustomerUsingDepartmentId(Integer departmentId, String startTime, String endTime);

    /**
     * get List ProductInfoDto1 for SF001
     * @author nguyenpk
     */

    List<ProductInfoDto1> getOrderItemProductForDashboard(Integer picId, Integer dealId);

    OrderItemDto getOrderItemByOrderIdAndProductId(Integer orderId, Integer productId);

    List<OrderItemDto> getOrderItemsByProductId(Integer productId);

    List<OrderItemDto> getCustomerOrderItems(int customerId, int limit, String keyword, DateTime startDay, DateTime endDay);
}
