package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.QuotationDao;
import vn.vnext.sefuri.sf.dto.QuotationDto;

import javax.persistence.TypedQuery;
import java.util.List;

/**
 * @author hoangtd
 */
public class QuotationDaoImpl extends GenericDaoImpl<QuotationDto> implements QuotationDao {

    public QuotationDaoImpl() {
        super(QuotationDto.class);
    }

    @Override
    public QuotationDto getQuotationByQuotationCode(String quotationCode) {
        TypedQuery<QuotationDto> query = JPA.em().createQuery("SELECT quotation FROM QuotationDto quotation " +
                "WHERE quotation.quotationCode=:quotationCode", QuotationDto.class)
                .setParameter("quotationCode", quotationCode);

        return getSingleResultOrNull(query);
    }

    @Override
    public List<QuotationDto> getQuotationByDealId(Integer dealId) {
        String query =
                "SELECT DISTINCT quotation FROM QuotationDto quotation " +
                        "WHERE quotation.dealId = :dealId  " +
                        "ORDER BY quotation.createdDate DESC";
        return JPA.em().createQuery(query, QuotationDto.class)
                .setParameter("dealId", dealId)
                .getResultList();
    }

    @Override
    public Object[] getQuotationAndDealByQuotationCode(String quotationCode) {
        String query =
                "SELECT quotation, deal FROM QuotationDto quotation " +
                        "INNER JOIN DealDto deal ON deal.id = quotation.dealId " +
                        "AND quotation.quotationCode = :quotationCode";
        List<Object[]> objects = JPA.em().createQuery(query)
                .setParameter("quotationCode", quotationCode)
                .getResultList();
        if (objects.size() > 0) {
            return objects.get(0);
        }
        return null;
    }

    @Override
    public Integer updateHighlightFlagById(Integer itemId, Integer status) {
        JPA.em().createQuery("UPDATE QuotationDto q set q.highlightFlag = :status WHERE q.id = :itemId")
                .setParameter("status", status)
                .setParameter("itemId", itemId)
                .executeUpdate();

        return status;
    }

}
