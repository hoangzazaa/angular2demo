package vn.vnext.sefuri.sf.json.response;

import com.auth0.jwt.internal.com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.common.AbstractJson;
import vn.vnext.sefuri.sf.json.core.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hoangtd on 1/6/2017.
 */
public class SF0030300Res extends AbstractJson {
    @JsonProperty("deal")
    private DealJson deal = new DealJson();

    @JsonProperty("saleByCustomer")
    private UserJson saleByCustomer;

    @JsonProperty("departmentByCustomer")
    private DepartmentJson departmentByCustomer;

    @JsonProperty("quotation")
    private QuotationJson quotation = new QuotationJson();

    @JsonProperty("quotationItems")
    private List<QuotationItemJson> quotationItems = new ArrayList<>();

    @JsonProperty("dealProducts")
    private List<DealProductJson> dealProducts = new ArrayList<>();

    @JsonProperty("laminationJsons")
    private List<MstLaminationJson> laminationJsons = new ArrayList<>();

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public QuotationJson getQuotation() {
        return quotation;
    }

    public void setQuotation(QuotationJson quotation) {
        this.quotation = quotation;
    }

    public List<QuotationItemJson> getQuotationItems() {
        return quotationItems;
    }

    public void setQuotationItems(List<QuotationItemJson> quotationItems) {
        this.quotationItems = quotationItems;
    }

    public List<DealProductJson> getDealProducts() {
        return dealProducts;
    }

    public void setDealProducts(List<DealProductJson> dealProducts) {
        this.dealProducts = dealProducts;
    }

    public UserJson getSaleByCustomer() {
        return saleByCustomer;
    }

    public void setSaleByCustomer(UserJson saleByCustomer) {
        this.saleByCustomer = saleByCustomer;
    }

    public DepartmentJson getDepartmentByCustomer() {
        return departmentByCustomer;
    }

    public void setDepartmentByCustomer(DepartmentJson departmentByCustomer) {
        this.departmentByCustomer = departmentByCustomer;
    }

    public List<MstLaminationJson> getLaminationJsons() {
        return laminationJsons;
    }

    public void setLaminationJsons(List<MstLaminationJson> laminationJsons) {
        this.laminationJsons = laminationJsons;
    }
}

