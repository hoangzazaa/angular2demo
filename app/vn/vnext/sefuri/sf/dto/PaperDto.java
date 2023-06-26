package vn.vnext.sefuri.sf.dto;

import java.math.BigDecimal;

/**
 * Created by DungTQ on 2/8/2017.
 */
public class PaperDto {
    private Integer id;
    private BigDecimal value;
    private BigDecimal price;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }
}
