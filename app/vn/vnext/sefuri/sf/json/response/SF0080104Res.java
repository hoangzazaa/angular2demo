package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 4/20/2017.
 */
public class SF0080104Res extends AbstractJson {
    @JsonProperty("status")
    private Integer status;

    @JsonProperty("messages")
    private List<String> messages;

    @JsonProperty("result")
    private SF0080104ResultJson resultJson;

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<String> getMessages() {
        return messages;
    }

    public void setMessages(List<String> messages) {
        this.messages = messages;
    }

    public SF0080104ResultJson getResultJson() {
        return resultJson;
    }

    public void setResultJson(SF0080104ResultJson resultJson) {
        this.resultJson = resultJson;
    }
}
