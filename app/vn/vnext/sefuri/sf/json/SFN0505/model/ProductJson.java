package vn.vnext.sefuri.sf.json.SFN0505.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ProductJson {

    @JsonProperty("name")
    private String name;
    @JsonProperty("code")
    private String code;
    @JsonProperty("type")
    private Integer type;
    @JsonProperty("shapeId")
    private Integer shapeId;
    @JsonProperty("cartonShippingType")
    private Integer cartonShippingType;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }

    public Integer getShapeId() {
        return shapeId;
    }

    public void setShapeId(Integer shapeId) {
        this.shapeId = shapeId;
    }

    public Integer getCartonShippingType() {
        return cartonShippingType;
    }

    public void setCartonShippingType(Integer cartonShippingType) {
        this.cartonShippingType = cartonShippingType;
    }
}
