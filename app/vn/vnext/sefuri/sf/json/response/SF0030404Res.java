package vn.vnext.sefuri.sf.json.response;

import vn.vnext.sefuri.sf.dto.QuotationPrintTemplateDto;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.QuotationPrintTemplateJson;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by VuPT on 11/14/2016.
 */
public class SF0030404Res extends AbstractJson {
    List<QuotationPrintTemplateJson> quotationTemplateJsons;

    public List<QuotationPrintTemplateJson> getQuotationTemplateJsons() {
        return quotationTemplateJsons;
    }

    public void setQuotationTemplateJsons(List<QuotationPrintTemplateJson> quotationTemplateJsons) {
        this.quotationTemplateJsons = quotationTemplateJsons;
    }

    public void createJson(List<QuotationPrintTemplateDto> quotationTemplateDtos) {
        quotationTemplateJsons = new ArrayList<>();
        for (QuotationPrintTemplateDto quotationTemplateDto : quotationTemplateDtos) {
            QuotationPrintTemplateJson templateJson = new QuotationPrintTemplateJson();
            templateJson.setData(quotationTemplateDto);
            quotationTemplateJsons.add(templateJson);
        }
    }
}
