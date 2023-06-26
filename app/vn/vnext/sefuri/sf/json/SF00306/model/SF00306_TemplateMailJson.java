package vn.vnext.sefuri.sf.json.SF00306.model;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by NguyenPK on 4/12/2017.
 */
public class SF00306_TemplateMailJson {
    @JsonProperty("to")
    private List<String> to;

    @JsonProperty("cc")
    private List<String> cc;

    @JsonProperty("subject")
    private String subject;

    @JsonProperty("content")
    private String content;

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
}
