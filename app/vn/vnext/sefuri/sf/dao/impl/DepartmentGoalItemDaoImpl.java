package vn.vnext.sefuri.sf.dao.impl;

import vn.vnext.sefuri.sf.dao.DepartmentGoalItemDao;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;

/**
 * Created by DungTQ on 2/16/2017.
 */
public class DepartmentGoalItemDaoImpl extends GenericDaoImpl<DepartmentGoalItemDto> implements DepartmentGoalItemDao {
    public DepartmentGoalItemDaoImpl() {
        super(DepartmentGoalItemDto.class);
    }
}
