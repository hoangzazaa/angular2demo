package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ProductFileDaoImpl;
import vn.vnext.sefuri.sf.dto.ProductFileDto;

import java.util.List;

/**
 * @author hoangtd
 */
@ImplementedBy(ProductFileDaoImpl.class)
public interface ProductFileDao extends GenericDao<ProductFileDto> {

    /**
     * get List ProductFile by productCode
     *
     * @param productId
     * @return list ProductFileDto
     */
    List<ProductFileDto> getListProductFileByProductId(Integer productId);

    /**
     * Get productFile by fileType and productId
     *
     * @param productId
     * @param fileType
     * @return
     */
    List<ProductFileDto> getProductFileByFileTypeAndProductId(Integer productId, Integer fileType);

    ProductFileDto getProductFile(Integer productId, Integer fileId);
}
