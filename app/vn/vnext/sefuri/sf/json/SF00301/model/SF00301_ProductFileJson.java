package vn.vnext.sefuri.sf.json.SF00301.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import vn.vnext.sefuri.sf.dto.ProductFileDto;
import vn.vnext.sefuri.sf.json.common.BaseJson;

/**
 * Contain information of file of product
 *
 * @author vupt
 */
public class SF00301_ProductFileJson extends BaseJson<ProductFileDto> {
    //fileId
    @JsonProperty("fileId")
    private Integer fileId;

    //ファイルID
    @JsonProperty("productFileId")
    private String productFileId;

    //originalName
    @JsonProperty("fileName")
    private String fileName;

    //type
    @JsonProperty("fileType")
    private Integer fileType;

    //メモ
    @JsonProperty("memo")
    private String memo;

    @JsonProperty("originalName")
    private String originalName;

    @JsonProperty("productCode")
    private String productCode;

    @JsonProperty("highlightFlag")
    private Integer highlightFlag;

    @JsonProperty("productFileName")
    private String productFileName;

    //メモ
    @JsonProperty("productName")
    private String productName;

    @JsonProperty("productId")
    private Integer productId;

    /* image file path */
    @JsonProperty("srcImg")
    private String srcImg;

    @JsonProperty("primaryFlag")
    private Integer primaryFlag;


    public Integer getFileId() {
        return fileId;
    }

    public void setFileId(final Integer fileId) {
        this.fileId = fileId;
    }

    public String getProductFileId() {
        return productFileId;
    }

    public void setProductFileId(final String productFileId) {
        this.productFileId = productFileId;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(final String fileName) {
        this.fileName = fileName;
    }

    public Integer getFileType() {
        return fileType;
    }

    public void setFileType(final Integer fileType) {
        this.fileType = fileType;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(final String memo) {
        this.memo = memo;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(final String productName) {
        this.productName = productName;
    }

    public String getSrcImg() {
        return srcImg;
    }

    public void setSrcImg(final String srcImg) {
        this.srcImg = srcImg;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getProductFileName() {
        return productFileName;
    }

    public void setProductFileName(String productFileName) {
        this.productFileName = productFileName;
    }

    public Integer getHighlightFlag() {
        return highlightFlag;
    }

    public void setHighlightFlag(Integer highlightFlag) {
        this.highlightFlag = highlightFlag;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getPrimaryFlag() {
        return primaryFlag;
    }

    public void setPrimaryFlag(Integer primaryFlag) {
        this.primaryFlag = primaryFlag;
    }

    @Override
    public ProductFileDto getModel() {
        return null;
    }

    @Override
    public void setModel(final ProductFileDto dto) {
        if (dto != null) {
            setData(dto);

            this.primaryFlag = dto.getPrimaryFlag();
            this.fileId = dto.getFileId();
            this.productFileId = dto.getProductFileId();
            this.fileName = dto.getOriginalName();
            this.fileType = dto.getType();
            this.memo = dto.getMemo();
            this.originalName = dto.getOriginalName();
            this.productFileName = dto.getProductFileName();
            this.highlightFlag = dto.getHighlightFlag();
            this.productId = dto.getProductId();
        }
    }
}
