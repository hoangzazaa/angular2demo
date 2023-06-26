package vn.vnext.sefuri.sf.module.jms.json.if0111;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.module.jms.json.mailjob.MailJson;

import java.util.List;

/**
 * Created by haipt on 4/25/2017.
 */
public class IF0111Json {

    @JsonProperty("products")
    private List<Integer> products;
    @JsonProperty("dealId")
    private int dealId;
    @JsonProperty("userId")
    private int userId;
    @JsonProperty("mail")
    private MailJson mail;

    public List<Integer> getProducts() {
        return products;
    }

    public void setProducts(List<Integer> products) {
        this.products = products;
    }

    public int getDealId() {
        return dealId;
    }

    public void setDealId(int dealId) {
        this.dealId = dealId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public MailJson getMail() {
        return mail;
    }

    public void setMail(MailJson mail) {
        this.mail = mail;
    }
}