package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0402.model.InventoryJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040204Res extends AbstractJson {

    @JsonProperty("hits")
    private int hits;
    @JsonProperty("inventories")
    private List<InventoryJson> inventories;

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public List<InventoryJson> getInventories() {
        return inventories;
    }

    public void setInventories(List<InventoryJson> inventories) {
        this.inventories = inventories;
    }
}
