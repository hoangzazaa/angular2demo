package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.*;
import vn.vnext.sefuri.sf.dto.*;
import vn.vnext.sefuri.sf.service.SV009OrderService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV009OrderServiceImpl implements SV009OrderService {
    @Inject
    private OrderItemDao orderItemDao;
    @Inject
    private OrderDao orderDao;
    @Inject
    private LoadingAddressDao loadingAddressDao;
    @Inject
    private CurrentStockDao currentStockDao;
    @Inject
    private ShippingPlanDao shippingPlanDao;
    @Inject
    private DealDao dealDao;

    @Override
    public List<OrderItemDto> sv00901GetOrderItemByDealId(Integer dealId) {
        return orderItemDao.getOrderItemsByDealId(dealId);
    }

    @Override
    public OrderDto sv00902GetOrderById(Integer orderId) {
        return orderDao.find(orderId);
    }

    @Override
    public CurrentStockDto sv00904GetCurrentStock(String denoProductCode) {
        return currentStockDao.getStockByDenoProductCode(denoProductCode);
    }

    @Override
    public OrderDto sv00903SaveOrderDto(final OrderDto orderDto) {
        if (orderDto.getId() == null)
            return orderDao.create(orderDto);

        return orderDao.update(orderDto);
    }

    @Override
    public BigDecimal sv00905GetNumberOfNewCustomerUsingPicId(Integer picId, String startTime, String endTime) {
        return orderItemDao.getNumberOfNewCustomerUsingPicId(picId, startTime, endTime);
    }

    @Override
    public BigDecimal sv00906GetNumberOfNewCustomerUsingDepartmentId(Integer departmentId, String startTime, String endTime) {
        return orderItemDao.getNumberOfNewCustomerUsingDepartmentId(departmentId, startTime, endTime);
    }

    @Override
    public List<ShippingPlanDto> sv00907GetShippingPlanByOrderItemIds(Collection<Integer> orderItemIds) {
        List<ShippingPlanDto> shippingPlanDtos = new ArrayList<>();
        for (Integer orderItemId : orderItemIds) {
            List<ShippingPlanDto> shippingPlanByOrderItemId = shippingPlanDao.findShippingPlanByOrderItemId(orderItemId);
            shippingPlanDtos.addAll(shippingPlanByOrderItemId);
        }
        return shippingPlanDtos;
    }

    @Override
    public List<LoadingAddressDto> sv00908GetAvailableLoadingAddress() {
        return loadingAddressDao.getAllAvailable();
    }

    @Override
    public List<LoadingAddressDto> sv00909GetLoadingAddressByIds(Collection<Integer> ids) {
        List<LoadingAddressDto> addressDtos = new ArrayList<>();
        for (Integer id : ids) {
            if (id != null) {
                LoadingAddressDto loadingAddressDto = loadingAddressDao.find(id);
                if (loadingAddressDto != null) {
                    addressDtos.add(loadingAddressDto);
                }
            }
        }
        return addressDtos;
    }

    @Override
    public OrderDto sv00910GetOrderByDealId(Integer dealId) {
        if (dealId == null) {
            return null;
        }
        return orderDao.getOrderByDealId(dealId);
    }

    @Override
    public OrderItemDto sv00911SaveOrderItem(OrderItemDto orderItemDto) {
        if (orderItemDto.getId() == null) {
            return orderItemDao.create(orderItemDto);
        } else {
            return orderItemDao.update(orderItemDto);
        }
    }

    @Override
    public void sv00912RemoveOrderItem(OrderItemDto orderItemDto) {
        orderItemDao.delete(orderItemDto.getId());
    }

    @Override
    public void sv00913RemoveShippingPlan(ShippingPlanDto shippingPlanDto) {
        shippingPlanDao.delete(shippingPlanDto.getId());
    }

    @Override
    public ShippingPlanDto sv00914SaveShippingPlan(ShippingPlanDto shippingPlanDto) {
        if (shippingPlanDto.getId() == null) {
            return shippingPlanDao.create(shippingPlanDto);
        } else {
            return shippingPlanDao.update(shippingPlanDto);
        }
    }

    @Override
    public void sv00915RemoveOrder(OrderDto orderDto) {
        orderDao.delete(orderDto.getId());
    }

    @Override
    public List<OrderItemDto> sv00916getOrderItemByCustomer(int customerId, int limit) {
        List<OrderItemDto> orderItemDtos = orderItemDao.getCustomerOrderItems(customerId, limit, null, null, null);
        return orderItemDtos;
    }

    @Override
    public List<OrderItemDto> sv00917getOrderItemByCustomer(int customerId, String keyword, DateTime startDate, DateTime endDate) {
        // analyze date
        DateTime startDay = null;
        if (startDate != null) {
            startDay = startDate.withTimeAtStartOfDay();
        }
        DateTime endDay = null;
        if (endDate != null) {
            endDay = endDate.withTimeAtStartOfDay().plusDays(1);
        }

        List<OrderItemDto> orderItemDtos = orderItemDao.getCustomerOrderItems(customerId, 0, keyword, startDay, endDay);
        return orderItemDtos;
    }
}
