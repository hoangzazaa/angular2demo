package vn.vnext.sefuri.sf.dto.dao;

import org.joda.time.DateTime;

import java.util.List;

/**
 * Created by nguyenpk on 06/06/2017.
 */
public class DealInfoDto1 {
    DateTime invoiceDate;

    String dealCode;

    String dealName;

    List<ProductInfoDto1> productInfoDto1s;

    public List<ProductInfoDto1> getProductInfoDto1s() {
        return productInfoDto1s;
    }

    public void setProductInfoDto1s(List<ProductInfoDto1> productInfoDto1s) {
        this.productInfoDto1s = productInfoDto1s;
    }

    public DateTime getInvoiceDate() {
        return invoiceDate;
    }

    public void setInvoiceDate(DateTime invoiceDate) {
        this.invoiceDate = invoiceDate;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

}
