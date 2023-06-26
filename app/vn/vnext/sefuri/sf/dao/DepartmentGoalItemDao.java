package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DepartmentGoalItemDaoImpl;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;

/**
 * Created by DungTQ on 2/16/2017.
 */
@ImplementedBy(DepartmentGoalItemDaoImpl.class)
public interface DepartmentGoalItemDao extends GenericDao<DepartmentGoalItemDto> {
}
