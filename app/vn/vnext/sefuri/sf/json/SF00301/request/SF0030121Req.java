package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030121Req extends AbstractJson {
    //ファイルID
    @JsonProperty("fileId")
    private Integer fileId;

    //ファイル名称
    @JsonProperty("originalName")
    private String originalName;

    //itemId {dealId | productId}
    @JsonProperty("itemId")
    private Integer itemId;

    // identify objectFileId is dealId | productId
    @JsonProperty("category")
    private String category;

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

    public Integer getItemId() {
        return itemId;
    }

    public void setItemId(final Integer itemId) {
        this.itemId = itemId;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(final String category) {
        this.category = category;
    }
}
