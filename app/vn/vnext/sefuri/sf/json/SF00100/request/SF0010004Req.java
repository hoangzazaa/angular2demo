package vn.vnext.sefuri.sf.json.SF00100.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 6/6/2017.
 */
public class SF0010004Req extends AbstractJson {
    @JsonProperty("departmentID")
    private Integer departmentID;

    @JsonProperty("picId")
    private Integer picId;

    @JsonProperty("recordNew")
    private Integer recordNew;

    @JsonProperty("digitalSales")
    private Integer digitalSales;

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

    public Integer getRecordNew() {
        return recordNew;
    }

    public void setRecordNew(Integer recordNew) {
        this.recordNew = recordNew;
    }

    public Integer getDigitalSales() {
        return digitalSales;
    }

    public void setDigitalSales(Integer digitalSales) {
        this.digitalSales = digitalSales;
    }
}
