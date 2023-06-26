package vn.vnext.sefuri.sf.json.SF00502.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00502.model.PredictionJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050203Res extends AbstractJson {

    @JsonProperty("notes")
    private List<PredictionJson> notes;

    public List<PredictionJson> getNotes() {
        return notes;
    }

    public void setNotes(List<PredictionJson> notes) {
        this.notes = notes;
    }
}
