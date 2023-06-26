package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.LoadingAddressDao;
import vn.vnext.sefuri.sf.dto.LoadingAddressDto;

import java.util.List;

/**
 * Created by TungNT on 3/6/2017.
 */
public class LoadingAddressDaoImpl extends GenericDaoImpl<LoadingAddressDto> implements LoadingAddressDao {

    public LoadingAddressDaoImpl() {
        super(LoadingAddressDto.class);
    }

    @Override
    public List<LoadingAddressDto> getAllAvailable() {

        String query = "SELECT la FROM LoadingAddressDto la WHERE la.deleteFlag <> :deleteFlag ORDER BY la.code ASC";
        List<LoadingAddressDto> loadingAddressDtos = JPA.em().createQuery(query, LoadingAddressDto.class)
                .setParameter("deleteFlag", 1)
                .getResultList();

        return loadingAddressDtos;
    }
}
