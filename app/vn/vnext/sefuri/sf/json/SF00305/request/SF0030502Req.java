package vn.vnext.sefuri.sf.json.SF00305.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 3/15/2017.
 */
public class SF0030502Req extends AbstractJson {

    @JsonProperty("quotationCode")
    private String quotationCode;

    @JsonProperty("recipients")
    private List<String> recipients;

    @JsonProperty("cc")
    private List<String> cc;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("mailContent")
    private String mailContent;

    @JsonProperty("attachFiles")
    private List<String> attachFiles;

    @JsonProperty("mimeTypes")
    private List<String> mimeTypes;

    @JsonProperty("timestamp")
    private String timestamp;

    @JsonProperty("dealCode")
    private String dealCode;

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getQuotationCode() {
        return quotationCode;
    }

    public void setQuotationCode(String quotationCode) {
        this.quotationCode = quotationCode;
    }

    public List<String> getRecipients() {
        return recipients;
    }

    public void setRecipients(List<String> recipients) {
        this.recipients = recipients;
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

    public String getMailContent() {
        return mailContent;
    }

    public void setMailContent(String mailContent) {
        this.mailContent = mailContent;
    }

    public List<String> getAttachFiles() {
        return attachFiles;
    }

    public void setAttachFiles(List<String> attachFiles) {
        this.attachFiles = attachFiles;
    }

    public List<String> getMimeTypes() {
        return mimeTypes;
    }

    public void setMimeTypes(List<String> mimeTypes) {
        this.mimeTypes = mimeTypes;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
