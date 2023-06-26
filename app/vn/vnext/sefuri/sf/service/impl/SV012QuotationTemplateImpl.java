package vn.vnext.sefuri.sf.service.impl;

import vn.vnext.sefuri.sf.dao.QuotationPrintTemplateDao;
import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;
import vn.vnext.sefuri.sf.service.SV012QuotationTemplate;

import javax.inject.Inject;
import java.util.List;

/**
 * Created by DungTQ on 5/10/2017.
 */
public class SV012QuotationTemplateImpl implements SV012QuotationTemplate {

    @Inject
    private QuotationPrintTemplateDao quotationTemplateDao;

    @Override
    public List<QuotationPrintTemplateDto> sv01203GetAllQuotationTemplates() {
        return quotationTemplateDao.findAll();
    }

    @Override
    public QuotationPrintTemplateDto sv01204GetPrintTemplateById(Integer printTemplateId) {
        return quotationTemplateDao.find(printTemplateId);
    }
}
