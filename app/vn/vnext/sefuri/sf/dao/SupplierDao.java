package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.SupplierDaoImpl;
import vn.vnext.sefuri.sf.dto.SupplierDto;

@ImplementedBy(SupplierDaoImpl.class)
public interface SupplierDao extends GenericDao<SupplierDto> {


    SupplierDto findSupplierByCode(String code);
}
