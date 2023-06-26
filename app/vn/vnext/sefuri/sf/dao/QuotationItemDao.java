package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.QuotationItemDaoImpl;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;

import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
@ImplementedBy(QuotationItemDaoImpl.class)
public interface QuotationItemDao extends GenericDao<QuotationItemDto> {

    List<QuotationItemDto> getQuotationItemsByQuotationId(Integer quotation);

    int deleteQuotationItem(Integer quotationId);

    List<QuotationItemDto> getQuotationItemsByDealProductId(Integer dealProductId);

    List<Object[]> getQuotationItemByMaxLot(List<Integer> quotationItemIds);

    /**
     * Get list {@link QuotationItemDto} by dealId and productId.
     *
     * @param dealId    deal id
     * @param productIds current list product highlight
     * @return list {@link QuotationItemDto}
     */
    List<QuotationItemDto> getQuotationItemsByDealIdAndProductId(Integer dealId, List<Integer> productIds);

}
