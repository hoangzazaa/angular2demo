package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain information of loading address
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_loading_address")
public class LoadingAddressDto extends BaseDto {
    /* code */
    private String code;
    /* abbr */
    private String abbr;
    /* name */
    private String name;
    /* deleteFlag */
    private Integer deleteFlag = 0;

    /* loadingAddressRsShipping */
    private List<OrderItemDto> orderItem;

    /**
     * Get code
     *
     * @return code
     */
    @Basic
    @Column(name = "code")
    public String getCode() {
        return code;
    }

    /**
     * Set code
     *
     * @param code String
     */
    public void setCode(final String code) {
        this.code = code;
    }

    @Basic
    @Column(name = "abbr")
    public String getAbbr() {
        return abbr;
    }

    public void setAbbr(final String abbr) {
        this.abbr = abbr;
    }

    @Basic
    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "delete_flag")
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
    @Transient
    public List<OrderItemDto> getOrderItem() {
        return orderItem;
    }

    /**
     * Set orderItem
     *
     * @param orderItem List<OrderItemDto>
     */
    public void setOrderItem(List<OrderItemDto> orderItem) {
        this.orderItem = orderItem;
    }
}