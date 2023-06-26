package vn.vnext.sefuri.sf.json.SF00308.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00308.model.AnswerJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by TungNT on 16/03/2017.
 */
public class SF0030802Req extends AbstractJson {
    @JsonProperty("answers")
    private List<AnswerJson> checkSheetJsons;

    public List<AnswerJson> getCheckSheetJsons() {
        return checkSheetJsons;
    }

    public void setCheckSheetJsons(List<AnswerJson> checkSheetJsons) {
        this.checkSheetJsons = checkSheetJsons;
    }
}
