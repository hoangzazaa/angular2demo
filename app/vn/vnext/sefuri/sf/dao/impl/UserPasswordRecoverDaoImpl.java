package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.UserPasswordRecoverDao;
import vn.vnext.sefuri.sf.dto.UserPasswordRecoverDto;
import vn.vnext.sefuri.sf.helper.SfrException;

import javax.persistence.TypedQuery;

/**
 * Created by sonnb on 11/4/16.
 */
public class UserPasswordRecoverDaoImpl extends GenericDaoImpl<UserPasswordRecoverDto> implements
        UserPasswordRecoverDao {

    public UserPasswordRecoverDaoImpl() {
        super(UserPasswordRecoverDto.class);
    }

    @Override
    public UserPasswordRecoverDto getByTokenKey(String tokenKey) throws SfrException {
        TypedQuery<UserPasswordRecoverDto> query = JPA.em().createQuery("SELECT u FROM UserPasswordRecoverDto u WHERE" +
                        " u.tokenKey=:token_key and u.usedFlag =:usedFlag",
                UserPasswordRecoverDto.class)
                .setParameter("token_key", tokenKey)
                .setParameter("usedFlag", Constants.DELETE_ENABLE);

        return getSingleResultOrNull(query);
    }

}
