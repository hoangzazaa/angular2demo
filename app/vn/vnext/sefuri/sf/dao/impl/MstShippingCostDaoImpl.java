package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.MstShippingCostDao;
import vn.vnext.sefuri.sf.dto.MstShippingCostDto;

import java.util.List;

/**
 * Created by DungTQ on 1/5/2017.
 */
public class MstShippingCostDaoImpl implements MstShippingCostDao {
    @Override
    public List<MstShippingCostDto> findAll() {
        return JPA.em().createQuery("SELECT mstShipping FROM MstShippingCostDto mstShipping", MstShippingCostDto.class)
                .getResultList();
    }
}
