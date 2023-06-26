package vn.vnext.sefuri.sf.json.SFN0402.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0402.model.AmountJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN040202Res extends AbstractJson {

    @JsonProperty("paperNew")
    private List<AmountJson> paperNew;
    @JsonProperty("cartonNew")
    private List<AmountJson> cartonNew;
    @JsonProperty("commercialNew")
    private List<AmountJson> commercialNew;
    @JsonProperty("paperOld")
    private List<AmountJson> paperOld;
    @JsonProperty("cartonOld")
    private List<AmountJson> cartonOld;
    @JsonProperty("commercialOld")
    private List<AmountJson> commercialOld;
    @JsonProperty("goal")
    private List<AmountJson> goal;

    public List<AmountJson> getPaperNew() {
        return paperNew;
    }

    public void setPaperNew(List<AmountJson> paperNew) {
        this.paperNew = paperNew;
    }

    public List<AmountJson> getCartonNew() {
        return cartonNew;
    }

    public void setCartonNew(List<AmountJson> cartonNew) {
        this.cartonNew = cartonNew;
    }

    public List<AmountJson> getCommercialNew() {
        return commercialNew;
    }

    public void setCommercialNew(List<AmountJson> commercialNew) {
        this.commercialNew = commercialNew;
    }

    public List<AmountJson> getPaperOld() {
        return paperOld;
    }

    public void setPaperOld(List<AmountJson> paperOld) {
        this.paperOld = paperOld;
    }

    public List<AmountJson> getCartonOld() {
        return cartonOld;
    }

    public void setCartonOld(List<AmountJson> cartonOld) {
        this.cartonOld = cartonOld;
    }

    public List<AmountJson> getCommercialOld() {
        return commercialOld;
    }

    public void setCommercialOld(List<AmountJson> commercialOld) {
        this.commercialOld = commercialOld;
    }

    public List<AmountJson> getGoal() {
        return goal;
    }

    public void setGoal(List<AmountJson> goal) {
        this.goal = goal;
    }
}
