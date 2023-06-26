package vn.vnext.sefuri.sf.json.SFN0307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0307.model.DestinationJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN030702Res extends AbstractJson {

    @JsonProperty("destination")
    private DestinationJson destination;

    public DestinationJson getDestination() {
        return destination;
    }

    public void setDestination(DestinationJson destination) {
        this.destination = destination;
    }
}
