package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030208Req extends AbstractJson {
    @JsonProperty("productFileId")
    private Integer productFileId;

    public Integer getProductFileId() {
        return productFileId;
    }

    public void setProductFileId(Integer productFileId) {
        this.productFileId = productFileId;
    }
}
