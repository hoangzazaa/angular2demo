package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.MstDecorativeDto;

import java.math.BigDecimal;

/**
 * Created by admin on 3/18/2017.
 */
public class MstDecorativeJson extends BaseJson<MstDecorativeDto> {
    @JsonProperty("throughNumber")
    Integer throughNumber;

    @JsonProperty("lossPercent")
    BigDecimal lossPercent;

    @JsonProperty("stepWage")
    BigDecimal stepWage;

    @JsonProperty("throughWage")
    BigDecimal throughWage;

    @JsonProperty("laminationType")
    Integer laminationType;

    @JsonProperty("fare")
    BigDecimal fare;


    public Integer getThroughNumber() {
        return throughNumber;
    }

    public void setThroughNumber(Integer throughNumber) {
        this.throughNumber = throughNumber;
    }

    public BigDecimal getLossPercent() {
        return lossPercent;
    }

    public void setLossPercent(BigDecimal lossPercent) {
        this.lossPercent = lossPercent;
    }

    public BigDecimal getStepWage() {
        return stepWage;
    }

    public void setStepWage(BigDecimal stepWage) {
        this.stepWage = stepWage;
    }

    public BigDecimal getThroughWage() {
        return throughWage;
    }

    public void setThroughWage(BigDecimal throughWage) {
        this.throughWage = throughWage;
    }

    public Integer getLaminationType() {
        return laminationType;
    }

    public void setLaminationType(Integer laminationType) {
        this.laminationType = laminationType;
    }

    public BigDecimal getFare() {
        return fare;
    }

    public void setFare(BigDecimal fare) {
        this.fare = fare;
    }

    @Override
    public void setData(MstDecorativeDto dataDto) {
        this.throughNumber = dataDto.getThroughNumber();
        this.fare = dataDto.getFare();
        this.lossPercent = dataDto.getLossPercent();
        this.stepWage = dataDto.getStepWage();
        this.throughWage = dataDto.getThroughWage();
        this.laminationType = dataDto.getLaminationType();
    }

    @Override
    public MstDecorativeDto getData() {
        MstDecorativeDto dto = new MstDecorativeDto();
        dto.setThroughNumber(this.throughNumber);
        dto.setFare(this.fare);
        dto.setLaminationType(this.laminationType);
        dto.setLossPercent(this.lossPercent);
        dto.setStepWage(this.stepWage);
        dto.setThroughWage(this.throughWage);
        return dto;
    }
}
