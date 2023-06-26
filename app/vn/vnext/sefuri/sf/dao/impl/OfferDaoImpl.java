package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.OfferDao;
import vn.vnext.sefuri.sf.dto.OfferDto;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by DungTQ on 1/3/2017.
 */
public class OfferDaoImpl extends GenericDaoImpl<OfferDto> implements OfferDao {

    public OfferDaoImpl() {
        super(OfferDto.class);
    }


    @Override
    public List<OfferDto> getOfferDtoByProductOutputId(Integer productOutputId) {
        return JPA.em().createQuery("SELECT offer from OfferDto offer WHERE offer.productOutputId=:productOutputId",
                OfferDto.class)
                .setParameter("productOutputId", productOutputId)
                .getResultList();
    }

    @Override
    public int deleteOfferByProductOutputId(Integer productOutputId) {
        Query query = JPA.em().createQuery(
                "DELETE FROM OfferDto offer WHERE offer.productOutputId = :productOutputId");
        return query.setParameter("productOutputId", productOutputId).executeUpdate();
    }

    @Override
    public OfferDto getOfferByProductOutputId(Integer productOutputId) {
        List<OfferDto> result = JPA.em().createQuery("SELECT offer from OfferDto offer WHERE offer" +
                ".productOutputId=:productOutputId", OfferDto.class)
                .setParameter("productOutputId", productOutputId)
                .getResultList();
        if (result.size() > 0) {
            return result.get(0);
        } else {
            return null;
        }
    }

}
