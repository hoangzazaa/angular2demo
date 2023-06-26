package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.DealProductDaoImpl;
import vn.vnext.sefuri.sf.dto.DealProductDto;

import java.util.List;

/**
 * Created by VuPT on 10/27/2016.
 */
@ImplementedBy(DealProductDaoImpl.class)
public interface DealProductDao extends GenericDao<DealProductDto> {
    /**
     * Get deal product by deal code and product code
     *
     * @param dealCode
     * @param productCode
     * @return
     */
    DealProductDto getDealProduct(String dealCode, String productCode);


    /**
     * Get list deal product by deal id
     *
     * @param dealId
     * @return
     */
    List<DealProductDto> getDealProductByDealId(Integer dealId);

    boolean isProductInUsed(Integer productId);

    List<DealProductDto> getDealProductByProductId(Integer productId);

    /**
     * Get {@link DealProductDto} by dealId and productId.
     *
     * @param dealId    deal id
     * @param productId product id
     * @return {@link DealProductDto}
     */
    DealProductDto getDealProductByDealIdAndProductId(Integer dealId, Integer productId);


    /**
     * @param productId
     * @return List DealProductDto
     * @author nguyenPK
     */
    List<DealProductDto> getOnlyDealProductByProductId(int productId);
}
