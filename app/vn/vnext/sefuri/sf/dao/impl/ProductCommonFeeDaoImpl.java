package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.ProductCommonFeeDao;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by VuPT on 10/26/2016.
 */
public class ProductCommonFeeDaoImpl extends GenericDaoImpl<ProductCommonFeeDto> implements ProductCommonFeeDao {
    public ProductCommonFeeDaoImpl() {
        super(ProductCommonFeeDto.class);
    }

    @Override
    public ProductCommonFeeDto getProductCommonFee(Integer productId) {
        List<ProductCommonFeeDto> productCommonFeeDtos = JPA.em().createQuery("SELECT productCommon FROM " +
                "ProductCommonFeeDto productCommon WHERE productCommon.productId=:productId", ProductCommonFeeDto.class)
                .setParameter("productId", productId)
                .getResultList();
        if (CollectionUtil.isNotEmpty(productCommonFeeDtos)) {
            return productCommonFeeDtos.get(0);
        }
        return null;
    }

    @Override
    public int deleteProductCommonFeeByProductId(Integer productId) {
        Query query = JPA.em().createQuery("delete from  ProductCommonFeeDto prd where prd.productId = :productId");
        return query.setParameter("productId", productId).executeUpdate();
    }
}
