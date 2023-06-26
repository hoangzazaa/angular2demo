package vn.vnext.sefuri.sf.json.core;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ProductFileDto;

/**
 * Contain information of file of product
 * @author vupt
 */
public class ProductFileJson  extends BaseJson<ProductFileDto> {

	//fileId
	@JsonProperty("fileId")
	private Integer fileId;

	//originalName
	@JsonProperty("originalName")
	private String originalName;

	//productId
	@JsonProperty("productId")
	private Integer productId;

	//ファイルID
	@JsonProperty("productFileId")
	private String productFileId;

	//ファイル名称
	@JsonProperty("productFileName")
	private String productFileName;

	//製品情報のメイン画像として使用
	@JsonProperty("primaryFlag")
	private Integer primaryFlag;

	//メモ
	@JsonProperty("memo")
	private String memo;

	//type
	@JsonProperty("type")
	private Integer type;

	@JsonProperty("productName")
	private String productName;

	//productRsProductFile
	@JsonProperty("product")
	private ProductJson product;

	//fileRsProductFile
	@JsonProperty("file")
	private FileJson file;

	/* image file path */
	@JsonProperty("srcImg")
	private String srcImg;

	/**
	 * Get fileId
	 *
	 * @return fileId
	 */
	public Integer getFileId(){
		return fileId;
	}

	/**
	 * Set fileId
	 *
	 * @param fileId Integer
	 */
	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}

	/**
	 * Get originalName
	 *
	 * @return originalName
	 */
	public String getOriginalName(){
		return originalName;
	}

	/**
	 * Set originalName
	 *
	 * @param originalName String
	 */
	public void setOriginalName(String originalName) {
		this.originalName = originalName;
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
	 * Get productFileId
	 *
	 * @return productFileId
	 */
	public String getProductFileId(){
		return productFileId;
	}

	/**
	 * Set productFileId
	 *
	 * @param productFileId String
	 */
	public void setProductFileId(String productFileId) {
		this.productFileId = productFileId;
	}

	/**
	 * Get productFileName
	 *
	 * @return productFileName
	 */
	public String getProductFileName(){
		return productFileName;
	}

	/**
	 * Set productFileName
	 *
	 * @param productFileName String
	 */
	public void setProductFileName(String productFileName) {
		this.productFileName = productFileName;
	}

	/**
	 * Get primaryFlag
	 *
	 * @return primaryFlag
	 */
	public Integer getPrimaryFlag(){
		return primaryFlag;
	}

	/**
	 * Set primaryFlag
	 *
	 * @param primaryFlag Integer
	 */
	public void setPrimaryFlag(Integer primaryFlag) {
		this.primaryFlag = primaryFlag;
	}

	/**
	 * Get memo
	 *
	 * @return memo
	 */
	public String getMemo(){
		return memo;
	}

	/**
	 * Set memo
	 *
	 * @param memo String
	 */
	public void setMemo(String memo) {
		this.memo = memo;
	}

	/**
	 * Get type
	 *
	 * @return type
	 */
	public Integer getType(){
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
	 * Get file
	 *
	 * @return file
	 */
	public FileJson getFile(){
		return file;
	}

	/**
	 * Set file
	 *
	 * @param file FileJson
	 */
	public void setFile(FileJson file) {
		this.file = file;
	}

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	/**
	 * Create ProductFileJson
	 *
	 * @param dto ProductFileDto
	 */

	public void setData(ProductFileDto dto){
		this.id = dto.getId();
		this.createdUser = dto.getCreatedUser();
		this.updatedUser = dto.getUpdatedUser();
		this.createdDate = dto.getCreatedDate();
		this.updatedDate = dto.getUpdatedDate();
		this.fileId = dto.getFileId();
		this.originalName = dto.getOriginalName();
		this.productId = dto.getProductId();
		this.productFileId = dto.getProductFileId();
		this.productFileName = dto.getProductFileName();
		this.primaryFlag = dto.getPrimaryFlag();
		this.memo = dto.getMemo();
		this.type = dto.getType();
		this.product = new ProductJson();
		this.product.setId(dto.getProductId());
		this.file = new FileJson();
		this.file.setId(dto.getFileId());
	}

	/**
	 * Create ProductFileDto
	 *
	 * @return ProductFileDto
	 */

	public ProductFileDto getData(){
		ProductFileDto dto = new ProductFileDto();
		dto.setId(id);
		dto.setCreatedUser(createdUser);
		dto.setUpdatedUser(updatedUser);
		dto.setCreatedDate(createdDate);
		dto.setUpdatedDate(updatedDate);
		dto.setFileId(fileId);
		dto.setOriginalName(originalName);
		dto.setProductId(productId);
		dto.setProductFileId(productFileId);
		dto.setProductFileName(productFileName);
		dto.setPrimaryFlag(primaryFlag);
		dto.setMemo(memo);
		dto.setType(type);
		return dto;
	}
}
