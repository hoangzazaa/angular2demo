package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 1/6/2017.
 */
public class SF0030210Res extends AbstractJson {
    @JsonProperty("Temp")
    String temp;

    public String getTemp() {
        return temp;
    }

    public void setTemp(String temp) {
        this.temp = temp;
    }
}
