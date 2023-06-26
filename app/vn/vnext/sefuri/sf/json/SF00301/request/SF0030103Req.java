package vn.vnext.sefuri.sf.json.SF00301.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealFileJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030103Req extends AbstractJson {
    @JsonProperty("dealFile")
    private SF00301_DealFileJson dealFile;

    @JsonProperty("fileCode")
    private String fileCode;

    public SF00301_DealFileJson getDealFile() {
        return dealFile;
    }

    public void setDealFile(final SF00301_DealFileJson dealFile) {
        this.dealFile = dealFile;
    }

    public String getFileCode() {
        return fileCode;
    }

    public void setFileCode(final String fileCode) {
        this.fileCode = fileCode;
    }
}
