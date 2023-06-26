package vn.vnext.sefuri.sf.json.SF00302.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.MstLaminationJson;
import vn.vnext.sefuri.sf.json.SF00302.model.MstPaperJson;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by ASUS on 6/26/2017.
 */
public class SF0030212Res extends AbstractJson {

    @JsonProperty("laminations")
    private List<MstLaminationJson> laminations;

    @JsonProperty("papers")
    private List<MstPaperJson> papers;

    @JsonProperty("product")
    private ProductJson product;

    public List<MstLaminationJson> getLaminations() {
        return laminations;
    }

    public void setLaminations(List<MstLaminationJson> laminations) {
        this.laminations = laminations;
    }

    public List<MstPaperJson> getPapers() {
        return papers;
    }

    public void setPapers(List<MstPaperJson> papers) {
        this.papers = papers;
    }

    public ProductJson getProduct() {
        return product;
    }

    public void setProduct(ProductJson product) {
        this.product = product;
    }
}
