package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.OfferDaoImpl;
import vn.vnext.sefuri.sf.dto.OfferDto;

import java.util.List;

/**
 * Created by DungTQ on 1/3/2017.
 */
@ImplementedBy(OfferDaoImpl.class)
public interface OfferDao extends GenericDao<OfferDto> {

    /**
     * Get list offer by deal productOutputId
     *
     * @param productOutputId
     * @return
     */
    List<OfferDto> getOfferDtoByProductOutputId(Integer productOutputId);

    /**
     * delete Offer by productOutputId
     *
     * @param productOutputId
     * @return int
     */
    int deleteOfferByProductOutputId(Integer productOutputId);

    /**
     * Get offer by productOutputId
     *
     * @param productOutputId
     * @return
     */
    OfferDto getOfferByProductOutputId(Integer productOutputId);


}
