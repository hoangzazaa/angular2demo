package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.SupplierDto;
import vn.vnext.sefuri.sf.dto.SupplyOrderDto;
import vn.vnext.sefuri.sf.service.impl.SV022SupplierServiceImpl;

import java.util.Collection;
import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */

@ImplementedBy(SV022SupplierServiceImpl.class)
public interface SV022SupplierService {

    SupplierDto sv02201GetSupplierById(Integer id);

    List<SupplierDto> sv02202GetSupplierByIds(Collection<Integer> ids);

    SupplierDto sv02203GetSupplierByCode(String code);

    SupplierDto sv02204UpdateSupplier(SupplierDto supplierDto);

    List<SupplyOrderDto> sv2205GetSupplyOrders(int supplierId, int limit);

    List<SupplyOrderDto> sv2206GetSupplyOrders(int supplierId, String keyword, DateTime startDate, DateTime endDate);
}
