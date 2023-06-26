package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.ProductFileDao;
import vn.vnext.sefuri.sf.dto.ProductFileDto;

import java.util.List;

/**
 * @author hoangtd
 */
public class ProductFileDaoImpl extends GenericDaoImpl<ProductFileDto> implements ProductFileDao {

    public ProductFileDaoImpl() {
        super(ProductFileDto.class);
    }

    @Override
    public List<ProductFileDto> getListProductFileByProductId(Integer productId) {
        return JPA.em().createQuery("select pf from ProductFileDto pf where pf.productId=:productId", ProductFileDto
                .class)
                .setParameter("productId", productId).getResultList();
    }

    @Override
    public List<ProductFileDto> getProductFileByFileTypeAndProductId(Integer productId, Integer fileType) {
        return JPA.em().createQuery("select pf from ProductFileDto pf " +
                "where pf.productId=:productId " +
                "AND pf.type = :type", ProductFileDto.class)
                .setParameter("productId", productId)
                .setParameter("type", fileType)
                .getResultList();
    }

    @Override
    public ProductFileDto getProductFile(final Integer productId, final Integer fileId) {
        String query = "SELECT DISTINCT pf FROM ProductFileDto pf WHERE pf.productId=:productId AND pf.fileId=:fileId";
        return JPA.em().createQuery(query, ProductFileDto.class)
                .setParameter("productId", productId)
                .setParameter("fileId", fileId)
                .setMaxResults(1).getSingleResult();
    }
}
