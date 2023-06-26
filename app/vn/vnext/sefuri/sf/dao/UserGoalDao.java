package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.UserGoalDaoImpl;
import vn.vnext.sefuri.sf.dto.UserGoalDto;

/**
 * Created by DungTQ on 6/6/2017.
 */
@ImplementedBy(UserGoalDaoImpl.class)
public interface UserGoalDao extends GenericDao<UserGoalDto> {
    UserGoalDto findByPicId(Integer picId, Integer financialYear);

    UserGoalDto findByDepartmentId(Integer departmentId, Integer financialYear);

    UserGoalDto findByPicIdAndYear(Integer picId, Integer year);
}
