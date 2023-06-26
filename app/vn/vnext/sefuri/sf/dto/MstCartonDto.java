package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Created by VuPT on 5/11/2017.
 */
@Entity
@Table(name = "sfr_sf_mst_carton")
public class MstCartonDto extends BaseDto {
    private BigDecimal cartonLong;
    private BigDecimal cartonShort;
    private Integer shippingType;
    private BigDecimal shippingLoss;
    private BigDecimal pasteWage;
    private BigDecimal shipFare;
    private Integer fluteType;

    @Basic
    @Column(name = "long")
    public BigDecimal getCartonLong() {
        return cartonLong;
    }

    public void setCartonLong(BigDecimal cartonLong) {
        this.cartonLong = cartonLong;
    }

    @Basic
    @Column(name = "short")
    public BigDecimal getCartonShort() {
        return cartonShort;
    }

    public void setCartonShort(BigDecimal cartonShort) {
        this.cartonShort = cartonShort;
    }

    @Basic
    @Column(name = "shipping_type")
    public Integer getShippingType() {
        return shippingType;
    }

    public void setShippingType(Integer shippingType) {
        this.shippingType = shippingType;
    }

    @Basic
    @Column(name = "shipping_loss")
    public BigDecimal getShippingLoss() {
        return shippingLoss;
    }

    public void setShippingLoss(BigDecimal shippingLoss) {
        this.shippingLoss = shippingLoss;
    }

    @Basic
    @Column(name = "paste_wage")
    public BigDecimal getPasteWage() {
        return pasteWage;
    }

    public void setPasteWage(BigDecimal pasteWage) {
        this.pasteWage = pasteWage;
    }

    @Basic
    @Column(name = "ship_fare")
    public BigDecimal getShipFare() {
        return shipFare;
    }

    public void setShipFare(BigDecimal shipFare) {
        this.shipFare = shipFare;
    }

    @Basic
    @Column(name = "flute_type")
    public Integer getFluteType() {
        return fluteType;
    }

    public void setFluteType(Integer fluteType) {
        this.fluteType = fluteType;
    }

}
