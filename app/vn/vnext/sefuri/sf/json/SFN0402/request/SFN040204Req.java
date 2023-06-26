package vn.vnext.sefuri.sf.json.SFN0402.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SFN040204Req extends AbstractJson {

    @JsonProperty("code")
    private String code;
    @JsonProperty("stockDays")
    private int stockDays;
    @JsonProperty("stockType")
    private int stockType;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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
