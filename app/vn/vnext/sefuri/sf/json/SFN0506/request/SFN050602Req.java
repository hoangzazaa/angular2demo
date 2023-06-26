package vn.vnext.sefuri.sf.json.SFN0506.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN050602Req extends AbstractJson {

    @JsonProperty("departmentId")
    private int departmentId;
    @JsonProperty("userId")
    private int userId;
    @JsonProperty("startDate")
    private DateTime startDate;
    @JsonProperty("endDate")
    private DateTime endDate;
    @JsonProperty("dateType")
    private int dateType;
    @JsonProperty("method")
    private int method;

    public int getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(int departmentId) {
        this.departmentId = departmentId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
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

    public int getDateType() {
        return dateType;
    }

    public void setDateType(int dateType) {
        this.dateType = dateType;
    }

    public int getMethod() {
        return method;
    }

    public void setMethod(int method) {
        this.method = method;
    }
}
