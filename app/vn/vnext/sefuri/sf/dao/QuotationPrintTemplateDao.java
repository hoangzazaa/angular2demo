package vn.vnext.sefuri.sf.dao;

import com.google.inject.ImplementedBy;
import vn.vnext.sefuri.sf.dao.impl.QuotationPrintTemplateDaoImpl;
import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;

import java.util.List;

/**
 * Created by manhnv on 1/9/2017.
 */
@ImplementedBy(QuotationPrintTemplateDaoImpl.class)
public interface QuotationPrintTemplateDao extends GenericDao<QuotationPrintTemplateDto> {
    List<QuotationPrintTemplateDto> findAll();
}
