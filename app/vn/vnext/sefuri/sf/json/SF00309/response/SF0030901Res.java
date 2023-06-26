package vn.vnext.sefuri.sf.json.SF00309.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_DealJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_DepartmentJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_MailTemplateJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_ProductBoxJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0030901Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00309_DealJson deal;

    @JsonProperty("productBoxes")
    private List<SF00309_ProductBoxJson> productBoxes = Lists.newArrayList();

    @JsonProperty("mailTemplate")
    private SF00309_MailTemplateJson mailTemplate;

    @JsonProperty("departments")
    private List<SF00309_DepartmentJson> departments;

    @JsonProperty("laminationJsons")
    private List<MstLaminationJson> laminationJsons;

    public List<SF00309_DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<SF00309_DepartmentJson> departments) {
        this.departments = departments;
    }

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

    public List<MstLaminationJson> getLaminationJsons() {
        return laminationJsons;
    }

    public void setLaminationJsons(List<MstLaminationJson> laminationJsons) {
        this.laminationJsons = laminationJsons;
    }
}
