package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;
import org.joda.time.DateTime;
import java.util.List;
import java.math.BigDecimal;

/**
 * Contain common columns used in all table 
 * @author vupt 
 */
@MappedSuperclass
public abstract class BaseDto {

	/* id */
	protected Integer id;
	/* createdUser */
	protected Integer createdUser;
	/* updatedUser */
	protected Integer updatedUser;
	/* createdDate */
	protected DateTime createdDate;
	/* updatedDate */

	protected DateTime updatedDate;

	/**
	 * Get id
	 *
	 * @return id
	 */
	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getId(){
		return id;
	}

	/**
	 * Set id
	 *
	 * @param id Integer
	 */
	public void setId(Integer id) {
		this.id = id;
	}

	/**
	 * Get createdUser
	 *
	 * @return createdUser
	 */
	@Basic
	@Column(name = "created_user")
	public Integer getCreatedUser(){
		return createdUser;
	}

	/**
	 * Set createdUser
	 *
	 * @param createdUser Integer
	 */
	public void setCreatedUser(Integer createdUser) {
		this.createdUser = createdUser;
	}

	/**
	 * Get updatedUser
	 *
	 * @return updatedUser
	 */
	@Basic
	@Column(name = "updated_user")
	public Integer getUpdatedUser(){
		return updatedUser;
	}

	/**
	 * Set updatedUser
	 *
	 * @param updatedUser Integer
	 */
	public void setUpdatedUser(Integer updatedUser) {
		this.updatedUser = updatedUser;
	}

	/**
	 * Get createdDate
	 *
	 * @return createdDate
	 */
	@Basic
	@Column(name = "created_date")
	public DateTime getCreatedDate(){
		return createdDate;
	}

	/**
	 * Set createdDate
	 *
	 * @param createdDate DateTime
	 */
	public void setCreatedDate(DateTime createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * Get updatedDate
	 *
	 * @return updatedDate
	 */
	@Basic
	@Column(name = "updated_date")
	public DateTime getUpdatedDate(){
		return updatedDate;
	}

	/**
	 * Set updatedDate
	 *
	 * @param updatedDate DateTime
	 */
	public void setUpdatedDate(DateTime updatedDate) {
		this.updatedDate = updatedDate;
	}
}