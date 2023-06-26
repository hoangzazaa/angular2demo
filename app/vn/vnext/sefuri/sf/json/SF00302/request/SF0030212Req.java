package vn.vnext.sefuri.sf.json.SF00302.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.PaperModalJson;
import vn.vnext.sefuri.sf.json.SF00302.model.ProductJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030212Req extends AbstractJson {
    @JsonProperty("product")
    private ProductJson productJson;

    @JsonProperty("paperNews")
    private List<PaperModalJson> paperNews;

    @JsonProperty("dealCode")
    private String dealCode;

    public List<PaperModalJson> getPaperNews() {
        return paperNews;
    }

    public void setPaperNews(List<PaperModalJson> paperNews) {
        this.paperNews = paperNews;
    }

    public ProductJson getProductJson() {
        return productJson;
    }

    public void setProductJson(ProductJson productJson) {
        this.productJson = productJson;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
