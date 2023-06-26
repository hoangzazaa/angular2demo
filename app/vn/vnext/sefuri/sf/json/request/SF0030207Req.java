package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.ProductFileJson;

/**
 * Created by TungNT on 1/5/2017.
 */
public class SF0030207Req extends AbstractJson {
    @JsonProperty("productFile")
    private ProductFileJson productFileJson;

    @JsonProperty("fileCode")
    private String fileCode;

    public ProductFileJson getProductFileJson() {
        return productFileJson;
    }

    public void setProductFileJson(ProductFileJson productFileJson) {
        this.productFileJson = productFileJson;
    }

    public String getFileCode() {
        return fileCode;
    }

    public void setFileCode(String fileCode) {
        this.fileCode = fileCode;
    }
}
