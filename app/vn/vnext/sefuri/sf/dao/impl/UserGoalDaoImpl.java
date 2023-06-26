package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.UserGoalDao;
import vn.vnext.sefuri.sf.dto.UserGoalDto;

import java.util.List;

/**
 * Created by DungTQ on 6/6/2017.
 */
public class UserGoalDaoImpl extends GenericDaoImpl<UserGoalDto> implements UserGoalDao {
    public UserGoalDaoImpl() {
        super(UserGoalDto.class);
    }

    @Override
    public UserGoalDto findByPicId(Integer picId, Integer financialYear) {
        List<UserGoalDto> list = JPA.em().createQuery("SELECT u " +
                "FROM UserGoalDto u where u.picId = :picId " +
                "AND u.year = :year", UserGoalDto.class)
                .setParameter("picId", picId)
                .setParameter("year", financialYear)
                .getResultList();
        if (list.size() > 0) {
            return list.get(0);
        }
        return null;
    }

    @Override
    public UserGoalDto findByDepartmentId(Integer departmentId, Integer financialYear) {
        String query = "SELECT u FROM UserGoalDto u where u.year = :year";
        if (departmentId > 0) {
            query += " AND u.departmentId = " + departmentId;
        }
        List<UserGoalDto> list = JPA.em().createQuery(query, UserGoalDto.class)
                .setParameter("year", financialYear)
                .getResultList();
        if (list.size() > 0) {
            Integer totalNewRecords = 0;
            Integer totalDigitalSales = 0;
            //http://fridaynight.vnext.vn/issues/2635
            for (UserGoalDto user : list) {
                totalNewRecords += user.getNewRecord() == null ? 0 : user.getNewRecord();
                totalDigitalSales += user.getDigitalSales() == null ? 0 : user.getDigitalSales();
            }
            UserGoalDto userGoalDto = new UserGoalDto();
            userGoalDto.setDigitalSales(totalDigitalSales);
            userGoalDto.setNewRecord(totalNewRecords);
            return userGoalDto;
        }
        return null;
    }

    @Override
    public UserGoalDto findByPicIdAndYear(Integer picId, Integer year) {
        List<UserGoalDto> list = JPA.em().createQuery("SELECT u " +
                "FROM UserGoalDto u where u.picId = :picId " +
                "AND u.year = :year", UserGoalDto.class)
                .setParameter("picId", picId)
                .setParameter("year", year)
                .getResultList();
        if (list.size() > 0) {
            return list.get(0);
        }
        return null;
    }
}
