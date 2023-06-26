package vn.vnext.sefuri.sf.dao.impl;

import play.db.jpa.JPA;
import vn.vnext.sefuri.sf.dao.QuotationPrintTemplateDao;
import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;

import java.util.List;

/**
 * Created by manhnv on 1/9/2017.
 */
public class QuotationPrintTemplateDaoImpl extends GenericDaoImpl<QuotationPrintTemplateDto> implements
        QuotationPrintTemplateDao {
    public QuotationPrintTemplateDaoImpl() {
        super(QuotationPrintTemplateDto.class);
    }

    @Override
    public List<QuotationPrintTemplateDto> findAll() {
        return JPA.em().createQuery("SELECT quotationTemplate FROM QuotationPrintTemplateDto quotationTemplate",
                QuotationPrintTemplateDto.class)
                .getResultList();
    }
}
