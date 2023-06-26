package vn.vnext.sefuri.sf.json.SF00302.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030214Req extends AbstractJson {
    //ファイルID
    @JsonProperty("fileId")
    private Integer fileId;

    //ファイル名称
    @JsonProperty("originalName")
    private String originalName;

    //product id
    @JsonProperty("productId")
    private Integer productId;

    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(final Integer fileId) {
        this.fileId = fileId;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(final String originalName) {
        this.originalName = originalName;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(final Integer productId) {
        this.productId = productId;
    }
}
