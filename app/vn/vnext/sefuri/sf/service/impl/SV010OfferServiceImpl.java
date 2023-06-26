package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.DealProductDao;
import vn.vnext.sefuri.sf.dao.OfferDao;
import vn.vnext.sefuri.sf.dao.ProductOutputDao;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.OfferDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.service.SV010OfferService;

/**
 * Created by DungTQ on 1/4/2017.
 */
public class SV010OfferServiceImpl implements SV010OfferService {
    @Inject
    private OfferDao offerDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private DealProductDao dealProductDao;

    @Override
    public void sv01002UpdateOffer(DealProductDto dealProductDto, OfferDto offerDto) {
        ProductOutputDto productOutputDto = offerDto.getProductOutput();
        productOutputDto.setDealProductId(productOutputDao.find(productOutputDto.getId()).getDealProductId());
        productOutputDao.update(productOutputDto);
        offerDto.setProductOutputId(offerDao.find(offerDto.getId()).getProductOutputId());
        offerDao.update(offerDto);

        // update updatedDate dealProduct
        dealProductDao.update(dealProductDto);
    }

    @Override
    public OfferDto sv01003GetOfferByProductOutputId(Integer productOutputId) {
        return offerDao.getOfferByProductOutputId(productOutputId);
    }

}
