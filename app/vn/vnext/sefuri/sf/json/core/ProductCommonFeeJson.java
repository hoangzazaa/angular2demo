package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.ProductCommonFeeDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain information about common fees of a deal product 
 * @author vupt
 */
public class ProductCommonFeeJson  extends BaseJson<ProductCommonFeeDto> {

	//デザイン代
	@JsonProperty("designFee")
	private BigDecimal designFee;

	//製版代
	@JsonProperty("plateMakingFee")
	private BigDecimal plateMakingFee;

	//木型代
	@JsonProperty("woodenFee")
	private BigDecimal woodenFee;

	//金型代
	@JsonProperty("moldFee")
	private BigDecimal moldFee;

	//樹脂版代
	@JsonProperty("resinFee")
	private BigDecimal resinFee;

	//productId
	@JsonProperty("productId")
	private Integer productId;

	//productRsProductCommonFee
	@JsonProperty("product")
	private ProductJson product;


	/**
	 * Get designFee
	 *
	 * @return designFee
	 */
	public BigDecimal getDesignFee(){
		return designFee;
	}

	/**
	 * Set designFee
	 *
	 * @param designFee BigDecimal
	 */
	public void setDesignFee(BigDecimal designFee) {
		this.designFee = designFee;
	}

	/**
	 * Get plateMakingFee
	 *
	 * @return plateMakingFee
	 */
	public BigDecimal getPlateMakingFee(){
		return plateMakingFee;
	}

	/**
	 * Set plateMakingFee
	 *
	 * @param plateMakingFee BigDecimal
	 */
	public void setPlateMakingFee(BigDecimal plateMakingFee) {
		this.plateMakingFee = plateMakingFee;
	}

	/**
	 * Get woodenFee
	 *
	 * @return woodenFee
	 */
	public BigDecimal getWoodenFee(){
		return woodenFee;
	}

	/**
	 * Set woodenFee
	 *
	 * @param woodenFee BigDecimal
	 */
	public void setWoodenFee(BigDecimal woodenFee) {
		this.woodenFee = woodenFee;
	}

	/**
	 * Get moldFee
	 *
	 * @return moldFee
	 */
	public BigDecimal getMoldFee(){
		return moldFee;
	}

	/**
	 * Set moldFee
	 *
	 * @param moldFee BigDecimal
	 */
	public void setMoldFee(BigDecimal moldFee) {
		this.moldFee = moldFee;
	}

	/**
	 * Get resinFee
	 *
	 * @return resinFee
	 */
	public BigDecimal getResinFee(){
		return resinFee;
	}

	/**
	 * Set resinFee
	 *
	 * @param resinFee BigDecimal
	 */
	public void setResinFee(BigDecimal resinFee) {
		this.resinFee = resinFee;
	}

	/**
	 * Get productId
	 *
	 * @return productId
	 */
	public Integer getProductId(){
		return productId;
	}

	/**
	 * Set productId
	 *
	 * @param productId Integer
	 */
	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	/**
	 * Get product
	 *
	 * @return product
	 */
	public ProductJson getProduct(){
		return product;
	}

	/**
	 * Set product
	 *
	 * @param product ProductJson
	 */
	public void setProduct(ProductJson product) {
		this.product = product;
	}

	/**
	 * Create ProductCommonFeeJson
	 *
	 * @param dto ProductCommonFeeDto
	 */

	public void setData(ProductCommonFeeDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.designFee = dto.getDesignFee();
		this.plateMakingFee = dto.getPlateMakingFee();
		this.woodenFee = dto.getWoodenFee();
		this.moldFee = dto.getMoldFee();
		this.resinFee = dto.getResinFee();
		this.productId = dto.getProductId();
		this.product = new ProductJson();
		this.product.setId(dto.getProductId());
	}

	/**
	 * Create ProductCommonFeeDto
	 *
	 * @return ProductCommonFeeDto
	 */

	public ProductCommonFeeDto getData(){
		ProductCommonFeeDto dto = new ProductCommonFeeDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setDesignFee(designFee);
		dto.setPlateMakingFee(plateMakingFee);
		dto.setWoodenFee(woodenFee);
		dto.setMoldFee(moldFee);
		dto.setResinFee(resinFee);
		dto.setProductId(productId);
		return dto;
	}
}
