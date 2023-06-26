package vn.vnext.sefuri.sf.json.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by DungTQ on 4/20/2017.
 */
public class SF0080104Req extends AbstractJson {
    @JsonProperty("paper_id")
    private String paper_id;

    @JsonProperty("basis_weights_id")
    private String basis_weights_id;

    public String getPaper_id() {
        return paper_id;
    }

    public void setPaper_id(String paper_id) {
        this.paper_id = paper_id;
    }

    public String getBasis_weights_id() {
        return basis_weights_id;
    }

    public void setBasis_weights_id(String basis_weights_id) {
        this.basis_weights_id = basis_weights_id;
    }
}
