package vn.vnext.sefuri.sf.service;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;
import vn.vnext.sefuri.sf.service.impl.SV012QuotationTemplateImpl;

import java.util.List;

/**
 * Created by DungTQ on 5/10/2017.
 */
@ImplementedBy(SV012QuotationTemplateImpl.class)
public interface SV012QuotationTemplate {
    /**
     * get All quotation templates
     *
     * @return List QuotationPrintTemplateDto
     */
    List<QuotationPrintTemplateDto> sv01203GetAllQuotationTemplates();

    QuotationPrintTemplateDto sv01204GetPrintTemplateById(Integer printTemplateId);

}
