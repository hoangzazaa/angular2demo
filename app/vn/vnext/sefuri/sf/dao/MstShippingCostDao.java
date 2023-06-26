package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.MstShippingCostDaoImpl;
import vn.vnext.sefuri.sf.dto.MstShippingCostDto;

import java.util.List;

/**
 * Created by DungTQ on 1/5/2017.
 */

@ImplementedBy(MstShippingCostDaoImpl.class)
public interface MstShippingCostDao {

    /**
     * find All MstShippingCostDto
     *
     * @return list MstShippingCostDto
     */
    List<MstShippingCostDto> findAll();
}
