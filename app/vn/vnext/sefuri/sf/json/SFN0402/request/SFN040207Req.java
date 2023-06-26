package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0402.model.MailJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040207Req extends AbstractJson {

    @JsonProperty("mail")
    private MailJson mail;

    public MailJson getMail() {
        return mail;
    }

    public void setMail(MailJson mail) {
        this.mail = mail;
    }
}
