package vn.vnext.sefuri.sf.json.SF00306.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00306.model.*;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0030601Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00306_DealJson deal;

    @JsonProperty("checkSheets")
    private List<SF00306_CheckSheetJson> checkSheets = Lists.newArrayList();

    @JsonProperty("productBoxes")
    private List<SF00306_ProductBoxJson> productBoxes = Lists.newArrayList();

    @JsonProperty("templateMail")
    private SF00306_TemplateMailJson templateMail;

    @JsonProperty("departments")
    private List<SF00306_DepartmentJson> departments = Lists.newArrayList();

    @JsonProperty("laminations")
    private List<MstLaminationJson> laminations = Lists.newArrayList();

    public SF00306_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00306_DealJson deal) {
        this.deal = deal;
    }

    public List<SF00306_CheckSheetJson> getCheckSheets() {
        return checkSheets;
    }

    public void setCheckSheets(List<SF00306_CheckSheetJson> checkSheets) {
        this.checkSheets = checkSheets;
    }

    public List<SF00306_ProductBoxJson> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00306_ProductBoxJson> productBoxes) {
        this.productBoxes = productBoxes;
    }

    public SF00306_TemplateMailJson getTemplateMail() {
        return templateMail;
    }

    public void setTemplateMail(SF00306_TemplateMailJson templateMail) {
        this.templateMail = templateMail;
    }

    public List<SF00306_DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<SF00306_DepartmentJson> departments) {
        this.departments = departments;
    }

    public List<MstLaminationJson> getLaminations() {
        return laminations;
    }

    public void setLaminations(final List<MstLaminationJson> laminations) {
        this.laminations = laminations;
    }
}
