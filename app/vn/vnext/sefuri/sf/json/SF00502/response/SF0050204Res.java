package vn.vnext.sefuri.sf.json.SF00502.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00502.model.PredictionJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050204Res extends AbstractJson {

    @JsonProperty("notes")
    private List<PredictionJson> notes;

    @JsonProperty("removeNotes")
    private List<PredictionJson> removeNotes;

    public List<PredictionJson> getNotes() {
        return notes;
    }

    public void setNotes(List<PredictionJson> notes) {
        this.notes = notes;
    }

    public List<PredictionJson> getRemoveNotes() {
        return removeNotes;
    }

    public void setRemoveNotes(List<PredictionJson> removeNotes) {
        this.removeNotes = removeNotes;
    }
}
