package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.UserDao;
import vn.vnext.sefuri.sf.dto.UserDto;
import vn.vnext.sefuri.sf.util.GenerateUtil;

import javax.persistence.TypedQuery;
import java.util.List;

public class UserDaoImpl extends GenericDaoImpl<UserDto> implements UserDao, Constants {
    public UserDaoImpl() {
        super(UserDto.class);
    }

    private static final Integer ENABLE = 1;

    @Override
    public UserDto checkLogin(final UserDto user) {
        TypedQuery<UserDto> query = JPA.em().createQuery("SELECT u FROM UserDto u WHERE u.email=:email AND u" +
                ".password=:password AND u.enableFlag=:enableFlag", UserDto.class)
                .setParameter("email", user.getEmail())
                .setParameter("password", GenerateUtil.encode(user.getPassword()))
                .setParameter("enableFlag", ENABLE);

        return getSingleResultOrNull(query);
    }

    @Override
    public UserDto getUserByEmail(final String email) {
        TypedQuery<UserDto> query = JPA.em()
                .createQuery("SELECT u FROM UserDto u WHERE u.email=:email and u.enableFlag=:enableFlag", UserDto.class)
                .setParameter("email", email)
                .setParameter("enableFlag", ENABLE);

        return getSingleResultOrNull(query);
    }

    @Override
    public UserDto findUserById(Integer userId) {
        TypedQuery<UserDto> query = JPA.em().createQuery("SELECT user FROM UserDto user WHERE user.id=:userId " +
                "AND user.deleteFlag =:deleteFlag", UserDto.class)
                .setParameter("userId", userId)
                .setParameter("deleteFlag", ENABLE);

        return getSingleResultOrNull(query);
    }

    @Override
    public UserDto findUserByUserCode(String userCode) {
        TypedQuery<UserDto> query = JPA.em()
                .createQuery("SELECT u FROM UserDto u WHERE u.userCode=:userCode and u.enableFlag=:enableFlag", UserDto.class)
                .setParameter("userCode", userCode)
                .setParameter("enableFlag", ENABLE);

        return getSingleResultOrNull(query);
    }

    @Override
    public List<UserDto> findUsersByDepartmentId(Integer departmentId) {
        return JPA.em().createQuery("SELECT u FROM UserDto u WHERE u.departmentId=:departmentId AND u.enableFlag=:enableFlag", UserDto.class)
                .setParameter("enableFlag", ENABLE)
                .setParameter("departmentId", departmentId)
                .getResultList();
    }

    @Override
    public List<Object[]> getSalesUsingCustomerIds(List<Integer> customerIds) {
        return JPA.em().createQuery("SELECT u, cus " +
                "FROM UserDto u " +
                "INNER JOIN CustomerDto cus ON cus.picCode = u.userCode " +
                "AND cus.id IN (:customerIds)", Object[].class)
                .setParameter("customerIds", customerIds)
                .getResultList();
    }
}
