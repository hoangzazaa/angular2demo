package vn.vnext.sefuri.sf.json.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by TungNT on 2/14/2017.
 */
public class SF0050304Req extends AbstractJson {
    @JsonProperty("goalId")
    private Integer goalId;

    public Integer getGoalId() {
        return goalId;
    }

    public void setGoalId(Integer goalId) {
        this.goalId = goalId;
    }
}
