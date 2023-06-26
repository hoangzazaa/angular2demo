package vn.vnext.sefuri.sf.json.SF00306.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by manhnv on 4/11/2017.
 */
public class SF00306_ProductBoxJson {
    //基本情報 tab
    /*Basic product info*/
    @JsonProperty("product")
    private SF00306_ProductJson product;

    //取引実績・在庫数 - tab
    /*Transaction history - 直近のお取引状況*/
    @JsonProperty("transactions")
    private List<SF00306_TransHistoryJson> transactions;

    /*Inventory item - 在庫リスト*/
    @JsonProperty("inventory")
    private SF00306_InventoryJson inventory;
    //End

    public SF00306_ProductJson getProduct() {
        return product;
    }

    public void setProduct(SF00306_ProductJson product) {
        this.product = product;
    }

    public List<SF00306_TransHistoryJson> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<SF00306_TransHistoryJson> transactions) {
        this.transactions = transactions;
    }

    public SF00306_InventoryJson getInventory() {
        return inventory;
    }

    public void setInventory(SF00306_InventoryJson inventory) {
        this.inventory = inventory;
    }
}
