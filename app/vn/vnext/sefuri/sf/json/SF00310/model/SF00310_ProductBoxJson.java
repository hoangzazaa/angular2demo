package vn.vnext.sefuri.sf.json.SF00310.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by manhnv on 4/11/2017.
 */
public class SF00310_ProductBoxJson {
    //基本情報 tab
    /*Basic product info*/
    @JsonProperty("product")
    private SF00310_ProductJson product;

    //取引実績・在庫数 - tab
    /*Transaction history - 直近のお取引状況*/
    @JsonProperty("transactions")
    private List<SF00310_TransHistoryJson> transactions;

    /*Inventory item - 在庫リスト*/
    @JsonProperty("inventory")
    private SF00310_InventoryJson inventory;
    //End

    public SF00310_ProductJson getProduct() {
        return product;
    }

    public void setProduct(SF00310_ProductJson product) {
        this.product = product;
    }

    public List<SF00310_TransHistoryJson> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<SF00310_TransHistoryJson> transactions) {
        this.transactions = transactions;
    }

    public SF00310_InventoryJson getInventory() {
        return inventory;
    }

    public void setInventory(SF00310_InventoryJson inventory) {
        this.inventory = inventory;
    }
}
