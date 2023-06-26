package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Created by admin on 3/18/2017.
 */
@Entity
@Table(name = "sfr_sf_mst_decorative")
public class MstDecorativeDto extends BaseDto {
    Integer throughNumber;

    BigDecimal lossPercent;

    BigDecimal stepWage;

    BigDecimal throughWage;

    Integer laminationType;

    BigDecimal fare;

    @Basic
    @Column(name = "through_number")
    public Integer getThroughNumber() {
        return throughNumber;
    }

    public void setThroughNumber(Integer throughNumber) {
        this.throughNumber = throughNumber;
    }

    @Basic
    @Column(name = "loss_percent")
    public BigDecimal getLossPercent() {
        return lossPercent;
    }

    public void setLossPercent(BigDecimal lossPercent) {
        this.lossPercent = lossPercent;
    }

    @Basic
    @Column(name = "step_wage")
    public BigDecimal getStepWage() {
        return stepWage;
    }

    public void setStepWage(BigDecimal stepWage) {
        this.stepWage = stepWage;
    }

    @Basic
    @Column(name = "through_wage")
    public BigDecimal getThroughWage() {
        return throughWage;
    }

    public void setThroughWage(BigDecimal throughWage) {
        this.throughWage = throughWage;
    }

    @Basic
    @Column(name = "lamination_type")
    public Integer getLaminationType() {
        return laminationType;
    }

    public void setLaminationType(Integer laminationType) {
        this.laminationType = laminationType;
    }

    @Basic
    @Column(name = "fare")
    public BigDecimal getFare() {
        return fare;
    }

    public void setFare(BigDecimal fare) {
        this.fare = fare;
    }
}
