package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.LoadingAddressDaoImpl;
import vn.vnext.sefuri.sf.dto.LoadingAddressDto;

import java.util.List;

/**
 * Created by TungNT on 3/6/2017.
 */
@ImplementedBy(LoadingAddressDaoImpl.class)
public interface LoadingAddressDao extends GenericDao<LoadingAddressDto> {
    List<LoadingAddressDto> getAllAvailable();
}
