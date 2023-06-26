package vn.vnext.sefuri.sf.service.impl;

import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.SupplierDao;
import vn.vnext.sefuri.sf.dao.SupplyOrderDao;
import vn.vnext.sefuri.sf.dto.SupplierDto;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV022SupplierService;
import vn.vnext.sefuri.sf.util.DateUtil;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV022SupplierServiceImpl implements SV022SupplierService {

    @Inject
    private SV001AuthService authService;

    @Inject
    private SupplierDao supplierDao;

    @Inject
    private SupplyOrderDao supplyOrderDao;

    @Override
    public SupplierDto sv02201GetSupplierById(Integer id) {
        if (id == null) {
            return null;
        } else {
            return supplierDao.find(id);
        }
    }

    @Override
    public List<SupplierDto> sv02202GetSupplierByIds(Collection<Integer> ids) {
        if (ids.isEmpty()) {
            return Collections.emptyList();
        } else {
            List<SupplierDto> suppliers = new ArrayList<>();
            for (Integer id : ids) {
                SupplierDto supplierDto = this.sv02201GetSupplierById(id);
                if (supplierDto != null) {
                    suppliers.add(supplierDto);
                }
            }
            return suppliers;
        }
    }

    @Override
    public SupplierDto sv02203GetSupplierByCode(String code) {
        return supplierDao.findSupplierByCode(code);
    }

    @Override
    public SupplierDto sv02204UpdateSupplier(SupplierDto supplierDto) {
        // update log
        supplierDto.setUpdatedUser(authService.getCurrentUser().getId());
        supplierDto.setUpdatedDate(DateUtil.getSysDate());
        // do update
        return supplierDao.update(supplierDto);
    }

    @Override
    public List<SupplyOrderDto> sv2205GetSupplyOrders(int supplierId, int limit) {
        List<SupplyOrderDto> orders = supplyOrderDao.getSupplyOrders(supplierId, limit, null, null, null);
        return orders;
    }

    @Override
    public List<SupplyOrderDto> sv2206GetSupplyOrders(int supplierId, String keyword, DateTime startDate, DateTime endDate) {
        // analyze date
        DateTime startDay = null;
        if (startDate != null) {
            startDay = startDate.withTimeAtStartOfDay();
        }
        DateTime endDay = null;
        if (endDate != null) {
            endDay = endDate.withTimeAtStartOfDay().plusDays(1);
        }

        List<SupplyOrderDto> orders = supplyOrderDao.getSupplyOrders(supplierId, 0, keyword, startDay, endDay);
        return orders;
    }
}