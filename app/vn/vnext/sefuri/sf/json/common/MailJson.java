package vn.vnext.sefuri.sf.json.common;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by VuPT on 11/30/2016.
 */
public class MailJson {
    @JsonProperty("addressTo")
    private String addressTo;

    @JsonProperty("addressCc")
    private String addressCC;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("content")
    private String content;

    public String getAddressTo() {
        return addressTo;
    }

    public void setAddressTo(String addressTo) {
        this.addressTo = addressTo;
    }

    public String getAddressCC() {
        return addressCC;
    }

    public void setAddressCC(String addressCC) {
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
}
