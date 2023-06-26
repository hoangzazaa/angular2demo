package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstShippingCompanyDaoImpl;
import vn.vnext.sefuri.sf.dto.MstShippingCompanyDto;

import java.util.List;

/**
 * Created by DungTQ on 1/5/2017.
 */

@ImplementedBy(MstShippingCompanyDaoImpl.class)
public interface MstShippingCompanyDao extends GenericDao<MstShippingCompanyDto> {

    /**
     * find All MstShippingCompanyDto
     *
     * @return list MstShippingCompanyDto
     */
    List<MstShippingCompanyDto> findAll();
}
