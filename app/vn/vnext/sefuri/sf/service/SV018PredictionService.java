package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.PredictionDto;
import vn.vnext.sefuri.sf.service.impl.SV018PredictionServiceImpl;

import java.util.List;

/**
 * Created by Teddy on 3/20/2017.
 */
@ImplementedBy(SV018PredictionServiceImpl.class)
public interface SV018PredictionService {

    /**
     * get prediction by departmentId from startYear to endYear (financial)
     *
     * @param departmentId
     * @param startDate
     * @param endDate
     * @return
     */
    List<PredictionDto> sv01801GetPredictions(int departmentId, DateTime startDate, DateTime endDate);

    /**
     * Save notes only
     *
     * @param predictionDtos
     * @return
     */
    List<PredictionDto> sv01802SaveNotes(List<PredictionDto> predictionDtos);

    /**
     * update predictions info and remove predictions by id
     *
     * @param predictions
     * @param removePredictionIds
     * @return
     */
    List<PredictionDto> sv01803SavePredictions(List<PredictionDto> predictions, List<Integer> removePredictionIds);
}
