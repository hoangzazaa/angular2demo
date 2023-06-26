package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.PredictionDao;
import vn.vnext.sefuri.sf.dto.PredictionDto;

import javax.persistence.LockModeType;
import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by Teddy on 3/20/2017.
 */
public class PredictionDaoImpl extends GenericDaoImpl<PredictionDto> implements PredictionDao {

    public PredictionDaoImpl() {
        super(PredictionDto.class);
    }

    @Override
    public List<PredictionDto> findPredictionsByDepartment(int departmentId, int startYear, int startMonth, int endYear, int endMonth) {
        // prepare query
        String queryStr = "" +
                "SELECT p FROM PredictionDto p" +
                " LEFT JOIN CustomerDto c ON c.id = p.customerId" +
                " LEFT JOIN UserDto u ON u.userCode = c.picCode" +
                " WHERE u.departmentId = :departmentId" +
                "   AND (" +
                "     (p.year = :startYear AND p.month >= :startMonth)" +
                "     OR (p.year > :startYear AND p.year < :endYear)" +
                "     OR (p.year = :endYear AND p.month <= :endMonth)" +
                "   )";
        // execute
        TypedQuery<PredictionDto> query = JPA.em().createQuery(queryStr, PredictionDto.class)
                .setParameter("departmentId", departmentId)
                .setParameter("startYear", startYear)
                .setParameter("startMonth", startMonth)
                .setParameter("endYear", endYear)
                .setParameter("endMonth", endMonth);
        List<PredictionDto> resultList = query.getResultList();
        // get result
        return resultList;
    }

    @Override
    public PredictionDto findPrediction(int year, int month, int customerId, boolean forUpdate) {
        // prepare query
        String queryStr = "" +
                "SELECT p FROM PredictionDto p" +
                " WHERE p.customerId = :customerId" +
                "   AND p.year = :year" +
                "   AND p.month = :month";
        // execute
        TypedQuery<PredictionDto> query = JPA.em().createQuery(queryStr, PredictionDto.class)
                .setParameter("customerId", customerId)
                .setParameter("year", year)
                .setParameter("month", month);
        if (forUpdate) {
            query.setLockMode(LockModeType.PESSIMISTIC_WRITE);
        }
        List<PredictionDto> resultList = query.getResultList();
        // get result
        if (resultList.isEmpty()) {
            return null;
        } else {
            return resultList.get(0);
        }
    }
}
