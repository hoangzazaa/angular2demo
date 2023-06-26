package vn.vnext.sefuri.sf.json.SF00100.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 6/5/2017.
 */
public class SF0010002Req extends AbstractJson {

    @JsonProperty("departmentID")
    private Integer departmentID;

    @JsonProperty("picId")
    private Integer picId;

    @JsonProperty("timeFilter")
    private Integer timeFilter;

    public Integer getDepartmentID() {
        return departmentID;
    }

    public void setDepartmentID(Integer departmentID) {
        this.departmentID = departmentID;
    }

    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    public Integer getTimeFilter() {
        return timeFilter;
    }

    public void setTimeFilter(Integer timeFilter) {
        this.timeFilter = timeFilter;
    }
}
