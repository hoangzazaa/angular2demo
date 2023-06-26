package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ShippingDestinationDaoImpl;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;

import java.util.List;

/**
 * Created by hoangtd on 4/17/2017.
 */
@ImplementedBy(ShippingDestinationDaoImpl.class)
public interface ShippingDestinationDao extends GenericDao<ShippingDestinationDto> {
    /**
     * Get shipping destination by customerId
     *
     * @param customerId
     * @return
     */
    List<ShippingDestinationDto> findShippingDestinationByCustomerId(Integer customerId);

    ShippingDestinationDto findDefaultShippingDestination(int customerId);
}
