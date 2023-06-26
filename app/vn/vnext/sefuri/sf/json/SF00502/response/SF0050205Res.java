package vn.vnext.sefuri.sf.json.SF00502.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00502.model.CompanyNoteJson;
import vn.vnext.sefuri.sf.json.SF00502.model.CustomerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050205Res extends AbstractJson {

    @JsonProperty("customers")
    private List<CustomerJson> customers;

    @JsonProperty("notes")
    private List<CompanyNoteJson> notes;

    @JsonProperty("summaries")
    private List<CompanyNoteJson> summaries;

    public List<CustomerJson> getCustomers() {
        return customers;
    }

    public void setCustomers(List<CustomerJson> customers) {
        this.customers = customers;
    }

    public List<CompanyNoteJson> getNotes() {
        return notes;
    }

    public void setNotes(List<CompanyNoteJson> notes) {
        this.notes = notes;
    }

    public List<CompanyNoteJson> getSummaries() {
        return summaries;
    }

    public void setSummaries(List<CompanyNoteJson> summaries) {
        this.summaries = summaries;
    }
}
