package vn.vnext.sefuri.sf.json.SFN0504.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN050402Req extends AbstractJson {

    @JsonProperty("departmentId")
    private int departmentId;
    @JsonProperty("userId")
    private int userId;
    @JsonProperty("stockDays")
    private int stockDays;
    @JsonProperty("stockType")
    private int stockType;

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

    public int getStockDays() {
        return stockDays;
    }

    public void setStockDays(int stockDays) {
        this.stockDays = stockDays;
    }

    public int getStockType() {
        return stockType;
    }

    public void setStockType(int stockType) {
        this.stockType = stockType;
    }
}
