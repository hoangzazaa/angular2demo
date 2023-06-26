package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.ShippingDestinationDao;
import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;

import javax.persistence.TypedQuery;
import java.util.List;

/**
 * Created by hoangtd on 4/17/2017.
 */
public class ShippingDestinationDaoImpl extends GenericDaoImpl<ShippingDestinationDto> implements ShippingDestinationDao {

    public ShippingDestinationDaoImpl() {
        super(ShippingDestinationDto.class);
    }

    @Override
    public List<ShippingDestinationDto> findShippingDestinationByCustomerId(Integer customerId) {
        List<ShippingDestinationDto> shippingDestinationDtos =
                JPA.em().createQuery("SELECT sd FROM ShippingDestinationDto sd" +
                                " WHERE sd.customerId=:customerId AND sd.dennoPartnerCode IS NOT NULL" +
                                " ORDER BY sd.dennoPartnerCode",
                        ShippingDestinationDto.class)
                        .setParameter("customerId", customerId)
                        .getResultList();

        return shippingDestinationDtos;
    }

    @Override
    public ShippingDestinationDto findDefaultShippingDestination(int customerId) {
        TypedQuery<ShippingDestinationDto> query = JPA.em().createQuery("SELECT sd FROM ShippingDestinationDto sd" +
                        " WHERE sd.customerId=:customerId" +
                        " AND sd.defaultFlag = :defaultFlag",
                ShippingDestinationDto.class)
                .setParameter("customerId", customerId)
                .setParameter("defaultFlag", 1);

        return getSingleResultOrNull(query);
    }
}
