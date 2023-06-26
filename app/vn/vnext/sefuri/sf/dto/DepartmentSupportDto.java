package vn.vnext.sefuri.sf.dto;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "sfr_sf_department_support")
public class DepartmentSupportDto extends BaseDto {

    private Integer departmentId;

    private Integer emailType;

    private String departmentEmail;

    private String departmentEmailCc;

    private String emailToName;

    private String emailCCName;

    @Basic
    @Column(name = "email_to_name")
    public String getEmailToName() {
        return emailToName;
    }

    public void setEmailToName(String emailToName) {
        this.emailToName = emailToName;
    }

    @Basic
    @Column(name = "email_cc_name")
    public String getEmailCCName() {
        return emailCCName;
    }

    public void setEmailCCName(String emailCCName) {
        this.emailCCName = emailCCName;
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
    @Column(name = "email_type")
    public Integer getEmailType() {
        return emailType;
    }

    public void setEmailType(final Integer emailType) {
        this.emailType = emailType;
    }

    @Basic
    @Column(name = "department_email")
    public String getDepartmentEmail() {
        return departmentEmail;
    }

    public void setDepartmentEmail(final String departmentEmail) {
        this.departmentEmail = departmentEmail;
    }

    @Basic
    @Column(name = "department_email_cc")
    public String getDepartmentEmailCc() {
        return departmentEmailCc;
    }

    public void setDepartmentEmailCc(final String departmentEmailCc) {
        this.departmentEmailCc = departmentEmailCc;
    }
}
