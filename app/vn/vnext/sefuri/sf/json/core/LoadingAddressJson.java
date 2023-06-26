package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.LoadingAddressDto;

import java.util.List;

/**
 * Contain information of loading address
 *
 * @author vupt
 */
public class LoadingAddressJson extends BaseJson<LoadingAddressDto> {
    /* code */
    @JsonProperty("code")
    private String code;

    /* abbr */
    @JsonProperty("abbr")
    private String abbr;

    /* name */
    @JsonProperty("name")
    private String name;

    /* deleteFlag */
    @JsonProperty("deleteFlag")
    private Integer deleteFlag = 0;

    //loadingAddressRsShipping
    @JsonProperty("orderItem")
    private List<OrderItemJson> orderItem;

    public String getCode() {
        return code;
    }

    public void setCode(final String code) {
        this.code = code;
    }

    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(final String abbr) {
        this.abbr = abbr;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Integer getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(final Integer deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    /**
     * Get orderItem
     *
     * @return orderItem
     */
    public List<OrderItemJson> getOrderItem() {
        return orderItem;
    }

    /**
     * Set orderItem
     *
     * @param orderItem List<OrderItemJson>
     */
    public void setOrderItem(List<OrderItemJson> orderItem) {
        this.orderItem = orderItem;
    }

    /**
     * Create LoadingAddressJson
     *
     * @param dto LoadingAddressDto
     */

    public void setData(LoadingAddressDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.code = dto.getCode();
        this.abbr = dto.getAbbr();
        this.name = dto.getName();
        this.deleteFlag = dto.getDeleteFlag();
    }

    /**
     * Create LoadingAddressDto
     *
     * @return LoadingAddressDto
     */

    public LoadingAddressDto getData() {
        LoadingAddressDto dto = new LoadingAddressDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setCode(code);
        dto.setAbbr(abbr);
        dto.setName(name);
        dto.setDeleteFlag(deleteFlag);
        return dto;
    }
}
