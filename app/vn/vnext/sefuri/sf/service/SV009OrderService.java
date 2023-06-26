package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.service.impl.SV009OrderServiceImpl;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */

@ImplementedBy(SV009OrderServiceImpl.class)
public interface SV009OrderService {
    List<OrderItemDto> sv00901GetOrderItemByDealId(Integer dealId);

    OrderDto sv00902GetOrderById(Integer orderId);

    OrderDto sv00903SaveOrderDto(OrderDto orderDto);

    CurrentStockDto sv00904GetCurrentStock(String denoProductCode);

    BigDecimal sv00905GetNumberOfNewCustomerUsingPicId(Integer picId, String startTime, String endTime);

    BigDecimal sv00906GetNumberOfNewCustomerUsingDepartmentId(Integer departmentId, String startTime, String endTime);

    List<ShippingPlanDto> sv00907GetShippingPlanByOrderItemIds(Collection<Integer> orderItemIds);

    List<LoadingAddressDto> sv00908GetAvailableLoadingAddress();

    List<LoadingAddressDto> sv00909GetLoadingAddressByIds(Collection<Integer> ids);

    OrderDto sv00910GetOrderByDealId(Integer dealId);

    OrderItemDto sv00911SaveOrderItem(OrderItemDto orderItemDto);

    void sv00912RemoveOrderItem(OrderItemDto orderItemDto);

    void sv00913RemoveShippingPlan(ShippingPlanDto shippingPlanDto);

    ShippingPlanDto sv00914SaveShippingPlan(ShippingPlanDto shippingPlanDto);

    void sv00915RemoveOrder(OrderDto orderDto);

    List<OrderItemDto> sv00916getOrderItemByCustomer(int customerId, int limit);

    List<OrderItemDto> sv00917getOrderItemByCustomer(int customerId, String keyword, DateTime startDate, DateTime endDate);
}