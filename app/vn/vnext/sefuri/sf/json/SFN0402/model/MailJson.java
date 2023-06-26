package vn.vnext.sefuri.sf.json.SFN0402.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by Teddy on 8/2/2017.
 */
public class MailJson {

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
