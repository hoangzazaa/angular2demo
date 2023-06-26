package vn.vnext.sefuri.sf.json.SF00301.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealFileJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030104Res extends AbstractJson {
    @JsonProperty("dealFile")
    private SF00301_DealFileJson dealFile;

    public SF00301_DealFileJson getDealFile() {
        return dealFile;
    }

    public void setDealFile(final SF00301_DealFileJson dealFile) {
        this.dealFile = dealFile;
    }
}