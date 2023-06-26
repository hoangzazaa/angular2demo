package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DepartmentSupportDaoImpl;
import vn.vnext.sefuri.sf.dto.DepartmentSupportDto;

@ImplementedBy(DepartmentSupportDaoImpl.class)
public interface DepartmentSupportDao extends GenericDao<DepartmentSupportDto> {
    DepartmentSupportDto getDepartmentSupport(Integer departmentId, Integer emailType);
}
