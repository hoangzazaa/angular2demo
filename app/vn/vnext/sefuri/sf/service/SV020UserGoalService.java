package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.UserGoalDto;
import vn.vnext.sefuri.sf.service.impl.SV020UserGoalServiceImpl;

/**
 * Created by DungTQ on 6/6/2017.
 */
@ImplementedBy(SV020UserGoalServiceImpl.class)
public interface SV020UserGoalService {
    UserGoalDto sv0201FindByPicId(Integer picId, Integer financialYear);

    UserGoalDto sv0202FindByDepartmentId(Integer departmentId, Integer financialYear);

    UserGoalDto sv00203FindByPicIdAndYear(Integer picId, Integer year);

    void sv00204Save(UserGoalDto userGoalDto);
}
