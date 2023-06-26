package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;

import vn.vnext.sefuri.sf.dto.FileDto;

/**
 * Contain all files attached to comments in deals.
 *
 * <p>対応する TypeScript は client/src/app/model/core/File.model.ts
 * @author vupt
 */
public class FileJson  extends BaseJson<FileDto> {

	//fileCode
	@JsonProperty("fileCode")
	private String fileCode;

	//filePath
	@JsonProperty("filePath")
	private String filePath;

	//fileRsDealFile
	@JsonProperty("dealFile")
	private DealFileJson dealFile;

	//fileRsProductFile
	@JsonProperty("productFile")
	private ProductFileJson productFile;

	//fileRsShape
	@JsonProperty("shapeFile")
	private MstShapeJson shapeFile;


	/**
	 * Get fileCode
	 *
	 * @return fileCode
	 */
	public String getFileCode(){
		return fileCode;
	}

	/**
	 * Set fileCode
	 *
	 * @param fileCode String
	 */
	public void setFileCode(String fileCode) {
		this.fileCode = fileCode;
	}

	/**
	 * Get filePath
	 *
	 * @return filePath
	 */
	public String getFilePath(){
		return filePath;
	}

	/**
	 * Set filePath
	 *
	 * @param filePath String
	 */
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	/**
	 * Get dealFile
	 *
	 * @return dealFile
	 */
	public DealFileJson getDealFile(){
		return dealFile;
	}

	/**
	 * Set dealFile
	 *
	 * @param dealFile DealFileJson
	 */
	public void setDealFile(DealFileJson dealFile) {
		this.dealFile = dealFile;
	}

	/**
	 * Get productFile
	 *
	 * @return productFile
	 */
	public ProductFileJson getProductFile(){
		return productFile;
	}

	/**
	 * Set productFile
	 *
	 * @param productFile ProductFileJson
	 */
	public void setProductFile(ProductFileJson productFile) {
		this.productFile = productFile;
	}

	/**
	 * Get shapeFile
	 *
	 * @return shapeFile
	 */
	public MstShapeJson getShapeFile(){
		return shapeFile;
	}

	/**
	 * Set shapeFile
	 *
	 * @param shapeFile MstShapeJson
	 */
	public void setShapeFile(MstShapeJson shapeFile) {
		this.shapeFile = shapeFile;
	}

	/**
	 * Create FileJson
	 *
	 * @param dto FileDto
	 */

	public void setData(FileDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.fileCode = dto.getFileCode();
		this.filePath = dto.getFilePath();
		this.dealFile = new DealFileJson();
		this.dealFile.setFileId(dto.getId());
		this.productFile = new ProductFileJson();
		this.productFile.setFileId(dto.getId());
		this.shapeFile = new MstShapeJson();
	}

	/**
	 * Create FileDto
	 *
	 * @return FileDto
	 */

	public FileDto getData(){
		FileDto dto = new FileDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setFileCode(fileCode);
		dto.setFilePath(filePath);
		return dto;
	}
}
