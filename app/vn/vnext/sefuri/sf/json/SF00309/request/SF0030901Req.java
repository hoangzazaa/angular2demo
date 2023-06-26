package vn.vnext.sefuri.sf.json.SF00309.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_DealJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_MailTemplateJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_ProductBoxJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0030901Req extends AbstractJson {
    @JsonProperty("deal")
    private SF00309_DealJson deal;

    @JsonProperty("productBoxes")
    private List<SF00309_ProductBoxJson> productBoxes = Lists.newArrayList();

    @JsonProperty("mailTemplate")
    private SF00309_MailTemplateJson mailTemplate;

    @JsonProperty("requestModel")
    private SF00309_RequestModelJson requestModel;

    public SF00309_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00309_DealJson deal) {
        this.deal = deal;
    }

    public List<SF00309_ProductBoxJson> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00309_ProductBoxJson> productBoxes) {
        this.productBoxes = productBoxes;
    }

    public SF00309_MailTemplateJson getMailTemplate() {
        return mailTemplate;
    }

    public void setMailTemplate(SF00309_MailTemplateJson mailTemplate) {
        this.mailTemplate = mailTemplate;
    }

    public SF00309_RequestModelJson getRequestModel() {
        return requestModel;
    }

    public void setRequestModel(SF00309_RequestModelJson requestModel) {
        this.requestModel = requestModel;
    }
}
