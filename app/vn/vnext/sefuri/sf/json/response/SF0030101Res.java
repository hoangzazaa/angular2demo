package vn.vnext.sefuri.sf.json.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.*;

import java.util.List;

/**
 * Created by TungNT on 1/10/2017.
 */
public class SF0030101Res extends AbstractJson {
    @JsonProperty("deal")
    private DealJson dealJson;
    @JsonProperty("quotations")
    private List<QuotationJson> quotations;
    @JsonProperty("dealFiles")
    private List<DealFileJson> dealFiles;
    @JsonProperty("dealProducts")
    private List<DealProductJson> dealProducts;
    @JsonProperty("productFiles")
    private List<ProductFileJson> productFiles;
    @JsonProperty("comments")
    private List<CommentJson> comments;


    public DealJson getDealJson() {
        return dealJson;
    }

    public void setDealJson(DealJson dealJson) {
        this.dealJson = dealJson;
    }

    public List<QuotationJson> getQuotations() {
        return quotations;
    }

    public void setQuotations(List<QuotationJson> quotations) {
        this.quotations = quotations;
    }

    public List<DealFileJson> getDealFiles() {
        return dealFiles;
    }

    public void setDealFiles(List<DealFileJson> dealFiles) {
        this.dealFiles = dealFiles;
    }

    public List<DealProductJson> getDealProducts() {
        return dealProducts;
    }

    public void setDealProducts(List<DealProductJson> dealProducts) {
        this.dealProducts = dealProducts;
    }

    public List<ProductFileJson> getProductFiles() {
        return productFiles;
    }

    public void setProductFiles(List<ProductFileJson> productFiles) {
        this.productFiles = productFiles;
    }

    public List<CommentJson> getComments() {
        return comments;
    }

    public void setComments(List<CommentJson> comments) {
        this.comments = comments;
    }


}
