package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.DrawingImageDto;
import java.math.BigDecimal;
import java.util.List;

/**
 * Contain drawing image used for SF008 
 * @author vupt
 */
public class DrawingImageJson  extends BaseJson<DrawingImageDto> {

	//productId
	@JsonProperty("productId")
	private Integer productId;

	//x
	@JsonProperty("x")
	private Integer x;

	//y
	@JsonProperty("y")
	private Integer y;

	//rotate
	@JsonProperty("rotation")
	private Integer rotate;

	//productRsDrawingImage
	@JsonProperty("product")
	private ProductJson product;


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
	 * Get x
	 *
	 * @return x
	 */
	public Integer getX(){
		return x;
	}

	/**
	 * Set x
	 *
	 * @param x Integer
	 */
	public void setX(Integer x) {
		this.x = x;
	}

	/**
	 * Get y
	 *
	 * @return y
	 */
	public Integer getY(){
		return y;
	}

	/**
	 * Set y
	 *
	 * @param y Integer
	 */
	public void setY(Integer y) {
		this.y = y;
	}

	/**
	 * Get rotate
	 *
	 * @return rotate
	 */
	public Integer getRotate(){
		return rotate;
	}

	/**
	 * Set rotate
	 *
	 * @param rotate Integer
	 */
	public void setRotate(Integer rotate) {
		this.rotate = rotate;
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
	 * Create DrawingImageJson
	 *
	 * @param dto DrawingImageDto
	 */

	public void setData(DrawingImageDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.productId = dto.getProductId();
		this.x = dto.getX();
		this.y = dto.getY();
		this.rotate = dto.getRotate();
		this.product = new ProductJson();
		this.product.setId(dto.getProductId());
	}

	/**
	 * Create DrawingImageDto
	 *
	 * @return DrawingImageDto
	 */

	public DrawingImageDto getData(){
		DrawingImageDto dto = new DrawingImageDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setProductId(productId);
		dto.setX(x);
		dto.setY(y);
		dto.setRotate(rotate);
		return dto;
	}
}
