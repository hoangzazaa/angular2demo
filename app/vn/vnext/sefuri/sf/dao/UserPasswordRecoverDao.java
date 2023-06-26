package vn.vnext.sefuri.sf.dao;

/**
 * Created by sonnb on 11/4/16.
 */

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.UserPasswordRecoverDaoImpl;
import vn.vnext.sefuri.sf.dto.UserPasswordRecoverDto;
import vn.vnext.sefuri.sf.helper.SfrException;

@ImplementedBy(UserPasswordRecoverDaoImpl.class)
public interface UserPasswordRecoverDao extends GenericDao<UserPasswordRecoverDto> {
    UserPasswordRecoverDto getByTokenKey(String tokenKey) throws SfrException;
}
