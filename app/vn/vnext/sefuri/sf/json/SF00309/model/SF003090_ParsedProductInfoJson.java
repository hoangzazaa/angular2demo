package vn.vnext.sefuri.sf.json.SF00309.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SF003090_ParsedProductInfoJson {

    @JsonProperty("id")
    private Integer id;

    @JsonProperty("productCode")
    private String productCode;

    @JsonProperty("productName")
    private String productName;

    @JsonProperty("productType")
    private Integer productType;

    @JsonProperty("material")
    private String material;

    @JsonProperty("sizeH")
    private Integer sizeH;

    @JsonProperty("sizeD")
    private Integer sizeD;

    @JsonProperty("sizeW")
    private Integer sizeW;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public Integer getSizeH() {
        return sizeH;
    }

    public void setSizeH(Integer sizeH) {
        this.sizeH = sizeH;
    }

    public Integer getSizeD() {
        return sizeD;
    }

    public void setSizeD(Integer sizeD) {
        this.sizeD = sizeD;
    }

    public Integer getSizeW() {
        return sizeW;
    }

    public void setSizeW(Integer sizeW) {
        this.sizeW = sizeW;
    }
}

