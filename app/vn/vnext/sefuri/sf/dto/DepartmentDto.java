package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import java.util.List;

/**
 * Contain department info
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_department")
public class DepartmentDto extends BaseDto {

	/* department */
	private String department;
	/* departmentCode */
	private String departmentCode;
	/* type */
	private Integer type;
	/* address */
	private String address;
	/* tel */
	private String tel;
	/* fax */
	private String fax;
	/* postalCode */
	private String postalCode;
	/* bankName */

	private String bankName;
	private Integer mailGroupFlag;

	private Integer salesAggregateFlag;
	/* departmentRsUser */
	private List<UserDto> users;
	/* departmentRsDepartmentGoal */
	private List<DepartmentGoalDto> departmentGoals;
	/* departmentRsCustomerGoal */
	private List<CustomerGoalDto> customerGoals;

	@Basic
	@Column(name = "mail_group_flag")
	public Integer getMailGroupFlag() {
		return mailGroupFlag;
	}

	public void setMailGroupFlag(Integer mailGroupFlag) {
		this.mailGroupFlag = mailGroupFlag;
	}/**
	 * Get department
	 *
	 * @return department
	 */
	@Basic
	@Column(name = "department")
	public String getDepartment(){
		return department;
	}

    /**
     * Set department
     *
     * @param department String
     */
    public void setDepartment(String department) {
        this.department = department;
    }

    /**
     * Get departmentCode
     *
     * @return departmentCode
     */
    @Basic
    @Column(name = "department_code")
    public String getDepartmentCode() {
        return departmentCode;
    }

    /**
     * Set departmentCode
     *
     * @param departmentCode String
     */
    public void setDepartmentCode(String departmentCode) {
        this.departmentCode = departmentCode;
    }

    /**
     * Get type
     *
     * @return type
     */
    @Basic
    @Column(name = "type")
    public Integer getType() {
        return type;
    }

    /**
     * Set type
     *
     * @param type Integer
     */
    public void setType(Integer type) {
        this.type = type;
    }

    /**
     * Get address
     *
     * @return address
     */
    @Basic
    @Column(name = "address")
    public String getAddress() {
        return address;
    }

    /**
     * Set address
     *
     * @param address String
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * Get tel
     *
     * @return tel
     */
    @Basic
    @Column(name = "tel")
    public String getTel() {
        return tel;
    }

    /**
     * Set tel
     *
     * @param tel String
     */
    public void setTel(String tel) {
        this.tel = tel;
    }

    /**
     * Get fax
     *
     * @return fax
     */
    @Basic
    @Column(name = "fax")
    public String getFax() {
        return fax;
    }

    /**
     * Set fax
     *
     * @param fax String
     */
    public void setFax(String fax) {
        this.fax = fax;
    }

    /**
     * Get postalCode
     *
     * @return postalCode
     */
    @Basic
    @Column(name = "postal_code")
    public String getPostalCode() {
        return postalCode;
    }

    /**
     * Set postalCode
     *
     * @param postalCode String
     */
    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    /**
     * Get bankName
     *
     * @return bankName
     */
    @Basic
    @Column(name = "bank_name")
    public String getBankName() {
        return bankName;
    }

    /**
     * Set bankName
     *
     * @param bankName String
     */
    public void setBankName(String bankName) {
        this.bankName = bankName;
    }

    /**
     * Get salesAggregateFlag
     *
     * @return salesAggregateFlag
     */
    @Basic
    @Column(name = "sales_aggregate_flag")
    public Integer getSalesAggregateFlag() {
        return salesAggregateFlag;
    }

    /**
     * Set salesAggregateFlag
     *
     * @param salesAggregateFlag Integer
     */
    public void setSalesAggregateFlag(Integer salesAggregateFlag) {
        this.salesAggregateFlag = salesAggregateFlag;
    }

    /**
     * Get users
     *
     * @return users
     */
    @Transient
    public List<UserDto> getUsers() {
        return users;
    }

    /**
     * Set users
     *
     * @param users List<UserDto>
     */
    public void setUsers(List<UserDto> users) {
        this.users = users;
    }

    /**
     * Get departmentGoals
     *
     * @return departmentGoals
     */
    @Transient
    public List<DepartmentGoalDto> getDepartmentGoals() {
        return departmentGoals;
    }

    /**
     * Set departmentGoals
     *
     * @param departmentGoals List<DepartmentGoalDto>
     */
    public void setDepartmentGoals(List<DepartmentGoalDto> departmentGoals) {
        this.departmentGoals = departmentGoals;
    }

    /**
     * Get customerGoals
     *
     * @return customerGoals
     */
    @Transient
    public List<CustomerGoalDto> getCustomerGoals() {
        return customerGoals;
    }

    /**
     * Set customerGoals
     *
     * @param customerGoals List<CustomerGoalDto>
     */
    public void setCustomerGoals(List<CustomerGoalDto> customerGoals) {
        this.customerGoals = customerGoals;
    }

}