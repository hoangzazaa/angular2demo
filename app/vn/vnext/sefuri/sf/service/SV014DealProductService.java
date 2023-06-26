package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.service.impl.SV014DealProductServiceImpl;

import java.util.List;

/**
 * Created by hoangtd on 1/12/2017.
 */
@ImplementedBy(SV014DealProductServiceImpl.class)
public interface SV014DealProductService {

    /**
     * Get deal product by deal id
     *
     * @param dealId
     * @return
     */
    List<DealProductDto> sv01401GetDealProductByDealId(Integer dealId);

    /**
     * Get deal product by id
     *
     * @param dealProductId
     * @return
     */
    DealProductDto sv01402GetDealProductById(Integer dealProductId);

    void sv01403UpdateDealProduct(DealProductDto dealProductDto);

    List<DealProductDto> sv01404GetDealProductsByProductId(Integer productId);

    /**
     * Get {@link DealProductDto} by dealId and productId.
     *
     * @param dealId    deal id
     * @param productId product id
     * @return {@link DealProductDto}
     */
    DealProductDto sv01405GetDealProductByDealIdAndProductId(Integer dealId, Integer productId);

    /**
     * @param productId
     * @return List DealProductDto
     * @author nguyenPK
     */
    List<DealProductDto> sv01407GetOnlyDealProductByProductId(Integer productId);

    DealProductDto sv01408SaveDealProduct(DealProductDto dealProductDto);
}
