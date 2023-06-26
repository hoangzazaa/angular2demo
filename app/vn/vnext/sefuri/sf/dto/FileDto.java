package vn.vnext.sefuri.sf.dto;

import javax.persistence.*;

/**
 * Contain all files attached to comments in deals.
 *
 * @author vupt
 */
@Entity
@Table(name = "sfr_sf_file")
public class FileDto extends BaseDto {

    /* fileCode */
    private String fileCode;
    /* file extension */
    private String fileExtension;
    /* filePath */
    private String filePath;
    /* fileRsDealFile */
    private DealFileDto dealFile;
    /* fileRsProductFile */
    private ProductFileDto productFile;
    /* fileRsShape */
    private MstShapeDto shapeFile;

    /**
     * Get fileCode
     *
     * @return fileCode
     */
    @Basic
    @Column(name = "file_code")
    public String getFileCode() {
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
     * Get fileExtension
     *
     * @return fileExtension
     */
    @Basic
    @Column(name = "file_extension")
    public String getFileExtension() {
        return fileExtension;
    }

    /**
     * Set fileExtension
     *
     * @param fileExtension String
     */
    public void setFileExtension(String fileExtension) {
        this.fileExtension = fileExtension;
    }

    /**
     * Get filePath
     *
     * @return filePath
     */
    @Basic
    @Column(name = "file_path")
    public String getFilePath() {
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
    @Transient
    public DealFileDto getDealFile() {
        return dealFile;
    }

    /**
     * Set dealFile
     *
     * @param dealFile DealFileDto
     */
    public void setDealFile(DealFileDto dealFile) {
        this.dealFile = dealFile;
    }

    /**
     * Get productFile
     *
     * @return productFile
     */
    @Transient
    public ProductFileDto getProductFile() {
        return productFile;
    }

    /**
     * Set productFile
     *
     * @param productFile ProductFileDto
     */
    public void setProductFile(ProductFileDto productFile) {
        this.productFile = productFile;
    }

    /**
     * Get shapeFile
     *
     * @return shapeFile
     */
    @Transient
    public MstShapeDto getShapeFile() {
        return shapeFile;
    }

    /**
     * Set shapeFile
     *
     * @param shapeFile MstShapeDto
     */
    public void setShapeFile(MstShapeDto shapeFile) {
        this.shapeFile = shapeFile;
    }

}