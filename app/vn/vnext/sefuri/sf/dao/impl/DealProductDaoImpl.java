package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dao.DealProductDao;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import javax.persistence.TypedQuery;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by VuPT on 10/27/2016.
 */
public class DealProductDaoImpl extends GenericDaoImpl<DealProductDto> implements DealProductDao, Constants {

    public DealProductDaoImpl() {
        super(DealProductDto.class);
    }

    @Override
    public DealProductDto getDealProduct(String dealCode, String productCode) {
        List<DealProductDto> dealProductDtos = JPA.em().createQuery("SELECT dealProduct FROM DealProductDto " +
                "dealProduct " +
                "INNER JOIN ProductDto product ON dealProduct.productId = product.id " +
                "AND product.productCode = :productCode " +
                "INNER JOIN DealDto deal ON deal.id = dealProduct.dealId " +
                "AND deal.dealCode = :dealCode " +
                "AND deal.deleteFlag=:deleteFlag", DealProductDto.class)
                .setParameter("dealCode", dealCode)
                .setParameter("productCode", productCode)
                .setParameter("deleteFlag", DELETE_DISABLE)
                .getResultList();
        if (CollectionUtil.isNotEmpty(dealProductDtos)) {
            return dealProductDtos.get(0);
        }

        return null;
    }

    @Override
    public List<DealProductDto> getDealProductByDealId(Integer dealId) {
        return JPA.em().createQuery("SELECT dp FROM DealProductDto dp WHERE dp.dealId=:dealId ORDER BY dp.updatedDate DESC", DealProductDto.class)
                .setParameter("dealId", dealId)
                .getResultList();
    }

    @Override
    public boolean isProductInUsed(Integer productId) {
        List<DealProductDto> dealProductDtos = JPA.em().createQuery("SELECT dealProduct FROM DealProductDto " +
                "dealProduct WHERE dealProduct.productId = :productId", DealProductDto.class)
                .setParameter("productId", productId)
                .getResultList();
        if (dealProductDtos.size() > 0) {
            return true;
        }
        return false;
    }

    @Override
    public List<DealProductDto> getDealProductByProductId(Integer productId) {
        return JPA.em().createQuery("SELECT dp FROM  DealProductDto dp WHERE dp.productId=:productId", DealProductDto.class)
                .setParameter("productId", productId)
                .getResultList();
    }

    @Override
    public DealProductDto getDealProductByDealIdAndProductId(Integer dealId, Integer productId) {
        TypedQuery<DealProductDto> dealProductDtoTypedQuery = JPA.em().createQuery("SELECT dp FROM DealProductDto dp WHERE dp.dealId=:dealId and dp.productId =:productId", DealProductDto.class).setParameter("dealId", dealId).setParameter("productId", productId);

        return getSingleResultOrNull(dealProductDtoTypedQuery);
    }

    public List<DealProductDto> getDealProductByListProductId(List<Integer> productIds) {
        List<Object[]> resultList = JPA.em().createNativeQuery("select  B.id as id, B.product_id AS  productId, B.deal_id as dealId from \n" +
                "(SELECT dp.product_id, MAX(dp.updated_date)  date from sfr_sf_deal_product dp GROUP BY product_id)  A ,\n" +
                "(SELECT pd.* \n" +
                " FROM sfr_sf_deal_product pd  \n" +
                "INNER JOIN sfr_sf_product p  on p.id = pd.product_id  \n" +
                "where p.id IN :productIds ) B \n" +
                "where A.product_id = B.product_id and A.date = B.updated_date")
                .setParameter("productIds", productIds)
                .getResultList();

        return mapObjectToDealProduct(resultList);
    }

    @Override
    public List<DealProductDto> getOnlyDealProductByProductId(int productId) {
        List<Object[]> result = JPA.em().createQuery("select  dp.id, dp.productId, dp.dealId , MAX (dp.updatedDate) from DealProductDto dp " +
                " INNER join ProductDto p on p.id = dp.productId " +
                " WHERE dp.productId =:productId")
                .setParameter("productId", productId)
                .getResultList();
        return mapObjectToDealProduct(result);
    }

    public List<DealProductDto> mapObjectToDealProduct(List<Object[]> resultList) {
        List<DealProductDto> dtoList = resultList.stream().map(objects -> {
            DealProductDto dto = new DealProductDto();
            dto.setId((Integer) objects[0]);
            dto.setProductId((Integer) objects[1]);
            dto.setDealId((Integer) objects[2]);
            return dto;
        }).collect(Collectors.toList());
        return dtoList;
    }

}
