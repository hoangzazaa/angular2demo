package vn.vnext.sefuri.sf.json.SF00502.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00502.model.CustomerJson;
import vn.vnext.sefuri.sf.json.SF00502.model.PredictionJson;
import vn.vnext.sefuri.sf.json.SF00502.model.RevenueJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050202Res extends AbstractJson {

    @JsonProperty("customers")
    private List<CustomerJson> customers;

    @JsonProperty("revenues")
    private List<RevenueJson> revenues;

    @JsonProperty("predictions")
    private List<PredictionJson> predictions;

    public List<CustomerJson> getCustomers() {
        return customers;
    }

    public void setCustomers(List<CustomerJson> customers) {
        this.customers = customers;
    }

    public List<RevenueJson> getRevenues() {
        return revenues;
    }

    public void setRevenues(List<RevenueJson> revenues) {
        this.revenues = revenues;
    }

    public List<PredictionJson> getPredictions() {
        return predictions;
    }

    public void setPredictions(List<PredictionJson> predictions) {
        this.predictions = predictions;
    }
}
