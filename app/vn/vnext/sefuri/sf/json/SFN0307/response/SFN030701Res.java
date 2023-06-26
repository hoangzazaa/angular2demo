package vn.vnext.sefuri.sf.json.SFN0307.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.json.SFN0307.model.*;
import vn.vnext.sefuri.sf.json.common.AbstractJson;

import java.util.List;

public class SFN030701Res extends AbstractJson {

    @JsonProperty("deal")
    private DealJson deal;
    @JsonProperty("customer")
    private CustomerJson customer;
    @JsonProperty("department")
    private DepartmentJson department;
    @JsonProperty("user")
    private UserJson user;
    @JsonProperty("products")
    private List<ProductJson> products;
    @JsonProperty("orderItems")
    private List<OrderItemJson> orderItems;
    @JsonProperty("destinations")
    private List<DestinationJson> destinations;
    @JsonProperty("loadings")
    private List<LoadingJson> loadings;

    public DealJson getDeal() {
        return deal;
    }

    public void setDeal(DealJson deal) {
        this.deal = deal;
    }

    public CustomerJson getCustomer() {
        return customer;
    }

    public void setCustomer(CustomerJson customer) {
        this.customer = customer;
    }

    public DepartmentJson getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentJson department) {
        this.department = department;
    }

    public UserJson getUser() {
        return user;
    }

    public void setUser(UserJson user) {
        this.user = user;
    }

    public List<ProductJson> getProducts() {
        return products;
    }

    public void setProducts(List<ProductJson> products) {
        this.products = products;
    }

    public List<OrderItemJson> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItemJson> orderItems) {
        this.orderItems = orderItems;
    }

    public List<DestinationJson> getDestinations() {
        return destinations;
    }

    public void setDestinations(List<DestinationJson> destinations) {
        this.destinations = destinations;
    }

    public List<LoadingJson> getLoadings() {
        return loadings;
    }

    public void setLoadings(List<LoadingJson> loadings) {
        this.loadings = loadings;
    }
}
