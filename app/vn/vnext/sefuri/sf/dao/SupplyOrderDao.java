package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.impl.SupplyOrderDaoImpl;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;

import java.util.List;

@ImplementedBy(SupplyOrderDaoImpl.class)
public interface SupplyOrderDao extends GenericDao<SupplyOrderDto> {

    List<SupplyOrderDto> getSupplyOrders(int supplierId, int limit, String keyword, DateTime startDay, DateTime endDay);
}
