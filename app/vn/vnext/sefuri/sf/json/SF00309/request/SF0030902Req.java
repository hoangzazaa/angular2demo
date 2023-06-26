package vn.vnext.sefuri.sf.json.SF00309.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00309.model.SF003090_ParsedProductInfoJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_RequestModelJson;
import vn.vnext.sefuri.sf.json.SF00309.model.SF00309_AttachmentFileJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0030902Req extends AbstractJson {

    @JsonProperty("requestType")
    private Integer requestType;

    @JsonProperty("to")
    private List<String> to = Lists.newArrayList();

    @JsonProperty("cc")
    private List<String> cc = Lists.newArrayList();

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("content")
    private String content;

    @JsonProperty("dealId")
    private Integer dealId;

    @JsonProperty("products")
    private List<SF003090_ParsedProductInfoJson> products = Lists.newArrayList();

    @JsonProperty("attachmentFiles")
    private List<SF00309_AttachmentFileJson> attachmentFiles = Lists.newArrayList();

    public Integer getRequestType() {
        return requestType;
    }

    public void setRequestType(Integer requestType) {
        this.requestType = requestType;
    }

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

    public Integer getDealId() {
        return dealId;
    }

    public void setDealId(Integer dealId) {
        this.dealId = dealId;
    }

    public List<SF003090_ParsedProductInfoJson> getProducts() {
        return products;
    }

    public void setProducts(List<SF003090_ParsedProductInfoJson> products) {
        this.products = products;
    }

    public List<SF00309_AttachmentFileJson> getAttachmentFiles() {
        return attachmentFiles;
    }

    public void setAttachmentFiles(List<SF00309_AttachmentFileJson> attachmentFiles) {
        this.attachmentFiles = attachmentFiles;
    }

//    public SF00309_RequestModelJson getRequestModel() {
//        return requestModel;
//    }
//
//    public void setRequestModel(SF00309_RequestModelJson requestModel) {
//        this.requestModel = requestModel;
//    }
}
