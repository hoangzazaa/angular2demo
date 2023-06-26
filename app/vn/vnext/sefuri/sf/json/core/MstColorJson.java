package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstColorDto;

import java.math.BigDecimal;
import java.util.List;

/**
 * Contain color master data used for simulation
 *
 * @author vupt
 */
public class MstColorJson extends BaseJson<MstColorDto> {

    //色数
    @JsonProperty("colorOption")
    private Integer colorOption;

    //基本料
    @JsonProperty("basicCost")
    private BigDecimal basicCost;

    //通工賃
    @JsonProperty("throughWage")
    private BigDecimal throughWage;

    //一律
    @JsonProperty("costPerPacket")
    private BigDecimal costPerPacket;

    //通し工賃分岐
    @JsonProperty("throughWageBranch")
    private BigDecimal throughWageBranch;

    @JsonProperty("productType")
    private Integer productType;

    @JsonProperty("throughNumber")
    private Integer throughNumber;

    /**
     * Get colorOption
     *
     * @return colorOption
     */
    public Integer getColorOption() {
        return colorOption;
    }

    /**
     * Set colorOption
     *
     * @param colorOption Integer
     */
    public void setColorOption(Integer colorOption) {
        this.colorOption = colorOption;
    }

    /**
     * Get basicCost
     *
     * @return basicCost
     */
    public BigDecimal getBasicCost() {
        return basicCost;
    }

    /**
     * Set basicCost
     *
     * @param basicCost BigDecimal
     */
    public void setBasicCost(BigDecimal basicCost) {
        this.basicCost = basicCost;
    }

    /**
     * Get throughWage
     *
     * @return throughWage
     */
    public BigDecimal getThroughWage() {
        return throughWage;
    }

    /**
     * Set throughWage
     *
     * @param throughWage BigDecimal
     */
    public void setThroughWage(BigDecimal throughWage) {
        this.throughWage = throughWage;
    }

    /**
     * Get costPerPacket
     *
     * @return costPerPacket
     */
    public BigDecimal getCostPerPacket() {
        return costPerPacket;
    }

    /**
     * Set costPerPacket
     *
     * @param costPerPacket BigDecimal
     */
    public void setCostPerPacket(BigDecimal costPerPacket) {
        this.costPerPacket = costPerPacket;
    }

    /**
     * Get throughWageBranch
     *
     * @return throughWageBranch
     */
    public BigDecimal getThroughWageBranch() {
        return throughWageBranch;
    }

    /**
     * Set throughWageBranch
     *
     * @param throughWageBranch BigDecimal
     */
    public void setThroughWageBranch(BigDecimal throughWageBranch) {
        this.throughWageBranch = throughWageBranch;
    }

    public Integer getProductType() {
        return productType;
    }

    public void setProductType(Integer productType) {
        this.productType = productType;
    }

    public Integer getThroughNumber() {
        return throughNumber;
    }

    public void setThroughNumber(Integer throughNumber) {
        this.throughNumber = throughNumber;
    }

    /**
     * Create MstColorJson
     *
     * @param dto MstColorDto
     */

    public void setData(MstColorDto dto) {
        this.id = dto.getId();
        this.createdUser = dto.getCreatedUser();
        this.updatedUser = dto.getUpdatedUser();
        this.createdDate = dto.getCreatedDate();
        this.updatedDate = dto.getUpdatedDate();
        this.colorOption = dto.getColorOption();
        this.basicCost = dto.getBasicCost();
        this.throughWage = dto.getThroughWage();
        this.costPerPacket = dto.getCostPerPacket();
        this.throughWageBranch = dto.getThroughWageBranch();
        this.productType = dto.getProductType();
        this.throughNumber = dto.getThroughNumber();
    }

    /**
     * Create MstColorDto
     *
     * @return MstColorDto
     */

    public MstColorDto getData() {
        MstColorDto dto = new MstColorDto();
        dto.setId(id);
        dto.setCreatedUser(createdUser);
        dto.setUpdatedUser(updatedUser);
        dto.setCreatedDate(createdDate);
        dto.setUpdatedDate(updatedDate);
        dto.setColorOption(colorOption);
        dto.setBasicCost(basicCost);
        dto.setThroughWage(throughWage);
        dto.setCostPerPacket(costPerPacket);
        dto.setThroughWageBranch(throughWageBranch);
        dto.setProductType(productType);
        dto.setThroughNumber(throughNumber);
        return dto;
    }
}
