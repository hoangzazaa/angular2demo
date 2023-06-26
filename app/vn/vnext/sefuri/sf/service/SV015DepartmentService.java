package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;
import vn.vnext.sefuri.sf.dto.DepartmentSupportDto;
import vn.vnext.sefuri.sf.service.impl.SV015DepartmentServiceImpl;

import java.math.BigDecimal;
import java.util.List;

@ImplementedBy(SV015DepartmentServiceImpl.class)
public interface SV015DepartmentService {
    List<DepartmentDto> sv01501FindAllDepartment();

    List<DepartmentGoalDto> sv01502GetDepartmentGoal(Integer departmentId, List<Integer> years);

    List<DepartmentGoalItemDto> sv01503GetDepartmentGoalItemsByDepartmentGoalId(Integer departmentGoalID);

    DepartmentGoalDto sv01504SaveDepartmentGoal(DepartmentGoalDto departmentGoalDto);

    DepartmentGoalItemDto sv01505SaveDepartmentGoalItem(DepartmentGoalItemDto departmentGoalItemDto);

    DepartmentGoalDto sv01506UpdateDepartmentGoal(DepartmentGoalDto departmentGoalDto);

    DepartmentGoalItemDto sv01507UpdateDepartmentGoalItem(DepartmentGoalItemDto departmentGoalItemDto);

    DepartmentGoalItemDto sv01508FindDepartmentGoalItemById(Integer departmentGoalItemId);

    DepartmentDto sv01509GetDepartmentById(Integer departmentId);

    List<DepartmentDto> sv01510FindAllSaleDept();

    DepartmentSupportDto sv01513GetDepartmentSupport(Integer departmentId, Integer emailType);

    DepartmentSupportDto sv01514GetDefaultEmailByMailType(Integer mailType);

    BigDecimal sv01517GetDepartmentGoalByYear(Integer departmentId, Integer financialYear);

    BigDecimal sv01518GetDepartmentGoalByYearAndMonth(Integer departments, Integer financialYear, Integer financialMonth);

    BigDecimal sv01519GetDepartmentGoalWithNewCustomer(Integer departmentId, Integer financialYear);

    List<DepartmentDto> sv01520GetDepartmentByType(Integer type);

    List<DepartmentDto> sv01523GetDepartmentByType(Integer... types);

    List<DepartmentDto> sv01521GetMailGroups();

}
