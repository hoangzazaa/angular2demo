package vn.vnext.sefuri.sf.json.SF00201.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.DealDto;
import vn.vnext.sefuri.sf.json.core.BaseJson;

/**
 * Created by TungNT on 2/24/2017.
 */
public class DealJson extends BaseJson<DealDto> {

    @JsonProperty("dealCode")
    private String dealCode;

    //案件名
    @JsonProperty("dealName")
    private String dealName;

    //isInMyBox
    @JsonProperty("isInMybox")
    private boolean isInMybox;

    //dealRsDealProduct
    @JsonProperty("product")
    private ProductJson productJson;

    @Override
    public DealDto getData() {
        return null;
    }

    public void setData(DealDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.dealCode = dto.getDealCode();
        this.dealName = dto.getDealName();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ProductJson getProductJson() {
        return productJson;
    }

    public void setProductJson(ProductJson productJson) {
        this.productJson = productJson;
    }

    public String getDealName() {
        return dealName;
    }

    public void setDealName(String dealName) {
        this.dealName = dealName;
    }

    public boolean getIsInMybox() {
        return isInMybox;
    }

    public void setIsInMybox(boolean inMybox) {
        isInMybox = inMybox;
    }

}
