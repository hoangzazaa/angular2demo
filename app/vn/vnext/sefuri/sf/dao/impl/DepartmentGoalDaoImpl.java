package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.DepartmentGoalDao;
import vn.vnext.sefuri.sf.dto.DepartmentGoalDto;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/16/2017.
 */
public class DepartmentGoalDaoImpl extends GenericDaoImpl<DepartmentGoalDto> implements DepartmentGoalDao {
    public DepartmentGoalDaoImpl() {
        super(DepartmentGoalDto.class);
    }

    @Override
    public BigDecimal getDepartmentGoalWithNewCustomer(Integer departmentId, Integer financialYear) {
        String query = "select sum(gi.goal) " +
                "from DepartmentGoalDto g " +
                "inner JOIN DepartmentGoalItemDto gi on g.id = gi.departmentGoalId " +
                "where g.year = :year " +
                "and gi.customerType = 1";
        if (departmentId > 0) {
            query += " and g.departmentId = " + departmentId;
        }

        return JPA.em().createQuery(query, BigDecimal.class)
                .setParameter("year", financialYear)
                .getSingleResult();
    }
}
