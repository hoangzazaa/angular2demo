package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040211Req extends AbstractJson {

    @JsonProperty("code")
    private String code;
    @JsonProperty("keyword")
    private String keyword;
    @JsonProperty("startDate")
    private DateTime startDate;
    @JsonProperty("endDate")
    private DateTime endDate;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public DateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(DateTime startDate) {
        this.startDate = startDate;
    }

    public DateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(DateTime endDate) {
        this.endDate = endDate;
    }
}
