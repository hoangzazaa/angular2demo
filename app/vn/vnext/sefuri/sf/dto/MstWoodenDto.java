package vn.vnext.sefuri.sf.dto;

import org.joda.time.DateTime;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.math.BigDecimal;

/**
 * Contain master wooden
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_mst_wooden")
public class MstWoodenDto extends BaseDto {

    /* woodenCode */
    private String woodenCode;
    /* woodenTotalNumber */
    private BigDecimal woodenTotalNumber;
    /* woodenExpiredDate */
    private DateTime woodenExpiredDate;
    /* last use*/
    private DateTime lastUse;
    /* woodenStatus */
    private String woodenStatus;

    /* itemCode */
    private String itemCode;

    /* workerCode */
    private String workerCode;

    /* itemCode */
    private Integer no;

    /**
     * Get woodenCode
     *
     * @return woodenCode
     */
    @Basic
    @Column(name = "wooden_code")
    public String getWoodenCode() {
        return woodenCode;
    }

    /**
     * Set woodenCode
     *
     * @param woodenCode String
     */
    public void setWoodenCode(String woodenCode) {
        this.woodenCode = woodenCode;
    }

    /**
     * Get woodenTotalNumber
     *
     * @return woodenTotalNumber
     */
    @Basic
    @Column(name = "wooden_total_number")
    public BigDecimal getWoodenTotalNumber() {
        return woodenTotalNumber;
    }

    /**
     * Set woodenTotalNumber
     *
     * @param woodenTotalNumber BigDecimal
     */
    public void setWoodenTotalNumber(BigDecimal woodenTotalNumber) {
        this.woodenTotalNumber = woodenTotalNumber;
    }

    /**
     * Get woodenExpiredDate
     *
     * @return woodenExpiredDate
     */
    @Basic
    @Column(name = "wooden_expired_date")
    public DateTime getWoodenExpiredDate() {
        return woodenExpiredDate;
    }

    /**
     * Set woodenExpiredDate
     *
     * @param woodenExpiredDate DateTime
     */
    public void setWoodenExpiredDate(DateTime woodenExpiredDate) {
        this.woodenExpiredDate = woodenExpiredDate;
    }

    @Basic
    @Column(name = "last_use")
    public DateTime getLastUse() {
        return lastUse;
    }

    public void setLastUse(DateTime lastUse) {
        this.lastUse = lastUse;
    }

    @Basic
    @Column(name = "wooden_status")
    public String getWoodenStatus() {
        return woodenStatus;
    }

    public void setWoodenStatus(final String woodenStatus) {
        this.woodenStatus = woodenStatus;
    }

    @Basic
    @Column(name = "item_code")
    public String getItemCode() {
        return itemCode;
    }

    public void setItemCode(final String itemCode) {
        this.itemCode = itemCode;
    }

    @Basic
    @Column(name = "worker_code")
    public String getWorkerCode() {
        return workerCode;
    }

    public void setWorkerCode(final String workerCode) {
        this.workerCode = workerCode;
    }

    @Basic
    @Column(name = "no")
    public Integer getNo() {
        return no;
    }

    public void setNo(final Integer no) {
        this.no = no;
    }

}