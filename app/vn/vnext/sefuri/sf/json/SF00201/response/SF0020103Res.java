package vn.vnext.sefuri.sf.json.SF00201.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 2/23/2017.
 */
public class SF0020103Res extends AbstractJson {
    @JsonProperty("count")
    private Long count;

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }
}
