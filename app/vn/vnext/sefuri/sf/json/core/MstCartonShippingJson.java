package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstCartonShippingDto;

import java.math.BigDecimal;

/**
 * Created by VuPT on 5/11/2017.
 */
public class MstCartonShippingJson extends BaseJson<MstCartonShippingDto> {
    @JsonProperty("distance")
    Integer distance;
    @JsonProperty("fluteType")
    Integer fluteType;
    @JsonProperty("cost")
    BigDecimal cost;

    public Integer getDistance() {
        return distance;
    }

    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    public Integer getFluteType() {
        return fluteType;
    }

    public void setFluteType(Integer fluteType) {
        this.fluteType = fluteType;
    }

    public BigDecimal getCost() {
        return cost;
    }

    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    @Override
    public void setData(MstCartonShippingDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.distance = dto.getDistance();
        this.fluteType = dto.getFluteType();
        this.cost = dto.getCost();
    }

    @Override
    public MstCartonShippingDto getData() {
        MstCartonShippingDto dto = new MstCartonShippingDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setDistance(distance);
        dto.setFluteType(fluteType);
        dto.setCost(cost);
        return dto;
    }
}
