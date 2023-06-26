package vn.vnext.sefuri.sf.json.SF00310.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00310.model.*;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0031002Req extends AbstractJson {

    @JsonProperty("mail")
    private SF00310_MailTemplateJson mail;

     @JsonProperty("deal")
    private SF00310_DealJson deal;

     @JsonProperty("products")
    private List<SF00310_ParsedProductInfoJson> products = Lists.newArrayList();

     @JsonProperty("requestModel")
    private SF00310_RequestModel requestModel;

    public SF00310_MailTemplateJson getMail() {
        return mail;
    }

    public void setMail(SF00310_MailTemplateJson mail) {
        this.mail = mail;
    }

    public SF00310_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00310_DealJson deal) {
        this.deal = deal;
    }

    public List<SF00310_ParsedProductInfoJson> getProducts() {
        return products;
    }

    public void setProducts(List<SF00310_ParsedProductInfoJson> products) {
        this.products = products;
    }

    public SF00310_RequestModel getRequestModel() {
        return requestModel;
    }

    public void setRequestModel(SF00310_RequestModel requestModel) {
        this.requestModel = requestModel;
    }
}
