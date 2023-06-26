package vn.vnext.sefuri.sf.service.impl;

import vn.vnext.sefuri.sf.dao.UserGoalDao;
import vn.vnext.sefuri.sf.dto.UserGoalDto;
import vn.vnext.sefuri.sf.service.SV020UserGoalService;

import javax.inject.Inject;

/**
 * Created by Administrator on 6/6/2017.
 */
public class SV020UserGoalServiceImpl implements SV020UserGoalService {
    @Inject
    private UserGoalDao userGoalDao;

    @Override
    public UserGoalDto sv0201FindByPicId(Integer picId, Integer financialYear) {
        return userGoalDao.findByPicId(picId, financialYear);
    }

    @Override
    public UserGoalDto sv0202FindByDepartmentId(Integer departmentId, Integer financialYear) {
        return userGoalDao.findByDepartmentId(departmentId, financialYear);
    }

    @Override
    public UserGoalDto sv00203FindByPicIdAndYear(Integer picId, Integer year) {
        return userGoalDao.findByPicIdAndYear(picId, year);
    }

    @Override
    public void sv00204Save(UserGoalDto userGoalDto) {
        if (userGoalDto.getId() != null) {
            userGoalDao.update(userGoalDto);
        } else {
            userGoalDao.create(userGoalDto);
        }
    }
}
