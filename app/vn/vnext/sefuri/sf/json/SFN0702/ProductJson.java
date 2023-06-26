package vn.vnext.sefuri.sf.json.SFN0702;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;
import vn.vnext.sefuri.sf.json.core.ProductFileJson;

import java.util.List;

public class ProductJson extends BaseJson<ProductDto> {
    //製品名
    @JsonProperty("productName")
    private String productName;

    //製品種類
    @JsonProperty("productType")
    private Integer productType;

    //productCode
    @JsonProperty("productCode")
    private String productCode;

    //用途
    @JsonProperty("application")
    private String application;

    //メモ
    @JsonProperty("memo1")
    private String memo1;

    /* itemCode */
    @JsonProperty("itemCode")
    private String itemCode;

    //productRsProductFiles
    @JsonProperty("productFiles")
    private List<ProductFileJson> productFiles;

    //productRsProductOutput
    @JsonProperty("productOutputs")
    private List<ProductOutputJson> productOutputs;


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

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getMemo1() {
        return memo1;
    }

    public void setMemo1(String memo1) {
        this.memo1 = memo1;
    }

    public List<ProductFileJson> getProductFiles() {
        return productFiles;
    }

    public void setProductFiles(List<ProductFileJson> productFiles) {
        this.productFiles = productFiles;
    }

    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(String itemCode) {
        this.itemCode = itemCode;
    }

    public List<ProductOutputJson> getProductOutputs() {
        return productOutputs;
    }

    public void setProductOutputs(List<ProductOutputJson> productOutputs) {
        this.productOutputs = productOutputs;
    }

    @Override
    public void setData(ProductDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.productName = dto.getProductName();
        this.productType = dto.getProductType();
        this.productCode = dto.getProductCode();
        this.application = dto.getApplication();
        this.memo1 = dto.getMemo1();
        this.itemCode = dto.getItemCode();
    }

    @Override
    public ProductDto getData() {
        ProductDto dto = new ProductDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setProductName(productName);
        dto.setProductType(productType);
        dto.setProductCode(productCode);
        dto.setApplication(application);
        dto.setMemo1(memo1);
        dto.setItemCode(itemCode);
        return dto;
    }
}
