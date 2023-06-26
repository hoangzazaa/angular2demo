package vn.vnext.sefuri.sf.json.SF00306.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00306.model.SF00306_ProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.ArrayList;
import java.util.List;

public class SF0030602Req extends AbstractJson {

    @JsonProperty("to")
    private List<String> to;

    @JsonProperty("cc")
    private List<String> cc;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("content")
    private String content;

    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("dealStatus")
    private Integer dealStatus;

    @JsonProperty("products")
    private List<SF00306_ProductJson> products = new ArrayList<>();

    public List<String> getTo() {
        return to;
    }

    public void setTo(List<String> to) {
        this.to = to;
    }

    public List<String> getCc() {
        return cc;
    }

    public void setCc(List<String> cc) {
        this.cc = cc;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<SF00306_ProductJson> getProducts() {
        return products;
    }

    public void setProducts(List<SF00306_ProductJson> products) {
        this.products = products;
    }

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public Integer getDealStatus() {
        return dealStatus;
    }

    public void setDealStatus(Integer dealStatus) {
        this.dealStatus = dealStatus;
    }
}
