package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.ShippingDestinationDto;

/**
 * 届け先 (納入先名のみ)
 *
 * 対応する TypeScript は client/src/app/model/core/ShippingDestination.model.ts
 */
public class SimpleShippingDestinationJson extends BaseJson<ShippingDestinationDto> {

    //納入先名
    @JsonProperty("deliveryName")
    private String deliveryName;


    /**
     * Get deliveryName
     *
     * @return deliveryName
     */
    public String getDeliveryName() {
        return deliveryName;
    }

    /**
     * Set deliveryName
     *
     * @param deliveryName String
     */
    public void setDeliveryName(String deliveryName) {
        this.deliveryName = deliveryName;
    }


    /**
     * Create ShippingDestinationJson
     *
     * @param dto ShippingDestinationDto
     */
    public void setData(ShippingDestinationDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.deliveryName = dto.getDeliveryName();
    }

    /**
     * Create ShippingDestinationDto
     *
     * @return ShippingDestinationDto
     */
    public ShippingDestinationDto getData() {
        ShippingDestinationDto dto = new ShippingDestinationDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setDeliveryName(deliveryName);
        return dto;
    }
}
