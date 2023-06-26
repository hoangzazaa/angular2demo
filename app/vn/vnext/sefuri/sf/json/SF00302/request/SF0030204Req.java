package vn.vnext.sefuri.sf.json.SF00302.request;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SF00302.model.DealProductJson;
import vn.vnext.sefuri.sf.json.SF00302.model.PaperModalJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030204Req extends AbstractJson {
    @JsonProperty("dealProduct")
    private DealProductJson dealProduct;

    @JsonProperty("paperNews")
    private List<PaperModalJson> paperNews;

    @JsonProperty("paperId")
    private Integer paperId;

    public DealProductJson getDealProduct() {
        return dealProduct;
    }

    public void setDealProduct(DealProductJson dealProduct) {
        this.dealProduct = dealProduct;
    }

    public List<PaperModalJson> getPaperNews() {
        return paperNews;
    }

    public void setPaperNews(List<PaperModalJson> paperNews) {
        this.paperNews = paperNews;
    }

    public Integer getPaperId() {
        return paperId;
    }

    public void setPaperId(Integer paperId) {
        this.paperId = paperId;
    }
}
