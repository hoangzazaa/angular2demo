package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.service.impl.SV010OfferServiceImpl;

/**
 * Created by DungTQ on 1/4/2017.
 */

@ImplementedBy(SV010OfferServiceImpl.class)
public interface SV010OfferService {

    /**
     * Update Offer
     *
     * @param offerDto
     */
    void sv01002UpdateOffer(DealProductDto dealProductDto, OfferDto offerDto);

    /**
     * Get offer by product Output Id
     *
     * @param productOutputId
     * @return
     */
    OfferDto sv01003GetOfferByProductOutputId(Integer productOutputId);
}
