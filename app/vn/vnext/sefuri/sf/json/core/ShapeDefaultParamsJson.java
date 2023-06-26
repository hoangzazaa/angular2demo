package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class ShapeDefaultParamsJson {
    //width
    @JsonProperty("width")
    private BigDecimal width;

    //height
    @JsonProperty("height")
    private BigDecimal height;

    //depth
    @JsonProperty("depth")
    private BigDecimal depth;

    //flap
    @JsonProperty("flap")
    private BigDecimal flap;

    //insertion
    @JsonProperty("insertion")
    private BigDecimal insertion;

    //grain
    @JsonProperty("grain")
    private Integer grain;

    @JsonProperty("min_width")
    private BigDecimal min_width;

    @JsonProperty("max_width")
    private BigDecimal max_width;

    @JsonProperty("min_height")
    private BigDecimal min_height;

    @JsonProperty("max_height")
    private BigDecimal max_height;

    @JsonProperty("min_depth")
    private BigDecimal min_depth;

    @JsonProperty("max_depth")
    private BigDecimal max_depth;

    //developmentWidth
    @JsonProperty("development_width")
    private BigDecimal development_width;

    //developmentHeight
    @JsonProperty("development_height")
    private BigDecimal development_height;

    @JsonProperty("gluing_part")
    private BigDecimal gluing_part;

    public BigDecimal getGluing_part() {
        return gluing_part;
    }

    public void setGluing_part(BigDecimal gluing_part) {
        this.gluing_part = gluing_part;
    }

    public BigDecimal getWidth() {
        return width;
    }

    public void setWidth(BigDecimal width) {
        this.width = width;
    }

    public BigDecimal getHeight() {
        return height;
    }

    public void setHeight(BigDecimal height) {
        this.height = height;
    }

    public BigDecimal getDepth() {
        return depth;
    }

    public void setDepth(BigDecimal depth) {
        this.depth = depth;
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

    public BigDecimal getMin_width() {
        return min_width;
    }

    public void setMin_width(BigDecimal min_width) {
        this.min_width = min_width;
    }

    public BigDecimal getMax_width() {
        return max_width;
    }

    public void setMax_width(BigDecimal max_width) {
        this.max_width = max_width;
    }

    public BigDecimal getMin_height() {
        return min_height;
    }

    public void setMin_height(BigDecimal min_height) {
        this.min_height = min_height;
    }

    public BigDecimal getMax_height() {
        return max_height;
    }

    public void setMax_height(BigDecimal max_height) {
        this.max_height = max_height;
    }

    public BigDecimal getMin_depth() {
        return min_depth;
    }

    public void setMin_depth(BigDecimal min_depth) {
        this.min_depth = min_depth;
    }

    public BigDecimal getMax_depth() {
        return max_depth;
    }

    public void setMax_depth(BigDecimal max_depth) {
        this.max_depth = max_depth;
    }
}
