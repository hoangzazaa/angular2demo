package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ProductOutputDaoImpl;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;

import java.util.List;

/**
 * Created by VuPT on 10/26/2016.
 */
@ImplementedBy(ProductOutputDaoImpl.class)
public interface ProductOutputDao extends GenericDao<ProductOutputDto> {

    /**
     * delete product output by product id
     *
     * @param dealProductId
     * @return
     */
    int deleteProductOutputByDealProductId(Integer dealProductId);

    /**
     * find product output by deal product Id
     *
     * @param dealProductId
     * @return
     */
    List<ProductOutputDto> getProductOutputByDealProductId(Integer dealProductId);

    ProductOutputDto getProductOutputSelected(Integer dealProductId);

}
