package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.UserDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain user information used to authenticate and authorize 
 * @author vupt
 */
public class UserJson  extends BaseJson<UserDto> {

	//username
	@JsonProperty("username")
	private String username;

	//password
	@JsonProperty("password")
	private String password;

	//enableFlag
	@JsonProperty("enableFlag")
	private Integer enableFlag;

	//role
	@JsonProperty("role")
	private String role;

	//email
	@JsonProperty("email")
	private String email;

	//departmentId
	@JsonProperty("departmentId")
	private Integer departmentId;

	//departmentCode
	@JsonProperty("departmentCode")
	private String departmentCode;

	//deleteFlag
	@JsonProperty("deleteFlag")
	private Integer deleteFlag;

	//userCode
	@JsonProperty("userCode")
	private String userCode;

	//userRsMyboxItem
	@JsonProperty("myboxItems")
	private List<MyboxItemJson> myboxItems;

	//userRsDeal
	@JsonProperty("deals")
	private List<DealJson> deals;

	//userRsComment
	@JsonProperty("comments")
	private List<CommentJson> comments;

	//userRsUserPasswordRecovery
	@JsonProperty("userPasswordRecovers")
	private List<UserPasswordRecoverJson> userPasswordRecovers;

	//salesRsDeal
	@JsonProperty("salesDeals")
	private List<DealJson> salesDeals;

	//departmentRsUser
	@JsonProperty("department")
	private DepartmentJson department;


	/**
	 * Get username
	 *
	 * @return username
	 */
	public String getUsername(){
		return username;
	}

	/**
	 * Set username
	 *
	 * @param username String
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Get password
	 *
	 * @return password
	 */
	public String getPassword(){
		return password;
	}

	/**
	 * Set password
	 *
	 * @param password String
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Get enableFlag
	 *
	 * @return enableFlag
	 */
	public Integer getEnableFlag(){
		return enableFlag;
	}

	/**
	 * Set enableFlag
	 *
	 * @param enableFlag Integer
	 */
	public void setEnableFlag(Integer enableFlag) {
		this.enableFlag = enableFlag;
	}

	/**
	 * Get role
	 *
	 * @return role
	 */
	public String getRole(){
		return role;
	}

	/**
	 * Set role
	 *
	 * @param role String
	 */
	public void setRole(String role) {
		this.role = role;
	}

	/**
	 * Get email
	 *
	 * @return email
	 */
	public String getEmail(){
		return email;
	}

	/**
	 * Set email
	 *
	 * @param email String
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Get departmentId
	 *
	 * @return departmentId
	 */
	public Integer getDepartmentId(){
		return departmentId;
	}

	/**
	 * Set departmentId
	 *
	 * @param departmentId Integer
	 */
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	/**
	 * Get departmentCode
	 *
	 * @return departmentCode
	 */
	public String getDepartmentCode(){
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
	 * Get deleteFlag
	 *
	 * @return deleteFlag
	 */
	public Integer getDeleteFlag(){
		return deleteFlag;
	}

	/**
	 * Set deleteFlag
	 *
	 * @param deleteFlag Integer
	 */
	public void setDeleteFlag(Integer deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	/**
	 * Get userCode
	 *
	 * @return userCode
	 */
	public String getUserCode(){
		return userCode;
	}

	/**
	 * Set userCode
	 *
	 * @param userCode String
	 */
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}

	/**
	 * Get myboxItems
	 *
	 * @return myboxItems
	 */
	public List<MyboxItemJson> getMyboxItems(){
		return myboxItems;
	}

	/**
	 * Set myboxItems
	 *
	 * @param myboxItems List<MyboxItemJson>
	 */
	public void setMyboxItems(List<MyboxItemJson> myboxItems) {
		this.myboxItems = myboxItems;
	}

	/**
	 * Get deals
	 *
	 * @return deals
	 */
	public List<DealJson> getDeals(){
		return deals;
	}

	/**
	 * Set deals
	 *
	 * @param deals List<DealJson>
	 */
	public void setDeals(List<DealJson> deals) {
		this.deals = deals;
	}

	/**
	 * Get comments
	 *
	 * @return comments
	 */
	public List<CommentJson> getComments(){
		return comments;
	}

	/**
	 * Set comments
	 *
	 * @param comments List<CommentJson>
	 */
	public void setComments(List<CommentJson> comments) {
		this.comments = comments;
	}

	/**
	 * Get userPasswordRecovers
	 *
	 * @return userPasswordRecovers
	 */
	public List<UserPasswordRecoverJson> getUserPasswordRecovers(){
		return userPasswordRecovers;
	}

	/**
	 * Set userPasswordRecovers
	 *
	 * @param userPasswordRecovers List<UserPasswordRecoverJson>
	 */
	public void setUserPasswordRecovers(List<UserPasswordRecoverJson> userPasswordRecovers) {
		this.userPasswordRecovers = userPasswordRecovers;
	}

	/**
	 * Get salesDeals
	 *
	 * @return salesDeals
	 */
	public List<DealJson> getSalesDeals(){
		return salesDeals;
	}

	/**
	 * Set salesDeals
	 *
	 * @param salesDeals List<DealJson>
	 */
	public void setSalesDeals(List<DealJson> salesDeals) {
		this.salesDeals = salesDeals;
	}

	/**
	 * Get department
	 *
	 * @return department
	 */
	public DepartmentJson getDepartment(){
		return department;
	}

	/**
	 * Set department
	 *
	 * @param department DepartmentJson
	 */
	public void setDepartment(DepartmentJson department) {
		this.department = department;
	}

	/**
	 * Create UserJson
	 *
	 * @param dto UserDto
	 */

	public void setData(UserDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.username = dto.getUsername();
		this.password = dto.getPassword();
		this.enableFlag = dto.getEnableFlag();
		this.role = dto.getRole();
		this.email = dto.getEmail();
		this.departmentId = dto.getDepartmentId();
		this.departmentCode = dto.getDepartmentCode();
		this.deleteFlag = dto.getDeleteFlag();
		this.userCode = dto.getUserCode();
		this.department = new DepartmentJson();
		this.department.setId(dto.getDepartmentId());
	}

	/**
	 * Create UserDto
	 *
	 * @return UserDto
	 */

	public UserDto getData(){
		UserDto dto = new UserDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setUsername(username);
		dto.setPassword(password);
		dto.setEnableFlag(enableFlag);
		dto.setRole(role);
		dto.setEmail(email);
		dto.setDepartmentId(departmentId);
		dto.setDepartmentCode(departmentCode);
		dto.setDeleteFlag(deleteFlag);
		dto.setUserCode(userCode);
		return dto;
	}
}
