package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.common.Enums;
import vn.vnext.sefuri.sf.dao.QuotationItemDao;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;

import javax.persistence.Query;
import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
public class QuotationItemDaoImpl extends GenericDaoImpl<QuotationItemDto> implements QuotationItemDao {
    public QuotationItemDaoImpl() {
        super(QuotationItemDto.class);
    }

    @Override
    public List<QuotationItemDto> getQuotationItemsByQuotationId(Integer quotationId) {
        List<QuotationItemDto> quotationItemDtos =
                JPA.em().createQuery("select qi from QuotationItemDto qi where qi.quotationId=:quotationId ORDER BY " +
                        "qi.itemIndex ASC", QuotationItemDto.class)
                        .setParameter("quotationId", quotationId)
                        .getResultList();

        return quotationItemDtos;
    }

    @Override
    public List<QuotationItemDto> getQuotationItemsByDealProductId(Integer dealProductId) {
        List<QuotationItemDto> quotationItemDtos =
                JPA.em().createQuery("select qi from QuotationItemDto qi where qi.dealProductId=:dealProductId",
                        QuotationItemDto.class)
                        .setParameter("dealProductId", dealProductId)
                        .getResultList();

        return quotationItemDtos;
    }

    @Override
    public List<Object[]> getQuotationItemByMaxLot(List<Integer> quotationItemIds) {
        List<Object[]> q = JPA.em().createQuery("select qi,po,offer from QuotationItemDto qi " +
                "INNER JOIN ProductOutputDto po ON po.dealProductId=qi.dealProductId " +
                "INNER JOIN OfferDto offer ON offer.productOutputId= po.id " +
                "WHERE qi.id IN :quotationItemIds order by po.lot desc", Object[].class)
                .setParameter("quotationItemIds", quotationItemIds)
                .setMaxResults(1)
                .getResultList();

        return q;
    }

    @Override
    public List<QuotationItemDto> getQuotationItemsByDealIdAndProductId(Integer dealId, List<Integer> productIds) {
        return JPA.em().createQuery("select distinct qi from QuotationItemDto qi inner join QuotationDto q on q.id = qi.quotationId"
                + " inner join DealDto d on d.id = q.dealId inner join DealProductDto dp on dp.dealId = d.id"
                + " inner join ProductDto p on p.id = dp.productId"
                + " where d.id=:dealId and p.id in :productIds and q.highlightFlag=:highlightFlag order by qi.updatedDate desc", QuotationItemDto.class)
                .setParameter("dealId", dealId)
                .setParameter("productIds", productIds)
                .setParameter("highlightFlag", Enums.Status.HIGHLIGHT_FLAG_ON.getStatus())
                .getResultList();
    }

    @Override
    public int deleteQuotationItem(Integer quotationId) {
        Query query = JPA.em().createQuery(
                "delete from QuotationItemDto  quotationItem where quotationItem.quotationId = :quotationId");
        return query.setParameter("quotationId", quotationId).executeUpdate();
    }
}
