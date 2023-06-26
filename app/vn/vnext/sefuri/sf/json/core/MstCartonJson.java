package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstCartonDto;

import java.math.BigDecimal;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstCartonJson extends BaseJson<MstCartonDto> {
    @JsonProperty("cartonLong")
    BigDecimal cartonLong;

    @JsonProperty("cartonShort")
    BigDecimal cartonShort;

    @JsonProperty("shippingType")
    Integer shippingType;

    @JsonProperty("shippingLoss")
    BigDecimal shippingLoss;

    @JsonProperty("pasteWage")
    BigDecimal pasteWage;

    @JsonProperty("shipFare")
    BigDecimal shipFare;

    @JsonProperty("fluteType")
    Integer fluteType;


    public BigDecimal getCartonLong() {
        return cartonLong;
    }

    public void setCartonLong(BigDecimal cartonLong) {
        this.cartonLong = cartonLong;
    }

    public BigDecimal getCartonShort() {
        return cartonShort;
    }

    public void setCartonShort(BigDecimal cartonShort) {
        this.cartonShort = cartonShort;
    }

    public Integer getShippingType() {
        return shippingType;
    }

    public void setShippingType(Integer shippingType) {
        this.shippingType = shippingType;
    }

    public BigDecimal getShippingLoss() {
        return shippingLoss;
    }

    public void setShippingLoss(BigDecimal shippingLoss) {
        this.shippingLoss = shippingLoss;
    }

    public BigDecimal getPasteWage() {
        return pasteWage;
    }

    public void setPasteWage(BigDecimal pasteWage) {
        this.pasteWage = pasteWage;
    }

    public BigDecimal getShipFare() {
        return shipFare;
    }

    public void setShipFare(BigDecimal shipFare) {
        this.shipFare = shipFare;
    }

    public Integer getFluteType() {
        return fluteType;
    }

    public void setFluteType(Integer fluteType) {
        this.fluteType = fluteType;
    }

    @Override
    public void setData(MstCartonDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.cartonLong = dto.getCartonLong();
        this.cartonShort = dto.getCartonShort();
        this.shippingType = dto.getShippingType();
        this.shippingLoss = dto.getShippingLoss();
        this.shipFare = dto.getShipFare();
        this.fluteType = dto.getFluteType();
        this.pasteWage = dto.getPasteWage();
    }

    @Override
    public MstCartonDto getData() {
        MstCartonDto dto = new MstCartonDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setCartonShort(cartonShort);
        dto.setCartonLong(cartonLong);
        dto.setShippingLoss(shippingLoss);
        dto.setShipFare(shipFare);
        dto.setPasteWage(pasteWage);
        dto.setShippingType(shippingType);
        dto.setFluteType(fluteType);
        return dto;
    }
}
