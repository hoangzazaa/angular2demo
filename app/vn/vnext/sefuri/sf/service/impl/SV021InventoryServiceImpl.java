package vn.vnext.sefuri.sf.service.impl;

import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.InventoryDao;
import vn.vnext.sefuri.sf.dto.InventoryDto;
import vn.vnext.sefuri.sf.service.SV021InventoryService;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by Teddy on 7/20/2017.
 */
public class SV021InventoryServiceImpl implements SV021InventoryService {

    @Inject
    private InventoryDao inventoryDao;

    @Override
    public List<InventoryDto> sv02101GetInventoryByCustomer(int customerId, int limit) {
        List<InventoryDto> inventoryDtos = inventoryDao.getCustomerInventory(customerId, limit, null, null);
        return inventoryDtos;
    }

    @Override
    public List<InventoryDto> sv02102GetInventoryByCustomer(int customerId, Integer deposit, Integer dayLimit) {
        DateTime limitDate = null;
        if (dayLimit != null) {
            limitDate = DateUtil.getSysDate().withTime(0, 0, 0, 0).minusDays(dayLimit - 1);
        }

        List<InventoryDto> inventoryDtos = inventoryDao.getCustomerInventory(customerId, 0, deposit, limitDate);
        return inventoryDtos;
    }
}