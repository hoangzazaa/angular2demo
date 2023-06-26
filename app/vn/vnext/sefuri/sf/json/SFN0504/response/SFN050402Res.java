package vn.vnext.sefuri.sf.json.SFN0504.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0504.model.StockJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN050402Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("stocks")
    private List<StockJson> stocks;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<StockJson> getStocks() {
        return stocks;
    }

    public void setStocks(List<StockJson> stocks) {
        this.stocks = stocks;
    }
}
