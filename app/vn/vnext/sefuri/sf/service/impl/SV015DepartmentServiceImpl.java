package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dao.DepartmentGoalDao;
import vn.vnext.sefuri.sf.dao.DepartmentGoalItemDao;
import vn.vnext.sefuri.sf.dao.DepartmentSupportDao;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;
import vn.vnext.sefuri.sf.dto.DepartmentSupportDto;
import vn.vnext.sefuri.sf.service.SV015DepartmentService;

import java.math.BigDecimal;
import java.util.List;

public class SV015DepartmentServiceImpl implements SV015DepartmentService {

    @Inject
    private DepartmentDao departmentDao;

    @Inject
    private DepartmentGoalDao departmentGoalDao;

    @Inject
    private DepartmentGoalItemDao departmentGoalItemDao;

    @Inject
    private DepartmentSupportDao departmentSupportDao;

    @Override
    public List<DepartmentDto> sv01501FindAllDepartment() {
        return departmentDao.findAll();
    }

    @Override
    public List<DepartmentGoalDto> sv01502GetDepartmentGoal(Integer departmentId, List<Integer> years) {
        return departmentDao.getDepartmentGoal(departmentId, years);
    }

    @Override
    public List<DepartmentGoalItemDto> sv01503GetDepartmentGoalItemsByDepartmentGoalId(Integer departmentGoalID) {
        return departmentDao.getDepartmentGoalItemsByDepartmentGoalId(departmentGoalID);
    }

    @Override
    public DepartmentGoalDto sv01504SaveDepartmentGoal(DepartmentGoalDto departmentGoalDto) {
        return departmentGoalDao.create(departmentGoalDto);
    }

    @Override
    public DepartmentGoalItemDto sv01505SaveDepartmentGoalItem(DepartmentGoalItemDto departmentGoalItemDto) {
        return departmentGoalItemDao.create(departmentGoalItemDto);
    }

    @Override
    public DepartmentGoalDto sv01506UpdateDepartmentGoal(DepartmentGoalDto departmentGoalDto) {
        return departmentGoalDao.update(departmentGoalDto);
    }

    @Override
    public DepartmentGoalItemDto sv01507UpdateDepartmentGoalItem(DepartmentGoalItemDto departmentGoalItemDto) {
        return departmentGoalItemDao.update(departmentGoalItemDto);
    }

    @Override
    public DepartmentGoalItemDto sv01508FindDepartmentGoalItemById(Integer departmentGoalItemId) {
        return departmentGoalItemDao.find(departmentGoalItemId);
    }

    @Override
    public DepartmentDto sv01509GetDepartmentById(Integer departmentId) {
        if (departmentId != null) {
            return departmentDao.find(departmentId);
        }
        return null;
    }

    @Override
    public List<DepartmentDto> sv01510FindAllSaleDept() {
        return departmentDao.findAllSaleDept();
    }

    @Override
    public DepartmentSupportDto sv01513GetDepartmentSupport(final Integer departmentId, final Integer emailType) {
        return departmentSupportDao.getDepartmentSupport(departmentId, emailType);
    }

    @Override
    public DepartmentSupportDto sv01514GetDefaultEmailByMailType(Integer mailType) {
        return departmentSupportDao.getDepartmentSupport(0, mailType);
    }

    @Override
    public BigDecimal sv01517GetDepartmentGoalByYear(Integer departmentId, Integer financialYear) {
        return departmentDao.getDepartmentGoalByYear(departmentId, financialYear);
    }

    @Override
    public BigDecimal sv01518GetDepartmentGoalByYearAndMonth(Integer departmentId, Integer financialYear, Integer financialMonth) {
        return departmentDao.getDepartmentGoalByYearAndMonth(departmentId, financialYear, financialMonth);
    }

    @Override
    public BigDecimal sv01519GetDepartmentGoalWithNewCustomer(Integer departmentId, Integer financialYear) {
        return departmentGoalDao.getDepartmentGoalWithNewCustomer(departmentId, financialYear);
    }

    @Override
    public List<DepartmentDto> sv01520GetDepartmentByType(Integer type) {
        return departmentDao.findDepartmentByType(type);
    }

    @Override
    public List<DepartmentDto> sv01523GetDepartmentByType(final Integer... types) {
        return departmentDao.findDepartmentByType(types);
    }

    @Override
    public List<DepartmentDto> sv01521GetMailGroups() {
        return departmentDao.getMailGroup();
    }

}
