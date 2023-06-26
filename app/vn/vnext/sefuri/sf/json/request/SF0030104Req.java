package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.DealFileJson;

/**
 * Created by TungNT on 1/11/2017.
 */
public class SF0030104Req extends AbstractJson {
    @JsonProperty("dealFile")
    private DealFileJson dealFileJson;
    @JsonProperty("fileCode")
    private String fileCode;

    public DealFileJson getDealFileJson() {
        return dealFileJson;
    }

    public void setDealFileJson(DealFileJson dealFileJson) {
        this.dealFileJson = dealFileJson;
    }

    public String getFileCode() {
        return fileCode;
    }

    public void setFileCode(String fileCode) {
        this.fileCode = fileCode;
    }
}
