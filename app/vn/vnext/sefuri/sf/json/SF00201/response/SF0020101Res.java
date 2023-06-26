package vn.vnext.sefuri.sf.json.SF00201.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00201.model.DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0020101Res extends AbstractJson {
    @JsonProperty("templates")
    private List<DealJson> templates;

    @JsonProperty("totalRecords")
    private long totalRecords;

    public List<DealJson> getTemplates() {
        return templates;
    }

    public void setTemplates(List<DealJson> templates) {
        this.templates = templates;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalRecords) {
        this.totalRecords = totalRecords;
    }
}
