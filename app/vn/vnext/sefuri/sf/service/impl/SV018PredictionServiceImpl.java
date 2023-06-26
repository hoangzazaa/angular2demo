package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dao.PredictionDao;
import vn.vnext.sefuri.sf.dto.PredictionDto;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.helper.type.PredictionType;
import vn.vnext.sefuri.sf.service.SV001AuthService;
import vn.vnext.sefuri.sf.service.SV018PredictionService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Teddy on 3/20/2017.
 */
public class SV018PredictionServiceImpl implements SV018PredictionService {

    @Inject
    private PredictionDao predictionDao;
    @Inject
    private SV001AuthService authService;

    @Override
    public List<PredictionDto> sv01801GetPredictions(int departmentId, DateTime startDate, DateTime endDate) {
        return predictionDao.findPredictionsByDepartment(departmentId, startDate.getYear(), startDate.getMonthOfYear(), endDate.getYear(), endDate.getMonthOfYear());
    }

    @Override
    public List<PredictionDto> sv01802SaveNotes(List<PredictionDto> predictionDtos) {
        UserDto currentUser = authService.getCurrentUser();
        // save notes
        List<PredictionDto> saveDtos = predictionDtos.stream().map(predictionDto -> {
            // find record by year - month - customerId
            PredictionDto prediction = predictionDao.findPrediction(predictionDto.getYear(), predictionDto.getMonth(), predictionDto.getCustomerId(), true);
            if (prediction == null) {
                // create new prediciton
                prediction = new PredictionDto();
                // set prediction data
                prediction.setYear(predictionDto.getYear());
                prediction.setMonth(predictionDto.getMonth());
                prediction.setCustomerId(predictionDto.getCustomerId());
                // set created user, date
                prediction.setCreatedUser(currentUser.getId());
                prediction.setCreatedDate(DateTime.now());
            }
            // set note
            prediction.setNote(predictionDto.getNote());
            // set update user/date
            prediction.setUpdatedUser(currentUser.getId());
            prediction.setUpdatedDate(DateTime.now());

            // save to db
            PredictionDto updateDto = predictionDao.update(prediction);
            return updateDto;
        }).collect(Collectors.toList());

        return saveDtos;
    }

    @Override
    public List<PredictionDto> sv01803SavePredictions(List<PredictionDto> predictions, List<Integer> removePredictionIds) {
        // save predictions
        List<PredictionDto> savedPredictions = new ArrayList<>();
        Integer curUserId = authService.getCurrentUser().getId();
        DateTime now = DateTime.now();
        predictions.forEach(dto -> {
            PredictionDto prediction = null;
            if (dto.getId() != null) {
                // find prediction by Id
                prediction = predictionDao.find(dto.getId());
            } else {
                // find prediction by year-month-customerId
                prediction = predictionDao.findPrediction(dto.getYear(), dto.getMonth(), dto.getCustomerId(), true);
            }

            if (prediction != null) {
                // update goal, commend and head
                prediction.setType1Goal(dto.getType1Goal());
                prediction.setType2Goal(dto.getType2Goal());
                prediction.setType3Goal(dto.getType3Goal());
                prediction.setNote(dto.getNote());
                if (dto.getHeadFlag() != null) {
                    prediction.setHeadFlag(dto.getHeadFlag());
                }
                // update user, date
                prediction.setUpdatedDate(now);
                prediction.setUpdatedUser(curUserId);

                // save
                prediction = predictionDao.update(prediction);
                savedPredictions.add(prediction);
            } else {
                // add
                prediction = new PredictionDto();
                // set data
                prediction.setYear(dto.getYear());
                prediction.setMonth(dto.getMonth());
                prediction.setCustomerId(dto.getCustomerId());
                prediction.setType1Goal(dto.getType1Goal());
                prediction.setType2Goal(dto.getType2Goal());
                prediction.setType3Goal(dto.getType3Goal());
                prediction.setNote(dto.getNote());
                if (dto.getHeadFlag() != null) {
                    prediction.setHeadFlag(dto.getHeadFlag());
                } else {
                    prediction.setHeadFlag(PredictionType.HeadFlagType.IS_STAFF);
                }
                // set created/updated user/date
                prediction.setCreatedDate(now);
                prediction.setCreatedUser(curUserId);
                prediction.setUpdatedDate(now);
                prediction.setUpdatedUser(curUserId);

                prediction = predictionDao.create(prediction);
                savedPredictions.add(prediction);
            }
        });

        // remove predictions
        removePredictionIds.forEach(id -> {
            predictionDao.delete(id);
        });

        return savedPredictions;
    }
}
