package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.ProductDaoImpl;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;

import java.util.List;

/**
 * Created by VuPT on 10/25/2016.
 */
@ImplementedBy(ProductDaoImpl.class)
public interface ProductDao extends GenericDao<ProductDto> {
    /**
     * get Product
     *
     * @param dealCode
     * @param productId
     * @return ProductDto
     */
    ProductDto getProduct(String dealCode, String productId);

    List<ProductDto> getProductsBydealIds(List<Integer> dealIds);

    /**
     * Update highlight Flag by id
     *
     * @param itemId
     * @param status
     * @return
     */
    Integer updateHighlightFlagById(Integer itemId, Integer status);

    /**
     * Method use to set primary_flag = 0 of all {@link vn.vnext.sefuri.sf.dto.ProductFileDto} of {@link ProductDto}
     * without current {@link vn.vnext.sefuri.sf.dto.ProductFileDto}.
     *
     * @param productFile the current product file will be ignore.
     */
    void resetOthersPrimaryFlag(ProductFileDto productFile);

    /**
     * Find all {@link ProductDto} by current list product ids.
     *
     * @param productIds list selected product ids
     * @return list {@link ProductDto}
     */
    List<ProductDto> getProductsByIds(List<Integer> productIds);

    Long getTotalRecords();

    List<ProductDto> getProductsByDealId(Integer dealId);

    List<ProductDto> getProductsInDealProduct(int startPosition, int maxResult);

    MstWoodenDto getWoodenByProductid(String woodenCode);

    Integer coutGoodenCodeCommon(String woodenCode);

    Integer getProductId(String productCode);
}
