package vn.vnext.sefuri.sf.json.SF00307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00307.model.SF00307_ProductBox;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by nguyenPK on 4/13/2017.
 */
public class SF0030703Res extends AbstractJson {
    @JsonProperty("productBoxes")
    private List<SF00307_ProductBox> productBoxes;

    public List<SF00307_ProductBox> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00307_ProductBox> productBoxes) {
        this.productBoxes = productBoxes;
    }
}
