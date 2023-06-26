package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by ngocnm on 1/11/2017.
 */
public class SF0030108Req extends AbstractJson {
    //avoid to query db again to find the product based on productFileId
    @JsonProperty("productId")
    private Integer productId;

    @JsonProperty("productFileId")
    private Integer productFileId;

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(final Integer productId) {
        this.productId = productId;
    }

    public Integer getProductFileId() {
        return productFileId;
    }

    public void setProductFileId(Integer productFileId) {
        this.productFileId = productFileId;
    }
}
