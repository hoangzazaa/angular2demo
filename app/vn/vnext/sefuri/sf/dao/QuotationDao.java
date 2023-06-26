package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.QuotationDaoImpl;
import vn.vnext.sefuri.sf.dto.QuotationDto;

import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
@ImplementedBy(QuotationDaoImpl.class)
public interface QuotationDao extends GenericDao<QuotationDto> {

    /**
     * Get quotation dto by quotation code
     *
     * @param quotationCode
     * @return quotation
     */
    QuotationDto getQuotationByQuotationCode(String quotationCode);


    /**
     * get list quotation dto
     *
     * @param dealId
     * @return list quotation
     */
    List<QuotationDto> getQuotationByDealId(Integer dealId);

    /**
     * Get list quotation and deal by quotationCode
     *
     * @param quotationCode
     * @return
     */
    Object[] getQuotationAndDealByQuotationCode(String quotationCode);

    /**
     * Update highlight Flag by id
     *
     * @param itemId
     * @param status
     * @return
     */
    Integer updateHighlightFlagById(Integer itemId, Integer status);

}
