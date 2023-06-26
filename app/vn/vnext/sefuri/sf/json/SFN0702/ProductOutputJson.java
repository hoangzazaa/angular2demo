package vn.vnext.sefuri.sf.json.SFN0702;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ProductOutputDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

import java.math.BigDecimal;

public class ProductOutputJson extends BaseJson<ProductOutputDto> {
    @JsonProperty("supplierLot")
    private Integer supplierLot;
    //見積額 - 合計
    @JsonProperty("estimatedTotal")
    private BigDecimal estimatedTotal;

    //見積額 - 見積単価
    @JsonProperty("estimatedUnitPrice")
    private BigDecimal estimatedUnitPrice;

    @Override
    public void setData(ProductOutputDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.supplierLot = dto.getSupplierLot();
        this.estimatedTotal = dto.getEstimatedTotal();
        this.estimatedUnitPrice = dto.getEstimatedUnitPrice();
    }

    @Override
    public ProductOutputDto getData() {
        ProductOutputDto dto = new ProductOutputDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setSupplierLot(supplierLot);
        dto.setEstimatedTotal(estimatedTotal);
        dto.setEstimatedUnitPrice(estimatedUnitPrice);
        return dto;
    }
}
