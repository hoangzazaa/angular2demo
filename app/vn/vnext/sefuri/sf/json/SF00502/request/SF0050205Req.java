package vn.vnext.sefuri.sf.json.SF00502.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0050205Req extends AbstractJson {

    @JsonProperty("currentMonth")
    private DateTime currentMonth;

    public DateTime getCurrentMonth() {
        return currentMonth;
    }

    public void setCurrentMonth(DateTime currentMonth) {
        this.currentMonth = currentMonth;
    }
}
