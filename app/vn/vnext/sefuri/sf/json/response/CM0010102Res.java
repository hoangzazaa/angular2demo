package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.io.File;

/**
 * Created by TungNT on 1/19/2017.
 */
public class CM0010102Res extends AbstractJson {
    @JsonProperty("file")
    private File file;

    public File getFile() {
        return file;
    }

    public void setFile(File file) {
        this.file = file;
    }
}
