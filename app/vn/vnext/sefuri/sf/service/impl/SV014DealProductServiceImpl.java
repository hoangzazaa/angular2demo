package vn.vnext.sefuri.sf.service.impl;

import com.google.inject.Inject;
import vn.vnext.sefuri.sf.dao.*;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.service.SV014DealProductService;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.List;

/**
 * Created by hoangtd on 1/12/2017.
 */
public class SV014DealProductServiceImpl implements SV014DealProductService {
    @Inject
    private DealProductDao dealProductDao;

    @Inject
    private ProductOutputDao productOutputDao;

    @Inject
    private ProductCommonFeeDao productCommonFeeDao;

    @Inject
    private ProductDao productDao;

    @Inject
    private OfferDao offerDao;


    @Override
    public List<DealProductDto> sv01401GetDealProductByDealId(Integer dealId) {
        List<DealProductDto> dealProductDtos = dealProductDao.getDealProductByDealId(dealId);

        if (CollectionUtil.isNotEmpty(dealProductDtos)) {
            dealProductDtos.forEach(dealProductDto -> {
                // get product
                ProductDto productDto = productDao.find(dealProductDto.getProductId());
                //get product output
                List<ProductOutputDto> productOutputDtos = productOutputDao.getProductOutputByDealProductId
                        (dealProductDto.getId());
                // get product common fee
                ProductCommonFeeDto productCommonFeeDto = productCommonFeeDao.getProductCommonFee(productDto.getId());
                // set productOutputDto and ProductCommonFee to Product dto
                productDto.setProductCommon(productCommonFeeDto);
                // get offer
                productOutputDtos.forEach(productOutputDto -> {
                    productOutputDto.setOffer(offerDao.getOfferByProductOutputId(productOutputDto.getId()));
                });
                // set offer and product to dealProduct
                dealProductDto.setProductOutputs(productOutputDtos);
                // set product to deal product
                dealProductDto.setProduct(productDto);
            });
        }

        return dealProductDtos;
    }

    @Override
    public DealProductDto sv01402GetDealProductById(Integer dealProductId) {
        return dealProductDao.find(dealProductId);
    }

    @Override
    public void sv01403UpdateDealProduct(final DealProductDto dealProductDto) {
        dealProductDao.update(dealProductDto);
    }

    @Override
    public List<DealProductDto> sv01404GetDealProductsByProductId(Integer productId) {
        return dealProductDao.getDealProductByProductId(productId);
    }

    @Override
    public DealProductDto sv01405GetDealProductByDealIdAndProductId(Integer dealId, Integer productId) {
        return dealProductDao.getDealProductByDealIdAndProductId(dealId, productId);
    }

    @Override
    public List<DealProductDto> sv01407GetOnlyDealProductByProductId(Integer productId) {
        return dealProductDao.getOnlyDealProductByProductId(productId);
    }

    @Override
    public DealProductDto sv01408SaveDealProduct(DealProductDto dealProductDto) {
        if (dealProductDto.getId() == null) {
            return dealProductDao.create(dealProductDto);
        } else {
            return dealProductDao.update(dealProductDto);
        }
    }
}
