package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class OriginalShapeParamsJson {

    @JsonProperty("image")
    private String image;

    @JsonProperty("width")
    private BigDecimal width;

    @JsonProperty("depth")
    private BigDecimal depth;

    @JsonProperty("height")
    private BigDecimal height;

    @JsonProperty("flap")
    private BigDecimal flap;

    @JsonProperty("insertion")
    private BigDecimal insertion;

    @JsonProperty("gluing_part")
    private BigDecimal gluing_part;

    @JsonProperty("grain")
    private Integer grain;

    @JsonProperty("development_width")
    private BigDecimal development_width;

    @JsonProperty("development_height")
    private BigDecimal development_height;

    @JsonProperty("groove")
    private Integer groove;

    @JsonProperty("wooden_fee")
    private BigDecimal wooden_fee;

    public BigDecimal getWooden_fee() {
        return wooden_fee;
    }

    public void setWooden_fee(BigDecimal wooden_fee) {
        this.wooden_fee = wooden_fee;
    }

    public BigDecimal getGluing_part() {
        return gluing_part;
    }

    public void setGluing_part(BigDecimal gluing_part) {
        this.gluing_part = gluing_part;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public BigDecimal getWidth() {
        return width;
    }

    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    public BigDecimal getDepth() {
        return depth;
    }

    public void setDepth(BigDecimal depth) {
        this.depth = depth;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    public BigDecimal getFlap() {
        return flap;
    }

    public void setFlap(BigDecimal flap) {
        this.flap = flap;
    }

    public BigDecimal getInsertion() {
        return insertion;
    }

    public void setInsertion(BigDecimal insertion) {
        this.insertion = insertion;
    }

    public Integer getGrain() {
        return grain;
    }

    public void setGrain(Integer grain) {
        this.grain = grain;
    }

    public BigDecimal getDevelopment_width() {
        return development_width;
    }

    public void setDevelopment_width(BigDecimal development_width) {
        this.development_width = development_width;
    }

    public BigDecimal getDevelopment_height() {
        return development_height;
    }

    public void setDevelopment_height(BigDecimal development_height) {
        this.development_height = development_height;
    }

    public Integer getGroove() {
        return groove;
    }

    public void setGroove(Integer groove) {
        this.groove = groove;
    }
}
