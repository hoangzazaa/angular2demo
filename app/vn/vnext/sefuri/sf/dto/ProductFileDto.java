package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain information of file of product
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_product_file")
public class ProductFileDto extends BaseDto {

    /* fileId */
    private Integer fileId;
    /* originalName */
    private String originalName;
    /* productId */
    private Integer productId;
    /* ファイルID */
    private String productFileId;
    /* ファイル名称 */
    private String productFileName;
    /* 製品情報のメイン画像として使用 */
    private Integer primaryFlag = 0;
    /* メモ */
    private String memo;
    /* type */
    private Integer highlightFlag;

    private Integer type;
    /* productRsProductFile */
    private ProductDto product;
    /* fileRsProductFile */
    private FileDto file;

    /**
     * Get highlightFlag
     *
     * @return highlightFlag
     */
    @Basic
    @Column(name = "highlight_flag")
    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    /**
     * Set highlightFlag
     *
     * @param highlightFlag Integer
     */
    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }


    /**
     * Get fileId
     *
     * @return fileId
     */
    @Basic
    @Column(name = "file_id")
    public Integer getFileId() {
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
    @Basic
    @Column(name = "original_name")
    public String getOriginalName() {
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
    @Basic
    @Column(name = "product_id")
    public Integer getProductId() {
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
    @Basic
    @Column(name = "product_file_id")
    public String getProductFileId() {
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
    @Basic
    @Column(name = "product_file_name")
    public String getProductFileName() {
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
    @Basic
    @Column(name = "primary_flag")
    public Integer getPrimaryFlag() {
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
    @Basic
    @Column(name = "memo")
    public String getMemo() {
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
     * Get product
     *
     * @return product
     */
    @Transient
    public ProductDto getProduct() {
        return product;
    }

    /**
     * Set product
     *
     * @param product ProductDto
     */
    public void setProduct(ProductDto product) {
        this.product = product;
    }

    /**
     * Get file
     *
     * @return file
     */
    @Transient
    public FileDto getFile() {
        return file;
    }

    /**
     * Set file
     *
     * @param file FileDto
     */
    public void setFile(FileDto file) {
        this.file = file;
    }

}