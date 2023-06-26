package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040202Req extends AbstractJson {

    @JsonProperty("code")
    private String code;
    @JsonProperty("year")
    private int year;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
