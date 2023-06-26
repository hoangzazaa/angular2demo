package vn.vnext.sefuri.sf.json.SF00502.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00502.model.PredictionJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050203Req extends AbstractJson {

    @JsonProperty("year")
    private int year;

    @JsonProperty("month")
    private int month;

    @JsonProperty("picId")
    private int picId;

    @JsonProperty("notes")
    private List<PredictionJson> notes;

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public List<PredictionJson> getNotes() {
        return notes;
    }

    public void setNotes(List<PredictionJson> notes) {
        this.notes = notes;
    }
}
