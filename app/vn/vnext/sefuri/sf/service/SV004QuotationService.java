package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.DealProductDto;
import vn.vnext.sefuri.sf.dto.QuotationDto;
import vn.vnext.sefuri.sf.dto.QuotationItemDto;
import vn.vnext.sefuri.sf.service.impl.SV004QuotationServiceImpl;

import java.io.IOException;
import java.util.List;

/**
 * Created by DungTQ on 1/4/2017.
 */
@ImplementedBy(SV004QuotationServiceImpl.class)
public interface SV004QuotationService {

    /**
     * Get list quotation item by quotation id
     *
     * @param quotationId
     * @return
     */
    List<QuotationItemDto> sv00401GetQuotationItemsByQuotationId(Integer quotationId);

    /**
     * Get list quotation by deal id
     *
     * @param dealId
     * @return
     */
    List<QuotationDto> sv00402GetQuotationsByDealId(Integer dealId);

    /**
     * Get quotation by quotation code
     *
     * @param quotationCode
     * @return
     */
    QuotationDto sv00403GetQuotationByQuotationCode(String quotationCode);

    /**
     * Delete quotation by quotation id
     *
     * @param quotationId
     */
    boolean sv00404DeleteQuotation(Integer quotationId);

    /**
     * Delete quotation
     *
     * @param quotation
     */
    boolean sv00404DeleteQuotation(QuotationDto quotation);

    /**
     * Save quotation
     *
     * @param quotationDto
     * @return
     */
    QuotationDto sv00405SaveQuotation(QuotationDto quotationDto);

    /**
     * Copy and save quotation
     *
     * @param quotationDto
     * @return
     */
    QuotationDto sv00406CopyAndSaveQuotation(QuotationDto quotationDto);

    List<Object[]> sv00407GetQuotationItemByMaxLot(List<Integer> quotationItemIds);

    QuotationDto sv00410GetQuotationById(Integer quotationId);

    Object[] sv00408GetQuotationAndDealByQuotationCode(String quotationCode);

    /**
     * Get list {@link QuotationItemDto} by dealId and productId.
     *
     * @param dealId     deal id
     * @param productIds current list product highlight
     * @return list {@link QuotationItemDto}
     */
    List<QuotationItemDto> sv00409GetQuotationItemsByDealIdAndProductId(Integer dealId, List<Integer> productIds);

    /**
     * Get default {@link QuotationItemDto} default get by max quantity.
     *
     * @param quotationItems list will be looked up.
     * @param isAsc          flag to sort by {asc or desc}
     * @return {@link QuotationItemDto} has max quantity
     */
    QuotationItemDto sv00410GetDefaultQuotationItem(List<QuotationItemDto> quotationItems, boolean isAsc, Integer dealId, DealProductDto dealProduct);

    String sv00411GetQuotationThumbnail(String quotationCode) throws IOException;
}
