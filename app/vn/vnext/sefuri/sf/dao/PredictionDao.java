package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.PredictionDaoImpl;
import vn.vnext.sefuri.sf.dto.PredictionDto;

import java.util.List;

/**
 * Created by Teddy on 3/20/2017.
 */
@ImplementedBy(PredictionDaoImpl.class)
public interface PredictionDao extends GenericDao<PredictionDto> {

    /**
     * find predictions by department from start year/month to end year/month
     *
     * @param departmentId
     * @param startYear
     * @param startMonth
     * @param endYear
     * @param endMonth
     * @return
     */
    List<PredictionDto> findPredictionsByDepartment(int departmentId, int startYear, int startMonth, int endYear, int endMonth);

    PredictionDto findPrediction(int year, int month, int customerId, boolean forUpdate);
}
