package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ProductCommonFeeDaoImpl;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;

/**
 * Created by VuPT on 10/26/2016.
 */

@ImplementedBy(ProductCommonFeeDaoImpl.class)
public interface ProductCommonFeeDao extends GenericDao<ProductCommonFeeDto> {

    /**
     * get Product Common Fee by product ID
     *
     * @param productId
     * @return product common fee dto
     */
    ProductCommonFeeDto getProductCommonFee(Integer productId);

    /**
     * delete Product Common Fee by ProductID
     *
     * @param productId
     * @return int
     */
    int deleteProductCommonFeeByProductId(Integer productId);
}
