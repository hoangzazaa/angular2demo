package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.service.impl.SV021InventoryServiceImpl;

import java.util.List;

/**
 * Created by DungTQ on 6/6/2017.
 */
@ImplementedBy(SV021InventoryServiceImpl.class)
public interface SV021InventoryService {
    List<InventoryDto> sv02101GetInventoryByCustomer(int customerId, int limit);

    List<InventoryDto> sv02102GetInventoryByCustomer(int customerId, Integer deposit, Integer dayLimit);
}
