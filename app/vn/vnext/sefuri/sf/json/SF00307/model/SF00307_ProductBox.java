package vn.vnext.sefuri.sf.json.SF00307.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class SF00307_ProductBox {
    @JsonProperty("product")
    private SF00307_Product product;

    @JsonProperty("transactions")
    private List<SF00307_TransHistory> transactions;

    /*Inventory item - 在庫リスト*/
    @JsonProperty("inventory")
    private SF00307_Inventory inventory;

    public SF00307_Product getProduct() {
        return product;
    }

    public void setProduct(SF00307_Product product) {
        this.product = product;
    }

    public List<SF00307_TransHistory> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<SF00307_TransHistory> transactions) {
        this.transactions = transactions;
    }

    public SF00307_Inventory getInventory() {
        return inventory;
    }

    public void setInventory(SF00307_Inventory inventory) {
        this.inventory = inventory;
    }
}
