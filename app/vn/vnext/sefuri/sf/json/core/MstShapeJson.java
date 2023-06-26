package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.joda.time.DateTime;
import vn.vnext.sefuri.sf.dto.MstShapeDto;
import java.math.BigDecimal;
import java.util.Collection;

/**
 * Contain
 * @author vupt
 */
public class MstShapeJson  extends BaseJson<MstShapeDto> {

	//name
	@JsonProperty("name")
	private String name;

	//note
	@JsonProperty("note")
	private String note;

	@JsonProperty("default_params")
	private ShapeDefaultParamsJson default_params;
	//image
	@JsonProperty("image")
	private String image;


	/**
	 * Get name
	 *
	 * @return name
	 */
	public String getName(){
		return name;
	}

	/**
	 * Set name
	 *
	 * @param name String
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get note
	 *
	 * @return note
	 */
	public String getNote(){
		return note;
	}

	/**
	 * Set note
	 *
	 * @param note String
	 */
	public void setNote(String note) {
		this.note = note;
	}

	public ShapeDefaultParamsJson getDefault_params() {
		return default_params;
	}

	public void setDefault_params(ShapeDefaultParamsJson default_params) {
		this.default_params = default_params;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	/**
	 * Create MstShapeJson
	 *
	 * @param dto MstShapeDto
	 */

	public void setData(MstShapeDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.name = dto.getName();
		this.note = dto.getNote();
//		this.image = dto.getImage();
	}

	/**
	 * Create MstShapeDto
	 *
	 * @return MstShapeDto
	 */

	public MstShapeDto getData(){
		MstShapeDto dto = new MstShapeDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setName(name);
		dto.setNote(note);
//		dto.setImage(image);
		return dto;
	}
}
