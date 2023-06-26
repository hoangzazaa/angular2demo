package vn.vnext.sefuri.sf.module.jms.json.mailjob;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by DungTQ on 6/26/2017.
 */
public class MailJson {
    @JsonProperty("addressTo")
    private List<String> addressTo;

    @JsonProperty("addressCc")
    private List<String> addressCC;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("content")
    private String content;

    @JsonProperty("attachments")
    private List<String> attachments;

    public List<String> getAddressTo() {
        return addressTo;
    }

    public void setAddressTo(List<String> addressTo) {
        this.addressTo = addressTo;
    }

    public List<String> getAddressCC() {
        return addressCC;
    }

    public void setAddressCC(List<String> addressCC) {
        this.addressCC = addressCC;
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

    public List<String> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<String> attachments) {
        this.attachments = attachments;
    }
}
