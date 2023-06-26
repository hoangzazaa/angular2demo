package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.ProductDao;
import vn.vnext.sefuri.sf.dto.MstWoodenDto;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.util.CollectionUtil;

import java.util.List;

/**
 * Created by VuPT on 10/25/2016.
 */
public class ProductDaoImpl extends GenericDaoImpl<ProductDto> implements ProductDao {
    public ProductDaoImpl() {
        super(ProductDto.class);
    }

    @Override
    public ProductDto getProduct(String dealCode, String productCode) {
        List<ProductDto> productDtos = JPA.em().createQuery("SELECT product FROM ProductDto product, DealProductDto " +
                "dealProduct, DealDto deal" +
                " WHERE product.id =dealProduct.productId AND dealProduct.dealId = deal.id AND product" +
                ".productCode=:productCode AND deal.dealCode = :dealCode", ProductDto.class)
                .setParameter("dealCode", dealCode)
                .setParameter("productCode", productCode)
                .getResultList();
        if (CollectionUtil.isNotEmpty(productDtos)) {
            return productDtos.get(0);
        }
        return null;
    }

    @Override
    public List<ProductDto> getProductsBydealIds(List<Integer> dealIds) {
        return JPA.em().createQuery("SELECT DISTINCT pro FROM ProductDto  pro " +
                "INNER JOIN DealProductDto dp ON dp.productId=pro.id " +
                "INNER JOIN DealDto deal ON deal.id=dp.dealId AND deal.id IN :dealIds", ProductDto.class)
                .setParameter("dealIds", dealIds)
                .getResultList();
    }

    @Override
    public Integer updateHighlightFlagById(Integer itemId, Integer status) {
        JPA.em().createQuery("UPDATE DealProductDto dp set dp.highlightFlag= :status WHERE dp.id = :itemId")
                .setParameter("status", status)
                .setParameter("itemId", itemId)
                .executeUpdate();

        return status;
    }

    /**
     * Method use to set primary_flag = 0 of all {@link ProductFileDto} of {@link ProductDto}
     * without current {@link ProductFileDto}.
     *
     * @param productFile the current product file will be ignore.
     */
    @Override
    public void resetOthersPrimaryFlag(final ProductFileDto productFile) {
        JPA.em().createQuery("UPDATE ProductFileDto SET primaryFlag = :status WHERE productId = :productId AND id" +
                " <> :currentId").setParameter("status", Enums.Status.PRIMARY_FLAG_OFF.getStatus())
                .setParameter("productId", productFile.getProductId())
                .setParameter("currentId", productFile.getId()).executeUpdate();
    }

    /**
     * Find all {@link ProductDto} by current list product ids.
     *
     * @param productIds list selected product ids
     * @return list {@link ProductDto}
     */
    @Override
    public List<ProductDto> getProductsByIds(List<Integer> productIds) {
        return JPA.em().createQuery("SELECT p FROM ProductDto p WHERE p.id IN :productIds order by  p.updatedDate DESC", ProductDto.class)
                .setParameter("productIds", productIds)
                .getResultList();
    }

    @Override
    public Long getTotalRecords() {
         String query= "select COUNT(*) from sfr_sf_product p\n" +
                     " WHERE p.request_design_flag = 1 \n" +
                     " AND EXISTS(SELECT * from sfr_sf_deal_product dp WHERE p.id=dp.product_id)";
        Object ob = JPA.em().createNativeQuery(query).getSingleResult();
        return Long.valueOf(ob.toString());
    }

    @Override
    public List<ProductDto> getProductsByDealId(final Integer dealId) {
        //#2223: only includes product was set highlight_flag is on, excludes highlight_flag is off
        return JPA.em().createQuery("SELECT distinct p FROM ProductDto p" +
                                            " inner join DealProductDto dp on dp.productId = p.id" +
                                            " inner join DealDto d on d.id = dp.dealId" +
                                            " where d.id=:dealId and dp.highlightFlag= :highlightFlag", ProductDto.class)
                .setParameter("dealId", dealId)
                .setParameter("highlightFlag", Enums.Status.HIGHLIGHT_FLAG_ON.getStatus())
                .getResultList();
    }

    @Override
    public List<ProductDto> getProductsInDealProduct(int startPosition, int maxResult) {
        String qlString = "SELECT p FROM ProductDto p WHERE p.requestDesignFlag = 1"
                + " AND EXISTS (SELECT dp FROM DealProductDto dp WHERE p.id = dp.productId) ORDER BY p.updatedDate DESC";
        return JPA.em().createQuery(qlString, ProductDto.class)
                .setFirstResult(startPosition)
                .setMaxResults(maxResult)
                .getResultList();
    }

    @Override
    public MstWoodenDto getWoodenByProductid(String woodenCode) {
        List<MstWoodenDto> mstWoodenDtos = JPA.em().createQuery("SELECT w from ProductDto p " +
                "inner join MstWoodenDto w on p.woodenCode = w.woodenCode " +
                "where p.woodenCode=:woodenCode")
                .setParameter("woodenCode", woodenCode)
                .getResultList();
        return CollectionUtil.isNotEmpty(mstWoodenDtos) ? mstWoodenDtos.get(0) : null;
    }


    @Override
    public  Integer coutGoodenCodeCommon(String woodenCode) {
        String query = "SELECT Count(*) FROM `sfr_sf_product` p\n" +
                        "INNER JOIN sfr_sf_mst_wooden w on p.wooden_code = w.wooden_code\n" +
                        "where p.wooden_code = :woodenCode\n" +
                        "AND NOW()< w.wooden_expired_date\n";
        Object object = JPA.em().createNativeQuery(query).setParameter("woodenCode", woodenCode).getSingleResult();
        return Integer.valueOf(object.toString());
    }

    @Override
    public Integer getProductId(String productCode) {
        String query = "SELECT id FROM `sfr_sf_product` " +
                        "WHERE product_code = :productCode";
        Object object = JPA.em().createNativeQuery(query).setParameter("productCode", productCode).getSingleResult();
        return Integer.valueOf(object.toString());
    }
}
