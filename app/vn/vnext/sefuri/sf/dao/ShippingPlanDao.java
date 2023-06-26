package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ShippingDestinationDaoImpl;
import vn.vnext.sefuri.sf.dao.impl.ShippingPlanDaoImpl;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;
import vn.vnext.sefuri.sf.dto.ShippingPlanDto;

import java.util.List;

/**
 * Created by hoangtd on 4/17/2017.
 */
@ImplementedBy(ShippingPlanDaoImpl.class)
public interface ShippingPlanDao extends GenericDao<ShippingPlanDto> {

    List<ShippingPlanDto> findShippingPlanByOrderItemId(Integer orderItemId);

}
