package vn.vnext.sefuri.sf.json.SF00307.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.common.Constants;
import vn.vnext.sefuri.sf.dto.ProductDto;
import vn.vnext.sefuri.sf.json.common.ProductInfoJson;
import vn.vnext.sefuri.sf.util.FormatUtil;

public class SF00307_Product extends ProductInfoJson {

    @JsonProperty(value = "paperName")
    private String paperName;

    public String getPaperName() {
        return paperName;
    }

    public void setPaperName(String paperName) {
        this.paperName = paperName;
    }

    @Override
    public void setModel(ProductDto dto) {
        if (dto != null) {
            super.setData(dto);

            this.shapeId = dto.getShapeId();
            this.productName = dto.getProductName();
            this.productCode = dto.getProductCode();
            this.customerProductCode = dto.getCustomerProductCode();
            this.sizeH = dto.getSizeH();
            this.sizeD = dto.getSizeD();
            this.sizeW = dto.getSizeW();
            this.paperNameId = dto.getPaperNameId();
            this.paperWeight = dto.getPaperWeight();
            this.woodenCode = dto.getWoodenCode();
            this.memo = FormatUtil.concatItem(Constants.COMMA, dto.getMemo1(), dto.getMemo2(), dto.getMemo3());
            this.factoryId = dto.getFactoryId();
            this.productType = dto.getProductType();
            this.requestProduction = dto.getRequestProductionFlag();
        }
    }

}
