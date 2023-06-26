package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by DungTQ on 2/14/2017.
 */
public class SaleDataJson {
    @JsonProperty("year")
    private Integer year;

    @JsonProperty("user")
    private UserJson user;

    @JsonProperty("saleDataItems")
    private List<SaleDataItemJson> saleDataItems;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public UserJson getUser() {
        return user;
    }

    public void setUser(UserJson user) {
        this.user = user;
    }

    public List<SaleDataItemJson> getSaleDataItems() {
        return saleDataItems;
    }

    public void setSaleDataItems(List<SaleDataItemJson> saleDataItems) {
        this.saleDataItems = saleDataItems;
    }
}
