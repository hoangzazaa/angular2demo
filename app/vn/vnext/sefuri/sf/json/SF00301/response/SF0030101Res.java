package vn.vnext.sefuri.sf.json.SF00301.response;

import java.util.List;

import javax.annotation.Nonnull;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.collect.Lists;

import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CheckSheetJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CommentJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_CustomerJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealFileJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DealJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_DepartmentJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_OrderItemJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_ProductFileJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_ProductJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_QuotationJson;
import vn.vnext.sefuri.sf.json.SF00301.model.SF00301_UserJson;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.MstLaminationJson;

/**
 * Created by VuPT on 2/27/2017.
 */
public class SF0030101Res extends AbstractJson {
    @JsonProperty("deal")
    private SF00301_DealJson deal;

    @JsonProperty("saler")
    private SF00301_UserJson saler;

    @JsonProperty("customer")
    private SF00301_CustomerJson customer;

    @JsonProperty("user")
    private SF00301_UserJson user;

    @JsonProperty("checksheets")
    public List<SF00301_CheckSheetJson> checksheets = Lists.newArrayList();

    @JsonProperty("products")
    public List<SF00301_ProductJson> products = Lists.newArrayList();

    @JsonProperty("quotations")
    private List<SF00301_QuotationJson> quotations = Lists.newArrayList();

    @JsonProperty("dealFiles")
    private List<SF00301_DealFileJson> dealFiles = Lists.newArrayList();

    @JsonProperty("productFiles")
    private List<SF00301_ProductFileJson> productFiles = Lists.newArrayList();

    @JsonProperty("comments")
    private List<SF00301_CommentJson> comments = Lists.newArrayList();

    @JsonProperty("departments")
    private List<SF00301_DepartmentJson> departments;

    @JsonProperty("numberOfComment")
    private Integer numberOfComment;

    @JsonProperty("orderItems")
    private List<SF00301_OrderItemJson> orderItems;

    @JsonProperty("laminationJsons")
    private List<MstLaminationJson> laminationJsons;

    /** 関連案件 (元案件, リピート案件) */
    @JsonProperty("relatedDeals")
    private List<SF00301_DealJson> relatedDeals = Lists.newArrayList();


    public Integer getNumberOfComment() {
        return numberOfComment;
    }

    public void setNumberOfComment(Integer numberOfComment) {
        this.numberOfComment = numberOfComment;
    }

    public SF00301_DealJson getDeal() {
        return deal;
    }

    public void setDeal(final SF00301_DealJson deal) {
        this.deal = deal;
    }

    public SF00301_UserJson getSaler() {
        return saler;
    }

    public void setSaler(final SF00301_UserJson saler) {
        this.saler = saler;
    }

    public SF00301_CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(final SF00301_CustomerJson customer) {
        this.customer = customer;
    }

    public SF00301_UserJson getUser() {
        return user;
    }

    public void setUser(final SF00301_UserJson user) {
        this.user = user;
    }

    public List<SF00301_CheckSheetJson> getChecksheets() {
        return checksheets;
    }

    public void setChecksheets(final List<SF00301_CheckSheetJson> checksheets) {
        this.checksheets = checksheets;
    }

    public List<SF00301_ProductJson> getProducts() {
        return products;
    }

    public void setProducts(final List<SF00301_ProductJson> products) {
        this.products = products;
    }

    public List<SF00301_QuotationJson> getQuotations() {
        return quotations;
    }

    public void setQuotations(final List<SF00301_QuotationJson> quotations) {
        this.quotations = quotations;
    }

    public List<SF00301_ProductFileJson> getProductFiles() {
        return productFiles;
    }

    public void setProductFiles(final List<SF00301_ProductFileJson> productFiles) {
        this.productFiles = productFiles;
    }

    public List<SF00301_DealFileJson> getDealFiles() {
        return dealFiles;
    }

    public void setDealFiles(final List<SF00301_DealFileJson> dealFiles) {
        this.dealFiles = dealFiles;
    }

    public List<SF00301_CommentJson> getComments() {
        return comments;
    }

    public void setComments(final List<SF00301_CommentJson> comments) {
        this.comments = comments;
    }

    public List<SF00301_DepartmentJson> getDepartments() {
        return departments;
    }

    public void setDepartments(List<SF00301_DepartmentJson> departments) {
        this.departments = departments;
    }

    public List<SF00301_OrderItemJson> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<SF00301_OrderItemJson> orderItems) {
        this.orderItems = orderItems;
    }

    public List<MstLaminationJson> getLaminationJsons() {
        return laminationJsons;
    }

    public void setLaminationJsons(List<MstLaminationJson> laminationJsons) {
        this.laminationJsons = laminationJsons;
    }

    /**
     * @return 関連案件 (元案件, リピート案件)
     */
    public List<SF00301_DealJson> getRelatedDeals() {
        return relatedDeals;
    }

    /**
     * 関連案件 (元案件, リピート案件)
     *
     * <p>リピート案件なしの場合は空配列が応答される。
     *
     * @param relatedDeals 関連案件 (元案件, リピート案件)
     */
    public void setRelatedDeals(@Nonnull List<SF00301_DealJson> relatedDeals) {
        this.relatedDeals = relatedDeals;
    }
}
