package vn.vnext.sefuri.sf.json.SF00306.request;

import vn.vnext.sefuri.sf.json.common.AbstractJson;

public class SF0030604Req extends AbstractJson {
    private String productCode;
    private String dealCode;


    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getDealCode() {
        return dealCode;
    }

    public void setDealCode(String dealCode) {
        this.dealCode = dealCode;
    }
}
