package vn.vnext.sefuri.sf.json.SF00305.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 3/15/2017.
 */
public class SF0030501Res extends AbstractJson {
    @JsonProperty("timestamp")
    private String timestamp;

    @JsonProperty("mailAddress")
    private String mailAddress;

    @JsonProperty("mailTemplate")
    private String mailTemplate;

    @JsonProperty("attachFile")
    private String attachFile;

    @JsonProperty("attachFileUri")
    private String attachFileUri;

    public String getAttachFileUri() {
        return attachFileUri;
    }

    public void setAttachFileUri(String attachFileUri) {
        this.attachFileUri = attachFileUri;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getMailAddress() {
        return mailAddress;
    }

    public void setMailAddress(String mailAddress) {
        this.mailAddress = mailAddress;
    }

    public String getMailTemplate() {
        return mailTemplate;
    }

    public void setMailTemplate(String mailTemplate) {
        this.mailTemplate = mailTemplate;
    }

    public String getAttachFile() {
        return attachFile;
    }

    public void setAttachFile(String attachFile) {
        this.attachFile = attachFile;
    }
}
