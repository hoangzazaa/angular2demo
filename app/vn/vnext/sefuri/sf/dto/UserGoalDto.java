package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Created by DungTQ on 6/6/2017.
 */

@Entity
@Table(name = "sfr_sf_user_goal")
public class UserGoalDto extends BaseDto {

    private Integer picId;

    private Integer departmentId;

    private Integer newRecord;

    private Integer digitalSales;

    @Basic
    @Column(name = "year")
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    private Integer year;


    @Basic
    @Column(name = "pic_id")
    public Integer getPicId() {
        return picId;
    }

    public void setPicId(Integer picId) {
        this.picId = picId;
    }

    @Basic
    @Column(name = "department_id")
    public Integer getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Integer departmentId) {
        this.departmentId = departmentId;
    }

    @Basic
    @Column(name = "new_record")
    public Integer getNewRecord() {
        return newRecord;
    }

    public void setNewRecord(Integer newRecord) {
        this.newRecord = newRecord;
    }

    @Basic
    @Column(name = "digital_sales")
    public Integer getDigitalSales() {
        return digitalSales;
    }

    public void setDigitalSales(Integer digitalSales) {
        this.digitalSales = digitalSales;
    }
}
