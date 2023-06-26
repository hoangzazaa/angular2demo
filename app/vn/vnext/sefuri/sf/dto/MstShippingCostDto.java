package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain master shipping cost
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_shipping_cost")
public class MstShippingCostDto extends BaseDto {

    /* distance */
    private Integer distance;
    /* weight */
    private Integer weight;
    /* cost */
    private BigDecimal cost;
    /* factoryId */

    private Integer factoryId;

    /**
     * Get distance
     *
     * @return distance
     */
    @Basic
    @Column(name = "distance")
    public Integer getDistance() {
        return distance;
    }

    /**
     * Set distance
     *
     * @param distance Integer
     */
    public void setDistance(Integer distance) {
        this.distance = distance;
    }

    /**
     * Get weight
     *
     * @return weight
     */
    @Basic
    @Column(name = "weight")
    public Integer getWeight() {
        return weight;
    }

    /**
     * Set weight
     *
     * @param weight Integer
     */
    public void setWeight(Integer weight) {
        this.weight = weight;
    }

    /**
     * Get cost
     *
     * @return cost
     */
    @Basic
    @Column(name = "cost")
    public BigDecimal getCost() {
        return cost;
    }

    /**
     * Set cost
     *
     * @param cost BigDecimal
     */
    public void setCost(BigDecimal cost) {
        this.cost = cost;
    }

    /**
     * Get factoryId
     *
     * @return factoryId
     */
    @Basic
    @Column(name = "factory_id")
    public Integer getFactoryId() {
        return factoryId;
    }

    /**
     * Set factoryId
     *
     * @param factoryId Integer
     */
    public void setFactoryId(Integer factoryId) {
        this.factoryId = factoryId;
    }

}