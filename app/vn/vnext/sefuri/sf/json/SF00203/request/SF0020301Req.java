package vn.vnext.sefuri.sf.json.SF00203.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 3/8/2017.
 */
public class SF0020301Req extends AbstractJson {

    @JsonProperty("indexFrom")
    private Integer indexFrom;

    @JsonProperty("indexTo")
    private Integer indexTo;

    public Integer getIndexFrom() {
        return indexFrom;
    }

    public void setIndexFrom(Integer indexFrom) {
        this.indexFrom = indexFrom;
    }

    public Integer getIndexTo() {
        return indexTo;
    }

    public void setIndexTo(Integer indexTo) {
        this.indexTo = indexTo;
    }
}
