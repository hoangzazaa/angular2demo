/**
 * Created by Teddy on 10/09/2016.
 */

package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DepartmentDaoImpl;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;

import java.math.BigDecimal;
import java.util.List;

@ImplementedBy(DepartmentDaoImpl.class)
public interface DepartmentDao extends GenericDao<DepartmentDto> {
    List<DepartmentDto> findAll();

    List<DepartmentGoalDto> getDepartmentGoal(Integer departmentId, List<Integer> years);

    List<DepartmentGoalItemDto> getDepartmentGoalItemsByDepartmentGoalId(Integer departmentGoalID);

    List<DepartmentDto> findAllSaleDept();

    BigDecimal getDepartmentGoalByYear(Integer departmentId, Integer financialYear);

    BigDecimal getDepartmentGoalByYearAndMonth(Integer departmentId, Integer year, Integer month);

    List<DepartmentDto> findDepartmentByType(Integer type);

    List<DepartmentDto> findDepartmentByType(Integer... types);

    List<DepartmentDto> getMailGroup();

}
