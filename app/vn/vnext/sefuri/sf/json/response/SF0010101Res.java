package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by VuPT on 12/12/2016.
 */
public class SF0010101Res extends AbstractJson {

    @JsonProperty("sf00301Url")
    private String[] sf00301Url;

    @JsonProperty("sf00302Url")
    private String[] sf00302Url;

    @JsonProperty("sf00303Url")
    private String[] sf00303Url;

    @JsonProperty("sf00304Url")
    private String[] sf00304Url;

    public String[] getSf00301Url() {
        return sf00301Url;
    }

    public void setSf00301Url(String[] sf00301Url) {
        this.sf00301Url = sf00301Url;
    }

    public String[] getSf00302Url() {
        return sf00302Url;
    }

    public void setSf00302Url(String[] sf00302Url) {
        this.sf00302Url = sf00302Url;
    }

    public String[] getSf00303Url() {
        return sf00303Url;
    }

    public void setSf00303Url(String[] sf00303Url) {
        this.sf00303Url = sf00303Url;
    }

    public String[] getSf00304Url() {
        return sf00304Url;
    }

    public void setSf00304Url(String[] sf00304Url) {
        this.sf00304Url = sf00304Url;
    }
}
