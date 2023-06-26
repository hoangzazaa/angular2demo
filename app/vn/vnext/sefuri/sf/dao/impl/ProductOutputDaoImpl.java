package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.ProductOutputDao;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by VuPT on 10/26/2016.
 */
public class ProductOutputDaoImpl extends GenericDaoImpl<ProductOutputDto> implements ProductOutputDao, Constants {
    public ProductOutputDaoImpl() {
        super(ProductOutputDto.class);
    }

    @Override
    public List<ProductOutputDto> getProductOutputByDealProductId(Integer dealProductId) {
        return JPA.em().createQuery("SELECT po FROM ProductOutputDto po WHERE po.dealProductId =:dealProductId",
                ProductOutputDto.class)
                .setParameter("dealProductId", dealProductId)
                .getResultList();
    }

    @Override
    public int deleteProductOutputByDealProductId(Integer dealProductId) {
        Query query = JPA.em().createQuery("delete from  ProductOutputDto productOutput where productOutput" +
                ".dealProductId = :dealProductId");
        return query.setParameter("dealProductId", dealProductId).executeUpdate();
    }

    @Override
    public ProductOutputDto getProductOutputSelected(final Integer dealProductId) {
        List<ProductOutputDto> productOutputDtos;

        Long count = JPA.em().createQuery("SELECT count(po) FROM ProductOutputDto po WHERE po.dealProductId =:dealProductId and po.primaryFlag = 1", Long.class)
                .setParameter("dealProductId", dealProductId)
                .getSingleResult();

        if (count != null && count > 0) {
            productOutputDtos = JPA.em().createQuery("SELECT po FROM ProductOutputDto po WHERE po.dealProductId =:dealProductId and po.primaryFlag = 1", ProductOutputDto.class)
                    .setParameter("dealProductId", dealProductId)
                    .getResultList();
        } else {
            productOutputDtos = JPA.em().createQuery("SELECT po FROM ProductOutputDto po WHERE po.dealProductId =:dealProductId  order by po.lot desc", ProductOutputDto.class)
                    .setParameter("dealProductId", dealProductId)
                    .setMaxResults(1)
                    .getResultList();
        }
        if (CollectionUtil.isNotEmpty(productOutputDtos)) {
            return productOutputDtos.get(0);
        }
        return null;
    }
}