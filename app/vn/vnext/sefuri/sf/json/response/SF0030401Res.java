package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by manhnv on 1/9/2017.
 */
public class SF0030401Res extends AbstractJson {
    @JsonProperty("pdfFilePath")
    private String pdfFilePath;

    @JsonProperty("pngFilePath")
    private String pngFilePath;

    public String getPdfFilePath() {
        return pdfFilePath;
    }

    public void setPdfFilePath(String pdfFilePath) {
        this.pdfFilePath = pdfFilePath;
    }

    public String getPngFilePath() {
        return pngFilePath;
    }

    public void setPngFilePath(String pngFilePath) {
        this.pngFilePath = pngFilePath;
    }
}
