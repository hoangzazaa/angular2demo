package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.impl.InventoryDaoImpl;
import vn.vnext.sefuri.sf.dto.InventoryDto;

import java.util.List;

@ImplementedBy(InventoryDaoImpl.class)
public interface InventoryDao extends GenericDao<InventoryDto> {
    List<InventoryDto> getCustomerInventory(int customerId, int limit, Integer deposit, DateTime limitDate);
}
