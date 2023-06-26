package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DepartmentGoalDaoImpl;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.dao.DepartmentGoal01Dto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by DungTQ on 2/16/2017.
 */
@ImplementedBy(DepartmentGoalDaoImpl.class)
public interface DepartmentGoalDao extends GenericDao<DepartmentGoalDto> {
    BigDecimal getDepartmentGoalWithNewCustomer(Integer departmentId, Integer financialYear);
}
