package vn.vnext.sefuri.sf.json.SF00204.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;
import vn.vnext.sefuri.sf.json.SF00204.model.SF00204_ProductBoxJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

import java.util.List;

public class SF0020401Res extends AbstractJson {

    @JsonProperty("productBoxes")
    private List<SF00204_ProductBoxJson> productBoxes = Lists.newArrayList();

    @JsonProperty("totalRecords")
    private Long totalRecords;

    @JsonProperty("laminationJsons")
    private List<MstLaminationJson> laminationJsons;

    public List<SF00204_ProductBoxJson> getProductBoxes() {
        return productBoxes;
    }

    public void setProductBoxes(List<SF00204_ProductBoxJson> productBoxes) {
        this.productBoxes = productBoxes;
    }

    public Long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(Long totalRecords) {
        this.totalRecords = totalRecords;
    }

    public List<MstLaminationJson> getLaminationJsons() {
        return laminationJsons;
    }

    public void setLaminationJsons(List<MstLaminationJson> laminationJsons) {
        this.laminationJsons = laminationJsons;
    }
}
