package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class SF0080101Res extends AbstractJson {

    @JsonProperty("status")
    private Integer status;

    @JsonProperty("messages")
    private List<String> messages;

    @JsonProperty("result")
    private SF0080101ResultJson result;

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

    public SF0080101ResultJson getResult() {
        return result;
    }

    public void setResult(SF0080101ResultJson result) {
        this.result = result;
    }
}
