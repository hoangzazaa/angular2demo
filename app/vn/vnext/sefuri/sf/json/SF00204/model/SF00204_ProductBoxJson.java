package vn.vnext.sefuri.sf.json.SF00204.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/**
 * Created by nguyenPK on 4/19/2017.
 */
public class SF00204_ProductBoxJson {
    //基本情報 tab
    /*Basic product info*/
    @JsonProperty("product")
    private SF00204_ProductJson product;

    //取引実績・在庫数 - tab
    /*Transaction history - 直近のお取引状況*/
    @JsonProperty("transactions")
    private List<SF00204_TransHistoryJson> transactions;

    /*Inventory item - 在庫リスト*/
    @JsonProperty("inventory")
    private SF00204_InventoryJson inventory;
    //End

    @JsonProperty("dealCode")
    private String dealCode;


    public SF00204_ProductJson getProduct() {
        return product;
    }

    public void setProduct(SF00204_ProductJson product) {
        this.product = product;
    }

    public List<SF00204_TransHistoryJson> getTransactions() {
        return transactions;
    }

    public void setTransactions(List<SF00204_TransHistoryJson> transactions) {
        this.transactions = transactions;
    }

    public SF00204_InventoryJson getInventory() {
        return inventory;
    }

    public void setInventory(SF00204_InventoryJson inventory) {
        this.inventory = inventory;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
