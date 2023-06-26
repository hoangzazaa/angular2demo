package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.CustomerGoalDao;
import vn.vnext.sefuri.sf.dto.CustomerGoalDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Created by TungNT on 2/13/2017.
 */
public class CustomerGoalDaoImpl extends GenericDaoImpl<CustomerGoalDto> implements CustomerGoalDao {
    public CustomerGoalDaoImpl() {
        super(CustomerGoalDto.class);
    }

    @Override
    public List<CustomerGoalDto> getCustomerGoalInYear(Integer depId, Integer year) {
        return JPA.em().createQuery("select goal From CustomerGoalDto goal " +
                "WHERE goal.year = :year " +
                "AND goal.departmentId = :depId " +
                "order by goal.updatedDate desc", CustomerGoalDto.class)
                .setParameter("year", year)
                .setParameter("depId", depId)
                .getResultList();
    }

    @Override
    public List<CustomerGoalDto> getCustomerGoalByYearAndDepartmentId(Integer departmentId, Integer year) {
        return JPA.em().createQuery("select goal From CustomerGoalDto goal WHERE " +
                "goal.year=:year AND goal.departmentId=:departmentId", CustomerGoalDto.class)
                .setParameter("year", year)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }

    @Override
    public BigDecimal getCustomerGoalByPicIDAndYearAndMonth(Integer picId, Integer year, Integer month) {
        return JPA.em().createQuery("select sum(goalItem.goal) From CustomerGoalDto goal " +
                "Inner join CustomerGoalItemDto  goalItem " +
                "on goal.id = goalItem.customerGoalId " +
                "WHERE goal.picId = :picId " +
                "and goal.year = :year " +
                "and goalItem.month = :month " +
                "and goalItem.type is not null ", BigDecimal.class)
                .setParameter("picId", picId)
                .setParameter("year", year)
                .setParameter("month", month)
                .getSingleResult();
    }

    @Override
    public BigDecimal getCustomerGoalByPicIDAndYearForNewCustomer(Integer picId, Integer year) {
        return JPA.em().createQuery("select sum(goalItem.goal) From CustomerGoalDto goal " +
                "Inner join CustomerGoalItemDto  goalItem " +
                "on goal.id = goalItem.customerGoalId " +
                "and goal.picId = :picId " +
                "and goal.year = :year " +
                "and goalItem.customerType = 1 " +
                "and goalItem.type is not null " +
                // TODO: ignore fake data in sfr_sf_customer_goal_item
                "and goalItem.createdUser != 272", BigDecimal.class)
                .setParameter("picId", picId)
                .setParameter("year", year)
                .getSingleResult();
    }

    @Override
    public BigDecimal getCustomerGoalByPicIDAndYear(Integer picId, Integer year) {
        return JPA.em().createQuery("select sum(goalItem.goal) From CustomerGoalDto goal " +
                "Inner join CustomerGoalItemDto  goalItem " +
                "on goal.id = goalItem.customerGoalId " +
                "WHERE goal.picId = :picId " +
                "and goal.year = :year " +
                "and goalItem.type is not null ", BigDecimal.class)
                .setParameter("picId", picId)
                .setParameter("year", year)
                .getSingleResult();
    }
}
