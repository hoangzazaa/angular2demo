package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.DepartmentDao;
import vn.vnext.sefuri.sf.dto.DepartmentDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;
import vn.vnext.sefuri.sf.dto.DepartmentGoalItemDto;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

/**
 * Created by haipt on 1/13/2017.
 */
public class DepartmentDaoImpl extends GenericDaoImpl<DepartmentDto> implements DepartmentDao {

    public DepartmentDaoImpl() {
        super(DepartmentDto.class);
    }

    @Override
    public List<DepartmentDto> findAll() {
        return JPA.em().createQuery("SELECT dep FROM DepartmentDto dep " +
                "WHERE dep.mailGroupFlag = 0", DepartmentDto.class)
                .getResultList();
    }

    @Override
    public List<DepartmentGoalDto> getDepartmentGoal(Integer departmentId, List<Integer> years) {
        String query = "SELECT dep FROM DepartmentGoalDto dep WHERE dep.departmentId = :departmentId AND dep.year IN (:years)";
        return JPA.em().createQuery(query, DepartmentGoalDto.class)
                .setParameter("departmentId", departmentId)
                .setParameter("years", years)
                .getResultList();
    }

    @Override
    public List<DepartmentGoalItemDto> getDepartmentGoalItemsByDepartmentGoalId(Integer departmentGoalId) {
        String query = "SELECT dep FROM DepartmentGoalItemDto dep WHERE dep.departmentGoalId = :departmentGoalId";
        return JPA.em().createQuery(query, DepartmentGoalItemDto.class)
                .setParameter("departmentGoalId", departmentGoalId)
                .getResultList();
    }

    @Override
    public List<DepartmentDto> findAllSaleDept() {
        String query = "SELECT dep FROM DepartmentDto dep WHERE dep.type=:typeSale " +
                "AND dep.mailGroupFlag = 0 " +
                "ORDER BY dep.departmentCode ASC";
        return JPA.em().createQuery(query, DepartmentDto.class)
                .setParameter("typeSale", 1)
                .getResultList();
    }

    @Override
    public BigDecimal getDepartmentGoalByYear(Integer departmentId, Integer financialYear) {
        String query = "SELECT sum(dep.goal) FROM DepartmentGoalItemDto dep " +
                "inner join DepartmentGoalDto depGoal on depGoal.id = dep.departmentGoalId " +
                "inner join DepartmentDto d on d.id = depGoal.departmentId " +
                "WHERE depGoal.year = :year";
        if (departmentId > 0) {
            query += " AND depGoal.departmentId = " + departmentId;
        }
        else {
            query += " AND d.salesAggregateFlag = 1";
        }
        return JPA.em().createQuery(query, BigDecimal.class)
                .setParameter("year", financialYear)
                .getSingleResult();
    }

    @Override
    public BigDecimal getDepartmentGoalByYearAndMonth(Integer departmentId, Integer financialYear, Integer financialMonth) {
        String query = "SELECT sum(dep.goal) FROM DepartmentGoalItemDto dep " +
                "inner join DepartmentGoalDto depGoal on depGoal.id = dep.departmentGoalId " +
                "inner join DepartmentDto d on d.id = depGoal.departmentId " +
                "WHERE depGoal.year = :year " +
                "AND dep.month = :month ";
        if (departmentId > 0) {
            query += " AND depGoal.departmentId = " + departmentId;
        }
        else {
            query += " AND d.salesAggregateFlag = 1";
        }
        return JPA.em().createQuery(query, BigDecimal.class)
                .setParameter("year", financialYear)
                .setParameter("month", financialMonth)
                .getSingleResult();
    }

    @Override
    public List<DepartmentDto> findDepartmentByType(Integer type) {
        String query = "SELECT dep FROM DepartmentDto dep WHERE dep.type=:type " +
                "AND dep.mailGroupFlag = 0 " +
                "ORDER BY dep.departmentCode ASC";
        return JPA.em().createQuery(query, DepartmentDto.class)
                .setParameter("type", type)
                .getResultList();
    }

    @Override
    public List<DepartmentDto> findDepartmentByType(final Integer... types) {
        String query = "SELECT dep FROM DepartmentDto dep WHERE dep.type IN (:type) " +
                "AND dep.mailGroupFlag = 0 " +
                "ORDER BY dep.departmentCode ASC";
        return JPA.em().createQuery(query, DepartmentDto.class)
                .setParameter("type", Arrays.asList(types))
                .getResultList();
    }

    @Override
    public List<DepartmentDto> getMailGroup() {
        String query = "SELECT dep FROM DepartmentDto dep WHERE dep.mailGroupFlag = 1 " +
                "ORDER BY dep.departmentCode ASC";
        return JPA.em().createQuery(query, DepartmentDto.class).
                getResultList();
    }
}
