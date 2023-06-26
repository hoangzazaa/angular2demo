package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.ShippingPlanDao;
import vn.vnext.sefuri.sf.dto.ShippingPlanDto;

import java.util.List;

/**
 * Created by haipt on 7/14/2017.
 */
public class ShippingPlanDaoImpl extends GenericDaoImpl<ShippingPlanDto> implements ShippingPlanDao {

    public ShippingPlanDaoImpl() {
        super(ShippingPlanDto.class);
    }

    @Override
    public List<ShippingPlanDto> findShippingPlanByOrderItemId(Integer orderItemId) {

        String query = "SELECT s FROM ShippingPlanDto s WHERE s.orderItemId =:id ORDER BY s.no ASC";
        List<ShippingPlanDto> sps = JPA.em().createQuery(query, ShippingPlanDto.class)
                .setParameter("id", orderItemId)
                .getResultList();

        return sps;
    }
}
