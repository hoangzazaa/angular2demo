package vn.vnext.sefuri.sf.module.jms.json.if0121;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Created by haipt on 4/25/2017.
 */
public class IF0121Json {

    @JsonProperty("destinationId")
    private int destinationId;

    public int getDestinationId() {
        return destinationId;
    }

    public void setDestinationId(int destinationId) {
        this.destinationId = destinationId;
    }
}