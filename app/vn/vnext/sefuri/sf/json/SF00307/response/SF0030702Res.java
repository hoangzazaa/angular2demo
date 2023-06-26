package vn.vnext.sefuri.sf.json.SF00307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_DealJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

/**
 * Created by nguyenPK on 4/13/2017.
 */
public class SF0030702Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00307_DealJson deal;


    public SF00307_DealJson getDeal() {
        return deal;
    }

    public void setDeal(SF00307_DealJson deal) {
        this.deal = deal;
    }
}
