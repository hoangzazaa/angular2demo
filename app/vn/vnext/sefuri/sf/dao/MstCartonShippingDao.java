package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstCartonShippingDaoImpl;
import vn.vnext.sefuri.sf.dto.MstCartonShippingDto;

import java.util.List;

/**
 * Created by VuPT on 5/11/2017.
 */
@ImplementedBy(MstCartonShippingDaoImpl.class)
public interface MstCartonShippingDao extends GenericDao<MstCartonShippingDto> {
    List<MstCartonShippingDto> findAll();
}
