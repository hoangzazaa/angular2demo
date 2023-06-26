package vn.vnext.sefuri.sf.json.SF00100.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00100.model.ChartDataJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 6/5/2017.
 */
public class SF0010002Res extends AbstractJson {
    @JsonProperty("receipts")
    private ChartDataJson receipts;

    @JsonProperty("newReceipts")
    private ChartDataJson newReceipts;

    @JsonProperty("recordNew")
    private ChartDataJson recordNew;

    @JsonProperty("digitalSale")
    private ChartDataJson digitalSale;

    public ChartDataJson getReceipts() {
        return receipts;
    }

    public void setReceipts(ChartDataJson receipts) {
        this.receipts = receipts;
    }

    public ChartDataJson getNewReceipts() {
        return newReceipts;
    }

    public void setNewReceipts(ChartDataJson newReceipts) {
        this.newReceipts = newReceipts;
    }

    public ChartDataJson getRecordNew() {
        return recordNew;
    }

    public void setRecordNew(ChartDataJson recordNew) {
        this.recordNew = recordNew;
    }

    public ChartDataJson getDigitalSale() {
        return digitalSale;
    }

    public void setDigitalSale(ChartDataJson digitalSale) {
        this.digitalSale = digitalSale;
    }
}
