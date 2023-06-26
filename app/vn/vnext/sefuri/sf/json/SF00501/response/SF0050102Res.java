package vn.vnext.sefuri.sf.json.SF00501.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00501.model.AgentJson;
import vn.vnext.sefuri.sf.json.SF00501.model.DetailJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SF0050102Res extends AbstractJson {

    @JsonProperty("agents")
    private List<AgentJson> agents;
    @JsonProperty("revenues")
    private List<DetailJson> revenues;
    @JsonProperty("orders")
    private List<DetailJson> orders;
    @JsonProperty("goal")
    private DetailJson goal;

    public List<AgentJson> getAgents() {
        return agents;
    }

    public void setAgents(List<AgentJson> agents) {
        this.agents = agents;
    }

    public List<DetailJson> getRevenues() {
        return revenues;
    }

    public void setRevenues(List<DetailJson> revenues) {
        this.revenues = revenues;
    }

    public List<DetailJson> getOrders() {
        return orders;
    }

    public void setOrders(List<DetailJson> orders) {
        this.orders = orders;
    }

    public DetailJson getGoal() {
        return goal;
    }

    public void setGoal(DetailJson goal) {
        this.goal = goal;
    }
}
